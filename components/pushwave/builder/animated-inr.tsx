'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { formatINR } from '@/lib/pushwave/estimate';

/**
 * An INR figure that counts from its previous value to the new one each
 * time `value` changes, with a brief accent flash. React renders the first
 * value only; after that the tween owns the text node.
 */
export function AnimatedINR({ value, className }: { value: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);
  const [initial] = useState(() => formatINR(value));

  useEffect(() => {
    const el = ref.current;
    if (!el || shown.current === value) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      shown.current = value;
      el.textContent = formatINR(value);
      return;
    }
    const state = { v: shown.current };
    const count = gsap.to(state, {
      v: value,
      duration: 1.1,
      ease: 'expo.out',
      onUpdate: () => {
        shown.current = state.v;
        el.textContent = formatINR(state.v);
      },
      onComplete: () => {
        shown.current = value;
      },
    });
    const flash = gsap.from(el, { color: '#9aabff', duration: 1.2, ease: 'power2.out', clearProps: 'color' });
    return () => {
      count.kill();
      flash.kill();
    };
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {initial}
    </span>
  );
}
