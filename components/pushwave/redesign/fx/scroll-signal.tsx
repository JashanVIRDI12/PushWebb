'use client';

import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from '@/lib/gsap';

/**
 * "Scroll to make some noise": one shared reading of how hard the visitor
 * is scrolling. Every effect on the page (the WebGL ribbon, the image bend,
 * the marquee, the letters of "Big waves.") reads this object each frame
 * instead of keeping its own listener. Plain mutable state, outside React,
 * so scrolling never causes a re-render.
 */
export const scrollSignal = {
  /** Lenis velocity, smoothed. Signed: positive while scrolling down. */
  velocity: 0,
  /** |velocity| mapped to 0..1 and eased: the amount of "noise". */
  energy: 0,
  /** 1 scrolling down, -1 scrolling up. */
  direction: 1 as 1 | -1,
  /** Scroll position in px. */
  scroll: 0,
};

const FULL_ENERGY_AT = 42; // px per frame that reads as "loud"

/** Mount once. Feeds Lenis's velocity into `scrollSignal` and eases it back to rest. */
export function ScrollSignalDriver() {
  const raw = useRef({ velocity: 0, at: 0 });

  useLenis((lenis) => {
    raw.current.velocity = lenis.velocity;
    raw.current.at = performance.now();
    scrollSignal.scroll = lenis.scroll;
    if (lenis.direction === 1 || lenis.direction === -1) scrollSignal.direction = lenis.direction;
  });

  useEffect(() => {
    // Without Lenis (or before it starts), read native scroll deltas instead.
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (performance.now() - raw.current.at > 50) {
        raw.current.velocity = y - last;
        raw.current.at = performance.now();
        scrollSignal.direction = y >= last ? 1 : -1;
      }
      scrollSignal.scroll = y;
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const tick = () => {
      // A stale reading means scrolling stopped: let the signal fall to rest.
      const target = performance.now() - raw.current.at > 90 ? 0 : raw.current.velocity;
      scrollSignal.velocity += (target - scrollSignal.velocity) * 0.12;
      const energy = Math.min(1, Math.abs(scrollSignal.velocity) / FULL_ENERGY_AT);
      scrollSignal.energy += (energy - scrollSignal.energy) * (energy > scrollSignal.energy ? 0.18 : 0.05);
    };
    gsap.ticker.add(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      gsap.ticker.remove(tick);
    };
  }, []);

  return null;
}
