import { EXAMPLES } from '@/lib/pushwave/content';
import { CountText } from '../ui/count-text';
import { HoverCard } from '../ui/hover-card';
import { PwButton } from '../ui/pw-button';
import { FinePrint, SectionIntro } from '../ui/primitives';

/** A tear line with notches, like the stub of a ticket. */
function Perforation() {
  return (
    <div aria-hidden className="relative -mx-6 my-8 h-px md:-mx-10">
      <span className="absolute -left-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-pw-graphite shadow-[inset_-1px_0_0_var(--color-pw-line)]" />
      <span className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-pw-graphite shadow-[inset_1px_0_0_var(--color-pw-line)]" />
      <span className="absolute inset-x-6 top-0 border-t border-dashed border-pw-line-strong" />
    </div>
  );
}

/** 15 — Campaign examples: two configurations, itemised like a quote. */
export function Examples() {
  return (
    <section id="examples" aria-labelledby="examples-title" className="pw-section relative bg-transparent">
      <div data-wipe className="absolute inset-0 -z-[1] bg-pw-graphite" aria-hidden />
      <div className="pw-shell">
        <SectionIntro id="examples-title" label={EXAMPLES.label} headline={EXAMPLES.headline} />

        {/* Both cards share one subgrid, so tables, totals and notes line up. */}
        <div className="mt-16 grid gap-6 md:mt-24 lg:grid-cols-2 lg:grid-rows-[repeat(6,auto)] lg:gap-y-0" data-reveal>
          {EXAMPLES.examples.map((example) => {
            const id = `example-${example.tag.toLowerCase().replace(/\s+/g, '-')}`;
            return (
              <HoverCard key={example.tag} as="article" aria-labelledby={id} lift={6} className="flex flex-col bg-pw-void p-6 md:p-10 lg:row-span-6 lg:grid lg:grid-rows-subgrid lg:gap-y-0">
                <header>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-pw-wave-ink">{example.tag}</p>
                    <span className="pw-todo">Illustrative</span>
                  </div>
                  <h3 id={id} className="pw-d3 mt-5 text-pw-ink">
                    {example.title}
                  </h3>
                  <p className="mt-5 text-[0.9375rem] leading-relaxed text-pw-soft">
                    <span className="mr-2 font-medium text-pw-ink">{EXAMPLES.goalLabel}:</span>
                    {example.goal}
                  </p>
                </header>

                <table className="mt-8 w-full self-start border-collapse text-[0.9375rem]">
                  <caption className="sr-only">{`${example.title}: campaign breakdown`}</caption>
                  <tbody>
                    {example.rows.map((row) => (
                      <tr key={row.label} className="border-b border-pw-line last:border-b-0">
                        <th scope="row" className="py-3.5 pr-4 text-left font-normal text-pw-soft">
                          {row.label}
                        </th>
                        <td className="py-3.5 text-right font-medium text-pw-ink">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <Perforation />

                <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 self-start">
                  <p className="text-sm font-medium text-pw-steel">{example.totalLabel}</p>
                  <p className="font-pw-display text-[clamp(2.5rem,1.8rem+2.6vw,4rem)] font-semibold leading-none tracking-[-0.045em] text-pw-ink">
                    <CountText value={example.total} />
                  </p>
                </div>

                <dl className="mt-10 grid gap-6 border-t border-pw-line pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-pw-steel">{EXAMPLES.creativeLabel}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-pw-soft">{example.creative}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-pw-steel">{EXAMPLES.setupLabel}</dt>
                    <dd className="mt-2 text-[0.9375rem] leading-relaxed text-pw-soft">{example.setup}</dd>
                  </div>
                </dl>

                <div className="mt-auto self-end pt-10">
                  <PwButton cta={example.cta} variant="ghost" />
                </div>
              </HoverCard>
            );
          })}
        </div>

        <FinePrint className="mt-8">{EXAMPLES.note}</FinePrint>
      </div>
    </section>
  );
}
