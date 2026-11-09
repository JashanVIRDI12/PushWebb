import * as THREE from 'three';
import { buildClipField, buildWaveField } from '../../wave/fields';
import { scrollSignal } from './scroll-signal';

const VIOLET = '#9381ff';
const PAGE = '#0b0b0e';

const smoothstep = (a: number, b: number, v: number) => {
  const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export type MultiplyStage = {
  /** 0 → 1 scroll progress through the pinned section. */
  progress: number;
  /** Pointer, -1..1 from the centre of the viewport. */
  pointerX: number;
  pointerY: number;
  visible: boolean;
};

/**
 * One clip → hundreds → a field. The progress of the pinned section drives
 * the shader directly: 0–0.3 the master clip alone (close up), 0.3–0.6 the
 * orbit is born from it, 0.62–0.95 the orbit scatters into a wide field.
 * Renders only while `stage.visible`.
 */
export function createMultiplyScene(host: HTMLElement, stage: MultiplyStage) {
  const narrow = window.innerWidth < 900;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow ? 1.25 : 1.6));
  renderer.setClearColor(0x000000, 0);
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
  const clips = buildClipField({ accent: VIOLET, bg: PAGE, rings: narrow ? [12, 18, 24] : [14, 22, 30], reserve: narrow ? 90 : 150 });
  // Use the project's photographic assets on the procedural clip faces.
  // The original shader remains the fallback until all three textures load.
  let disposed = false;
  const placeholder = new THREE.DataTexture(new Uint8Array([20, 17, 28, 255]), 1, 1);
  placeholder.needsUpdate = true;
  const photos: THREE.Texture[] = [placeholder];
  const uniforms = clips.material.uniforms;
  Object.assign(uniforms, {
    uPhotoA: { value: placeholder }, uPhotoB: { value: placeholder },
    uPhotoC: { value: placeholder }, uPhotosReady: { value: 0 },
  });
  // Per-card random seeds must not interpolate: tiny precision changes in
  // the fragment hash otherwise produce speckles across faces and captions.
  clips.material.vertexShader = clips.material.vertexShader.replace('varying float vSeed;', 'flat varying float vSeed;');
  clips.material.fragmentShader = clips.material.fragmentShader
    .replace('varying float vSeed;', 'flat varying float vSeed;')
    .replace('uniform float uDim;', `uniform float uDim;
      uniform sampler2D uPhotoA;
      uniform sampler2D uPhotoB;
      uniform sampler2D uPhotoC;
      uniform float uPhotosReady;`)
    .replace('    // Shade the lower third for the UI', `
    if (uPhotosReady > 0.5) {
      vec2 photoUv = vec2((vUv.x - 0.5) * 0.54 + 0.5, vUv.y);
      float choice = isMaster > 0.5 ? 0.0 : floor(hash(vSeed * 37.0) * 3.0);
      vec3 photo = choice < 0.5 ? texture2D(uPhotoA, photoUv).rgb
        : choice < 1.5 ? texture2D(uPhotoB, photoUv).rgb
        : texture2D(uPhotoC, photoUv).rgb;
      col = photo * 0.88 + uAccent * 0.025;
    }
    // Shade the lower third for the UI`);
  const loader = new THREE.TextureLoader();
  Promise.all([
    ['/pushwave/studio-editorial.webp', 'uPhotoA'],
    ['/pushwebb-assets/generated/video-production.jpg', 'uPhotoB'],
    ['/pushwebb-assets/photos/mrigank-youtube-play-button.jpg', 'uPhotoC'],
  ].map(([src, key]) => new Promise<boolean>((resolve) => {
    loader.load(src, texture => {
      if (disposed) { texture.dispose(); resolve(false); return; }
      texture.colorSpace = THREE.NoColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      photos.push(texture);
      uniforms[key].value = texture;
      resolve(true);
    }, undefined, () => resolve(false));
  }))).then(loaded => { if (!disposed && loaded.every(Boolean)) uniforms.uPhotosReady.value = 1; });
  const wave = buildWaveField({ accent: VIOLET, columns: narrow ? 90 : 150, rows: narrow ? 40 : 64 });

  const group = new THREE.Group();
  group.add(new THREE.Mesh(clips.geometry, clips.material));
  group.children[0].frustumCulled = false;
  const waveGroup = new THREE.Group();
  const points = new THREE.Points(wave.geometry, wave.material);
  points.frustumCulled = false;
  waveGroup.add(points);
  waveGroup.position.y = -2.6;
  scene.add(waveGroup, group);

  let width = 1;
  let height = 1;
  const resize = () => {
    const rect = host.getBoundingClientRect();
    width = Math.max(rect.width, 1);
    height = Math.max(rect.height, 1);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  const smooth = { p: 0, x: 0, y: 0, spin: 0 };
  let frame = 0;
  let last = -1;

  const render = (now: number) => {
    frame = requestAnimationFrame(render);
    if (!stage.visible) {
      last = -1;
      return;
    }
    const t = now / 1000;
    const dt = last < 0 ? 1 / 60 : Math.min(t - last, 1 / 20);
    last = t;

    smooth.p += (stage.progress - smooth.p) * Math.min(1, dt * 6);
    smooth.x += (stage.pointerX - smooth.x) * Math.min(1, dt * 2.5);
    smooth.y += (stage.pointerY - smooth.y) * Math.min(1, dt * 2.5);
    smooth.spin += dt * (0.05 + scrollSignal.energy * 0.6);

    const p = smooth.p;
    const intro = smoothstep(0.26, 0.6, p);
    const spread = smoothstep(0.62, 0.96, p);
    const aspect = width / height;
    const wide = aspect > 1.1;

    const u = clips.material.uniforms;
    u.uTime.value = t;
    u.uIntro.value = intro;
    u.uSpread.value = spread;
    u.uRingScale.value = wide ? 1 : 0.72;
    const w = wave.material.uniforms;
    w.uTime.value = t;
    w.uIntro.value = 0.25 + intro * 0.75;
    w.uSpread.value = spread;
    w.uPixelRatio.value = renderer.getPixelRatio();

    // Start close on the one clip, pull back as it multiplies.
    const dolly = 8.5 + smoothstep(0.18, 0.62, p) * 4.6 + spread * 0.8;
    camera.position.set(0, 0.6 + intro * 0.5, dolly);
    camera.lookAt(0, 0, 0);

    group.position.x = wide ? 1.8 * (1 - spread * 0.55) : 0;
    group.position.y = wide ? 0 : -0.9;
    group.rotation.set(0.17 + smooth.y * 0.08 + intro * 0.08, smooth.x * 0.25 + smooth.spin * 0.6 * intro, smooth.x * -0.03);
    waveGroup.position.x = smooth.x * -0.6;
    renderer.render(scene, camera);
  };
  frame = requestAnimationFrame(render);

  return {
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      photos.forEach(texture => texture.dispose());
      observer.disconnect();
      clips.geometry.dispose();
      clips.material.dispose();
      wave.geometry.dispose();
      wave.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
