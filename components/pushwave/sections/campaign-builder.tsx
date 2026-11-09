'use client';

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { BUILDER } from '@/lib/pushwave/content';
import {
  INITIAL_BUILDER_STATE,
  PREFILL_EVENT,
  describeAmount,
  estimateCampaign,
  type BuilderPrefill,
  type BuilderState,
} from '@/lib/pushwave/estimate';
import { EstimatePanel } from '../builder/estimate-panel';
import { ProposalDialog } from '../builder/proposal-dialog';
import { PwButton } from '../ui/pw-button';
import { SectionIntro } from '../ui/primitives';

const S = BUILDER.steps;
const STEP_KEYS = ['location', 'category', 'model', 'views', 'clips', 'platforms', 'services', 'content'] as const;
type StepKey = (typeof STEP_KEYS)[number];

type SingleKey = 'location' | 'category' | 'model' | 'views' | 'clips';
type MultiKey = 'platforms' | 'services';

function labelOf(key: SingleKey | MultiKey, value: string) {
  return (S[key].options as readonly { value: string; label: string }[]).find((option) => option.value === value)?.label ?? value;
}

function isComplete(key: StepKey, state: BuilderState) {
  switch (key) {
    case 'views':
      return state.views !== null && (state.views !== 'custom' || state.customViews.trim() !== '');
    case 'platforms':
    case 'services':
      return state[key].length > 0;
    case 'content':
      return state.contentLink.trim() !== '';
    default:
      return state[key] !== null;
  }
}

/** Which choices pushed a row to "Custom quote", in the builder's own words. */
function customReasons(state: BuilderState) {
  const distribution: string[] = [];
  if (state.views === 'custom') distribution.push(labelOf('views', 'custom'));
  if (state.location && state.location !== 'india') distribution.push(labelOf('location', state.location));
  if (state.category && ['finance', 'ai', 'b2b'].includes(state.category)) distribution.push(labelOf('category', state.category));
  return {
    distribution: distribution.join(' · ') || undefined,
    production: state.clips === '300+' ? labelOf('clips', '300+') : undefined,
    services: state.services.length ? state.services.map((value) => labelOf('services', value)).join(' · ') : undefined,
  };
}

function selectionTags(state: BuilderState) {
  const tags: string[] = [];
  if (state.location) tags.push(labelOf('location', state.location));
  if (state.category) tags.push(labelOf('category', state.category));
  if (state.model) tags.push(labelOf('model', state.model));
  if (state.views) tags.push(state.views === 'custom' ? state.customViews.trim() || labelOf('views', 'custom') : labelOf('views', state.views));
  if (state.clips && state.clips !== 'none') tags.push(`${labelOf('clips', state.clips)} clips`);
  return tags;
}

/** One line per answer, then the estimate: what the proposal request carries. */
function leadSummary(state: BuilderState, estimate: ReturnType<typeof estimateCampaign>) {
  const single = (key: SingleKey) => (state[key] ? labelOf(key, state[key] as string) : '—');
  const multi = (key: MultiKey) => (state[key].length ? state[key].map((value) => labelOf(key, value)).join(', ') : '—');
  return [
    `${S.location.number}. ${S.location.title} ${single('location')}`,
    `${S.category.number}. ${S.category.title} ${single('category')}`,
    `${S.model.number}. ${S.model.title} ${single('model')}`,
    `${S.views.number}. ${S.views.title}: ${state.views === 'custom' ? state.customViews.trim() || labelOf('views', 'custom') : single('views')}`,
    `${S.clips.number}. ${S.clips.title}: ${single('clips')}`,
    `${S.platforms.number}. ${S.platforms.title}: ${multi('platforms')}`,
    `${S.services.number}. ${S.services.title}: ${multi('services')}`,
    `${S.content.number}. ${S.content.title}: ${state.contentLink.trim() || '—'}`,
    '',
    `${BUILDER.rows.distribution}: ${describeAmount(estimate.distribution)}`,
    `${BUILDER.rows.production}: ${describeAmount(estimate.production)}`,
    `${BUILDER.rows.services}: ${describeAmount(estimate.services)}`,
    `${BUILDER.rows.total}: ${describeAmount(estimate.total)}`,
  ];
}

function Tick() {
  return (
    <span className="pw-chip__tick" aria-hidden>
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white">
        <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function ChoiceGroup<K extends SingleKey | MultiKey>({
  name,
  stepKey,
  multiple,
  isChecked,
  onToggle,
  large,
}: {
  name: string;
  stepKey: K;
  multiple?: boolean;
  isChecked: (value: string) => boolean;
  onToggle: (value: string) => void;
  large?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {(S[stepKey].options as readonly { value: string; label: string }[]).map((option) => (
        <label key={option.value} className={cn('pw-chip', large && 'min-h-14 px-6 text-base')}>
          <input
            type={multiple ? 'checkbox' : 'radio'}
            name={name}
            value={option.value}
            checked={isChecked(option.value)}
            onChange={() => onToggle(option.value)}
            className="sr-only"
          />
          <Tick />
          {option.label}
        </label>
      ))}
    </div>
  );
}

/** 13 — Custom campaign builder: eight steps and a live estimate. */
export function CampaignBuilder() {
  const [state, setState] = useState<BuilderState>(INITIAL_BUILDER_STATE);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const legendRefs = useRef<(HTMLLegendElement | null)[]>([]);
  const panelRef = useRef<HTMLElement>(null);
  const moved = useRef(false);

  const estimate = useMemo(() => estimateCampaign(state), [state]);
  const reasons = useMemo(() => customReasons(state), [state]);
  const tags = useMemo(() => selectionTags(state), [state]);
  const last = step === STEP_KEYS.length - 1;

  const set = <K extends keyof BuilderState>(key: K, value: BuilderState[K]) => setState((current) => ({ ...current, [key]: value }));
  const toggle = (key: MultiKey, value: string) =>
    setState((current) => {
      const list = current[key] as string[];
      return { ...current, [key]: list.includes(value) ? list.filter((item) => item !== value) : [...list, value] };
    });

  const goTo = (next: number) => {
    if (next < 0 || next >= STEP_KEYS.length || next === step) return;
    setDirection(next > step ? 1 : -1);
    moved.current = true;
    setStep(next);
  };

  // Move focus to the new step's question, so keyboard and screen-reader users land on it.
  useEffect(() => {
    if (!moved.current) return;
    legendRefs.current[step]?.focus({ preventScroll: true });
  }, [step]);

  // CTAs elsewhere on the page ("Get Reach Growth", "Add 200 Clips") preset the builder.
  useEffect(() => {
    const onPrefill = (event: Event) => {
      const prefill = (event as CustomEvent<BuilderPrefill>).detail;
      if (!prefill) return;
      setState((current) => ({ ...current, ...prefill }));
      const panel = panelRef.current;
      if (panel && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(
          panel,
          { boxShadow: '0 0 0 1px rgba(59,91,255,0.9), 0 0 80px -10px rgba(59,91,255,0.7)' },
          { boxShadow: '0 0 0 1px rgba(59,91,255,0), 0 0 80px -10px rgba(59,91,255,0)', duration: 2.2, delay: 0.9, ease: 'power2.out', clearProps: 'boxShadow' },
        );
      }
    };
    window.addEventListener(PREFILL_EVENT, onPrefill);
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill);
  }, []);

  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const renderStep = (key: StepKey) => {
    switch (key) {
      case 'location':
      case 'category':
      case 'model':
      case 'clips':
        return (
          <ChoiceGroup
            name={`builder-${key}`}
            stepKey={key}
            large={key === 'model' || key === 'location'}
            isChecked={(value) => state[key] === value}
            onToggle={(value) => set(key, value as never)}
          />
        );
      case 'views':
        return (
          <div className="flex flex-col gap-5">
            <ChoiceGroup
              name="builder-views"
              stepKey="views"
              large
              isChecked={(value) => state.views === value}
              onToggle={(value) => set('views', value as BuilderState['views'])}
            />
            {state.views === 'custom' ? (
              <input
                type="text"
                inputMode="numeric"
                value={state.customViews}
                onChange={(event) => set('customViews', event.target.value)}
                aria-label="Custom view number"
                placeholder="Custom view number"
                className="pw-field max-w-[360px]"
                autoFocus
              />
            ) : null}
          </div>
        );
      case 'platforms':
      case 'services':
        return (
          <ChoiceGroup
            name={`builder-${key}`}
            stepKey={key}
            multiple
            isChecked={(value) => (state[key] as string[]).includes(value)}
            onToggle={(value) => toggle(key, value)}
          />
        );
      case 'content':
        return (
          <div className="flex flex-col gap-3">
            <input
              id="builder-content"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={state.contentLink}
              onChange={(event) => set('contentLink', event.target.value)}
              aria-labelledby="builder-legend-content"
              aria-describedby="builder-content-hint"
              placeholder="https://"
              className="pw-field"
            />
            <p id="builder-content-hint" className="text-sm text-pw-steel">
              {S.content.hint}
            </p>
          </div>
        );
    }
  };

  return (
    <section id="builder" aria-labelledby="builder-title" className="pw-section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[60%] [background:radial-gradient(50%_60%_at_20%_0%,rgb(59_91_255/0.14),transparent_70%)]" />
      <div className="pw-shell relative">
        <SectionIntro id="builder-title" label={BUILDER.label} headline={BUILDER.headline} lead={<p>{BUILDER.intro}</p>} />

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7" data-reveal>
            {/* Progress rail: every step is reachable; filled steps show a tick. */}
            <nav aria-label="Builder steps">
              <ol className="grid grid-cols-8 gap-1.5">
                {STEP_KEYS.map((key, index) => {
                  const complete = isComplete(key, state);
                  const current = index === step;
                  return (
                    <li key={key}>
                      <button
                        type="button"
                        onClick={() => goTo(index)}
                        aria-current={current ? 'step' : undefined}
                        aria-label={`${S[key].number}. ${S[key].title}${complete ? ' (answered)' : ''}`}
                        className="group/rail flex w-full flex-col gap-2.5 py-2 text-left"
                      >
                        <span
                          className={cn(
                            'block h-1 w-full rounded-full transition-[background-color,box-shadow] duration-500',
                            current
                              ? 'bg-pw-wave shadow-[0_0_14px_rgb(59_91_255/0.9)]'
                              : complete
                                ? 'bg-pw-wave-ink/50'
                                : 'bg-pw-line-strong group-hover/rail:bg-[rgb(242_242_240/0.32)]',
                          )}
                        />
                        <span
                          className={cn(
                            'flex items-center gap-1 font-pw-display text-xs font-medium transition-colors duration-300',
                            current ? 'text-pw-ink' : 'text-pw-steel group-hover/rail:text-pw-soft',
                          )}
                        >
                          {S[key].number}
                          {complete && !current ? (
                            <svg viewBox="0 0 12 12" aria-hidden className="hidden h-3 w-3 text-pw-wave-ink sm:block">
                              <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          ) : null}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </nav>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-10 lg:min-h-[272px]"
              style={{ '--pw-step-from': `${direction * 40}px` } as CSSProperties}
            >
              {STEP_KEYS.map((key, index) => (
                <fieldset key={key} hidden={index !== step} className="pw-step min-w-0">
                  <legend
                    ref={(node) => {
                      legendRefs.current[index] = node;
                    }}
                    id={`builder-legend-${key}`}
                    tabIndex={-1}
                    className="mb-8 flex w-full items-baseline gap-4"
                  >
                    <span className="font-pw-display text-[0.9375rem] font-medium text-pw-wave-ink">
                      {S[key].number}
                      <span className="text-pw-steel"> / 08</span>
                    </span>
                    <span className="pw-d3 text-pw-ink">{S[key].title}</span>
                  </legend>
                  {renderStep(key)}
                </fieldset>
              ))}
            </form>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-pw-line pt-6">
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                disabled={step === 0}
                className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-medium text-pw-soft transition-colors hover:bg-[rgb(242_242_240/0.06)] hover:text-pw-ink disabled:pointer-events-none disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Back
              </button>
              {last ? (
                // Desktop has the same button in the sticky estimate beside this.
                <span className="lg:hidden">
                  <PwButton label={BUILDER.cta} size="sm" onClick={() => setDialogOpen(true)} aria-haspopup="dialog" magnetic={false} />
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => goTo(step + 1)}
                  className="pw-btn pw-btn--ink pw-btn--sm group/next"
                >
                  Next
                  <ArrowRight className="h-4 w-4 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/next:translate-x-1" aria-hidden />
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--pw-nav-h)+24px)]" data-reveal>
              <EstimatePanel
                ref={panelRef}
                estimate={estimate}
                reasons={reasons}
                summary={tags}
                ready={last}
                onRequest={() => setDialogOpen(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <ProposalDialog
        open={dialogOpen}
        onClose={closeDialog}
        contentLink={state.contentLink}
        summary={leadSummary(state, estimate)}
        totalLine={`${BUILDER.rows.total}: ${describeAmount(estimate.total)}`}
      />
    </section>
  );
}
