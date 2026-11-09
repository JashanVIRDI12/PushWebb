'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { formatINR } from '@/lib/pushwave/estimate';

/* Every figure comes from the Reach Starter package in the approved copy:
   a 10M-view target, ₹12,90,000, the 100-clip production option and the
   3 supported platforms. The panel is labelled as an illustration. */
const VIEW_TARGET = 10_000_000;
const BUDGET_CAP = 1290000;
const BARS = [22, 30, 26, 41, 38, 52, 47, 63, 58, 72, 81, 94];

/**
 * Glass campaign panel over the hero scene. Counts run once, a beat after
 * the headline lands; under reduced motion it renders its final state.
 */
export function HeroDashboard({ className }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewsRef = useRef<HTMLSpanElement>(null);
  const budgetRef = useRef<HTMLSpanElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const state = { views: 0, budget: 0 };
    const render = () => {
      if (viewsRef.current) viewsRef.current.textContent = `${(state.views / 1_000_000).toFixed(1)}M`;
      if (budgetRef.current) budgetRef.current.textContent = formatINR(state.budget);
      if (fillRef.current) fillRef.current.style.transform = `scaleX(${state.views / VIEW_TARGET})`;
    };
    render();

    const bars = root.querySelectorAll<HTMLElement>('[data-bar]');
    const timeline = gsap.timeline({ delay: 1.9 });
    timeline
      .to(state, { views: VIEW_TARGET, duration: 3.4, ease: 'power2.inOut', onUpdate: render }, 0)
      .to(state, { budget: BUDGET_CAP, duration: 2.2, ease: 'expo.out', onUpdate: render }, 0.2)
      .from(bars, { scaleY: 0.08, duration: 1.2, ease: 'expo.out', stagger: 0.06 }, 0.1)
      .from(root.querySelector('[data-verified]'), { autoAlpha: 0, y: 6, duration: 0.6, ease: 'expo.out' }, 3.2);

    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={cn('pw-glass pw-appear w-full max-w-[340px] rounded-[28px] p-5', className)}
      style={{ '--d': '0.7s' } as React.CSSProperties}
      role="img"
      aria-label="Illustrative campaign preview: a 10 million view target, 100 master clips, 3 platforms and a ₹12,90,000 budget cap."
    >
      <div aria-hidden>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.8125rem] font-medium text-pw-soft">Campaign preview</span>
          <span className="pw-todo">Illustrative</span>
        </div>

        <div className="mt-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs text-pw-steel">Eligible views</p>
            <p className="mt-1 font-pw-display text-[2.75rem] font-semibold leading-none tracking-[-0.04em] text-pw-ink">
              <span className="inline-grid">
                <span className="invisible [grid-area:1/1]">10.0M</span>
                <span ref={viewsRef} className="[grid-area:1/1]">10.0M</span>
              </span>
            </p>
          </div>
          <span
            data-verified
            className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-[rgb(59_91_255/0.16)] px-2.5 py-1 text-[0.6875rem] font-semibold text-pw-wave-ink"
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3">
              <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Verified
          </span>
        </div>

        <div className="mt-4">
          <div className="pw-scrubber">
            <div ref={fillRef} className="pw-scrubber__fill" style={{ transform: 'scaleX(1)' }} />
          </div>
          <div className="mt-2 flex justify-between text-[0.6875rem] text-pw-steel">
            <span>0</span>
            <span>10M view target</span>
          </div>
        </div>

        <div className="mt-6 flex h-14 items-end gap-1.5">
          {BARS.map((height, index) => (
            <span
              key={index}
              data-bar
              className={cn(
                'block flex-1 origin-bottom rounded-[3px]',
                index === BARS.length - 1 ? 'bg-pw-wave shadow-[0_0_14px_rgb(59_91_255/0.8)]' : 'bg-[rgb(242_242_240/0.16)]',
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-[0.6875rem] text-pw-steel">Approved posts, by week</p>

        <dl className="mt-5 grid grid-cols-[0.9fr_0.8fr_1.5fr] gap-3 border-t border-pw-line pt-4">
          <div>
            <dt className="text-[0.6875rem] text-pw-steel">Master clips</dt>
            <dd className="mt-1 font-pw-display text-lg font-semibold text-pw-ink">100</dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] text-pw-steel">Platforms</dt>
            <dd className="mt-1 font-pw-display text-lg font-semibold text-pw-ink">3</dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] text-pw-steel">Budget cap</dt>
            <dd className="mt-1 font-pw-display text-lg font-semibold text-pw-ink">
              <span className="inline-grid">
                <span className="invisible [grid-area:1/1]">₹12,90,000</span>
                <span ref={budgetRef} className="[grid-area:1/1]">₹12,90,000</span>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
