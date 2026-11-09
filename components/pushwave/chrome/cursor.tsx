'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useFinePointer, usePrefersReducedMotion } from '../hooks';

type CursorState = 'default' | 'hover' | 'play' | 'drag' | 'view';

const LABELS: Partial<Record<CursorState, string>> = { play: 'Play', drag: 'Drag', view: 'View' };

const INTERACTIVE = 'a, button, [role="tab"], label, summary, [data-cursor="hover"]';
const TEXT_ENTRY = 'input:not([type="radio"]):not([type="checkbox"]), textarea, select';

/**
 * Dot + ring cursor. The dot tracks the pointer exactly, so the real hit
 * point is never in doubt; the ring trails, grows over controls and shows
 * "Play" over videos ([data-cursor="play"]), "Drag" over carousels and
 * "View" over linked imagery ([data-cursor="view"]).
 * Only on fine pointers with motion allowed; otherwise the native cursor stays.
 */
export function Cursor() {
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const enabled = fine && !reduced;

  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.pw');
    if (!enabled || !page || !dotRef.current || !ringRef.current) return;
    page.dataset.customCursor = 'on';

    const dotX = gsap.quickTo(dotRef.current, 'x', { duration: 0.08, ease: 'none' });
    const dotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.08, ease: 'none' });
    const ringX = gsap.quickTo(ringRef.current, 'x', { duration: 0.5, ease: 'power3.out' });
    const ringY = gsap.quickTo(ringRef.current, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      setVisible(true);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;
      if (target.closest(TEXT_ENTRY)) {
        setVisible(false);
        return;
      }
      setVisible(true);
      const tagged = target.closest<HTMLElement>('[data-cursor]');
      const kind = tagged?.dataset.cursor;
      if (kind === 'play' || kind === 'drag' || kind === 'view') setState(kind);
      else if (target.closest(INTERACTIVE)) setState('hover');
      else setState('default');
    };

    const onLeaveWindow = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeaveWindow);
    return () => {
      delete page.dataset.customCursor;
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeaveWindow);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div ref={rootRef} className="pw-cursor" data-state={state} data-visible={visible} aria-hidden>
      <div ref={ringRef} className="pw-cursor__ring">
        <div className="pw-cursor__ring-inner">
          <span className="pw-cursor__label">{LABELS[state] ?? ''}</span>
        </div>
      </div>
      <div ref={dotRef} className="pw-cursor__dot" />
    </div>
  );
}
