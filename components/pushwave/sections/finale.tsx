import { FINAL_CTA } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { WaveGlyph } from '../ui/primitives';
import { ClipFan } from '../wave/clip-fan';

/**
 * 19 — Final call to action. Transparent like the hero: as it scrolls in,
 * the fixed WaveStage opens in a circle and the clips gather back into one
 * wave behind the close. Phones get the CSS clip fan inline instead.
 */
export function Finale() {
  return (
    <section id="finale" aria-labelledby="finale-title" className="relative z-[1]">
      <div className="pw-shell flex min-h-[100svh] flex-col items-center justify-center py-32 text-center">
        <div aria-hidden className="relative mb-4 h-[260px] w-full md:hidden">
          <div className="absolute inset-0 [background:radial-gradient(60%_50%_at_50%_50%,rgb(59_91_255/0.3),transparent_72%)]" />
          <ClipFan count={7} className="h-full w-full" />
        </div>

        <h2 id="finale-title" className="pw-d1 max-w-[13ch]" data-split>
          {FINAL_CTA.headline}
        </h2>
        <div className="pw-lead mt-10 space-y-1 text-pw-ink" data-reveal-stagger>
          {FINAL_CTA.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>

      <div className="pw-shell pb-32 md:pb-48">
        <ul className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-3" data-reveal-stagger>
          {FINAL_CTA.points.map((point) => (
            <li key={point} className="pw-glass flex items-center gap-3 rounded-full px-5 py-3 text-[0.9375rem] font-medium text-pw-ink">
              <WaveGlyph className="h-3 w-6 text-pw-wave-ink" />
              {point}
            </li>
          ))}
        </ul>

        <div
          className="pw-glass relative mx-auto mt-16 max-w-[820px] overflow-hidden rounded-[40px] px-6 py-12 text-center md:mt-24 md:px-16 md:py-20"
          data-reveal
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 [background:radial-gradient(70%_60%_at_50%_0%,rgb(59_91_255/0.28),transparent_72%)]" />
          <div className="relative">
            <h3 className="pw-d3 mx-auto max-w-[18ch]">{FINAL_CTA.closeTitle}</h3>
            <p className="pw-lead mx-auto mt-6 max-w-[52ch]">{FINAL_CTA.close}</p>
            <div className="mt-10 flex justify-center">
              <PwButton cta={FINAL_CTA.cta} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
