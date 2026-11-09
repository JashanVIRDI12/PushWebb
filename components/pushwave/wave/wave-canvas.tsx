'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { clipFragment, clipVertex, waveFragment, waveVertex } from './shaders';
import { waveState } from './wave-state';

const ACCENT = new THREE.Color('#3b5bff');
const BG = new THREE.Color('#07070a');
const RINGS = [14, 22, 30];
const RESERVE = 150;

/** Deterministic PRNG so the composition is identical on every load. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildClips() {
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
  RINGS.forEach((count, ring) => {
    for (let i = 0; i < count; i += 1) push(ring, (i / count) * Math.PI * 2 + ring * 0.4 + random() * 0.08, 0);
  });
  for (let i = 0; i < RESERVE; i += 1) push(Math.floor(random() * RINGS.length), random() * Math.PI * 2, 2);

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
      uAccent: { value: ACCENT },
      uBg: { value: BG },
    },
    side: THREE.DoubleSide,
    alphaToCoverage: true,
  });

  return { geometry, material };
}

function buildWave(columns: number, rows: number) {
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
      uAccent: { value: ACCENT },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  return { geometry, material };
}

function Scene({ onFirstFrame }: { onFirstFrame: () => void }) {
  const group = useRef<THREE.Group>(null);
  const waveGroup = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const clips = useMemo(buildClips, []);
  const wave = useMemo(() => buildWave(150, 64), []);
  const smooth = useRef({ spread: 0, x: 0, y: 0, offset: 0, dim: 1, intro: 0, started: -1 });
  const reported = useRef(false);

  useEffect(() => {
    camera.lookAt(0, 0, 0);
  }, [camera]);

  useEffect(
    () => () => {
      clips.geometry.dispose();
      clips.material.dispose();
      wave.geometry.dispose();
      wave.material.dispose();
    },
    [clips, wave],
  );

  useFrame((state, delta) => {
    const s = smooth.current;
    const dt = Math.min(delta, 1 / 20);
    const t = state.clock.elapsedTime;
    if (s.started < 0) s.started = t;

    const finale = waveState.mode === 'finale';
    const spreadTarget = finale ? 1 - waveState.finale * 0.92 : waveState.spread;
    const aspect = size.width / Math.max(size.height, 1);
    const offsetTarget = finale ? 0 : aspect > 1.15 ? Math.min((aspect - 1) * 3.4, 3) : 0;

    s.intro = Math.min(1, (t - s.started) / 2.6);
    s.spread = THREE.MathUtils.damp(s.spread, spreadTarget, 3.2, dt);
    s.x = THREE.MathUtils.damp(s.x, waveState.pointerX, 2.6, dt);
    s.y = THREE.MathUtils.damp(s.y, waveState.pointerY, 2.6, dt);
    s.offset = THREE.MathUtils.damp(s.offset, offsetTarget, 2.4, dt);
    s.dim = THREE.MathUtils.damp(s.dim, finale ? 0.62 : 1, 2.4, dt);

    const clipUniforms = clips.material.uniforms;
    clipUniforms.uTime.value = t;
    clipUniforms.uIntro.value = s.intro;
    clipUniforms.uSpread.value = s.spread;
    clipUniforms.uDim.value = s.dim;
    clipUniforms.uRingScale.value = aspect < 1.15 ? 0.82 : 1;

    const waveUniforms = wave.material.uniforms;
    waveUniforms.uTime.value = t;
    waveUniforms.uSpread.value = s.spread;
    waveUniforms.uIntro.value = s.intro;
    waveUniforms.uPixelRatio.value = state.gl.getPixelRatio();

    if (group.current) {
      group.current.position.x = s.offset;
      group.current.rotation.set(0.17 + s.y * 0.09, s.x * 0.3, s.x * -0.03);
    }
    if (waveGroup.current) {
      waveGroup.current.position.x = s.x * -0.6;
      waveGroup.current.rotation.y = s.x * 0.05;
    }

    if (!reported.current) {
      reported.current = true;
      onFirstFrame();
    }
  });

  return (
    <>
      <group ref={waveGroup} position={[0, -2.6, 0]}>
        <points geometry={wave.geometry} material={wave.material} frustumCulled={false} />
      </group>
      <group ref={group}>
        <mesh geometry={clips.geometry} material={clips.material} frustumCulled={false} />
      </group>
    </>
  );
}

/** The WebGL layer. Loaded lazily by WaveStage, only on capable desktops. */
export default function WaveCanvas({ active, onReady }: { active: boolean; onReady: () => void }) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? 'always' : 'never'}
      flat
      linear
      camera={{ position: [0, 1, 10.5], fov: 34, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ position: 'absolute', inset: 0 }}
    >
      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(Math.min(window.devicePixelRatio || 1, 1.75))}
      />
      <Scene onFirstFrame={onReady} />
    </Canvas>
  );
}
