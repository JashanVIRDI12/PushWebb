'use client';

/* three.js objects are mutable by design: useFrame writes the shader uniforms
   every frame, which is the React Three Fiber idiom. The React Compiler's
   immutability rule can't model that, so it is off for this file only. */
/* eslint-disable react-hooks/immutability */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { buildClipField, buildWaveField } from './fields';
import { waveState } from './wave-state';

const ACCENT = '#3b5bff';
const BG = '#07070a';

const buildClips = () => buildClipField({ accent: ACCENT, bg: BG });
const buildWave = (columns: number, rows: number) => buildWaveField({ accent: ACCENT, columns, rows });

function Scene({ onFirstFrame }: { onFirstFrame: () => void }) {
  const group = useRef<THREE.Group>(null);
  const waveGroup = useRef<THREE.Group>(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const clips = useMemo(() => buildClips(), []);
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
