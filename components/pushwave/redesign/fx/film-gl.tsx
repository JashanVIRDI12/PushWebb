'use client';

import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks';

/**
 * Drop inside `.rw-film-track`. On capable desktops it re-draws the strip's
 * photographs in WebGL (see film-gl-scene.ts) and hides the DOM copies;
 * everywhere else it renders nothing visible and the plain images stay.
 */
export function FilmGL() {
  const hostRef = useRef<HTMLDivElement>(null);
  const capable = useMediaQuery('(hover: hover) and (pointer: fine) and (min-width: 900px) and (prefers-reduced-motion: no-preference)');

  useEffect(() => {
    const host = hostRef.current;
    const track = host?.parentElement;
    if (!host || !track) return;
    if (!capable) return;

    let scene: { dispose: () => void } | null = null;
    let cancelled = false;
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        import('./film-gl-scene')
          .then(({ createFilmScene }) => {
            if (cancelled) return;
            try {
              const created = createFilmScene(track, host);
              scene = created;
              created.ready.then((ready) => {
                if (!cancelled && ready) track.classList.add('rw-film-track--gl');
              });
            } catch {
              // No WebGL: keep the DOM images.
            }
          })
          .catch(() => {});
      },
      { rootMargin: '60% 0px' },
    );
    near.observe(track);

    return () => {
      cancelled = true;
      near.disconnect();
      track.classList.remove('rw-film-track--gl');
      scene?.dispose();
    };
  }, [capable]);

  return <div ref={hostRef} className="rw-film-gl" aria-hidden="true" />;
}
