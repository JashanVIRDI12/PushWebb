import type { ReactNode } from 'react';
import { BadgeCheck, CalendarRange, ChartPie, Globe, Send, SquareStack } from 'lucide-react';
import { DISTRIBUTION_ADDONS } from '@/lib/pushwave/content';
import { AddOnTile, DashboardVisual, GeoVisual, LayersVisual } from '../ui/add-on-tile';
import { PwButton } from '../ui/pw-button';
import { SectionIntro } from '../ui/primitives';

const ICON = 'h-5 w-5';

/**
 * Bento placement (desktop, 4 columns), in copy order:
 *   Geography  Geography  Language   Premium
 *   Series     Dashboard  Dashboard  Owned
 *   Strategy   Analytics  White-label White-label
 */
const LAYOUT: Record<string, { className?: string; visual?: ReactNode; icon?: ReactNode }> = {
  'Geographic Audience Preferences': { className: 'md:col-span-2', visual: <GeoVisual /> },
  'Language-Specific Distribution': { icon: <Globe className={ICON} strokeWidth={1.5} /> },
  'Premium Publisher Criteria': { icon: <BadgeCheck className={ICON} strokeWidth={1.5} /> },
  'Additional Content Series': { icon: <SquareStack className={ICON} strokeWidth={1.5} /> },
  'Dedicated Reporting Dashboard': { className: 'md:col-span-2', visual: <DashboardVisual /> },
  'Owned-Account Publishing': { icon: <Send className={ICON} strokeWidth={1.5} /> },
  'Monthly Content Strategy': { icon: <CalendarRange className={ICON} strokeWidth={1.5} /> },
  'Additional Analytics Reporting': { icon: <ChartPie className={ICON} strokeWidth={1.5} /> },
  'White-Label Fulfilment': { className: 'md:col-span-2', visual: <LayersVisual /> },
};

/** 11 — Distribution add-ons. Follows the creative add-ons as a second chapter. */
export function DistributionAddOns() {
  return (
    <section id="distribution-add-ons" aria-labelledby="distribution-add-ons-title" className="pw-section pt-0 md:pt-0">
      <div className="pw-shell">
        <div className="grid gap-10 border-t border-pw-line pt-16 md:pt-24 lg:grid-cols-12 lg:items-end">
          <SectionIntro id="distribution-add-ons-title" label={DISTRIBUTION_ADDONS.label} headline={DISTRIBUTION_ADDONS.headline} className="lg:col-span-8" />
          <div className="lg:col-span-4 lg:flex lg:justify-end" data-reveal>
            <PwButton cta={DISTRIBUTION_ADDONS.cta} variant="ghost" />
          </div>
        </div>

        {/* Two columns can't fit the wide tiles in copy order without holes; dense packing fills them. */}
        <ul className="mt-16 grid gap-4 md:mt-20 md:grid-flow-dense md:grid-cols-2 lg:grid-flow-row lg:grid-cols-4 lg:[grid-auto-rows:minmax(272px,auto)]" data-reveal>
          {DISTRIBUTION_ADDONS.items.map((item) => {
            const layout = LAYOUT[item.name] ?? {};
            return <AddOnTile key={item.name} item={item} className={layout.className} visual={layout.visual} icon={layout.icon} />;
          })}
        </ul>
      </div>
    </section>
  );
}
