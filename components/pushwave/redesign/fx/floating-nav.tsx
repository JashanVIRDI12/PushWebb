'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

/**
 * A compact glass bar that takes over from the in-flow header once the hero
 * is behind you: hidden while you scroll down (the content has the screen),
 * back as soon as you scroll up. A hairline along its foot shows progress.
 */
export function FloatingNav({ brand, cta, links }: { brand: ReactNode; cta: ReactNode; links: [string, string][] }) {
  const [shown, setShown] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const shownRef = useRef(false);

  useLenis(({ scroll, direction, progress }) => {
    const pastHero = scroll > window.innerHeight * 0.9;
    const next = pastHero && direction === -1 ? true : !pastHero || direction === 1 ? false : shownRef.current;
    if (next !== shownRef.current) {
      shownRef.current = next;
      setShown(next);
    }
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
  });

  return (
    <div className={cn('rw-float', shown && 'is-shown')} inert={!shown}>
      <div className="rw-float-inner">
        <a href="#top" aria-label="PUSHWAVE, back to top" className="rw-float-brand">
          {brand}
        </a>
        <nav aria-label="Quick navigation" className="rw-float-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        {cta}
        <span className="rw-float-progress" aria-hidden="true">
          <span ref={progressRef} />
        </span>
      </div>
    </div>
  );
}
