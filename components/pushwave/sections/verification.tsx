import { ChartColumn, Eye, LifeBuoy, ScanEye, Timer, Users, Wallet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VERIFICATION } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { SectionIntro, WaveGlyph } from '../ui/primitives';

type ItemId = (typeof VERIFICATION.items)[number]['id'];

const ICONS: Record<ItemId, typeof Eye> = {
  eligible: Eye,
  publishers: Users,
  window: Timer,
  budget: Wallet,
  reporting: ChartColumn,
  fraud: ScanEye,
  shortfall: LifeBuoy,
};

/** 14 — View verification and performance protection. */
export function Verification() {
  return (
    <section id="verification" aria-labelledby="verification-title" className="pw-section">
      <div className="pw-shell">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--pw-nav-h)+48px)]">
              <SectionIntro
                id="verification-title"
                label={VERIFICATION.label}
                headline={VERIFICATION.headline}
                headlineClassName="text-[clamp(2.375rem,1.2rem+3.4vw,4.75rem)]"
                lead={<p>{VERIFICATION.intro}</p>}
              />
              <div className="mt-10" data-reveal>
                <PwButton cta={VERIFICATION.cta} />
              </div>
            </div>
          </div>

          <ul className="grid gap-px overflow-hidden rounded-[28px] bg-pw-line shadow-[inset_0_0_0_1px_var(--color-pw-line)] sm:grid-cols-2 lg:col-span-7" data-reveal-stagger>
            {VERIFICATION.items.map((item, index) => {
              const Icon = ICONS[item.id];
              const wide = index === VERIFICATION.items.length - 1;
              return (
                <li
                  key={item.id}
                  className={cn(
                    'group/ver relative flex flex-col gap-8 bg-pw-void p-6 transition-colors duration-500 hover:bg-pw-graphite md:p-8',
                    wide && 'sm:col-span-2 sm:flex-row sm:items-start sm:gap-10',
                  )}
                >
                  <span
                    aria-hidden
                    className="grid h-12 w-12 flex-none place-items-center rounded-2xl text-pw-wave-ink shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-[background-color,color,box-shadow] duration-500 group-hover/ver:bg-pw-wave group-hover/ver:text-white group-hover/ver:shadow-[0_10px_30px_-10px_rgb(59_91_255/0.9)]"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <h3 className="pw-title text-pw-ink">{item.title}</h3>
                    <p className="mt-3 max-w-[52ch] text-[0.9375rem] leading-relaxed text-pw-soft">{item.copy}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* The candid part, set apart on a light panel. */}
        <div
          className="relative mt-24 overflow-hidden rounded-[32px] bg-pw-ink p-6 text-pw-void md:mt-36 md:rounded-[40px] md:p-12 lg:p-16"
          data-reveal
        >
          <WaveGlyph className="absolute right-6 top-6 h-6 w-12 text-pw-wave md:right-12 md:top-12" />
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <h3 className="pw-d2 max-w-[10ch] lg:col-span-6">{VERIFICATION.honestyTitle}</h3>
            <div className="space-y-6 lg:col-span-6">
              <p className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug text-[#2a2a33]">{VERIFICATION.honesty[0]}</p>
              <p className="font-pw-display text-[clamp(1.375rem,1.1rem+1vw,2rem)] font-medium leading-tight tracking-[-0.02em] text-[#1f36c7]">
                {VERIFICATION.honesty[1]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
