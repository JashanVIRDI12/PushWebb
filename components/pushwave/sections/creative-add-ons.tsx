import type { ReactNode } from 'react';
import { Languages, WandSparkles, Zap } from 'lucide-react';
import { CREATIVE_ADDONS } from '@/lib/pushwave/content';
import {
  AddOnTile,
  AspectVisual,
  DurationVisual,
  HighlightVisual,
  HookVisual,
  SubtitleVisual,
} from '../ui/add-on-tile';
import { PwButton } from '../ui/pw-button';
import { FinePrint, SectionIntro } from '../ui/primitives';

const ICON = 'h-5 w-5';

/**
 * Bento placement (desktop, 4 columns), in copy order:
 *   Highlight  Highlight  Motion     Hook
 *   Highlight  Highlight  Aspect     Localisation
 *   Duration   Subtitles  Rush       Rush
 */
const LAYOUT: Record<string, { className?: string; visual?: ReactNode; icon?: ReactNode }> = {
  'Manual Highlight Discovery': { className: 'md:col-span-2 lg:row-span-2', visual: <HighlightVisual /> },
  'Advanced Motion Graphics': { icon: <WandSparkles className={ICON} strokeWidth={1.5} /> },
  'Additional Hook Variation': { visual: <HookVisual /> },
  'Additional Aspect Ratio': { visual: <AspectVisual /> },
  'Language Localisation': { icon: <Languages className={ICON} strokeWidth={1.5} /> },
  'Extended Video Duration': { visual: <DurationVisual /> },
  'Premium Subtitles': { visual: <SubtitleVisual /> },
  'Rush Editing': { className: 'md:col-span-2', icon: <Zap className={ICON} strokeWidth={1.5} /> },
};

/** 10 — Creative add-ons. */
export function CreativeAddOns() {
  return (
    <section id="creative-add-ons" aria-labelledby="creative-add-ons-title" className="pw-section">
      <div className="pw-shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionIntro id="creative-add-ons-title" label={CREATIVE_ADDONS.label} headline={CREATIVE_ADDONS.headline} className="lg:col-span-8" />
          <div className="lg:col-span-4 lg:flex lg:justify-end" data-reveal>
            <PwButton cta={CREATIVE_ADDONS.cta} variant="ghost" />
          </div>
        </div>

        <ul className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2 lg:grid-cols-4 lg:[grid-auto-rows:minmax(272px,auto)]" data-reveal>
          {CREATIVE_ADDONS.items.map((item) => {
            const layout = LAYOUT[item.name] ?? {};
            return <AddOnTile key={item.name} item={item} className={layout.className} visual={layout.visual} icon={layout.icon} />;
          })}
        </ul>

        <FinePrint className="mt-8">{CREATIVE_ADDONS.disclaimer}</FinePrint>
      </div>
    </section>
  );
}

