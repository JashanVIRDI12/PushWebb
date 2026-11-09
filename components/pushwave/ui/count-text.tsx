'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { onEnterOnce } from '@/lib/reveal';
import { cn } from '@/lib/utils';

const NUMBER = /\d[\d,]*(?:\.\d+)?/g;
const INR = new Intl.NumberFormat('en-IN');

function formatLike(original: string, value: number) {
  const decimals = original.includes('.') ? original.split('.')[1].length : 0;
  if (decimals) return value.toFixed(decimals);
  const rounded = Math.round(value);
  // en-IN groups like the copy: 1,200 / 10,000 / 12,90,000.
  return original.includes(',') ? INR.format(rounded) : String(rounded);
}

/**
 * Renders a figure like "10M–100M+" or "₹12,90,000" and counts every number
 * in it up from zero the first time it scrolls into view. The final text is
 * laid out invisibly underneath, so the width never changes while counting.
 */
export function CountText({
  value,
  className,
  duration = 1.8,
  delay = 0,
}: {
  value: string;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const liveRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const live = liveRef.current;
    if (!live) return;
    const numbers = value.match(NUMBER);
    if (!numbers || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = numbers.map((n) => Number.parseFloat(n.replace(/,/g, '')));
    const render = (progress: number) => {
      let i = 0;
      live.textContent = value.replace(NUMBER, (match) => formatLike(match, targets[i++] * progress));
    };
    render(0);

    let tween: gsap.core.Tween | undefined;
    const stop = onEnterOnce(live, () => {
      const state = { p: 0 };
      tween = gsap.to(state, {
        p: 1,
        duration,
        delay,
        ease: 'expo.out',
        onUpdate: () => render(state.p),
      });
    }, '0px 0px -12% 0px');

    return () => {
      stop();
      tween?.kill();
      live.textContent = value;
    };
  }, [value, duration, delay]);

  return (
    <span className={cn('relative inline-grid', className)}>
      <span className="sr-only">{value}</span>
      <span aria-hidden className="invisible [grid-area:1/1]">
        {value}
      </span>
      <span aria-hidden ref={liveRef} className="[grid-area:1/1]">
        {value}
      </span>
    </span>
  );
}
