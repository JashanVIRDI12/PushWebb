'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { BRAND } from '@/lib/pushwave/content';
import { scrollSignal } from './scroll-signal';
import { usePrefersReducedMotion } from '../../hooks';

function Run({ hidden }: { hidden?: boolean }) {
  return (
    <div className="rw-marquee-run" aria-hidden={hidden || undefined}>
      {[...BRAND.tagline, ...BRAND.tagline].map((line, index) => (
        <span key={index} className="rw-marquee-item">
          <span className={index % 3 === 1 ? 'rw-marquee-fill' : 'rw-marquee-outline'}>{line}</span>
          <svg viewBox="0 0 32 16" className="rw-marquee-glyph" aria-hidden="true">
            <path d="M1 8c3.5 0 3.5-6 7-6s3.5 12 7 12 3.5-12 7-12 3.5 6 9 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/**
 * The tagline as an endless band. It drifts on its own; scrolling speeds it
 * up, skews it with the scroll's force and turns it around when the scroll
 * reverses. Static under reduced motion.
 */
export function VelocityMarquee() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track || reduced) return;

    const setX = gsap.quickSetter(track, 'x', 'px');
    const setSkew = gsap.quickSetter(track, 'skewX', 'deg');
    const state = { x: 0, skew: 0, direction: 1 };
    let width = track.scrollWidth / 2;
    let visible = false;

    const resize = new ResizeObserver(() => {
      width = track.scrollWidth / 2;
    });
    resize.observe(track);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    intersection.observe(root);

    const tick = (_time: number, deltaTime: number) => {
      if (!visible || !width) return;
      const frames = Math.min(deltaTime, 50) / (1000 / 60);
      state.direction += (scrollSignal.direction - state.direction) * 0.06;
      const speed = (0.7 + scrollSignal.energy * 16) * frames;
      state.x = gsap.utils.wrap(-width, 0, state.x - speed * state.direction);
      const skewTarget = gsap.utils.clamp(-12, 12, -scrollSignal.velocity * 0.22);
      state.skew += (skewTarget - state.skew) * 0.12;
      setX(state.x);
      setSkew(state.skew);
    };
    gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      resize.disconnect();
      intersection.disconnect();
      gsap.set(track, { clearProps: 'transform' });
    };
  }, [reduced]);

  return (
    <section ref={rootRef} className="rw-marquee" aria-label={BRAND.tagline.join(' ')}>
      <div ref={trackRef} className="rw-marquee-track">
        <Run hidden />
        <Run hidden />
      </div>
    </section>
  );
}
