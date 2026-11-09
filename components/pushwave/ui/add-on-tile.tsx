import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MiniClip } from '../wave/clip-fan';
import { HoverCard } from './hover-card';
import { splitPrice } from './primitives';

export type AddOn = { name: string; price: string; copy: string };

/** Typesets "From ₹250 per clip" with the amount in display type; quotes stay text. */
function Price({ price }: { price: string }) {
  const { lead, amount, tail } = splitPrice(price);
  if (!lead && !tail && !amount.includes('₹')) {
    return <span className="font-pw-display text-[1.25rem] font-medium tracking-[-0.02em] text-pw-wave-ink">{price}</span>;
  }
  return (
    <span className="flex flex-wrap items-baseline gap-x-1.5">
      {lead ? <span className="text-sm text-pw-steel">{lead.trim()}</span> : null}
      <span className="font-pw-display text-[1.5rem] font-semibold leading-none tracking-[-0.03em] text-pw-ink">{amount}</span>
      {tail ? <span className="text-sm text-pw-soft">{tail.trim()}</span> : null}
    </span>
  );
}

/** One bento tile: a visual or icon on top, then name, copy and starting price. */
export function AddOnTile({
  item,
  icon,
  visual,
  className,
}: {
  item: AddOn;
  icon?: ReactNode;
  visual?: ReactNode;
  className?: string;
}) {
  return (
    <HoverCard as="li" lift={4} pull={6} className={cn('group/tile flex min-h-[248px] flex-col gap-8 overflow-hidden rounded-[24px] p-6 md:p-7', className)}>
      {visual ? (
        <div className="relative min-h-0 flex-1" aria-hidden>
          {visual}
        </div>
      ) : (
        <span
          aria-hidden
          className="grid h-12 w-12 place-items-center rounded-2xl bg-[rgb(242_242_240/0.04)] text-pw-wave-ink shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-[background-color,color,box-shadow] duration-500 group-hover/tile:bg-pw-wave group-hover/tile:text-white group-hover/tile:shadow-[0_10px_30px_-10px_rgb(59_91_255/0.9)]"
        >
          {icon}
        </span>
      )}
      <div className="mt-auto">
        <h3 className="pw-title text-pw-ink">{item.name}</h3>
        <p className="mt-2 max-w-[44ch] text-[0.9375rem] leading-relaxed text-pw-soft">{item.copy}</p>
        <div className="mt-5 border-t border-pw-line pt-4">
          <Price price={item.price} />
        </div>
      </div>
    </HoverCard>
  );
}

/* ── Tile visuals: abstract, no invented data ───────────────────── */

/** Long-form waveform with three moments bracketed for short-form, and a scanning playhead. */
export function HighlightVisual() {
  const bars = Array.from({ length: 72 }, (_, i) => {
    const v = Math.abs(Math.sin(i * 0.37) * 0.6 + Math.sin(i * 0.11 + 1) * 0.35 + Math.sin(i * 1.7) * 0.15);
    return 0.18 + v * 0.82;
  });
  const windows = [
    [9, 17],
    [31, 38],
    [52, 62],
  ];
  const inWindow = (i: number) => windows.some(([a, b]) => i >= a && i <= b);
  return (
    <div className="relative flex h-full min-h-[160px] flex-col justify-center">
      <div className="relative flex h-28 items-center gap-[3px]">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn('block flex-1 rounded-full', inWindow(i) ? 'bg-pw-wave' : 'bg-[rgb(242_242_240/0.14)]')}
            style={{ height: `${h * 100}%` }}
          />
        ))}
        {/* Full-width carrier, so translateX(100%) travels the whole waveform. */}
        <span className="pw-scan absolute inset-y-[-12px] left-0 w-full">
          <span className="block h-full w-px bg-pw-ink shadow-[0_0_12px_rgb(242_242_240/0.8)]" />
        </span>
      </div>
      <div className="relative mt-4 h-2">
        {windows.map(([a, b]) => (
          <span
            key={a}
            className="absolute top-0 h-2 rounded-b-[3px] border-x border-b border-pw-wave-ink"
            style={{ left: `${(a / bars.length) * 100}%`, width: `${((b - a + 1) / bars.length) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        {windows.map(([a]) => (
          <MiniClip key={a} accent className="w-10 rounded-[7px]" progress={40} />
        ))}
      </div>
    </div>
  );
}

/** 9:16, 1:1 and 16:9 frames nested on one centre. */
export function AspectVisual() {
  const frames = [
    { label: '9:16', w: 36, h: 64 },
    { label: '1:1', w: 60, h: 60 },
    { label: '16:9', w: 96, h: 54 },
  ];
  return (
    <div className="relative grid h-[88px] w-[112px] place-items-center">
      {frames.map((frame, index) => (
        <span
          key={frame.label}
          className={cn(
            'absolute rounded-[6px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
            index === 0 ? 'bg-pw-wave/90 shadow-[0_0_20px_-4px_rgb(59_91_255/0.8)]' : 'border border-pw-line-strong',
            index === 2 && 'group-hover/tile:scale-110',
            index === 1 && 'group-hover/tile:scale-105',
          )}
          style={{ width: frame.w, height: frame.h }}
        />
      ))}
    </div>
  );
}

/** Three cuts of the same clip, each opening differently. */
export function HookVisual() {
  return (
    <div className="flex items-end gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:-translate-y-1" style={{ transitionDelay: `${i * 60}ms` }}>
          <MiniClip className="w-9 rounded-[7px]" progress={10 + i * 8} accent={i === 1} />
          <span className={cn('absolute inset-x-[18%] top-[14%] h-[6%] rounded-full', ['bg-pw-ink', 'bg-pw-wave-ink', 'bg-pw-soft'][i])} />
        </div>
      ))}
    </div>
  );
}

/** A caption line with the spoken word lit. */
export function SubtitleVisual() {
  return (
    <div className="flex flex-col items-start gap-2">
      <span className="flex gap-1.5">
        <span className="h-3 w-10 rounded-full bg-pw-ink/80" />
        <span className="h-3 w-14 rounded-full bg-pw-wave shadow-[0_0_14px_rgb(59_91_255/0.8)] transition-[width] duration-700 group-hover/tile:w-16" />
        <span className="h-3 w-8 rounded-full bg-pw-ink/80" />
      </span>
      <span className="flex gap-1.5">
        <span className="h-3 w-16 rounded-full bg-pw-ink/40" />
        <span className="h-3 w-9 rounded-full bg-pw-ink/40" />
      </span>
    </div>
  );
}

/** The standard 60 seconds, then a dashed extension. */
export function DurationVisual() {
  return (
    <div className="w-full max-w-[220px]">
      <div className="flex h-2 items-center gap-1">
        <span className="h-full flex-[2] rounded-full bg-pw-ink/70" />
        <span className="h-full flex-1 rounded-full border border-dashed border-pw-wave-ink bg-pw-wave/20 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:flex-[1.4]" />
      </div>
      <div className="mt-2 flex justify-between text-[0.6875rem] font-medium text-pw-steel">
        <span>60s</span>
        <span className="text-pw-wave-ink">+30s</span>
      </div>
    </div>
  );
}

/** A dot field with one region lit: audience geography. */
export function GeoVisual() {
  const cols = 28;
  const rows = 9;
  const lit = (c: number, r: number) => (c - 17) ** 2 / 9 + (r - 4) ** 2 / 4 < 1.2;
  const land = (c: number, r: number) => Math.sin(c * 0.55 + r * 0.9) + Math.cos(c * 0.21 - r * 0.6) > -0.35;
  return (
    <div className="grid h-full content-center gap-[7px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const on = lit(c, r);
        return (
          <span
            key={i}
            className={cn(
              'mx-auto block aspect-square w-[5px] rounded-full',
              on ? 'bg-pw-wave shadow-[0_0_8px_rgb(59_91_255/0.9)]' : land(c, r) ? 'bg-[rgb(242_242_240/0.2)]' : 'bg-transparent',
            )}
          />
        );
      })}
    </div>
  );
}

/** A small dashboard: a trend line over weekly bars. */
export function DashboardVisual() {
  const bars = [28, 36, 32, 48, 44, 58, 54, 70, 66, 82];
  return (
    <div className="relative h-full min-h-[120px] rounded-2xl bg-[rgb(7_7_10/0.6)] p-4 shadow-[inset_0_0_0_1px_var(--color-pw-line)]">
      <div className="flex gap-2">
        <span className="h-2 w-16 rounded-full bg-pw-ink/60" />
        <span className="h-2 w-8 rounded-full bg-pw-ink/25" />
      </div>
      <div className="mt-4 flex h-16 items-end gap-1.5">
        {bars.map((h, i) => (
          <span
            key={i}
            className={cn(
              'block flex-1 origin-bottom rounded-[3px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:scale-y-110',
              i === bars.length - 1 ? 'bg-pw-wave' : 'bg-[rgb(242_242_240/0.14)]',
            )}
            style={{ height: `${h}%`, transitionDelay: `${i * 25}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

/** Two stacked layers: the agency's brand over PUSHWAVE's fulfilment. */
export function LayersVisual() {
  return (
    <div className="relative h-[96px] w-[160px]">
      <span className="absolute left-6 top-0 h-16 w-28 rounded-xl bg-pw-wave/25 shadow-[inset_0_0_0_1px_rgb(59_91_255/0.6)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:-translate-y-1.5" />
      <span className="absolute left-0 top-6 h-16 w-28 rounded-xl border border-dashed border-pw-line-strong bg-pw-slate transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/tile:translate-y-1.5" />
    </div>
  );
}
