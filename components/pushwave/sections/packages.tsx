'use client';

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Flip } from 'gsap/Flip';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { PACKAGES, type Package, type PackageTrack } from '@/lib/pushwave/content';
import { PREFILL_EVENT, type BuilderPrefill } from '@/lib/pushwave/estimate';
import { CountText } from '../ui/count-text';
import { HoverCard } from '../ui/hover-card';
import { PwButton } from '../ui/pw-button';
import { CheckGlyph } from '../ui/primitives';

gsap.registerPlugin(Flip);

type TrackId = PackageTrack['id'];

/** The middle package of each track is the highlighted one. */
const FEATURED_INDEX = 1;

function PackageCard({ pkg, featured, trackId }: { pkg: Package; featured: boolean; trackId: TrackId }) {
  const id = `pkg-${trackId}-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`;
  return (
    <HoverCard
      as="article"
      aria-labelledby={id}
      featured={featured}
      data-pk-anim
      className={cn(
        // No container-type here: containment would stop the card being a subgrid.
        'grid gap-8 p-6 md:p-8 lg:row-span-6 lg:grid-rows-subgrid lg:gap-y-0',
        featured &&
          '[background:radial-gradient(90%_36%_at_50%_0%,rgb(59_91_255/0.22),transparent_72%),var(--color-pw-slate)] lg:-my-3 lg:py-11',
      )}
    >
      <header className="lg:pb-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-pw-wave-ink">{pkg.tag}</p>
          {featured ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pw-wave px-3 py-1 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgb(59_91_255/0.9)]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-white" />
              Most Popular
            </span>
          ) : null}
        </div>
        <h3 id={id} className="pw-title mt-4 text-pw-ink">
          {pkg.name}
        </h3>
        <p className="mt-1 text-[0.9375rem] text-pw-soft">{pkg.scale}</p>
      </header>

      <div className="border-t border-pw-line pt-6 [container-type:inline-size] lg:pb-8">
        <p className="font-pw-display text-[clamp(2.125rem,12.5cqi,3.5rem)] font-semibold leading-none tracking-[-0.045em] text-pw-ink">
          <CountText value={pkg.price} duration={1.6} />
        </p>
        <p className="mt-3 text-sm text-pw-steel">{pkg.cpm}</p>
      </div>

      <div className="border-t border-pw-line pt-6 lg:pb-8">
        <h4 className="text-sm font-medium text-pw-steel">Included</h4>
        {pkg.includedLead ? <p className="mt-3 text-[0.9375rem] font-medium text-pw-ink">{pkg.includedLead}</p> : null}
        <ul className="mt-4 grid gap-3">
          {pkg.included.map((item) => (
            <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-pw-soft">
              <CheckGlyph className={cn('mt-0.5', featured ? 'text-pw-wave-ink' : 'text-pw-steel')} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-pw-line pt-6 lg:pb-8">
        <h4 className="text-sm font-medium text-pw-steel">Operational Planning</h4>
        <dl className="mt-4 grid gap-3">
          {pkg.planning.map((row) => (
            <div key={row.label} className="grid gap-0.5">
              <dt className="text-xs text-pw-steel">{row.label}</dt>
              <dd className="text-[0.9375rem] font-medium text-pw-ink">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="border-t border-pw-line pt-6 lg:pb-8">
        <h4 className="text-sm font-medium text-pw-steel">Recommended For</h4>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-pw-soft">{pkg.recommendedFor}</p>
      </div>

      <div className="self-end">
        <PwButton cta={pkg.cta} variant={featured ? 'primary' : 'ghost'} block magnetic={false} />
      </div>
    </HoverCard>
  );
}

/**
 * 07–08 — Package breakdowns. One section, two tracks behind a tab switch.
 * Both panels stay in the document (the inactive one `hidden`), so all the
 * copy is indexable. The active pill moves between tabs with GSAP Flip.
 */
export function Packages() {
  const rootRef = useRef<HTMLElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const tabRefs = useRef<Record<TrackId, HTMLButtonElement | null>>({ reach: null, authority: null });
  const [active, setActive] = useState<TrackId>('reach');
  const changed = useRef(false);

  const select = (next: TrackId, focus = false) => {
    if (next === active) return;
    if (pillRef.current) flipState.current = Flip.getState(pillRef.current);
    changed.current = true;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  // A "Choose PUSHWAVE Authority" click elsewhere also turns this section to that track.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const model = (event as CustomEvent<BuilderPrefill>).detail?.model;
      if (model === 'reach' || model === 'authority') setActive(model);
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  // The pill has been re-parented into the new tab by React; animate from where it was.
  useLayoutEffect(() => {
    if (!flipState.current || !pillRef.current) return;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      Flip.from(flipState.current, { duration: 0.7, ease: 'expo.out', targets: pillRef.current });
    }
    flipState.current = null;
  }, [active]);

  // Entrance on first view, and again for whichever track is switched in.
  // Explicit fromTo end values, so a switch mid-animation never strands a
  // panel half-revealed. Cards move on yPercent: their hover lift owns `y`.
  const intro = useRef<gsap.core.Timeline | null>(null);
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const panel = root.querySelector<HTMLElement>(`[data-track="${active}"]`);
      if (!panel) return;
      const words = panel.querySelectorAll('[data-pk-word]');
      const parts = panel.querySelectorAll('[data-pk-anim]');

      // Finish any intro still waiting for the section to scroll into view.
      intro.current?.progress(1).kill();
      intro.current = null;

      const timeline = gsap
        .timeline({ paused: !changed.current })
        .fromTo(words, { yPercent: 115, rotate: 2 }, { yPercent: 0, rotate: 0, duration: 1.05, ease: 'power4.out', stagger: 0.04 }, 0)
        .fromTo(parts, { yPercent: 8, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1.1, ease: 'expo.out', stagger: 0.09 }, 0.12);

      if (!changed.current) {
        intro.current = timeline;
        ScrollTrigger.create({
          trigger: panel,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            if (intro.current === timeline) timeline.play();
          },
        });
      }
    },
    { scope: rootRef, dependencies: [active] },
  );

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    const ids = PACKAGES.map((track) => track.id);
    const index = ids.indexOf(active);
    let next: TrackId | null = null;
    if (event.key === 'ArrowRight') next = ids[(index + 1) % ids.length];
    if (event.key === 'ArrowLeft') next = ids[(index - 1 + ids.length) % ids.length];
    if (event.key === 'Home') next = ids[0];
    if (event.key === 'End') next = ids[ids.length - 1];
    if (!next) return;
    event.preventDefault();
    select(next, true);
  };

  return (
    <section ref={rootRef} id="packages" aria-label="Package breakdowns" className="pw-section">
      <div className="pw-shell">
        <div
          role="tablist"
          aria-label="Campaign model"
          className="relative inline-flex rounded-full bg-pw-graphite p-1.5 shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)]"
          data-reveal
        >
          {PACKAGES.map((track) => {
            const selected = track.id === active;
            return (
              <button
                key={track.id}
                ref={(node) => {
                  tabRefs.current[track.id] = node;
                }}
                id={`tab-${track.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`panel-${track.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(track.id)}
                onKeyDown={onTabKey}
                className={cn(
                  'relative min-h-12 rounded-full px-5 text-[0.9375rem] font-medium transition-colors duration-500 md:px-7',
                  selected ? 'text-white' : 'text-pw-soft hover:text-pw-ink',
                )}
              >
                {selected ? (
                  <span
                    ref={pillRef}
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-pw-wave shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_30px_-10px_rgb(59_91_255/0.9)]"
                  />
                ) : null}
                <span className="relative">{track.tab}</span>
              </button>
            );
          })}
        </div>

        {PACKAGES.map((track) => (
          <div
            key={track.id}
            id={`panel-${track.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${track.id}`}
            data-track={track.id}
            hidden={track.id !== active}
            tabIndex={0}
            className="mt-12 rounded-[8px] md:mt-16"
          >
            <div className="max-w-[62rem]">
              <p className="pw-label">{track.label}</p>
              <h2 className="pw-d2 mt-6">
                <span className="sr-only">{track.headline}</span>
                <span aria-hidden>
                  {track.headline.split(' ').map((word, index, words) => (
                    <span key={index}>
                      <span className="pw-mask">
                        <span data-pk-word className="inline-block">
                          {word}
                        </span>
                      </span>
                      {index < words.length - 1 ? ' ' : null}
                    </span>
                  ))}
                </span>
              </h2>
            </div>

            <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-3 lg:grid-rows-[repeat(6,auto)] lg:items-stretch lg:gap-x-5">
              {track.packages.map((pkg, index) => (
                <PackageCard key={pkg.name} pkg={pkg} trackId={track.id} featured={index === FEATURED_INDEX} />
              ))}
            </div>

            <p className="pw-fine mt-10" data-pk-anim>
              {track.disclaimer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
