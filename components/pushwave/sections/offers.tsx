import { cn } from '@/lib/utils';
import { OFFERS } from '@/lib/pushwave/content';
import { HoverCard } from '../ui/hover-card';
import { PwButton } from '../ui/pw-button';
import { CheckGlyph, SectionIntro } from '../ui/primitives';

/**
 * 06 — Two strategic offers. On desktop both panels share one subgrid, so
 * every row (audience, inclusions, prices, upgrades) lines up across them
 * and reads as a comparison.
 */
export function Offers() {
  return (
    <section id="offers" aria-labelledby="offers-title" className="pw-section">
      <div className="pw-shell">
        <SectionIntro id="offers-title" label={OFFERS.label} headline={OFFERS.headline} />

        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-2 lg:grid-rows-[repeat(7,auto)] lg:gap-x-6 lg:gap-y-0">
          {OFFERS.offers.map((offer) => {
            const authority = offer.id === 'authority';
            return (
              <HoverCard
                key={offer.id}
                as="article"
                aria-labelledby={`offer-${offer.id}`}
                className={cn(
                  'grid gap-8 overflow-hidden p-6 md:p-10 lg:row-span-7 lg:grid-rows-subgrid lg:gap-y-0',
                  authority && '[background:radial-gradient(80%_40%_at_100%_0%,rgb(59_91_255/0.18),transparent_70%),var(--color-pw-graphite)]',
                )}
              >
                <header className="lg:pb-10">
                  <p className="text-sm font-medium text-pw-wave-ink">{offer.tag}</p>
                  <h3 id={`offer-${offer.id}`} className="mt-3 text-[1.0625rem] font-medium text-pw-soft">
                    {offer.name}
                  </h3>
                  <p className="pw-d3 mt-4 text-pw-ink">{offer.headline}</p>
                  <p className="mt-4 text-[1.0625rem] font-medium text-pw-ink">{offer.audience}</p>
                </header>

                <p className="text-[0.9375rem] leading-relaxed text-pw-soft lg:pb-10">{offer.description}</p>

                <div className="border-t border-pw-line pt-6 lg:pb-10">
                  <h4 className="text-sm font-medium text-pw-steel">{offer.perfectForTitle}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-pw-ink">{offer.perfectFor}</p>
                </div>

                <div className="border-t border-pw-line pt-6 lg:pb-10">
                  <h4 className="text-sm font-medium text-pw-steel">{offer.includedTitle}</h4>
                  <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                    {offer.included.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-snug text-pw-soft">
                        <CheckGlyph className="mt-0.5 text-pw-wave-ink" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-pw-line pt-6 lg:pb-10">
                  <h4 className="text-sm font-medium text-pw-steel">{offer.optionsTitle}</h4>
                  <dl className="mt-4 divide-y divide-pw-line">
                    {offer.options.map((option) => (
                      <div key={option.label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-[0.9375rem] text-pw-soft">{option.label}</dt>
                        <dd className="font-pw-display text-[1.5rem] font-semibold tracking-[-0.03em] text-pw-ink md:text-[1.75rem]">
                          {option.price}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="pw-fine mt-3">{offer.cpmNote}</p>
                </div>

                <div className="border-t border-pw-line pt-6 lg:pb-10">
                  <h4 className="text-sm font-medium text-pw-steel">{offer.upgradesTitle}</h4>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-pw-soft">{offer.upgrades}</p>
                </div>

                <div className="self-end">
                  <PwButton cta={offer.cta} variant={authority ? 'primary' : 'ink'} />
                </div>
              </HoverCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
