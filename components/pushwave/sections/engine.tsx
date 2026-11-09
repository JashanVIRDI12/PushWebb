'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { ENGINE } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { MiniClip } from '../wave/clip-fan';

/**
 * Each step's visual continues the one → many story: one source clip,
 * angles mapped, clips cut, clips distributed, views verified, scale.
 */
function StepVisual({ step }: { step: number }) {
  const frame = 'w-[34px] rounded-[7px] md:w-[42px] md:rounded-[8px]';
  switch (step) {
    case 0:
      return (
        <div className="flex items-end gap-3">
          <MiniClip className={cn(frame, 'w-[56px] md:w-[64px]')} accent progress={70} />
        </div>
      );
    case 1:
      return (
        <div className="flex items-center gap-4">
          <MiniClip className={cn(frame, 'w-[56px] md:w-[64px]')} progress={70} />
          <div className="flex flex-col gap-2">
            {[72, 54, 88, 40].map((w, i) => (
              <span key={i} className={cn('block h-1.5 rounded-full', i === 2 ? 'bg-pw-wave' : 'bg-[rgb(242_242_240/0.2)]')} style={{ width: w }} />
            ))}
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex items-end gap-2">
          {[0, 1, 2].map((i) => (
            <MiniClip key={i} className={frame} accent={i === 1} progress={30 + i * 20} />
          ))}
        </div>
      );
    case 3:
      return (
        <div className="flex -space-x-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <MiniClip key={i} className={frame} accent={i === 5} progress={15 + i * 12} style={{ transform: `translateY(${Math.abs(i - 2.5) * 5}px) rotate(${(i - 2.5) * 5}deg)` }} />
          ))}
        </div>
      );
    case 4:
      return (
        <div className="flex items-end gap-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="relative">
              <MiniClip className={frame} progress={100} />
              <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-pw-wave text-white shadow-[0_0_12px_rgb(59_91_255/0.8)]">
                <svg viewBox="0 0 12 12" className="h-3 w-3">
                  <path d="M2.5 6.2l2.2 2.2 4.8-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div className="flex h-[76px] items-end gap-1.5">
          {[24, 30, 28, 42, 50, 46, 62, 76].map((h, i) => (
            <span key={i} className={cn('block w-3 rounded-[3px]', i === 7 ? 'bg-pw-wave shadow-[0_0_12px_rgb(59_91_255/0.8)]' : 'bg-[rgb(242_242_240/0.18)]')} style={{ height: h }} />
          ))}
        </div>
      );
  }
}

/** 04 — How the engine works. Pinned horizontal scroll on desktop. */
export function Engine() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const media = gsap.matchMedia();

      media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root);
        const ticks = gsap.utils.toArray<HTMLElement>('[data-tick]', root);
        const distance = () => track.scrollWidth - window.innerWidth;

        const scroll = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            // Created after triggers above it but before the ones below: refresh first.
            refreshPriority: 1,
            onUpdate: (self) => {
              if (fillRef.current) fillRef.current.style.transform = `scaleX(${self.progress})`;
              const active = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999));
              ticks.forEach((tick, index) => tick.toggleAttribute('data-active', index <= active));
              steps.forEach((step, index) => step.toggleAttribute('data-active', index === active));
            },
          },
        });

        steps.forEach((step) => {
          gsap.from(step.querySelectorAll('[data-step-part]'), {
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.08,
            scrollTrigger: { trigger: step, containerAnimation: scroll, start: 'left 82%', once: true },
          });
        });

        ScrollTrigger.sort();
      });

      media.add('(max-width: 1023px), (prefers-reduced-motion: reduce)', () => {
        if (!railRef.current) return;
        gsap.fromTo(
          railRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: track, start: 'top 70%', end: 'bottom 70%', scrub: true },
          },
        );
      });

      return () => media.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} id="engine" aria-labelledby="engine-title" className="pw-section relative overflow-hidden lg:h-[100svh] lg:py-0">
      <div className="lg:flex lg:h-full lg:flex-col lg:justify-center">
        <div
          ref={trackRef}
          className="pw-shell relative flex flex-col gap-0 lg:w-max lg:max-w-none lg:flex-row lg:items-stretch lg:gap-6 lg:pr-[12vw]"
        >
          {/* Intro panel */}
          <div className="flex flex-col pb-12 lg:w-[38vw] lg:min-w-[440px] lg:pb-0 lg:pr-[4vw]">
            <div>
              <p className="pw-label" data-reveal>
                {ENGINE.label}
              </p>
              <h2 id="engine-title" className="pw-d2 mt-6" data-split>
                {ENGINE.headline}
              </h2>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-pw-line-strong lg:hidden">
              <div ref={railRef} className="h-full w-full origin-top bg-pw-wave shadow-[0_0_12px_rgb(59_91_255/0.9)]" />
            </div>
            <ol className="relative flex flex-col lg:flex-row lg:gap-6">
            {ENGINE.steps.map((step, index) => (
              <li
                key={step.number}
                data-step
                className="group/step relative pb-12 pl-12 last:pb-0 lg:flex lg:h-[64svh] lg:min-h-[480px] lg:w-[min(30vw,460px)] lg:min-w-[360px] lg:flex-col lg:justify-between lg:rounded-[32px] lg:bg-pw-graphite lg:p-8 lg:shadow-[inset_0_0_0_1px_var(--color-pw-line)] lg:transition-shadow lg:duration-700 lg:data-[active]:shadow-[inset_0_0_0_1px_rgb(59_91_255/0.6),0_30px_80px_-40px_rgb(59_91_255/0.6)]"
              >
                <span aria-hidden className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full bg-pw-void shadow-[inset_0_0_0_1px_var(--color-pw-wave)] lg:hidden">
                  <span className="h-1.5 w-1.5 rounded-full bg-pw-wave" />
                </span>
                <div data-step-part className="flex items-start justify-between gap-6">
                  <span className="font-pw-display text-[0.9375rem] font-medium text-pw-wave-ink">Step {step.number}</span>
                  <span aria-hidden className="hidden font-pw-display text-[5.5rem] font-semibold leading-[0.8] tracking-[-0.05em] text-[rgb(242_242_240/0.06)] lg:block">
                    {step.number}
                  </span>
                </div>
                <div data-step-part className="my-8 lg:my-0">
                  <StepVisual step={index} />
                </div>
                <div data-step-part>
                  <h3 className="pw-title text-pw-ink">{step.title}</h3>
                  <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-pw-soft">{step.copy}</p>
                </div>
              </li>
            ))}
            </ol>
          </div>

          {/* Closing panel */}
          <div className="mt-16 flex flex-col justify-end gap-8 lg:mt-0 lg:w-[34vw] lg:min-w-[400px] lg:pl-[4vw]">
            <p className="pw-d3" data-reveal>
              {ENGINE.closing}
            </p>
            <div data-reveal>
              <PwButton cta={ENGINE.cta} />
            </div>
          </div>
        </div>

        {/* Timeline scrubber with a chapter mark per step (desktop). */}
        <div className="pw-shell mt-10 hidden lg:block" aria-hidden>
          <div className="pw-scrubber">
            <div ref={fillRef} className="pw-scrubber__fill" />
          </div>
          <div className="mt-4 grid grid-cols-6">
            {ENGINE.steps.map((step) => (
              <span
                key={step.number}
                data-tick
                className="flex items-center gap-2 text-xs font-medium text-pw-steel transition-colors duration-500 data-[active]:text-pw-ink"
              >
                <span className="h-2 w-px bg-current" />
                {step.number} {step.title}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
