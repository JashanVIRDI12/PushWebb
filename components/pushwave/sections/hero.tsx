import { Play } from 'lucide-react';
import { BRAND, HERO } from '@/lib/pushwave/content';
import { ClipFan } from '../wave/clip-fan';
import { PwButton } from '../ui/pw-button';
import { SplitWords, WaveGlyph } from '../ui/primitives';
import { HeroDashboard } from './hero-dashboard';

/**
 * 01 — Hero. Transparent: the fixed WaveStage (WebGL on desktop) shows
 * through. The entrance runs in CSS (.pw-rise / .pw-appear) so the
 * headline paints without waiting for JavaScript.
 */
export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative z-[1]">
      <p className="sr-only">{HERO.visualDescription}</p>
      <div className="pw-shell relative flex flex-col justify-end md:min-h-[100svh] pb-10 pt-[calc(var(--pw-nav-h)+40px)] md:pb-14" data-hero-content>
        <p className="pw-appear flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.8125rem] font-medium text-pw-soft" style={{ '--d': '0s' } as React.CSSProperties}>
          <span className="flex items-center gap-2.5 text-pw-ink">
            <WaveGlyph className="text-pw-wave" />
            {BRAND.byline}
          </span>
          <span aria-hidden className="hidden h-3 w-px bg-pw-line-strong sm:block" />
          <span>{BRAND.descriptor}</span>
        </p>

        <SplitWords
          as="h1"
          id="hero-title"
          text={HERO.headline}
          lines={['Great Content', 'Shouldn’t Go', 'Unnoticed.']}
          className="pw-d1 mt-6 max-w-[14ch] md:mt-8"
          baseDelay={0.05}
          step={0.07}
        />

        <div className="mt-8 grid gap-6 md:mt-10 lg:grid-cols-12 lg:gap-8">
          <p className="pw-title pw-appear text-pw-ink lg:col-span-5" style={{ '--d': '0.45s' } as React.CSSProperties}>
            {HERO.subhead.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <div className="pw-appear space-y-3 lg:col-span-4" style={{ '--d': '0.55s' } as React.CSSProperties}>
            <p className="text-[1.0625rem] leading-relaxed text-pw-soft">{HERO.body[0]}</p>
            <p className="text-[0.9375rem] leading-relaxed text-pw-steel">{HERO.body[1]}</p>
          </div>
        </div>

        <div className="pw-appear mt-10 flex flex-col gap-6 md:flex-row md:items-center md:gap-10" style={{ '--d': '0.7s' } as React.CSSProperties}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <PwButton cta={HERO.primary} />
            <PwButton
              cta={HERO.secondary}
              variant="ghost"
              icon={<Play className="h-3 w-3 translate-x-px fill-current" strokeWidth={0} />}
            />
          </div>
          <div className="text-sm">
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-medium text-pw-ink">
              {HERO.tiers.map((tier, index) => (
                <span key={tier} className="flex items-center gap-3">
                  {index > 0 ? <span aria-hidden className="h-3 w-px bg-pw-line-strong" /> : null}
                  {tier}
                </span>
              ))}
              <span className="text-pw-soft">{HERO.tiersSuffix}</span>
            </p>
            <p className="mt-1 text-pw-steel">{HERO.startingAt}</p>
          </div>
        </div>

        {/* Desktop: the panel floats over the scene. */}
        <div className="pointer-events-none absolute right-12 top-[calc(var(--pw-nav-h)+9vh)] hidden xl:block 2xl:right-16">
          <HeroDashboard className="pointer-events-auto" />
        </div>
      </div>

      {/* Phones: the CSS clip fan replaces the WebGL scene, with the panel over it. */}
      <div className="pw-shell relative xl:hidden">
        <div className="relative h-[420px] md:hidden">
          <div className="absolute inset-0 [background:radial-gradient(60%_50%_at_50%_45%,rgb(59_91_255/0.28),transparent_72%)]" />
          <ClipFan count={7} className="h-full w-full" />
        </div>
        <div className="relative -mt-24 flex justify-center md:mt-0 md:justify-end md:pb-6">
          <HeroDashboard />
        </div>
      </div>

      <div className="pw-shell relative pb-16 pt-6 md:pb-24">
        <dl className="pw-appear grid grid-cols-2 gap-px overflow-hidden rounded-[24px] bg-pw-line shadow-[inset_0_0_0_1px_var(--color-pw-line)] md:grid-cols-5" style={{ '--d': '0.9s' } as React.CSSProperties}>
          {HERO.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`flex flex-col gap-2 bg-[rgb(7_7_10/0.82)] p-5 backdrop-blur-md md:p-6 ${index === HERO.stats.length - 1 ? 'col-span-2 md:col-span-1' : ''}`}
            >
              <dt className="order-2 text-[0.8125rem] leading-snug text-pw-steel">{stat.label}</dt>
              <dd className="order-1 font-pw-display text-[1.5rem] font-semibold leading-none tracking-[-0.03em] text-pw-ink md:text-[1.75rem]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <p className="pw-fine mt-5">{HERO.disclaimer}</p>
      </div>
    </section>
  );
}
