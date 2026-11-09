import { Building2, Film, GraduationCap, Megaphone, Podcast, Radio, UserRound } from 'lucide-react';
import { AUDIENCES } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { SectionIntro, WaveGlyph } from '../ui/primitives';
import { ClipFan } from '../wave/clip-fan';

type AudienceId = (typeof AUDIENCES.items)[number]['id'];

const ICONS: Record<AudienceId, typeof Film> = {
  podcasters: Podcast,
  creators: Radio,
  entertainment: Film,
  founders: UserRound,
  education: GraduationCap,
  agencies: Megaphone,
  media: Building2,
};

/**
 * 16 — Who we work with. Seven tiles; on hover an accent wash rises and the
 * copy brightens. The copy is always on screen (never hover-only), so touch
 * and keyboard visitors read the same thing.
 */
export function Audiences() {
  return (
    <section id="audiences" aria-labelledby="audiences-title" className="pw-section">
      <div className="pw-shell">
        <SectionIntro id="audiences-title" label={AUDIENCES.label} headline={AUDIENCES.headline} />

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 lg:grid-cols-4" data-reveal-stagger>
          {AUDIENCES.items.map((item, index) => {
            const Icon = ICONS[item.id];
            return (
              <li
                key={item.id}
                className="group/aud relative isolate flex min-h-[280px] flex-col overflow-hidden rounded-[24px] bg-pw-graphite p-6 shadow-[inset_0_0_0_1px_var(--color-pw-line)] md:min-h-[320px] md:p-7"
              >
                <span
                  aria-hidden
                  className="pw-rise-wash absolute inset-0 -z-[1] [background:linear-gradient(0deg,rgb(59_91_255/0.55),rgb(59_91_255/0.12)_55%,transparent)]"
                />
                <div className="flex items-start justify-between">
                  <Icon
                    aria-hidden
                    className="h-7 w-7 text-pw-wave-ink transition-[color,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/aud:-translate-y-1 group-hover/aud:text-white"
                    strokeWidth={1.4}
                  />
                  <span aria-hidden className="font-pw-display text-sm font-medium text-pw-steel transition-colors duration-500 group-hover/aud:text-pw-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-auto pt-12 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/aud:-translate-y-1.5">
                  <h3 className="pw-title text-pw-ink">{item.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-pw-steel transition-colors duration-500 group-hover/aud:text-pw-ink">
                    {item.copy}
                  </p>
                </div>
              </li>
            );
          })}

          <li className="relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[24px] bg-pw-wave p-6 md:min-h-[320px] md:p-7">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-6 h-[78%] w-[86%] opacity-40 mix-blend-screen">
              <ClipFan count={5} className="h-full w-full" />
            </div>
            <WaveGlyph className="relative h-5 w-10 text-white" />
            <div className="relative">
              <PwButton cta={AUDIENCES.cta} variant="ink" magnetic={false} />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
