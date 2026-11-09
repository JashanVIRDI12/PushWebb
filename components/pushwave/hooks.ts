'use client';

import { useCallback, useEffect, useRef, useSyncExternalStore, type RefObject } from 'react';
import { useLenis } from 'lenis/react';
import { gsap } from '@/lib/gsap';

function subscribeMedia(query: string) {
  return (onChange: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  };
}

/** Live media-query match. `serverValue` is what SSR and the first paint assume. */
export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

export const usePrefersReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)', false);
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)', false);

/**
 * Magnetic pull toward the pointer. Applies to `ref` with quickTo (transform
 * only) and only on fine pointers with motion allowed.
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, strength = 0.32) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine || reduced || strength === 0) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      xTo((event.clientX - (rect.left + rect.width / 2)) * strength);
      yTo((event.clientY - (rect.top + rect.height / 2)) * strength);
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)', overwrite: true });
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, fine, reduced, strength]);
}

/**
 * Card hover: the accent border follows the pointer (--mx/--my) and the card
 * lifts slightly toward it. Transform-only; skipped for touch and reduced motion.
 */
export function useCardHover<T extends HTMLElement>(ref: RefObject<T | null>, { lift = 10, pull = 8 } = {}) {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !fine) return;

    const xTo = reduced ? null : gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = reduced ? null : gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
      xTo?.((px - 0.5) * pull);
      yTo?.(-lift + (py - 0.5) * pull);
    };
    const onLeave = () => {
      xTo?.(0);
      yTo?.(0);
    };

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (!reduced) gsap.set(el, { x: 0, y: 0 });
    };
  }, [ref, fine, reduced, lift, pull]);
}

/**
 * Smooth in-page jump through the site's Lenis instance. Lenis reads each
 * section's scroll-margin-top, so the sticky nav never covers the target.
 * Focus moves to the target so keyboard users continue from there.
 */
export function useScrollToHash() {
  const lenis = useLenis();
  return useCallback(
    (hash: string) => {
      const target = document.getElementById(hash.replace(/^#/, ''));
      if (!target) return;
      if (lenis) {
        // Lenis's own anchor handler runs after React's click handler and
        // would replace this eased scroll with its default; go one frame later.
        requestAnimationFrame(() =>
          lenis.scrollTo(target, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) }),
        );
      } else {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    },
    [lenis],
  );
}

/** Stable latest-value ref, for callbacks registered once. */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
