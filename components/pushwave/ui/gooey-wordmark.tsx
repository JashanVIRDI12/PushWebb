'use client';

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react';
import { Particle } from '@/components/ui/particle-animation';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '../hooks';

const WORD = 'PUSHWAVE';
const FONT_SIZE = 200;
const MAX_PARTICLES = 180;

type Layout = { x: number; y: number; width: number; height: number; xs: number[] };

/**
 * The footer wordmark. Moving the pointer across it leaves a gooey particle
 * trail (the Particle engine from components/ui/particle-animation) that
 * masks in a lit copy of the word, its letters pulsing with `char-scale`
 * like a waveform.
 *
 * Unlike the original demo, the loop only runs while the trail is alive,
 * particles are capped, and coordinates are local to the wordmark, so it
 * costs nothing while the visitor is elsewhere on the page.
 * Reduced motion: the static wordmark only.
 */
export function GooeyWordmark({ className }: { className?: string }) {
  const rawId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const ids = { mask: `pw-goo-mask-${rawId}`, filter: `pw-goo-filter-${rawId}`, base: `pw-goo-base-${rawId}`, lit: `pw-goo-lit-${rawId}` };
  const svgRef = useRef<SVGSVGElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const trailRef = useRef<SVGGElement>(null);
  const [layout, setLayout] = useState<Layout | null>(null);
  const motion = !usePrefersReducedMotion();
  const [active, setActive] = useState(false);

  // Measure the set word once the display face has loaded.
  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      const text = measureRef.current;
      if (!text || cancelled) return;
      const box = text.getBBox();
      if (!box.width) return;
      const xs = Array.from(WORD, (_, index) => text.getStartPositionOfChar(index).x);
      setLayout({ x: box.x, y: box.y, width: box.width, height: box.height, xs });
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  // The trail.
  useEffect(() => {
    const svg = svgRef.current;
    const trail = trailRef.current;
    if (!svg || !trail || !layout || !motion) return;

    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0, smoothX: 0, smoothY: 0, diff: 0, primed: false };
    let frame = 0;
    let running = false;

    const tick = () => {
      mouse.smoothX += (mouse.x - mouse.smoothX) * 0.1;
      mouse.smoothY += (mouse.y - mouse.smoothY) * 0.1;
      mouse.diff = Math.hypot(mouse.x - mouse.smoothX, mouse.y - mouse.smoothY);

      if (mouse.diff > 0.6) {
        if (particles.length >= MAX_PARTICLES) particles[0].kill(particles);
        const particle = new Particle(mouse.smoothX, mouse.smoothY, 4 + mouse.diff * 0.32, particles);
        particles.push(particle);
        trail.prepend(particle.el);
      }
      particles.forEach((particle) => particle.render());

      if (particles.length || mouse.diff > 0.6) {
        frame = requestAnimationFrame(tick);
      } else {
        running = false;
        setActive(false);
      }
    };

    const onMove = (event: PointerEvent) => {
      const matrix = svg.getScreenCTM();
      if (!matrix) return;
      const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
      mouse.x = point.x;
      mouse.y = point.y;
      if (!mouse.primed) {
        // Start the trail where the pointer is, not from the origin.
        mouse.smoothX = point.x;
        mouse.smoothY = point.y;
        mouse.primed = true;
      }
      if (!running) {
        running = true;
        setActive(true);
        frame = requestAnimationFrame(tick);
      }
    };
    const onLeave = () => {
      mouse.primed = false;
    };

    svg.addEventListener('pointermove', onMove, { passive: true });
    svg.addEventListener('pointerleave', onLeave);
    return () => {
      svg.removeEventListener('pointermove', onMove);
      svg.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      [...particles].forEach((particle) => particle.kill(particles));
    };
  }, [layout, motion]);

  const pad = FONT_SIZE * 0.06;
  const viewBox = layout
    ? `${layout.x - pad} ${layout.y - pad} ${layout.width + pad * 2} ${layout.height + pad * 2}`
    : `0 ${-FONT_SIZE} ${FONT_SIZE * 4.6} ${FONT_SIZE * 1.1}`;
  const region = layout
    ? { x: layout.x - pad, y: layout.y - pad, width: layout.width + pad * 2, height: layout.height + pad * 2 }
    : undefined;

  return (
    <svg
      ref={svgRef}
      viewBox={viewBox}
      aria-hidden
      className={cn('block h-auto w-full select-none', className)}
      data-active={active ? 'true' : undefined}
      style={{ touchAction: 'pan-y' }}
    >
      <defs>
        <linearGradient id={ids.base} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f2f2f0" stopOpacity="0.17" />
          <stop offset="0.9" stopColor="#f2f2f0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={ids.lit} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9aabff" />
          <stop offset="1" stopColor="#3b5bff" />
        </linearGradient>
        <filter id={ids.filter} filterUnits="userSpaceOnUse" {...region}>
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 30 -7" result="goo" />
        </filter>
        <mask id={ids.mask} maskUnits="userSpaceOnUse" {...region}>
          <g ref={trailRef} filter={`url(#${ids.filter})`} />
        </mask>
      </defs>

      <text
        ref={measureRef}
        x="0"
        y="0"
        fill={`url(#${ids.base})`}
        className="font-pw-display"
        style={{ fontSize: FONT_SIZE, fontWeight: 600, letterSpacing: '-0.06em' }}
      >
        {WORD}
      </text>

      {layout && motion ? (
        <g mask={`url(#${ids.mask})`} fill={`url(#${ids.lit})`}>
          {Array.from(WORD).map((char, index) => (
            <text
              key={index}
              x={layout.xs[index]}
              y="0"
              className="pw-goo-char font-pw-display"
              style={{ fontSize: FONT_SIZE, fontWeight: 600, '--i': index } as CSSProperties}
            >
              {char}
            </text>
          ))}
        </g>
      ) : null}
    </svg>
  );
}
