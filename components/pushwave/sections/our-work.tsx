import { Quote } from 'lucide-react';
import { OUR_WORK } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { PlaceholderSlot, SectionIntro } from '../ui/primitives';
import { WorkCarousel } from './work-carousel';

const [METRICS, LOGOS, TESTIMONIALS, CAMPAIGN_DATA] = OUR_WORK.trust;

/**
 * 17 — Our content experience. Every asset here is a labelled empty slot
 * until approved material exists:
 *   TODO(metrics): verified PUSHWebb production metrics.
 *   TODO(client-logos): only logos with written authorisation.
 *   TODO(testimonials): approved testimonials, attributed.
 *   TODO(campaign-data): verified clipping campaign data, when available.
 */
export function OurWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="pw-section">
      <div className="pw-shell">
        <SectionIntro
          id="work-title"
          label={OUR_WORK.label}
          headline={OUR_WORK.headline}
          lead={
            <div className="space-y-4">
              {OUR_WORK.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          }
        />

        <div className="mt-16 md:mt-24" data-reveal>
          <h3 className="pw-title text-pw-ink">{OUR_WORK.workTitle}</h3>
          <div className="-mt-12">
            <WorkCarousel samples={OUR_WORK.samples} />
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <h3 className="pw-title text-pw-ink" data-reveal>
            {OUR_WORK.trustTitle}
          </h3>
          <div className="mt-8 grid gap-4 lg:grid-cols-3" data-reveal-stagger>
            {/* Metrics: four empty figure slots. */}
            <PlaceholderSlot label={METRICS} kind="Metrics" className="min-h-[280px]">
              <div aria-hidden className="relative z-[1] grid grid-cols-2 gap-3">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="rounded-[12px] bg-[rgb(7_7_10/0.5)] p-3 shadow-[inset_0_0_0_1px_var(--color-pw-line)]">
                    <span className="block h-5 w-14 rounded-md bg-[rgb(242_242_240/0.1)]" />
                    <span className="mt-3 block h-1.5 w-20 rounded-full bg-[rgb(242_242_240/0.07)]" />
                  </div>
                ))}
              </div>
            </PlaceholderSlot>

            {/* Logo wall: twelve empty cells. */}
            <PlaceholderSlot label={LOGOS} kind="Client logos" className="min-h-[280px] lg:col-span-2">
              <div aria-hidden className="relative z-[1] grid grid-cols-3 gap-3 sm:grid-cols-6">
                {Array.from({ length: 12 }, (_, i) => (
                  <span key={i} className="grid h-14 place-items-center rounded-[12px] bg-[rgb(7_7_10/0.5)] shadow-[inset_0_0_0_1px_var(--color-pw-line)]">
                    <span className="block h-2 w-10 rounded-full bg-[rgb(242_242_240/0.08)]" />
                  </span>
                ))}
              </div>
            </PlaceholderSlot>

            {/* Testimonial: a quote with no words in it yet. */}
            <PlaceholderSlot label={TESTIMONIALS} kind="Testimonials" className="min-h-[280px] lg:col-span-2">
              <div aria-hidden className="relative z-[1] flex gap-5">
                <Quote className="h-10 w-10 flex-none text-pw-wave-ink" strokeWidth={1.25} />
                <div className="flex w-full max-w-[520px] flex-col gap-2.5 pt-2">
                  <span className="block h-2.5 w-full rounded-full bg-[rgb(242_242_240/0.1)]" />
                  <span className="block h-2.5 w-[92%] rounded-full bg-[rgb(242_242_240/0.1)]" />
                  <span className="block h-2.5 w-[64%] rounded-full bg-[rgb(242_242_240/0.1)]" />
                  <span className="mt-4 flex items-center gap-3">
                    <span className="h-9 w-9 rounded-full bg-[rgb(242_242_240/0.1)]" />
                    <span className="block h-2 w-28 rounded-full bg-[rgb(242_242_240/0.08)]" />
                  </span>
                </div>
              </div>
            </PlaceholderSlot>

            {/* Campaign data: an empty chart frame. */}
            <PlaceholderSlot label={CAMPAIGN_DATA} kind="Campaign data" className="min-h-[280px]">
              <div aria-hidden className="relative z-[1] flex h-24 items-end gap-2 border-b border-l border-dashed border-pw-line-strong p-2">
                {[30, 45, 38, 60, 52, 72].map((h, i) => (
                  <span key={i} className="block flex-1 rounded-t-[4px] border border-dashed border-pw-line-strong" style={{ height: `${h}%` }} />
                ))}
              </div>
            </PlaceholderSlot>
          </div>
        </div>

        <div className="mt-12" data-reveal>
          <PwButton cta={OUR_WORK.cta} variant="ghost" />
        </div>
      </div>
    </section>
  );
}
