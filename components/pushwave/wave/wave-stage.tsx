'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { ClipFan } from './clip-fan';
import { waveState } from './wave-state';

const WaveCanvas = dynamic(() => import('./wave-canvas'), { ssr: false });

/** Phones get the light CSS composition in the page flow instead (see ClipFan). */
const WEBGL_MIN_WIDTH = 768;

type StageMode = 'pending' | 'webgl' | 'css' | 'none';
type Phase = 'hero' | 'finale';

function supportsWebGL2() {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'));
  } catch {
    return false;
  }
}

function decideMode(): StageMode {
  if (window.innerWidth < WEBGL_MIN_WIDTH) return 'none';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !supportsWebGL2()) return 'css';
  return 'webgl';
}

/**
 * One fixed layer behind the page. It shows through the transparent hero
 * (#top) and final call to action (#finale), and is hidden, with its render
 * loop paused, while the opaque sections in between cover the screen.
 */
export function WaveStage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<StageMode>('pending');
  const [phase, setPhase] = useState<Phase>('hero');
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);

  // Decide once the browser is idle, so the 3D bundle never competes with first paint.
  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 250));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const handle = idle(() => setMode(decideMode()), { timeout: 1500 });
    // Only ever upgrade from 'none' (a phone rotated to a wide screen).
    const onResize = () => setMode((current) => (current === 'none' ? decideMode() : current));
    window.addEventListener('resize', onResize);
    return () => {
      cancel(handle as number);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const onPointer = (event: PointerEvent) => {
      waveState.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      waveState.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => window.removeEventListener('pointermove', onPointer);
  }, []);

  useGSAP(() => {
    const root = rootRef.current;
    const hero = document.getElementById('top');
    const finale = document.getElementById('finale');
    if (!root || !hero || !finale) return;

    const seen = { hero: true, finale: false };
    const clipTo = (progress: number) => {
      root.style.clipPath = `circle(${(progress * 78).toFixed(2)}% at 50% 50%)`;
    };
    const sync = () => {
      const next: Phase = seen.finale && !seen.hero ? 'finale' : 'hero';
      waveState.mode = next;
      setPhase(next);
      setVisible(seen.hero || seen.finale);
      if (next === 'hero') root.style.clipPath = '';
      else clipTo(waveState.finale);
    };

    // Visibility: is any part of the section on screen?
    ScrollTrigger.create({
      trigger: hero,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        seen.hero = self.isActive;
        sync();
      },
    });
    ScrollTrigger.create({
      trigger: finale,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        seen.finale = self.isActive;
        sync();
      },
    });

    // Progress: the hero spreads the wave out as it leaves...
    ScrollTrigger.create({
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        waveState.spread = self.progress;
      },
    });
    // ...and the finale gathers it back inside an expanding circle.
    ScrollTrigger.create({
      trigger: finale,
      start: 'top bottom',
      end: 'top top',
      onUpdate: (self) => {
        waveState.finale = self.progress;
        if (waveState.mode === 'finale') clipTo(self.progress);
      },
    });
  });

  return (
    <div
      ref={rootRef}
      aria-hidden
      className={cn('pointer-events-none fixed inset-0 z-0 bg-pw-void', !visible && 'invisible')}
    >
      {/* Light the clips orbit in front of. */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-1000',
          '[background:radial-gradient(44%_52%_at_68%_44%,rgb(59_91_255/0.24),transparent_70%),radial-gradient(70%_46%_at_50%_100%,rgb(59_91_255/0.16),transparent_70%)]',
          phase === 'finale' && 'opacity-0',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-1000',
          '[background:radial-gradient(50%_50%_at_50%_50%,rgb(59_91_255/0.26),transparent_72%)]',
          phase === 'finale' && 'opacity-100',
        )}
      />

      {mode === 'webgl' ? (
        <div className={cn('absolute inset-0 transition-opacity duration-[1400ms] ease-out', ready ? 'opacity-100' : 'opacity-0')}>
          <WaveCanvas active={visible} onReady={() => setReady(true)} />
        </div>
      ) : null}

      {mode === 'css' ? (
        <div className={cn('absolute inset-y-0 flex items-center transition-[left,right] duration-1000', phase === 'hero' ? 'left-[42%] right-0' : 'left-[10%] right-[10%] opacity-50')}>
          <ClipFan count={11} className="h-[78vh] w-full" />
        </div>
      ) : null}

      {/* Scrims keep the copy legible: left-weighted for the hero, centred for the finale. */}
      <div
        className={cn(
          'absolute inset-0 transition-opacity duration-700',
          '[background:linear-gradient(90deg,rgb(7_7_10/0.9)_0%,rgb(7_7_10/0.55)_36%,transparent_62%),linear-gradient(0deg,rgb(7_7_10/0.92)_0%,transparent_34%)]',
          phase === 'finale' && 'opacity-0',
        )}
      />
      <div
        className={cn(
          'absolute inset-0 opacity-0 transition-opacity duration-700',
          '[background:radial-gradient(60%_55%_at_50%_50%,rgb(7_7_10/0.78),rgb(7_7_10/0.2)_70%,transparent)]',
          phase === 'finale' && 'opacity-100',
        )}
      />
    </div>
  );
}
