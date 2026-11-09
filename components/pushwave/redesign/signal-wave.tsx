'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { usePrefersReducedMotion } from '../hooks';
import { scrollSignal } from './fx/scroll-signal';

/**
 * The brand's single wave, multiplied into a signal: a stack of thin
 * metallic strands. Their shape is computed on the GPU every frame
 * (injected into MeshStandardMaterial, so the studio lighting still works):
 *
 *   travel   a wave runs along the strands
 *   noise    scrolling hard adds fast ripples ("Scroll to make some noise")
 *   pluck    the pointer lifts the strands beneath it, like a string
 *   spread   hero: scrolling out fans the strands apart, one signal into ripples
 *            finale: arriving gathers them back into one
 *   reveal   the strands draw in from left to right
 *
 * Reduced motion: one static frame, redrawn only on resize.
 */

type Variant = 'hero' | 'finale';

const HALF = 5; // strands span x = -5 … 5

const WAVE_GLSL = /* glsl */ `
uniform float uTime;
uniform float uEnergy;
uniform float uSpread;
uniform float uPluck;
uniform float uPointerX;
uniform float uRow;
uniform float uRowZ;

float rwWave(float x) {
  float env = exp(-x * x * 0.09);
  float y = sin(x * 1.1 + uRow * 1.15 - uTime * 0.55) * 1.5 * env;
  y *= 1.0 + uEnergy * 0.55 + uSpread * 0.3;
  float noise = sin(x * 4.6 - uTime * 7.0 + uRow * 9.0) * 0.32
              + sin(x * 8.3 + uTime * 5.0 + uRow * 4.0) * 0.14;
  y += noise * uEnergy * (0.3 + env);
  float d = x - uPointerX * ${HALF.toFixed(1)};
  y += exp(-d * d * 0.55) * uPluck * (0.6 + uRow * 0.8);
  y += (uRow - 0.5) * uSpread * 4.2 * (0.35 + env);
  return y;
}
`;

type Shared = Record<'uTime' | 'uEnergy' | 'uSpread' | 'uPluck' | 'uPointerX' | 'uReveal', { value: number }>;

function strandMaterial(color: THREE.Color, row: number, rowZ: number, shared: Shared, variant: Variant) {
  const material = new THREE.MeshStandardMaterial({
    color,
    metalness: variant === 'hero' ? 0.65 : 0.35,
    roughness: variant === 'hero' ? 0.28 : 0.42,
  });
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, shared, { uRow: { value: row }, uRowZ: { value: rowZ } });
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>\n${WAVE_GLSL}\nvarying float vRwX;`)
      // Bend the tube's normals with the curve so the highlights travel along it.
      .replace(
        '#include <beginnormal_vertex>',
        `#include <beginnormal_vertex>
        {
          float slope = (rwWave(position.x + 0.02) - rwWave(position.x - 0.02)) / 0.04;
          float a = atan(slope);
          float c = cos(a), s = sin(a);
          objectNormal = vec3(objectNormal.x * c - objectNormal.y * s, objectNormal.x * s + objectNormal.y * c, objectNormal.z);
        }`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        transformed.y += rwWave(position.x);
        transformed.z += uRowZ * (1.0 + uSpread * 5.0);
        vRwX = position.x;`,
      );
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>\nuniform float uReveal;\nvarying float vRwX;`)
      .replace('void main() {', `void main() {\n  if (vRwX > mix(${(-HALF - 0.6).toFixed(1)}, ${(HALF + 0.6).toFixed(1)}, uReveal)) discard;`);
  };
  return material;
}

const easeOut = (t: number) => 1 - Math.pow(1 - Math.min(1, Math.max(0, t)), 3);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export default function SignalWave({ variant = 'hero' }: { variant?: Variant }) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }
    const narrow = window.innerWidth < 700;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, narrow ? 1.25 : 1.5));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    const baseZ = variant === 'hero' ? 13 : 12;
    camera.position.set(0, variant === 'hero' ? 1 : 0.4, baseZ);
    const group = new THREE.Group();
    scene.add(group);

    const shared: Shared = {
      uTime: { value: 0 },
      uEnergy: { value: 0 },
      uSpread: { value: variant === 'finale' ? 1 : 0 },
      uPluck: { value: 0 },
      uPointerX: { value: 0 },
      uReveal: { value: reduced ? 1 : 0 },
    };

    // One straight tube per strand; the shader shapes it.
    const rows = narrow ? 19 : 31;
    const geometry = new THREE.TubeGeometry(
      new THREE.LineCurve3(new THREE.Vector3(-HALF, 0, 0), new THREE.Vector3(HALF, 0, 0)),
      220,
      variant === 'hero' ? 0.018 : 0.022,
      6,
      false,
    );
    const materials: THREE.Material[] = [];
    for (let row = 0; row < rows; row += 1) {
      const t = row / (rows - 1);
      const color =
        variant === 'hero'
          ? new THREE.Color().setHSL(0.68 + t * 0.05, 0.85, 0.43 + t * 0.24)
          : new THREE.Color().setHSL(0.72, 0.45, 0.07 + t * 0.1);
      const material = strandMaterial(color, t, (t - 0.5) * 2.7, shared, variant);
      materials.push(material);
      group.add(new THREE.Mesh(geometry, material));
    }

    if (variant === 'hero') {
      scene.add(new THREE.AmbientLight(0x8782ff, 2));
      const key = new THREE.DirectionalLight(0xffffff, 5);
      key.position.set(-2, 4, 5);
      scene.add(key);
      const violet = new THREE.PointLight(0x7040ff, 40);
      violet.position.set(3, -1, 3);
      scene.add(violet);
    } else {
      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const key = new THREE.DirectionalLight(0xf1ebff, 3.2);
      key.position.set(-3, 5, 6);
      scene.add(key);
    }

    let width = 0;
    let height = 0;
    const resize = () => {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      renderer.setSize(width, height);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      if (reduced) renderer.render(scene, camera);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(el);
    resize();

    let visible = false;
    let revealStart = -1;
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(el);

    // The pointer anywhere on the page steers the sculpture; near it, it plucks the strands.
    const pointer = { x: 0, y: 0, near: 0 };
    const onPointer = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      pointer.near = Math.abs(x) < 1.15 && Math.abs(y) < 1.15 ? 1 : 0;
      pointer.x = Math.max(-1, Math.min(1, x));
      pointer.y = Math.max(-1, Math.min(1, y));
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    const section = el.closest('section') ?? el;
    const smooth = { x: 0, y: 0, spread: shared.uSpread.value, pluck: 0, energy: 0 };

    const scrollTarget = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      if (variant === 'hero') return clamp01(-rect.top / Math.max(rect.height * 0.85, 1));
      // Finale: the strands gather as the section arrives.
      return 1 - clamp01((vh - rect.top) / (vh * 0.95));
    };

    let frame = 0;
    const render = (time: number) => {
      frame = requestAnimationFrame(render);
      if (!visible) return;
      const t = time / 1000;
      if (revealStart < 0) revealStart = t + (variant === 'hero' ? 0.35 : 0);

      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;
      smooth.spread += (scrollTarget() - smooth.spread) * 0.07;
      smooth.pluck += (-pointer.y * 1.1 * pointer.near - smooth.pluck) * 0.06;
      smooth.energy += (scrollSignal.energy - smooth.energy) * 0.15;

      shared.uTime.value = t;
      shared.uEnergy.value = smooth.energy;
      shared.uSpread.value = smooth.spread;
      shared.uPluck.value = smooth.pluck;
      shared.uPointerX.value = smooth.x;
      shared.uReveal.value = easeOut((t - revealStart) / 1.9);

      if (variant === 'hero') {
        group.rotation.x = -0.35 + smooth.y * 0.12 + smooth.spread * 0.42;
        group.rotation.y = Math.sin(t * 0.15) * 0.16 + smooth.x * 0.22 - smooth.spread * 0.35;
        group.rotation.z = -0.22 + smooth.spread * 0.12;
        camera.position.z = baseZ - smooth.spread * 3.2;
      } else {
        group.rotation.x = -0.18 + smooth.y * 0.08;
        group.rotation.y = Math.sin(t * 0.12) * 0.12 + smooth.x * 0.16;
        group.rotation.z = -0.1;
      }
      renderer.render(scene, camera);
    };

    if (reduced) {
      group.rotation.set(variant === 'hero' ? -0.35 : -0.18, 0, variant === 'hero' ? -0.22 : -0.1);
      shared.uSpread.value = 0;
      renderer.render(scene, camera);
    } else {
      frame = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener('pointermove', onPointer);
      geometry.dispose();
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant, reduced]);

  return (
    <div ref={host} className={variant === 'hero' ? 'rw-signal' : 'rw-signal rw-signal--finale'} aria-hidden="true">
      <svg className="rw-signal-fallback" viewBox="0 0 600 260">
        <path
          d="M0 130C90 130 80 10 170 10S250 250 340 250 420 10 500 10 530 130 600 130"
          fill="none"
          stroke={variant === 'hero' ? '#7660ff' : '#1b1330'}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
