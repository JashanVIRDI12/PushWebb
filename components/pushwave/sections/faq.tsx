import { FAQ } from '@/lib/pushwave/content';
import { AccordionItem } from '../ui/accordion';

/** 18 — Frequently asked questions. The questions also ship as FAQPage JSON-LD (see the page). */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="pw-section relative bg-transparent">
      <div data-wipe className="absolute inset-0 -z-[1] bg-pw-graphite" aria-hidden />
      <div className="pw-shell grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <h2 id="faq-title" className="pw-d2 lg:sticky lg:top-[calc(var(--pw-nav-h)+48px)] lg:text-[clamp(2.75rem,0.6rem+3.6vw,4.75rem)]" data-split>
            {FAQ.headline}
          </h2>
        </div>

        <div className="border-t border-pw-line lg:col-span-8" data-reveal>
          {FAQ.items.map((item, index) => (
            <AccordionItem
              key={item.q}
              className="border-b border-pw-line"
              titleClassName="py-7 md:py-8"
              title={
                <span className="flex gap-5 md:gap-8">
                  <span aria-hidden className="w-6 flex-none pt-1 font-pw-display text-sm font-medium text-pw-steel">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-pw-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] font-medium leading-snug tracking-[-0.015em] text-pw-ink">
                    {item.q}
                  </span>
                </span>
              }
            >
              <p className="max-w-[62ch] pl-11 text-[1.0625rem] leading-relaxed text-pw-soft md:pl-14">{item.a}</p>
            </AccordionItem>
          ))}
        </div>
      </div>
    </section>
  );
}
