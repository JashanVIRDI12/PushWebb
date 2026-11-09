import * as THREE from 'three';
import { clipFragment, clipVertex, waveFragment, waveVertex } from './shaders';

/* ────────────────────────────────────────────────────────────────
   The clip field and the particle wave, as plain three.js objects.
   Shared by the original WebGL hero (wave-canvas.tsx) and the
   redesign's scroll-driven "multiply" scene. Every position is
   computed on the GPU from per-instance attributes (see shaders.ts).
──────────────────────────────────────────────────────────────── */

/** Deterministic PRNG so the composition is identical on every load. */
export function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type ClipFieldOptions = {
  accent: THREE.ColorRepresentation;
  bg: THREE.ColorRepresentation;
  /** Clips per orbit ring, inner to outer. */
  rings?: number[];
  /** Extra clips that only appear once the field scatters. */
  reserve?: number;
};

/** One master clip, orbit rings around it, and a reserve that joins on scatter. */
export function buildClipField({ accent, bg, rings = [14, 22, 30], reserve = 150 }: ClipFieldOptions) {
  const random = mulberry32(7);
  const params: number[] = [];
  const scatter: number[] = [];

  const push = (ring: number, angle: number, kind: number) => {
    // A direction on a flattened sphere, biased toward the viewer.
    const theta = random() * Math.PI * 2;
    const z = random() * 1.6 - 0.6;
    const r = Math.sqrt(Math.max(0, 1 - Math.min(1, z * z)));
    params.push(ring, angle, random(), kind);
    scatter.push(Math.cos(theta) * r * 1.25, Math.sin(theta) * r * 0.62, z, random());
  };

  push(0, 0, 1); // the master clip
  rings.forEach((count, ring) => {
    for (let i = 0; i < count; i += 1) push(ring, (i / count) * Math.PI * 2 + ring * 0.4 + random() * 0.08, 0);
  });
  for (let i = 0; i < reserve; i += 1) push(Math.floor(random() * rings.length), random() * Math.PI * 2, 2);

  const plane = new THREE.PlaneGeometry(0.9, 1.6);
  const geometry = new THREE.InstancedBufferGeometry();
  geometry.index = plane.index;
  geometry.setAttribute('position', plane.getAttribute('position'));
  geometry.setAttribute('uv', plane.getAttribute('uv'));
  geometry.setAttribute('aParams', new THREE.InstancedBufferAttribute(new Float32Array(params), 4));
  geometry.setAttribute('aScatter', new THREE.InstancedBufferAttribute(new Float32Array(scatter), 4));
  geometry.instanceCount = params.length / 4;

  const material = new THREE.ShaderMaterial({
    vertexShader: clipVertex,
    fragmentShader: clipFragment,
    uniforms: {
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uSpread: { value: 0 },
      uRingScale: { value: 1 },
      uDim: { value: 1 },
      uAccent: { value: new THREE.Color(accent) },
      uBg: { value: new THREE.Color(bg) },
    },
    side: THREE.DoubleSide,
    alphaToCoverage: true,
  });

  return { geometry, material };
}

/** A grid of points displaced by summed sines: the glowing wave under the clips. */
export function buildWaveField({ accent, columns = 150, rows = 64 }: { accent: THREE.ColorRepresentation; columns?: number; rows?: number }) {
  const random = mulberry32(21);
  const positions = new Float32Array(columns * rows * 3);
  const rand = new Float32Array(columns * rows);
  let i = 0;
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      positions[i * 3] = (col / (columns - 1) - 0.5) * 34 + (random() - 0.5) * 0.08;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = -24 + (row / (rows - 1)) * 30;
      rand[i] = random();
      i += 1;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1));

  const material = new THREE.ShaderMaterial({
    vertexShader: waveVertex,
    fragmentShader: waveFragment,
    uniforms: {
      uTime: { value: 0 },
      uSpread: { value: 0 },
      uIntro: { value: 0 },
      uPixelRatio: { value: 1 },
      uAccent: { value: new THREE.Color(accent) },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { geometry, material };
}
