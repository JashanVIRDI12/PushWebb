'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { PROBLEM } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { MiniClip } from '../wave/clip-fan';

const ECHOES = 5;

/** A single clip fanning into `count` clips: the section's one → many idea. */
function MultiplyGlyph({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-3" aria-hidden>
      <MiniClip className="w-7 rounded-[6px]" progress={60} />
      <svg viewBox="0 0 24 8" className="h-2 w-6 text-pw-steel">
        <path d="M0 4h21M18 1l3 3-3 3" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex -space-x-3">
        {Array.from({ length: count }, (_, i) => (
          <MiniClip
            key={i}
            accent={i === count - 1}
            progress={20 + i * 15}
            className="w-7 rounded-[6px]"
            style={{ transform: `rotate(${(i - (count - 1) / 2) * 6}deg)` }}
          />
        ))}
      </div>
    </div>
  );
}

/** 03 — The problem: one upload, one audience, one chance. Then the turn. */
export function Problem() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        // The three lines light up as they're read.
        gsap.utils.toArray<HTMLElement>('[data-one]').forEach((line) => {
          gsap.fromTo(
            line,
            { opacity: 0.14, xPercent: -4 },
            {
              opacity: 1,
              xPercent: 0,
              ease: 'none',
              scrollTrigger: { trigger: line, start: 'top 88%', end: 'top 48%', scrub: true },
            },
          );
        });

        // The turn headline multiplies into echoes as it scrolls through.
        const echoes = gsap.utils.toArray<HTMLElement>('[data-echo]');
        gsap.fromTo(
          echoes,
          { yPercent: 0, opacity: 0 },
          {
            yPercent: (index) => (index + 1) * 16,
            opacity: (index) => 0.5 - index * 0.08,
            ease: 'none',
            scrollTrigger: { trigger: '[data-turn]', start: 'top 80%', end: 'bottom 30%', scrub: true },
          },
        );
      });
      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="problem" aria-labelledby="problem-title" className="pw-section">
      <div className="pw-shell">
        <p className="pw-label" data-reveal>
          {PROBLEM.label}
        </p>
        <div className="mt-6 grid gap-10 lg:grid-cols-12">
          <h2 id="problem-title" className="pw-d2 lg:col-span-7" data-split>
            {PROBLEM.headline}
          </h2>
          <div className="space-y-5 lg:col-span-4 lg:col-start-9 lg:pt-3" data-reveal-stagger>
            {PROBLEM.setup.map((paragraph) => (
              <p key={paragraph} className="pw-lead">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-24 md:mt-36">
          {PROBLEM.ones.map((line) => (
            <p key={line} data-one className="pw-d1 text-pw-ink [&:not(:first-child)]:mt-2">
              {line}
            </p>
          ))}
          <p className="pw-lead mt-12 max-w-[44ch] md:ml-[42%]" data-reveal>
            {PROBLEM.aftermath}
          </p>
        </div>

        <div data-turn className="relative mt-24 overflow-hidden rounded-[32px] bg-pw-graphite p-6 shadow-[inset_0_0_0_1px_var(--color-pw-line)] md:mt-36 md:rounded-[40px] md:p-12 lg:p-16">
          <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_70%_at_85%_0%,rgb(59_91_255/0.2),transparent_70%)]" />

          <div className="relative">
            <h3 className="pw-d2 relative max-w-[18ch]">
              <span className="relative z-[1]">{PROBLEM.turnHeadline}</span>
              {Array.from({ length: ECHOES }, (_, index) => (
                <span
                  key={index}
                  data-echo
                  aria-hidden
                  className="pointer-events-none absolute inset-0 text-transparent opacity-0 [-webkit-text-stroke:1px_rgb(154_171_255/0.55)]"
                >
                  {PROBLEM.turnHeadline}
                </span>
              ))}
            </h3>
          </div>

          <ul className="relative mt-16 grid gap-px overflow-hidden rounded-[24px] bg-pw-line md:mt-24 md:grid-cols-3" data-reveal-stagger>
            {PROBLEM.turn.map((item, index) => (
              <li key={item} className="flex flex-col gap-8 bg-pw-graphite p-6 md:p-8">
                <MultiplyGlyph count={[5, 3, 4][index]} />
                <p className="text-[1.0625rem] leading-relaxed text-pw-soft">{item}</p>
              </li>
            ))}
          </ul>

          <div className="relative mt-16 grid gap-8 md:mt-20 lg:grid-cols-12 lg:items-end">
            <p className="pw-lead lg:col-span-6">{PROBLEM.resolution[0]}</p>
            <div className="flex flex-col items-start gap-6 lg:col-span-5 lg:col-start-8">
              <p className="pw-d3">{PROBLEM.resolution[1]}</p>
              <PwButton cta={PROBLEM.cta} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
