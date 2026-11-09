'use client';

import { useId, useRef } from 'react';
import { Clock } from 'lucide-react';
import { gsap, useGSAP } from '@/lib/gsap';
import { PRODUCTION } from '@/lib/pushwave/content';
import { AccordionItem } from '../ui/accordion';
import { CountText } from '../ui/count-text';
import { HoverCard } from '../ui/hover-card';
import { PwButton } from '../ui/pw-button';
import { CheckGlyph, SectionIntro } from '../ui/primitives';

const COLUMNS = 30;
const ROWS = 10;
const MAX = COLUMNS * ROWS; // the largest standard pack: 300 clips
const CELL_W = 9;
const CELL_H = 16;
const GAP = 3;

/**
 * 300 tiny 9:16 frames, with the pack's share lit from the left: 100 is a
 * third of the field, 300 fills it. Two SVG patterns, not 300 nodes.
 */
function ClipMatrix({ count }: { count: number }) {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const dim = `pw-matrix-dim-${raw}`;
  const lit = `pw-matrix-lit-${raw}`;
  const width = COLUMNS * (CELL_W + GAP) - GAP;
  const height = ROWS * (CELL_H + GAP) - GAP;
  const litWidth = (Math.min(count, MAX) / MAX) * COLUMNS * (CELL_W + GAP);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="block h-auto w-full" aria-hidden>
      <defs>
        <pattern id={dim} width={CELL_W + GAP} height={CELL_H + GAP} patternUnits="userSpaceOnUse">
          <rect width={CELL_W} height={CELL_H} rx="2" fill="rgb(242 242 240 / 0.08)" />
        </pattern>
        <pattern id={lit} width={CELL_W + GAP} height={CELL_H + GAP} patternUnits="userSpaceOnUse">
          <rect width={CELL_W} height={CELL_H} rx="2" fill="#3b5bff" />
          <rect x="2" y={CELL_H - 4} width={CELL_W - 4} height="1.2" rx="0.6" fill="rgb(255 255 255 / 0.7)" />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${dim})`} />
      <rect data-matrix-fill width={litWidth} height={height} fill={`url(#${lit})`} style={{ transformOrigin: '0 0' }} />
    </svg>
  );
}

/** 09 — Professional clipping production: three packs and the terms. */
export function Production() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<SVGRectElement>('[data-matrix-fill]').forEach((fill, index) => {
          gsap.from(fill, {
            scaleX: 0,
            duration: 1.6,
            delay: index * 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: fill.ownerSVGElement, start: 'top 88%', once: true },
          });
        });
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="production" aria-labelledby="production-title" className="pw-section relative bg-transparent">
      <div data-wipe className="absolute inset-0 -z-[1] bg-pw-graphite" aria-hidden />
      <div className="pw-shell">
        <SectionIntro
          id="production-title"
          label={PRODUCTION.label}
          headline={PRODUCTION.headline}
          lead={
            <div className="space-y-4">
              <p>{PRODUCTION.intro[0]}</p>
              <p className="text-pw-ink">{PRODUCTION.intro[1]}</p>
            </div>
          }
        />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-3 lg:grid-rows-[repeat(6,auto)] lg:gap-x-5 lg:gap-y-0" data-reveal>
          {PRODUCTION.packs.map((pack) => (
            <HoverCard
              key={pack.name}
              as="article"
              aria-labelledby={`pack-${pack.count}`}
              className="grid gap-8 bg-pw-void p-6 md:p-8 lg:row-span-6 lg:grid-rows-subgrid lg:gap-y-0"
            >
              <header className="lg:pb-8">
                <p className="text-sm font-medium text-pw-wave-ink">{pack.name}</p>
                <h3 id={`pack-${pack.count}`} className="mt-4 font-pw-display text-[clamp(2.5rem,1.8rem+2.6vw,4rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-pw-ink">
                  <CountText value={pack.title} duration={1.4} />
                </h3>
              </header>

              <div className="lg:pb-8">
                <ClipMatrix count={pack.count} />
              </div>

              <div className="flex items-baseline justify-between gap-4 border-t border-pw-line pt-6 lg:pb-8">
                <p className="font-pw-display text-[2rem] font-semibold leading-none tracking-[-0.04em] text-pw-ink">{pack.price}</p>
                <p className="text-sm text-pw-steel">{pack.perClip}</p>
              </div>

              <div className="border-t border-pw-line pt-6 lg:pb-8">
                <h4 className="text-sm font-medium text-pw-steel">Included</h4>
                {pack.includedLead ? <p className="mt-3 text-[0.9375rem] font-medium text-pw-ink">{pack.includedLead}</p> : null}
                <ul className="mt-4 grid gap-3">
                  {pack.included.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-pw-soft">
                      <CheckGlyph className="mt-0.5 text-pw-wave-ink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="flex gap-3 rounded-2xl bg-[rgb(59_91_255/0.08)] p-4 text-sm leading-snug text-pw-ink shadow-[inset_0_0_0_1px_rgb(59_91_255/0.25)] lg:mb-8">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 flex-none text-pw-wave-ink" strokeWidth={1.75} />
                {pack.batch}
              </p>

              <div className="self-end">
                <PwButton cta={pack.cta} variant="ghost" block magnetic={false} />
              </div>
            </HoverCard>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 lg:grid-cols-12">
          <div className="border-y border-pw-line lg:col-span-8" data-reveal>
            <AccordionItem title={<span className="pw-title text-pw-ink">{PRODUCTION.termsTitle}</span>}>
              <p className="text-[0.9375rem] font-medium text-pw-ink">{PRODUCTION.termsLead}</p>
              <ol className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {PRODUCTION.terms.map((term, index) => (
                  <li key={term} className="flex gap-4 text-[0.9375rem] leading-snug text-pw-soft">
                    <span aria-hidden className="w-5 flex-none font-pw-display text-sm text-pw-steel">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {term}
                  </li>
                ))}
              </ol>
            </AccordionItem>
          </div>
          <p className="pw-fine self-center lg:col-span-4 lg:pl-6" data-reveal>
            {PRODUCTION.termsNote}
          </p>
        </div>
      </div>
    </section>
  );
}
