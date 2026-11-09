'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { HERO } from '@/lib/pushwave/content';
import type { MultiplyStage } from './multiply-gl';
import { usePrefersReducedMotion } from '../../hooks';

/** The approved hero subhead, one line per stage of the scene. */
const LINES = HERO.subhead; // One piece of content. / Hundreds of clips. / Millions of opportunities to be seen.

/**
 * A tall section with a sticky stage: scrolling through it plays the
 * product story in WebGL (one clip → an orbit of clips → a field of them)
 * while the three approved lines swap underneath. Uses CSS sticky, not a
 * GSAP pin, so it never shifts the layout of the sections around it.
 */
export function MultiplyScene() {
  const rootRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<HTMLDivElement>(null);
  const stage = useRef<MultiplyStage>({ progress: 0, pointerX: 0, pointerY: 0, visible: false });

  // Build the WebGL scene once the section is within a screen of the viewport.
  useEffect(() => {
    const host = glRef.current;
    const root = rootRef.current;
    if (!host || !root || reduced) return;
    let scene: { dispose: () => void } | null = null;
    let cancelled = false;

    const visibility = new IntersectionObserver(([entry]) => {
      stage.current.visible = entry.isIntersecting;
    });
    visibility.observe(root);

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene) return;
        near.disconnect();
        import('./multiply-gl')
          .then(({ createMultiplyScene }) => {
            if (cancelled) return;
            try {
              scene = createMultiplyScene(host, stage.current);
              root.dataset.gl = 'on';
            } catch {
              // No WebGL: the copy and the CSS backdrop carry the section.
            }
          })
          .catch(() => {});
      },
      { rootMargin: '100% 0px' },
    );
    near.observe(root);

    const onPointer = (event: PointerEvent) => {
      stage.current.pointerX = (event.clientX / window.innerWidth) * 2 - 1;
      stage.current.pointerY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      cancelled = true;
      near.disconnect();
      visibility.disconnect();
      window.removeEventListener('pointermove', onPointer);
      scene?.dispose();
      delete root.dataset.gl;
    };
  }, [reduced]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const lines = gsap.utils.toArray<HTMLElement>('[data-mx-line]', root);
      const fills = gsap.utils.toArray<HTMLElement>('[data-mx-fill]', root);
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        root.dataset.motion = 'on';
        // Refresh after sibling useGSAP contexts finish constructing triggers.
        const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh(true));
        // CSS parks lines 2 and 3 below the mask before hydration; take over from there.
        gsap.set(lines.slice(1), { y: 0, yPercent: 110 });

        const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut', duration: 0.08 } });
        timeline
          .to(lines[0], { yPercent: -110 }, 0.28)
          .to(lines[1], { yPercent: 0 }, 0.3)
          .to(lines[1], { yPercent: -110 }, 0.6)
          .to(lines[2], { yPercent: 0 }, 0.62)
          .set({}, {}, 1);

        ScrollTrigger.create({
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          animation: timeline,
          onUpdate: (self) => {
            stage.current.progress = self.progress;
            const p = self.progress;
            fills.forEach((fill, index) => {
              const local = Math.min(1, Math.max(0, (p - index * 0.32) / 0.3));
              fill.style.transform = `scaleX(${local})`;
            });
          },
        });

        // The stage's frame opens as the section arrives.
        gsap.fromTo(
          stageRef.current,
          { clipPath: 'inset(7% 5% 7% 5% round 40px)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 0px)',
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top bottom', end: 'top top', scrub: true },
          },
        );
        return () => {
          cancelAnimationFrame(refreshFrame);
          delete root.dataset.motion;
        };
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="rw-multiply" aria-labelledby="rw-multiply-title">
      <div ref={stageRef} className="rw-multiply-stage">
        <div ref={glRef} className="rw-multiply-gl" aria-hidden="true" />
        <div className="rw-multiply-fallback" aria-hidden="true">
          <img src="/pushwave/studio-editorial.webp" alt="" loading="lazy" />
          <img src="/pushwebb-assets/generated/video-production.jpg" alt="" loading="lazy" />
          <img src="/pushwebb-assets/photos/mrigank-youtube-play-button.jpg" alt="" loading="lazy" />
        </div>
        <div className="rw-multiply-glow" aria-hidden="true" />

        <div className="rw-multiply-copy">
          <span className="rw-label">
            <span className="rw-dot" /> THE PUSHWAVE EFFECT
          </span>
          <h2 id="rw-multiply-title" className="sr-only">
            {LINES.join(' ')}
          </h2>
          <div className="rw-multiply-lines" aria-hidden="true">
            {LINES.map((line, index) => (
              <p key={line} className="rw-multiply-line" data-mx-line>
                {index === 1 ? <em>{line}</em> : line}
              </p>
            ))}
          </div>
          <ol className="rw-multiply-rail" aria-hidden="true">
            {LINES.map((line, index) => (
              <li key={line}>
                <span className="rw-multiply-rail-label">0{index + 1}</span>
                <span className="rw-multiply-rail-track">
                  <span data-mx-fill className="rw-multiply-rail-fill" />
                </span>
              </li>
            ))}
          </ol>
        </div>
        <span className="rw-multiply-hint" aria-hidden="true">
          ONE SIGNAL → A THOUSAND RIPPLES
        </span>
      </div>
    </section>
  );
}
