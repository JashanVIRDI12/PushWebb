/* ────────────────────────────────────────────────────────────────
   PUSHWAVE campaign builder — pricing logic.

   Every figure here is quoted from the approved PUSHWAVE copy. The
   builder never invents a number: anything outside the published
   price points becomes "Custom quote".
──────────────────────────────────────────────────────────────── */

export type BuilderLocation = 'india' | 'uae' | 'international';
export type BuilderCategory =
  | 'entertainment' | 'music' | 'film' | 'gaming' | 'sports' | 'lifestyle'
  | 'podcasts' | 'founder' | 'education' | 'finance' | 'ai' | 'technology'
  | 'b2b' | 'other';
export type BuilderModel = 'reach' | 'authority' | 'unsure';
export type BuilderViews = '10M' | '50M' | '100M+' | 'custom';
export type BuilderClips = 'none' | '100' | '200' | '300' | '300+';
export type BuilderPlatform = 'instagram' | 'youtube' | 'tiktok';
export type BuilderService =
  | 'highlight' | 'motion' | 'multilingual' | 'geo' | 'premium'
  | 'publishing' | 'reporting' | 'other';

export type BuilderState = {
  location: BuilderLocation | null;
  category: BuilderCategory | null;
  model: BuilderModel | null;
  views: BuilderViews | null;
  customViews: string;
  clips: BuilderClips | null;
  platforms: BuilderPlatform[];
  services: BuilderService[];
  contentLink: string;
};

/** What a CTA elsewhere on the page can preset before scrolling to the builder. */
export type BuilderPrefill = Partial<Pick<BuilderState, 'model' | 'views' | 'clips' | 'services' | 'category'>>;

/** The starting configuration mirrors the hero line
 *  "Starting at ₹12,90,000 for a 10M-view Reach campaign." */
export const INITIAL_BUILDER_STATE: BuilderState = {
  location: null,
  category: null,
  model: 'reach',
  views: '10M',
  customViews: '',
  clips: 'none',
  platforms: [],
  services: [],
  contentLink: '',
};

type PricedViews = Exclude<BuilderViews, 'custom'>;

export const DISTRIBUTION_PRICES: Record<'reach' | 'authority', Record<PricedViews, number>> = {
  reach: { '10M': 1290000, '50M': 5950000, '100M+': 10900000 },
  authority: { '10M': 2190000, '50M': 9950000, '100M+': 17900000 },
};

export const CLIP_PRICES: Record<Exclude<BuilderClips, '300+'>, number> = {
  none: 0,
  '100': 140000,
  '200': 250000,
  '300': 360000,
};

/** "Finance, AI & Specialised B2B — Custom premium pricing." */
const CUSTOM_CATEGORIES: BuilderCategory[] = ['finance', 'ai', 'b2b'];

export type Amount =
  | { kind: 'amount'; value: number }
  | { kind: 'range'; low: number; high: number }
  | { kind: 'custom' }
  | { kind: 'pending'; hint: string }
  | { kind: 'none'; label: string };

export type Estimate = {
  distribution: Amount;
  production: Amount;
  services: Amount;
  total: Amount;
  /** True when the total is a number but quoted services sit on top of it. */
  servicesQuotedSeparately: boolean;
};

function distributionAmount(state: BuilderState): Amount {
  if (!state.model || !state.views) {
    return { kind: 'pending', hint: 'Choose a model and view target' };
  }
  const outsideIndia = state.location !== null && state.location !== 'india';
  const customCategory = state.category !== null && CUSTOM_CATEGORIES.includes(state.category);
  if (state.views === 'custom' || outsideIndia || customCategory) return { kind: 'custom' };

  if (state.model === 'unsure') {
    return {
      kind: 'range',
      low: DISTRIBUTION_PRICES.reach[state.views],
      high: DISTRIBUTION_PRICES.authority[state.views],
    };
  }
  return { kind: 'amount', value: DISTRIBUTION_PRICES[state.model][state.views] };
}

function productionAmount(state: BuilderState): Amount {
  if (!state.clips) return { kind: 'pending', hint: 'Choose a clip package' };
  if (state.clips === '300+') return { kind: 'custom' };
  return { kind: 'amount', value: CLIP_PRICES[state.clips] };
}

export function estimateCampaign(state: BuilderState): Estimate {
  const distribution = distributionAmount(state);
  const production = productionAmount(state);
  const services: Amount = state.services.length
    ? { kind: 'custom' }
    : { kind: 'none', label: 'None selected' };

  let total: Amount;
  if (distribution.kind === 'pending' || production.kind === 'pending') {
    total = { kind: 'pending', hint: 'Complete steps 03–05' };
  } else if (distribution.kind === 'custom' || production.kind === 'custom') {
    total = { kind: 'custom' };
  } else if (production.kind !== 'amount') {
    total = { kind: 'custom' };
  } else if (distribution.kind === 'range') {
    total = {
      kind: 'range',
      low: distribution.low + production.value,
      high: distribution.high + production.value,
    };
  } else if (distribution.kind === 'amount') {
    total = { kind: 'amount', value: distribution.value + production.value };
  } else {
    total = { kind: 'custom' };
  }

  return {
    distribution,
    production,
    services,
    total,
    servicesQuotedSeparately:
      services.kind === 'custom' && (total.kind === 'amount' || total.kind === 'range'),
  };
}

const INR = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

/** Indian digit grouping with the rupee sign: 1290000 → "₹12,90,000". */
export function formatINR(value: number) {
  return `₹${INR.format(Math.round(value))}`;
}

/** Plain-text rendering of an amount, for the lead summary and screen readers. */
export function describeAmount(amount: Amount) {
  switch (amount.kind) {
    case 'amount':
      return formatINR(amount.value);
    case 'range':
      return `${formatINR(amount.low)} – ${formatINR(amount.high)}`;
    case 'custom':
      return 'Custom quote';
    case 'pending':
      return amount.hint;
    case 'none':
      return amount.label;
  }
}

/* ── Prefill bus ─────────────────────────────────────────────────
   CTAs in other sections ("Get Reach Growth", "Add 200 Clips") preset
   the builder. They live in separate component trees, so a DOM event
   is the lightest link between them. */
export const PREFILL_EVENT = 'pushwave:prefill';

export function prefillBuilder(prefill: BuilderPrefill) {
  window.dispatchEvent(new CustomEvent<BuilderPrefill>(PREFILL_EVENT, { detail: prefill }));
}
