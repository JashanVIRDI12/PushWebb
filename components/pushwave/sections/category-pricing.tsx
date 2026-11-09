'use client';

import { useState } from 'react';
import { ChartLine, Clapperboard, Gamepad2, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORY_PRICING } from '@/lib/pushwave/content';
import { HoverCard } from '../ui/hover-card';
import { PwButton } from '../ui/pw-button';
import { SectionIntro } from '../ui/primitives';

type CategoryId = (typeof CATEGORY_PRICING.categories)[number]['id'];

const ICONS: Record<CategoryId, typeof Mic> = {
  entertainment: Clapperboard,
  gaming: Gamepad2,
  podcasts: Mic,
  finance: ChartLine,
};

/** The meter's full width. The published rates sit inside it; the custom tier runs past them. */
const SCALE = 220;

function RateMeter({ rate }: { rate: string }) {
  const value = Number.parseInt(rate.replace(/[^\d]/g, ''), 10);
  const numeric = Number.isFinite(value) && rate.includes('₹');
  return (
    <div className="relative h-1.5 rounded-full bg-[rgb(242_242_240/0.08)]" aria-hidden>
      {numeric ? (
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-pw-wave shadow-[0_0_14px_rgb(59_91_255/0.8)] transition-[width] duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${(value / SCALE) * 100}%` }}
        />
      ) : (
        <>
          <span className="absolute inset-y-0 left-0 w-[81%] rounded-full bg-pw-wave/70" />
          <span className="absolute inset-y-0 left-[81%] right-0 rounded-r-full border border-dashed border-pw-wave-ink" />
        </>
      )}
    </div>
  );
}

/**
 * 12 — Content-specific pricing. Choosing a category (optional) carries it
 * into the builder through the section's quote button.
 */
export function CategoryPricing() {
  const [selected, setSelected] = useState<CategoryId | null>(null);
  const prefill = CATEGORY_PRICING.categories.find((category) => category.id === selected)?.prefill;

  return (
    <section id="categories" aria-labelledby="categories-title" className="pw-section relative bg-transparent">
      <div data-wipe className="absolute inset-0 -z-[1] bg-pw-graphite" aria-hidden />
      <div className="pw-shell">
        <SectionIntro id="categories-title" label={CATEGORY_PRICING.label} headline={CATEGORY_PRICING.headline} lead={<p>{CATEGORY_PRICING.intro}</p>} />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 lg:grid-cols-4" data-reveal>
          {CATEGORY_PRICING.categories.map((category) => {
            const Icon = ICONS[category.id];
            const isSelected = selected === category.id;
            const custom = !category.rate.includes('₹');
            return (
              <HoverCard
                key={category.id}
                as="li"
                featured={isSelected}
                lift={6}
                className={cn(
                  'group/cat flex min-h-[420px] flex-col rounded-[24px] bg-pw-void p-6 transition-[background-color] duration-500 md:p-7',
                  isSelected && 'bg-pw-slate',
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    aria-hidden
                    className={cn(
                      'grid h-14 w-14 place-items-center rounded-2xl shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-[background-color,color,box-shadow] duration-500',
                      isSelected ? 'bg-pw-wave text-white shadow-[0_10px_30px_-10px_rgb(59_91_255/0.9)]' : 'text-pw-wave-ink group-hover/cat:text-pw-ink',
                    )}
                  >
                    <Icon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      'grid h-6 w-6 place-items-center rounded-full shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-[background-color,box-shadow] duration-300',
                      isSelected && 'bg-pw-wave shadow-none',
                    )}
                  >
                    <svg viewBox="0 0 12 12" className={cn('h-3 w-3 text-white transition-opacity', isSelected ? 'opacity-100' : 'opacity-0')}>
                      <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>

                <h3 className="pw-title mt-8 text-pw-ink">
                  {/* The whole card is the toggle; the button's box is stretched over it. */}
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelected(isSelected ? null : category.id)}
                    className="text-left after:absolute after:inset-0 after:rounded-[24px] after:content-['']"
                  >
                    {category.name}
                  </button>
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-pw-soft">{category.copy}</p>

                <div className="mt-auto pt-10">
                  <p className="text-pw-ink">
                    {category.lead ? <span className="block text-sm text-pw-steel">{category.lead}</span> : null}
                    <span
                      className={cn(
                        'mt-1 block font-pw-display font-semibold leading-none tracking-[-0.04em]',
                        custom ? 'text-[1.625rem] leading-[1.1] text-pw-wave-ink' : 'text-[clamp(2.5rem,1.9rem+1.6vw,3.25rem)]',
                      )}
                    >
                      {category.rate}
                    </span>
                    {category.tail ? <span className="mt-2 block text-sm text-pw-soft">{category.tail}</span> : null}
                  </p>
                  <div className="mt-6">
                    <RateMeter rate={category.rate} />
                  </div>
                </div>
              </HoverCard>
            );
          })}
        </ul>

        <div className="mt-16 grid gap-10 border-t border-pw-line pt-12 md:mt-24 lg:grid-cols-12">
          <h3 className="font-pw-sans text-sm font-medium tracking-normal text-pw-steel lg:col-span-3" data-reveal>
            {CATEGORY_PRICING.dependsTitle}
          </h3>
          <p className="pw-d3 text-pw-ink lg:col-span-9" data-reveal>
            {CATEGORY_PRICING.depends}
          </p>
          <div className="lg:col-span-9 lg:col-start-4" data-reveal>
            <PwButton cta={{ ...CATEGORY_PRICING.cta, prefill }} />
          </div>
        </div>
      </div>
    </section>
  );
}
