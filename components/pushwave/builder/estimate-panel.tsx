'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { BUILDER } from '@/lib/pushwave/content';
import { describeAmount, type Amount, type Estimate } from '@/lib/pushwave/estimate';
import { PwButton } from '../ui/pw-button';
import { AnimatedINR } from './animated-inr';

const RANGE_LABELS = ['PUSHWAVE Reach', 'PUSHWAVE Authority'] as const;

/** One estimate figure in whichever form the logic returned. */
function AmountView({ amount, reason, size }: { amount: Amount; reason?: string; size: 'row' | 'total' }) {
  const figure =
    size === 'total'
      ? 'font-pw-display text-[clamp(2.5rem,1.6rem+3vw,4rem)] font-semibold leading-none tracking-[-0.045em] text-pw-ink'
      : 'font-pw-display text-[1.375rem] font-semibold leading-none tracking-[-0.03em] text-pw-ink';

  switch (amount.kind) {
    case 'amount':
      return <AnimatedINR value={amount.value} className={figure} />;
    case 'range':
      // "Not Sure": both models side by side.
      // Two figures share the panel width, so the total sizes itself to it (cqi).
      return (
        <span className={cn('block w-full [container-type:inline-size]', size === 'row' && 'text-right')}>
          <span className="grid grid-cols-2 gap-4">
            {[amount.low, amount.high].map((value, index) => (
              <span key={RANGE_LABELS[index]} className="flex min-w-0 flex-col gap-1.5">
                <span className="text-xs font-medium text-pw-steel">{RANGE_LABELS[index]}</span>
                <AnimatedINR
                  value={value}
                  className={cn(figure, size === 'total' && 'text-[max(1.125rem,6.2cqi)]', size === 'row' && 'text-[1.125rem]')}
                />
              </span>
            ))}
          </span>
        </span>
      );
    case 'custom':
      return (
        <span className="flex flex-col gap-1">
          <span className={cn(figure, 'text-pw-wave-ink', size === 'total' && 'text-[clamp(2.25rem,1.5rem+2.4vw,3.25rem)]')}>Custom quote</span>
          {reason ? <span className="text-xs font-medium text-pw-steel">{reason}</span> : null}
        </span>
      );
    case 'pending':
      return <span className="text-sm text-pw-steel">{amount.hint}</span>;
    case 'none':
      return <span className="text-[0.9375rem] text-pw-steel">{amount.label}</span>;
  }
}

type Props = {
  estimate: Estimate;
  reasons: { distribution?: string; production?: string; services?: string };
  summary: string[];
  ready: boolean;
  onRequest: () => void;
};

/**
 * The live estimate. Rows and total update as the builder changes; the
 * total is also announced (politely) for screen readers.
 */
export const EstimatePanel = forwardRef<HTMLElement, Props>(function EstimatePanel(
  { estimate, reasons, summary, ready, onRequest },
  ref,
) {
  const rows = [
    { key: 'distribution', label: BUILDER.rows.distribution, amount: estimate.distribution, reason: reasons.distribution },
    { key: 'production', label: BUILDER.rows.production, amount: estimate.production, reason: reasons.production },
    { key: 'services', label: BUILDER.rows.services, amount: estimate.services, reason: reasons.services },
  ] as const;

  return (
    <aside
      ref={ref}
      aria-labelledby="estimate-title"
      className="pw-glass relative overflow-hidden rounded-[32px] p-6 md:p-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-48 [background:radial-gradient(70%_100%_at_80%_0%,rgb(59_91_255/0.22),transparent_70%)]" />

      <div className="relative">
        <h3 id="estimate-title" className="pw-title text-pw-ink">
          {BUILDER.estimateTitle}
        </h3>
        {summary.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Current selection">
            {summary.map((item) => (
              <li key={item} className="rounded-full bg-[rgb(242_242_240/0.06)] px-2.5 py-1 text-xs font-medium text-pw-soft shadow-[inset_0_0_0_1px_var(--color-pw-line)]">
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <dl className="mt-6 divide-y divide-pw-line border-y border-pw-line">
          {rows.map((row) => (
            <div key={row.key} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4">
              <dt className="text-[0.9375rem] text-pw-soft">{row.label}</dt>
              <dd className={cn('text-right', row.amount.kind === 'range' && 'w-full')}>
                <AmountView amount={row.amount} reason={row.reason} size="row" />
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="text-sm font-medium text-pw-steel" id="estimate-total-label">
            {BUILDER.rows.total}
          </p>
          <div className="mt-3" aria-hidden>
            <AmountView amount={estimate.total} size="total" />
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {BUILDER.rows.total}: {describeAmount(estimate.total)}
          </p>
          {estimate.servicesQuotedSeparately ? (
            <p className="mt-3 text-sm text-pw-soft">
              + {BUILDER.rows.services}: <span className="text-pw-wave-ink">Custom quote</span>
            </p>
          ) : null}
        </div>

        <p className="pw-fine mt-6">{BUILDER.disclaimer}</p>

        <div className={cn('mt-6 rounded-full transition-shadow duration-700', ready && 'shadow-[0_0_0_6px_rgb(59_91_255/0.18)]')}>
          <PwButton label={BUILDER.cta} onClick={onRequest} block aria-haspopup="dialog" />
        </div>
      </div>
    </aside>
  );
});
