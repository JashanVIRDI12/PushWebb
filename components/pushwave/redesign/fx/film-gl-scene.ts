import * as THREE from 'three';
import { scrollSignal } from './scroll-signal';

/* ────────────────────────────────────────────────────────────────
   The film strip, re-drawn in WebGL so the photographs can behave
   like a surface: they bend and split RGB with scroll speed, ripple
   from the pointer on hover, zoom and regain colour. The DOM images
   stay in place (hidden) for layout, accessibility and fallback.
──────────────────────────────────────────────────────────────── */

const VERT = /* glsl */ `
uniform float uVelocity;
uniform float uTime;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec3 p = position;
  float speed = clamp(abs(uVelocity) / 40.0, 0.0, 1.0);
  // The middle of each image lags behind the scroll, like cloth.
  p.y -= sin(uv.x * 3.14159265) * clamp(uVelocity, -60.0, 60.0) * 0.0021;
  // A ripple runs across while it moves.
  p.y += sin(uv.x * 9.0 - uTime * 5.0) * 0.012 * speed;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}
`;

const FRAG = /* glsl */ `
uniform sampler2D uTex;
uniform vec2 uCover;
uniform vec2 uOffset;
uniform float uSaturation;
uniform float uHover;
uniform vec2 uMouse;
uniform float uAspect;
uniform float uVelocity;
uniform float uTime;
uniform float uReveal;
varying vec2 vUv;

void main() {
  if (vUv.y > uReveal) discard;
  vec2 uv = vUv;
  uv = (uv - 0.5) / (1.0 + uHover * 0.06) + 0.5;
  vec2 dm = (vUv - uMouse) * vec2(uAspect, 1.0);
  float dist = length(dm);
  uv += (dm / max(dist, 1e-4)) * vec2(1.0 / uAspect, 1.0) * sin(dist * 26.0 - uTime * 5.5) * 0.006 * uHover * smoothstep(0.5, 0.0, dist);
  uv = uv * uCover + uOffset;

  float shift = clamp(uVelocity * 0.0004, -0.018, 0.018);
  vec3 col;
  col.r = texture2D(uTex, uv + vec2(0.0, shift)).r;
  col.g = texture2D(uTex, uv).g;
  col.b = texture2D(uTex, uv - vec2(0.0, shift)).b;

  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(lum), col, mix(uSaturation, 1.0, uHover));
  gl_FragColor = vec4(col, 1.0);
}
`;

type Plane = {
  frame: HTMLElement;
  img: HTMLImageElement;
  mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  hover: number;
  hoverTarget: number;
};

const PAD = 72; // room above and below for the bend

/** CSS object-position percentages ("42% 50%") as 0..1. */
function objectPosition(img: HTMLImageElement) {
  const parts = getComputedStyle(img).objectPosition.split(' ');
  const read = (value: string | undefined) => (value && value.endsWith('%') ? parseFloat(value) / 100 : 0.5);
  return { x: read(parts[0]), y: read(parts[1]) };
}

/** The saturate() amount in the image's CSS filter, if any. */
function saturation(img: HTMLImageElement) {
  const match = getComputedStyle(img).filter.match(/saturate\(([\d.]+)\)/);
  return match ? parseFloat(match[1]) : 1;
}

export function createFilmScene(track: HTMLElement, host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -10, 10);
  const geometry = new THREE.PlaneGeometry(1, 1, 40, 10);
  const loader = new THREE.TextureLoader();
  const planes: Plane[] = [];
  const listeners: (() => void)[] = [];

  const frames = Array.from(track.querySelectorAll<HTMLElement>('.rw-frame')).filter((frame) =>
    frame.querySelector('img:not(.rw-logo-mark)'),
  );

  let disposed = false;
  const loads = frames.map(
    (frame) =>
      new Promise<void>((resolve) => {
        const img = frame.querySelector<HTMLImageElement>('img:not(.rw-logo-mark)')!;
        const src = img.currentSrc || img.src;
        loader.load(
          src,
          (texture) => {
            if (disposed) { texture.dispose(); resolve(); return; }
            texture.colorSpace = THREE.NoColorSpace; // sample as-is, so colours match the DOM
            texture.minFilter = THREE.LinearFilter;
            texture.generateMipmaps = false;
            const position = objectPosition(img);
            const material = new THREE.ShaderMaterial({
              vertexShader: VERT,
              fragmentShader: FRAG,
              uniforms: {
                uTex: { value: texture },
                uCover: { value: new THREE.Vector2(1, 1) },
                uOffset: { value: new THREE.Vector2(0, 0) },
                uSaturation: { value: saturation(img) },
                uHover: { value: 0 },
                uMouse: { value: new THREE.Vector2(0.5, 0.5) },
                uAspect: { value: 1 },
                uVelocity: { value: 0 },
                uTime: { value: 0 },
                uReveal: { value: 1 },
              },
            });
            material.userData.position = position;
            material.userData.imageAspect = texture.image.width / texture.image.height;
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
            const plane: Plane = { frame, img, mesh, hover: 0, hoverTarget: 0 };
            planes.push(plane);

            const enter = () => (plane.hoverTarget = 1);
            const leave = () => (plane.hoverTarget = 0);
            const move = (event: PointerEvent) => {
              const rect = frame.getBoundingClientRect();
              material.uniforms.uMouse.value.set((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
            };
            frame.addEventListener('pointerenter', enter);
            frame.addEventListener('pointerleave', leave);
            frame.addEventListener('pointermove', move);
            listeners.push(() => {
              frame.removeEventListener('pointerenter', enter);
              frame.removeEventListener('pointerleave', leave);
              frame.removeEventListener('pointermove', move);
            });
            resolve();
          },
          undefined,
          () => resolve(),
        );
      }),
  );

  /** Lay every plane over its frame. Offsets are relative to the track, so they hold while it moves. */
  const layout = () => {
    const width = track.offsetWidth;
    const height = track.offsetHeight + PAD * 2;
    renderer.setSize(width, height);
    camera.right = width;
    camera.bottom = -height;
    camera.updateProjectionMatrix();
    for (const plane of planes) {
      const { frame, mesh } = plane;
      const w = frame.offsetWidth;
      const h = frame.offsetHeight;
      mesh.scale.set(w, h, 1);
      mesh.position.set(frame.offsetLeft + w / 2, -(frame.offsetTop + PAD + h / 2), 0);
      const uniforms = mesh.material.uniforms;
      const planeAspect = w / Math.max(h, 1);
      const imageAspect = mesh.material.userData.imageAspect as number;
      const position = mesh.material.userData.position as { x: number; y: number };
      uniforms.uAspect.value = planeAspect;
      if (planeAspect > imageAspect) {
        const visible = imageAspect / planeAspect;
        uniforms.uCover.value.set(1, visible);
        uniforms.uOffset.value.set(0, (1 - visible) * (1 - position.y));
      } else {
        const visible = planeAspect / imageAspect;
        uniforms.uCover.value.set(visible, 1);
        uniforms.uOffset.value.set((1 - visible) * position.x, 0);
      }
    }
  };

  let visible = false;
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  intersection.observe(track);
  const resizeObserver = new ResizeObserver(layout);
  resizeObserver.observe(track);

  let frame = 0;
  let velocity = 0;
  const render = (now: number) => {
    frame = requestAnimationFrame(render);
    if (!visible || !planes.length) return;
    velocity += (scrollSignal.velocity - velocity) * 0.2;
    const t = now / 1000;
    for (const plane of planes) {
      plane.hover += (plane.hoverTarget - plane.hover) * 0.08;
      const uniforms = plane.mesh.material.uniforms;
      uniforms.uVelocity.value = velocity;
      uniforms.uTime.value = t;
      uniforms.uHover.value = plane.hover;
      // The entrance is driven in the DOM (--reveal on each frame); follow it.
      const reveal = plane.frame.style.getPropertyValue('--reveal');
      uniforms.uReveal.value = reveal === '' ? 1 : parseFloat(reveal);
    }
    renderer.render(scene, camera);
  };

  const ready = Promise.all(loads).then(() => {
    if (disposed || planes.length !== frames.length) return false;
    layout();
    frame = requestAnimationFrame(render);
    return true;
  });
  const onContextLost = () => track.classList.remove('rw-film-track--gl');
  renderer.domElement.addEventListener('webglcontextlost', onContextLost);

  return {
    ready,
    dispose() {
      disposed = true;
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      cancelAnimationFrame(frame);
      intersection.disconnect();
      resizeObserver.disconnect();
      listeners.forEach((off) => off());
      planes.forEach((plane) => {
        (plane.mesh.material.uniforms.uTex.value as THREE.Texture).dispose();
        plane.mesh.material.dispose();
      });
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
