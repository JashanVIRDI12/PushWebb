import { NUMBERS } from '@/lib/pushwave/content';
import { CountText } from '../ui/count-text';
import { PwButton } from '../ui/pw-button';
import { SectionIntro, WaveGlyph } from '../ui/primitives';

function PlatformMarquee() {
  // Repeated so the loop has no gap; the track moves by exactly half.
  const run = [...NUMBERS.platforms, ...NUMBERS.platforms, ...NUMBERS.platforms];
  return (
    <div className="pw-marquee border-y border-pw-line py-6 md:py-8" aria-hidden>
      <div className="pw-marquee__track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {run.map((platform, index) => (
              <span key={`${copy}-${index}`} className="flex items-center">
                <span className="whitespace-nowrap px-8 font-pw-display text-[clamp(1.75rem,1.2rem+2.4vw,3.5rem)] font-medium leading-none tracking-[-0.03em] text-pw-soft md:px-12">
                  {platform}
                </span>
                <WaveGlyph className="h-5 w-10 text-pw-wave" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** 05 — The numbers that matter. */
export function Numbers() {
  return (
    <section id="numbers" aria-labelledby="numbers-title" className="pw-section relative bg-transparent">
      <div data-wipe className="absolute inset-0 -z-[1] bg-pw-graphite" aria-hidden />
      <div className="pw-shell">
        <SectionIntro id="numbers-title" label={NUMBERS.label} headline={NUMBERS.headline} />

        <dl className="mt-16 grid gap-px overflow-hidden rounded-[28px] bg-pw-line shadow-[inset_0_0_0_1px_var(--color-pw-line)] sm:grid-cols-2 md:mt-24 lg:grid-cols-3" data-reveal-stagger>
          {NUMBERS.stats.map((stat, index) => (
            <div key={stat.label} className="flex min-h-[220px] flex-col justify-between gap-10 bg-pw-graphite p-6 md:min-h-[260px] md:p-8">
              <dt className="order-2 max-w-[30ch] text-[0.9375rem] leading-snug text-pw-soft">{stat.label}</dt>
              <dd className="order-1 font-pw-display text-[clamp(2.5rem,1.6rem+3.4vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-pw-ink">
                <CountText value={stat.value} delay={index * 0.08} />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-16 md:mt-24">
        <p className="sr-only">{NUMBERS.platforms.join(', ')}</p>
        <PlatformMarquee />
      </div>

      <div className="pw-shell mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
        <h3 className="pw-d3 lg:col-span-5" data-reveal>
          {NUMBERS.whyTitle}
        </h3>
        <div className="space-y-5 lg:col-span-6 lg:col-start-7" data-reveal-stagger>
          {NUMBERS.why.map((paragraph) => (
            <p key={paragraph} className="pw-lead">
              {paragraph}
            </p>
          ))}
          <div className="pt-4">
            <PwButton cta={NUMBERS.cta} variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}
