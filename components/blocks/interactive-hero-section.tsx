'use client';

import React, { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { SplineSceneLazy } from '@/components/ui/splite';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CTA_HREF, CTA_LABEL } from '@/lib/site';

const ROBOT_SCENE_URL = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';

const HERO_STATS = [
  {
    value: '5B+',
    count: 5,
    decimals: 0,
    suffix: 'B+',
    label: 'Views Generated',
  },
  {
    value: '40+',
    count: 40,
    decimals: 0,
    suffix: '+',
    label: 'Brands & Creators Worked With',
  },
  {
    value: '1.5K+',
    count: 1.5,
    decimals: 1,
    suffix: 'K+',
    label: 'Videos Produced Monthly',
  },
  {
    value: '7+',
    count: 7,
    decimals: 0,
    suffix: '+',
    label: 'Years in Content',
  },
];

export function InteractiveHeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // GSAP entrance choreography & number counter rollup
  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root) return;

      const headline = root.querySelector('.hero-headline');
      const statsBar = root.querySelector('.hero-stats-bar');
      const statItems = root.querySelectorAll('.hero-stat-item');
      const ctas = root.querySelectorAll('.hero-cta-btn');

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate the headline in
      tl.fromTo(
        headline,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
        },
        0.1,
      );

      // Animate stats bar
      if (statsBar) {
        tl.fromTo(
          statsBar,
          { autoAlpha: 0, y: 24, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
          },
          0.22,
        );
      }

      if (statItems.length > 0) {
        tl.fromTo(
          statItems,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
          },
          0.32,
        );
      }

      if (ctas.length > 0) {
        tl.fromTo(
          ctas,
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
          },
          0.4,
        );
      }

      // Roll up numbers smoothly with GSAP
      HERO_STATS.forEach((stat, idx) => {
        const el = counterRefs.current[idx];
        if (!el) return;
        const targetVal = stat.count;
        const step = 10 ** stat.decimals;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          delay: 0.25 + idx * 0.06,
          onUpdate: () => {
            const shown = Math.ceil(obj.val * step) / step;
            el.textContent = `${shown.toFixed(stat.decimals)}${stat.suffix}`;
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="on-dark relative w-full min-h-[100svh] overflow-hidden bg-black text-white selection:bg-white selection:text-black flex flex-col justify-between"
      aria-label="PUSHWebb Hero Section"
    >
      {/* ── 3D Robot Background (Unobstructed & Free to Interact) ────── */}
      {/* Phones get their own stacking: the robot's canvas is pinned to a
          fixed band at the top instead of the whole (now taller) hero, so it
          sits above the headline — robot, headline, metrics, CTAs —
          rather than behind four lines of type. The scene sizes the robot
          by canvas width and centres it vertically, so the band height only
          sets where it lands: 720px puts the head just under the top rail.
          From sm up it fills the section as before. */}
      <div
        className="robot-tint absolute inset-x-0 top-0 z-10 h-[720px] pointer-events-auto sm:inset-0 sm:h-auto"
        style={{ transform: 'translateY(-12%) scale(1.15)', transformOrigin: 'top center' }}
      >
        <SplineSceneLazy
          scene={ROBOT_SCENE_URL}
          className="absolute inset-0 w-full h-full"
          eager
          unmountWhenHidden
        />
        {/* Cover corner badge with black cover */}
        <div aria-hidden className="spline-badge-cover absolute bottom-0 right-0 z-50 h-20 w-60" />
      </div>

      {/* ── Corner Blobs matching color theme ──────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(58% 48% at -6% -8%, rgba(24, 48, 110, 0.45) 0%, transparent 70%), radial-gradient(58% 48% at 106% -8%, rgba(20, 42, 98, 0.38) 0%, transparent 70%), radial-gradient(60% 48% at -6% 108%, rgba(18, 38, 88, 0.35) 0%, transparent 72%), radial-gradient(60% 48% at 106% 108%, rgba(20, 42, 98, 0.38) 0%, transparent 72%)',
        }}
      />

      {/* ── Ambient Vignette Overlay ───────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 45%, rgba(0, 0, 0, 0.8) 100%)',
        }}
      />

      {/* ── Top Rail ───────────────────────────────────────────────── */}
      <div className="relative z-30 w-full px-6 sm:px-12 pt-24 sm:pt-28 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#b4b4b4] max-w-[14rem] sm:max-w-none">
            PUSHWebb &mdash; Content · Creative · Performance · AI
          </p>
        </div>

        <div className="hidden sm:block text-right">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">Dubai &middot; Global Delivery</p>
        </div>
      </div>

      {/* ── Center Empty Space Dedicated to the 3D Bot ─────────────── */}
      <div className="flex-1 pointer-events-none min-h-[280px] sm:min-h-[220px]" />

      {/* ── Bottom Stack (Minimal, Clean & Unobstructed) ───────────── */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 pb-10 sm:pb-12 flex flex-col items-center text-center">

        {/* Headline — sizes are set per breakpoint rather than left to a
            single clamp. From lg up the first line ("…That Turn") is the
            longest run and has to fit the container: it measures ~22.6× the
            font size, so 2.6rem clears 960px at 1024 and 3.2rem clears
            1216px at 1280. Below lg the break is dropped and text-balance
            evens out three or four lines instead. */}
        <h1 className="hero-headline font-display text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.6rem] xl:text-[3.2rem] font-extrabold leading-[0.98] tracking-[-0.02em] uppercase text-white mb-6 sm:mb-7 text-balance drop-shadow-lg">
          We Build Content Systems That Turn{' '}
          <br className="hidden lg:block" />
          Attention Into{' '}
          <span className="bg-gradient-to-r from-white via-[#dedede] to-[#b4b4b4] bg-clip-text text-transparent">
            Business Growth.
          </span>
        </h1>

        {/* ── Stats readout ─────────────────────────────────────────
            Built as a rule-separated instrument panel rather than four
            centred blocks: every cell shares one baseline grid, so the
            numbers line up across the row no matter how long the label
            underneath runs. */}
        <div className="hero-stats-bar pointer-events-auto relative mb-7 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.035] backdrop-blur-xl">
          {/* Light catches the top edge, the way it would on real glass */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f3ca68]/40 to-transparent"
          />

          <div className="grid grid-cols-2 md:grid-cols-4">
            {HERO_STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`hero-stat-item flex flex-col items-center px-3 py-4 text-center sm:px-4 sm:py-[1.15rem] ${
                  // Hairlines between cells only — never around the outside,
                  // which would double up with the container border.
                  i % 2 === 1 ? 'border-l border-white/[0.09]' : ''
                } ${i >= 2 ? 'border-t border-white/[0.09] md:border-t-0' : ''} ${
                  i === 2 ? 'md:border-l md:border-white/[0.09]' : ''
                }`}
              >
                <span
                  ref={(el) => {
                    counterRefs.current[i] = el;
                  }}
                  className="font-display text-[1.75rem] font-extrabold leading-none tracking-[-0.02em] tabular-nums text-gold-gradient drop-shadow-[0_2px_12px_rgba(243,202,104,0.3)] sm:text-[2.1rem]"
                >
                  {stat.value}
                </span>

                {/* Fixed min-height keeps a two-line label from pushing its
                    cell taller than its neighbours. */}
                <p className="mt-2 flex min-h-[2.1rem] items-start justify-center font-mono text-[9px] uppercase leading-[1.5] tracking-[0.13em] text-gold/90 font-medium sm:text-[10px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Action CTAs ────────────────────────────────────────── */}
        <div className="pointer-events-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={CTA_HREF}
            className="hero-cta-btn group inline-flex h-[48px] sm:h-[50px] select-none items-center justify-center gap-2 rounded-xl bg-white px-7 text-xs sm:text-sm font-semibold text-[#060d1d] no-underline shadow-[0_12px_28px_-10px_rgba(255,255,255,0.4)] transition-all duration-200 hover:scale-[1.02] hover:bg-[#f0f0f0] active:scale-[0.98]"
          >
            <span>{CTA_LABEL}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.4} />
          </a>

          {/* Secondary action now lands on real work — the Selected Work
              section — instead of the services row. */}
          <a
            href="#work"
            className="hero-cta-btn inline-flex h-[48px] sm:h-[50px] select-none items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.05] px-6 text-xs sm:text-sm font-medium text-white backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] no-underline transition-all duration-200 hover:bg-white/[0.10] hover:border-white/35 active:scale-[0.98]"
          >
            <span>Explore Our Work</span>
            <Sparkles className="h-3.5 w-3.5 text-[#b4b4b4]" />
          </a>
        </div>

      </div>
    </section>
  );
}
