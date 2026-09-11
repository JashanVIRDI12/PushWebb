"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Layers,
  Rocket,
  TrendingUp,
  Workflow,
  Sparkles,
  MapPin,
  Plus,
  Minus,
  Quote,
  Star,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { InteractiveHeroSection } from './interactive-hero-section';
import { NavbarModernBlock } from './navbar-modern';
import { useGsapScrollAnimations } from '@/components/animations/gsap-scroll-provider';
import { MarqueeTicker } from '@/components/animations/marquee-ticker';
import { ClientLogoWall } from './client-logo-wall';
import { TrustedStrip } from './trusted-strip';
import { SelectedWorkSection } from './selected-work';
import { WhatWeDoSection } from './services-scroll-section';
import { Footer as SiteFooter } from './site-footer';
import { SCALING_STEPS } from '@/lib/services';
import { CTA_HREF, CTA_LABEL, OPERATING_PROOF, WHY_POINTS } from '@/lib/site';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   THE PUSHWEBB SCALING SYSTEM (4 steps)
   Copy lives in lib/services so the service pages quote the same
   steps; this adds the icon and the photograph for each.
──────────────────────────────────────────────────────────────── */
const STEP_MEDIA = [
  {
    icon: Compass,
    image: '/pushwebb-assets/generated/discovery-workshop.jpg',
    alt: 'PUSHWebb strategists taking notes in a discovery workshop',
  },
  {
    icon: Layers,
    image: '/pushwebb-assets/generated/strategy-blueprint.jpg',
    alt: 'PUSHWebb content strategy team planning campaign',
  },
  {
    icon: Rocket,
    image: '/pushwebb-assets/generated/video-production.jpg',
    alt: 'PUSHWebb video production crew filming on set',
  },
  {
    icon: TrendingUp,
    image: '/pushwebb-assets/generated/performance-analytics.jpg',
    alt: 'PUSHWebb team reviewing retention and performance dashboards',
  },
];

const FRAMEWORK_STEPS = SCALING_STEPS.map((step, i) => ({ ...step, ...STEP_MEDIA[i] }));

/* Long card copy sits behind a tap rather than on the page — the client's
   note was that nobody reads paragraphs at this size on a landing page, so
   cards lead with the heading and open on demand. Same +/- affordance as
   the FAQ below, so the gesture is learned once. */
function CardDetail({ text, className }: { text: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('mt-3 border-t border-ink/[0.08] pt-3', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:text-ink"
      >
        <span>{open ? 'Close' : 'Details'}</span>
        {open ? <Minus className="h-3 w-3 shrink-0" /> : <Plus className="h-3 w-3 shrink-0" />}
      </button>
      {open && <p className="mt-2.5 text-xs leading-relaxed text-ink-soft">{text}</p>}
    </div>
  );
}

function FrameworkSection() {
  return (
    <section id="framework" className="reveal-section relative py-16 md:py-28 overflow-hidden border-t border-line bg-paper">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.06] px-4 py-1 text-xs font-medium text-ink backdrop-blur-md mb-3 shadow-[inset_0_1px_0_rgba(11,26,43,0.15)]">
            <Sparkles className="h-3.5 w-3.5 text-ink" />
            <span>THE PUSHWEBB SCALING SYSTEM</span>
          </div>
          <h2 className="split-h2 font-display text-[1.75rem] sm:text-4xl md:text-5xl font-medium text-ink leading-[1.08] tracking-[-1.5px] mb-4">
            From Strategy to Scale.<br />One Connected System.
          </h2>
        </div>

        {/* Phones get a vertical timeline: a rail down the left with the step
            number as its node, the card beside it, no thumbnail. From sm up
            it opens into the image-led card grid. */}
        <ol className="framework-grid relative grid grid-cols-1 gap-4 before:absolute before:bottom-8 before:left-[15px] before:top-8 before:w-px before:bg-line-strong sm:grid-cols-2 sm:gap-6 sm:before:hidden lg:grid-cols-4">
          {FRAMEWORK_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.step} className="relative pl-11 [perspective:1100px] sm:pl-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line-strong bg-paper font-display text-[11px] font-bold text-ink sm:hidden"
                >
                  {s.step}
                </span>

                <div className="framework-card premium-card group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 sm:p-6 transition-colors duration-300 hover:border-ink/30 hover:bg-surface-hover">
                  {/* Draws across the card head as the step lands */}
                  <span aria-hidden className="framework-rule absolute inset-x-0 top-0 h-px origin-left bg-accent/50" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="framework-icon flex h-9 w-9 items-center justify-center rounded-xl border border-ink/20 bg-ink/10 text-ink">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="framework-step hidden font-display text-2xl font-bold tracking-tight text-ink/20 group-hover:text-ink/40 transition-colors sm:inline">
                        {s.step}
                      </span>
                    </div>

                    <div className="relative mb-4 hidden h-32 w-full overflow-hidden rounded-xl border border-ink/10 bg-paper-alt shadow-inner sm:block">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={s.image}
                        alt={s.alt}
                        loading="lazy"
                        className="framework-thumb h-full w-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-115"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#04091a]/88 via-[#0a1630]/18 to-transparent opacity-75" />
                    </div>

                    <h3 className="framework-copy font-display text-lg font-medium text-ink mb-1">{s.title}</h3>
                    <p className="framework-copy text-gold font-semibold text-[11px] tracking-wide uppercase mb-2">{s.tag}</p>
                  </div>

                  <CardDetail text={s.detail} className="mt-2" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   BUILT FOR SCALE — the operating workflow behind the output.
   Replaces the old vanity-number band: the figures now sit under the
   process that produces them.
──────────────────────────────────────────────────────────────── */
const WORKFLOW = ['Strategy', 'Research', 'Script', 'Produce', 'Edit', 'QA', 'Publish', 'Analyse'];

function BuiltForScaleSection() {
  const [main, ...secondary] = OPERATING_PROOF;
  const tiles = [
    { ...main, label: 'Videos Delivered Every Month' },
    { ...secondary[0], label: 'Specialists' },
    { ...secondary[1], label: 'Channels Managed' },
    { ...secondary[2], label: 'Years of Experience' },
  ];

  return (
    <section id="scale" className="reveal-section relative overflow-hidden border-t border-line bg-paper py-16 md:py-28">
      <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <p className="anim-eyebrow eyebrow mb-3">Built for Scale</p>
          <h2 className="split-h2 mb-4 text-[1.75rem] leading-[1.05] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
            Great Content Needs a System<br className="hidden sm:block" /> Behind It.
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-ink-soft md:text-base">
            Our production workflows connect strategy, research, scripting, production, editing,
            quality control, publishing and performance analysis into one repeatable engine.
          </p>
        </div>

        {/* The workflow as a chain. A highlight walks the steps in order and
            loops back through "Repeat" — the point is the cycle, not the list. */}
        {/* On desktop the chain breaks out of the 5xl column so all nine
            steps, "Repeat" included, sit on a single line. */}
        <ol
          aria-label="PUSHWebb operating workflow"
          className="reveal-stagger mb-10 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-2.5 sm:mb-12 lg:-mx-12"
        >
          {WORKFLOW.map((step, i) => (
            <li key={step} className="flex items-center gap-1.5">
              <span
                className="workflow-step rounded-full border border-line-strong bg-white px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-ink sm:px-3.5 sm:text-xs"
                style={{ animationDelay: `${i}s` }}
              >
                {step}
              </span>
              <ArrowRight aria-hidden className="h-3.5 w-3.5 text-ink-muted" />
            </li>
          ))}
          <li>
            <span
              className="workflow-step workflow-step--loop inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.12em] text-gold sm:px-3.5 sm:text-xs"
              style={{ animationDelay: `${WORKFLOW.length}s` }}
            >
              <RefreshCw aria-hidden className="h-3 w-3" />
              Repeat
            </span>
          </li>
        </ol>

        {/* White ground, so the cards are white too and the headline number
            inverts to navy instead — one dark tile carries the focus that a
            uniform grid of boxes never did. */}
        <div className="reveal-stagger grid grid-cols-2 gap-3 lg:auto-rows-[170px] lg:grid-cols-4">
          {tiles.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'stat-card group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center transition-shadow duration-500',
                i === 0
                  ? 'on-dark premium-navy-card col-span-2 border border-white/10 py-10 shadow-[0_22px_50px_-24px_rgba(11,26,43,0.55)] lg:row-span-2'
                  : 'border border-ink/[0.07] bg-white shadow-[0_12px_32px_-18px_rgba(11,26,43,0.28)] hover:shadow-[0_20px_44px_-20px_rgba(30,47,168,0.32)]',
                i === 1 && 'col-span-2',
              )}
            >
              <span
                aria-hidden
                className={cn(
                  'absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 ease-out group-hover:scale-x-100',
                  i === 0 ? 'bg-white/30' : 'bg-accent-hover/40',
                )}
              />
              <div
                className={cn(
                  'stat-number relative mb-2 font-display font-bold leading-none tracking-[-2px] text-ink',
                  i === 0 ? 'text-6xl md:text-7xl' : 'text-3xl md:text-4xl',
                )}
                data-count={String(s.count)}
                data-suffix={s.suffix}
              >
                {s.value}
              </div>
              <p
                className={cn(
                  'relative font-display font-semibold uppercase tracking-[0.14em]',
                  i === 0 ? 'text-sm text-gold' : 'text-[11px] text-ink-soft',
                )}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   WHY PUSHWEBB
──────────────────────────────────────────────────────────────── */
const WHY_ICONS = [Workflow, Layers, ShieldCheck, TrendingUp];

function WhyPushWebbSection() {
  return (
    <section className="reveal-section relative py-16 md:py-32 border-t border-line overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="anim-eyebrow eyebrow mb-3">Why PUSHWebb</p>
            <h2 className="split-h2 text-[1.75rem] sm:text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-1.5px] max-w-xl">
              One Partner. One System. Less Chaos.
            </h2>
          </div>
        </div>

        {/* The supporting lines are one sentence each, short enough to sit on
            the card rather than behind a Details toggle. */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(190px,auto)] gap-3 mb-8">
          {WHY_POINTS.map((item, i) => {
            const Icon = WHY_ICONS[i];
            const big = i === 0;
            const wide = i === 1;
            return (
              <div
                key={item.title}
                className={cn(
                  'premium-card bg-surface hover:bg-surface-hover border border-line rounded-xl p-6 flex flex-col',
                  big && 'lg:col-span-2 lg:row-span-2 lg:justify-center',
                  wide && 'lg:col-span-2',
                )}
              >
                <div
                  className={cn(
                    'rounded-lg bg-surface border border-line flex items-center justify-center mb-4',
                    big ? 'w-12 h-12' : 'w-9 h-9',
                  )}
                >
                  <Icon className={cn(big ? 'w-5 h-5' : 'w-4 h-4', 'text-ink')} />
                </div>
                <h3 className={cn('font-display text-ink font-medium mb-2', big ? 'text-xl' : 'text-sm')}>
                  {item.title}
                </h3>
                <p className={cn('leading-relaxed text-ink-soft', big ? 'text-sm max-w-sm' : 'text-xs')}>
                  {item.copy}
                </p>
              </div>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="group inline-flex items-center gap-2 font-display text-ink-muted hover:text-ink text-sm font-medium transition-colors duration-200"
        >
          Know more
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   CLIENT STORIES — reviews only. Quotes stay verbatim.
──────────────────────────────────────────────────────────────── */
type Testimonial = {
  quote: string;
  name: string;
  role: string;
  span: string;
  /** Real portrait where the client supplied one; the monogram is the
   *  fallback, not the default. */
  avatar?: string;
};

// Two rows that mirror each other (wide–narrow, narrow–wide) so four
// reviews read as a composed block rather than a plain 2×2.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'PUSHWebb understood my vision clearly and delivered strategies that exceeded my expectations!',
    name: 'Dr. Lalit Arora',
    role: 'Sales Coach',
    span: 'md:col-span-7',
    avatar: '/logos/lalit-arora.jpg',
  },
  {
    quote:
      'PUSHWebb’s content and video editing services gave our brand a fresh edge. They turn ideas into impactful stories.',
    name: 'Ansh Bhayana',
    role: 'Capture a Trip',
    span: 'md:col-span-5',
    avatar: '/logos/ansh-bhayana.jpg',
  },
  {
    quote:
      'His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.',
    name: 'Karandeep Singh',
    role: 'Serial Industrialist',
    span: 'md:col-span-5',
  },
  {
    quote:
      'Their video editing skills are top-notch. Transformed raw content into polished, impactful visuals that truly stand out.',
    name: 'FRND',
    role: 'Company',
    span: 'md:col-span-7',
    avatar: '/logos/frnd.webp',
  },
];

/* "Dr. Lalit Arora" → LA. Honorifics are dropped so the monogram
   reads as the person, not the title. */
function monogram(name: string) {
  return name
    .split(' ')
    .filter((word) => word.length > 0 && !word.endsWith('.'))
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div
      className={cn(
        'premium-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-surface p-6 sm:p-7',
        t.span,
      )}
    >
      {/* Oversized quote glyph, set as a watermark rather than punctuation */}
      <Quote
        aria-hidden
        className="pointer-events-none absolute -right-3 -top-2 h-20 w-20 text-ink/[0.05] transition-colors duration-500 group-hover:text-ink/[0.09]"
        strokeWidth={1.5}
      />

      <div className="relative">
        <div className="mb-4 flex items-center gap-0.5" aria-label="Rated 5 out of 5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} aria-hidden className="h-3.5 w-3.5 fill-accent-hover text-accent-hover" strokeWidth={0} />
          ))}
        </div>

        <p className="text-ink text-sm leading-relaxed sm:text-[15px]">{t.quote}</p>
      </div>

      <div className="relative mt-6 flex items-center gap-3 border-t border-ink/[0.08] pt-4">
        {/* Avatars use explicit width/height, not fill+sizes. These cards start
            at visibility:hidden for the GSAP reveal, and the browser re-resolved
            srcset on reveal and requested the 3840 variant it never finished —
            a fixed 40px avatar has no reason to negotiate a size at all. */}
        {t.avatar ? (
          <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-ink/10">
            <Image
              src={t.avatar}
              alt={t.name}
              width={40}
              height={40}
              loading="eager"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </span>
        ) : (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-ink font-display text-[11px] font-bold tracking-wide text-paper">
            {monogram(t.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-display text-xs font-semibold text-ink">{t.name}</p>
          <p className="truncate text-[11px] text-ink-muted">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="reveal-section relative overflow-hidden border-t border-line bg-paper py-16 md:py-28"
    >
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-12 text-center sm:mb-14">
          <p className="anim-eyebrow eyebrow mb-3">Client Stories</p>
          <h2 className="split-h2 mx-auto mb-4 max-w-4xl font-display text-[1.75rem] leading-[1.08] tracking-[-1.5px] text-ink text-balance sm:text-4xl md:text-5xl">
            What Working With PUSHWebb Actually Looks Like
          </h2>
        </div>

        <div className="reveal-stagger grid gap-4 md:grid-cols-12">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   ABOUT PUSHWEBB + OPERATING PROOF
──────────────────────────────────────────────────────────────── */
function AboutSection() {
  const stats = [
    {
      value: '16+',
      count: 16,
      suffix: '+',
      label: 'Content & Growth Specialists',
      detail: 'Strategy · Research · Writing · Editing · Design · Social · YouTube · AI',
    },
    {
      value: '1,500+',
      count: 1500,
      suffix: '+',
      label: 'Videos Delivered Monthly',
      detail: 'Long form · Shorts · Reels · Trailers · Social Assets',
    },
    {
      value: '10+',
      count: 10,
      suffix: '+',
      label: 'YouTube Channels Managed',
      detail: 'Creators · Brands · Content Led Businesses',
    },
  ];

  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden border-t border-line bg-paper">
      {/* Ambient background glow aura */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-[600px] rounded-full bg-ink/[0.02] blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="about-badge inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.06] px-4 py-1 text-xs font-medium text-ink mb-4">
            <Sparkles className="h-3.5 w-3.5 text-ink" />
            <span>ABOUT PUSHWEBB · WHO WE ARE</span>
          </div>

          <h2 className="font-display text-[1.75rem] sm:text-4xl md:text-5xl font-medium tracking-[-1.5px] text-ink leading-[1.08] max-w-4xl">
            We Don&apos;t Just Produce Content. We Build the System Behind It.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-stretch">

          {/* Left Column: Narrative Card */}
          <div
            id="about-main-card"
            className="premium-card lg:col-span-3 flex flex-col justify-between rounded-3xl border border-ink/10 bg-surface p-7 sm:p-9 backdrop-blur-2xl hover:border-ink/20"
          >
            <div className="space-y-5">
              <p className="font-display text-lg sm:text-xl text-ink font-medium leading-relaxed">
                PUSHWebb is a content, creative, performance and AI agency built for brands and
                creators that need more than disconnected campaigns. We bring strategy, production,
                post production, distribution and optimisation under one operating system.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-ink-soft">
                Built by operators with years of experience managing high volume content and YouTube
                ecosystems, PUSHWebb now brings that same systems thinking to creators, brands and
                organisations looking to scale content without scaling chaos.
              </p>
            </div>

            {/* Bottom Team Trust & Action Row */}
            <div className="mt-8 pt-6 border-t border-ink/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="about-avatars flex -space-x-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-paper shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/pushwebb-assets/generated/team-studio.jpg" alt="PUSHWebb team reviewing footage in the studio" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-paper shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/pushwebb-assets/generated/team-producer-headshot.jpg" alt="PUSHWebb creative producer" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <p className="text-ink text-xs font-semibold">The People Behind PUSHWebb</p>
                  <p className="text-ink-muted text-[11px]">Creators, strategists & engineers</p>
                </div>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-semibold text-paper no-underline shadow-[0_8px_20px_-12px_rgba(11,26,43,0.3)] transition-all duration-200 hover:bg-ink/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Meet the Team</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Operating proof */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="stat-card premium-card group relative flex-1 flex flex-col justify-center rounded-2xl border border-ink/10 bg-surface p-6 backdrop-blur-xl hover:border-ink/25 hover:bg-surface-hover"
              >
                <div className="flex items-baseline justify-between mb-1.5">
                  <div
                    className="stat-number font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink"
                    data-count={String(s.count)}
                    data-suffix={s.suffix}
                  >
                    {s.value}
                  </div>
                  <span className="font-display text-[11px] font-medium text-ink/40 group-hover:text-ink/70 transition-colors uppercase tracking-widest">
                    KPI
                  </span>
                </div>

                <p className="text-ink text-sm font-semibold uppercase tracking-[0.06em] mb-1">{s.label}</p>
                <p className="text-ink-muted text-xs leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   LOCATIONS — Dubai leads; India is where the studio was built.
──────────────────────────────────────────────────────────────── */
const LOCATIONS = [
  {
    city: 'Dubai, UAE',
    tag: 'Operating Base',
    image: '/pushwebb-assets/generated/dubai-dusk.jpg',
    alt: 'Dubai skyline at dusk with the Burj Khalifa',
    span: 'md:col-span-3',
    href: '/dubai',
    linkLabel: 'PUSHWebb in Dubai',
  },
  {
    city: 'India',
    tag: 'Creative Studio',
    image: '/pushwebb-assets/generated/mumbai-blue-hour.jpg',
    alt: 'Mumbai skyline at blue hour, India',
    span: 'md:col-span-2',
  },
];

function LocationsSection() {
  return (
    <section id="locations" className="reveal-section relative py-16 md:py-28 bg-paper border-t border-line overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.06] px-4 py-1 text-xs font-medium text-ink backdrop-blur-md mb-3 shadow-[inset_0_1px_0_rgba(11,26,43,0.15)]">
            <MapPin className="h-3.5 w-3.5 text-ink" />
            <span>GLOBAL FOOTPRINT · WHERE WE OPERATE</span>
          </div>
          <h2 className="split-h2 font-display text-[1.75rem] sm:text-4xl md:text-5xl font-medium text-ink leading-[1.08] tracking-[-1.5px] mb-4 max-w-2xl mx-auto">
            Operating in Dubai. Working Globally.
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
            PUSHWebb is a content, creative, performance and AI agency serving brands, creators and
            organisations from India and Dubai.
          </p>
        </div>

        <div className="reveal-stagger grid md:grid-cols-5 gap-6 mb-10">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.city}
              className={cn(
                'group relative min-h-[320px] sm:min-h-[380px] rounded-3xl border border-ink/15 overflow-hidden shadow-[0_18px_50px_-24px_rgba(11,26,43,0.30)]',
                loc.span,
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={loc.image}
                alt={loc.alt}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#04091a] via-[#0a1630]/72 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-end p-7 sm:p-9">
                <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center mb-5">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="inline-block font-display text-[10px] tracking-widest uppercase text-white bg-white/15 border border-white/25 backdrop-blur-md rounded-full px-3 py-1 mb-3 w-fit">
                  {loc.tag}
                </span>
                <h3 className="font-display text-white font-medium text-2xl mb-2">{loc.city}</h3>
                {loc.href ? (
                  <a
                    href={loc.href}
                    className="group/link mt-1 inline-flex w-fit items-center gap-1.5 font-display text-xs font-semibold text-white/80 no-underline transition-colors hover:text-white"
                  >
                    {loc.linkLabel}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5" />
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href={CTA_HREF}
            className="group inline-flex items-center gap-2 font-display text-ink/80 hover:text-ink text-sm font-medium transition-colors duration-200"
          >
            <span>Start a Global Conversation</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   FINAL CTA
──────────────────────────────────────────────────────────────── */
function FinalCTASection() {
  return (
    <section className="reveal-section relative py-16 md:py-36 overflow-hidden border-t border-line">
      <div className="relative z-10 container mx-auto px-4 md:px-8 max-w-3xl text-center">
        <p className="anim-eyebrow eyebrow mb-5">Let&apos;s Talk</p>
        <h2 className="split-h2 text-[1.75rem] sm:text-4xl md:text-5xl text-ink leading-[1.08] tracking-[-1.5px] mb-5">
          Ready to Build a Content System That Actually Scales?
        </h2>
        <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-ink-soft text-balance md:text-base">
          Tell us where you want to grow. We&apos;ll show you the system required to get there.
        </p>
        <a
          href={CTA_HREF}
          className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-[#eaeaea] text-[#060d1d] font-semibold py-3.5 px-8 rounded-lg text-sm transition-all duration-200 active:scale-[0.98]"
        >
          <span>{CTA_LABEL}</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   FAQ
   Answers are 50–100 words and use the service names people search
   for. They stay in the DOM when collapsed (height, not presence, is
   toggled) so search engines and AI crawlers can read every answer.
──────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What does PUSHWebb handle as a full service content agency?',
    a: 'PUSHWebb provides YouTube management, short form content, video production, post production, social media management, performance creative and AI content production. As a full service content agency, we can own the whole pipeline — strategy, research, scripting, production, editing, design, publishing and performance analysis — or take on the parts your team needs most. Because one team runs every stage, what we learn from the analytics goes straight back into the next round of content instead of getting lost between vendors.',
  },
  {
    q: 'Can PUSHWebb manage our entire YouTube operation?',
    a: 'Yes. Through YouTube as a Service, our team manages the complete YouTube operation: channel strategy and content pillars, research, scripting, production, editing, thumbnails and titles, publishing, SEO and analytics. Every upload is planned around retention, watch time and click-through rate, and each video’s performance shapes the next. Our team manages 10+ YouTube channels across creators, brands and content-led businesses, and we can take over a channel end to end or plug into an existing in-house team.',
  },
  {
    q: 'Does PUSHWebb work with brands as well as creators?',
    a: 'Yes. PUSHWebb works with creators, brands, corporate teams, institutions and creative agencies. Our roster spans creator-led podcasts and YouTube channels as well as consumer apps, hospitality and electronics brands. The system is the same for both — strategy, production, distribution and performance working together — but the plan changes: creators usually need consistent output and channel growth, while brands often need content that supports awareness, campaigns and conversion across several platforms.',
  },
  {
    q: 'Can PUSHWebb manage both organic content and paid performance?',
    a: 'Yes. PUSHWebb runs organic content and paid performance as one connected system instead of two separate functions. Our team handles social media management and short-form content alongside performance creative and paid campaigns on Meta, Google and YouTube. Organic posts show which ideas and hooks earn attention; the strongest become ad creative, and campaign data on reach, click-through and conversion feeds back into what we make next.',
  },
  {
    q: 'Can PUSHWebb handle high volume content production every month?',
    a: 'Yes. The PUSHWebb team operates content workflows capable of delivering more than 1,500 videos per month. A team of 16+ specialists across strategy, research, writing, editing, design, social, YouTube and AI moves each piece through the same stages — script, produce, edit, quality control and publish — so output can rise without losing consistency. Long-form videos, Shorts, Reels, trailers and social assets all run through that one production system.',
  },
  {
    q: 'Do you offer white label content production for agencies?',
    a: 'Yes. Creative and marketing agencies can use PUSHWebb as a white label production partner for video editing, post production, short-form content, content clipping and YouTube production. We work to your brand guidelines, formats and approval process, deliver under your name and keep client communication with you. It is a practical way for agencies to add production capacity and handle high-volume months without hiring and managing a full in-house editing team.',
  },
  {
    q: 'Does PUSHWebb provide video editing and post production separately?',
    a: 'Yes. Video editing and post production can be booked on their own, without a full content retainer. If you already shoot in-house, send us raw footage and our editors handle the cut, pacing, captions, graphics, thumbnails and final exports for long-form videos, Shorts, Reels, trailers and social assets. Every file goes through human quality control before delivery, and the work can grow into a wider content system later if you need it.',
  },
  {
    q: 'How does PUSHWebb use AI in content production?',
    a: 'PUSHWebb uses AI to remove repetitive, time-heavy steps from content production — research support, repurposing long-form into short-form, metadata and captions, scheduling, publishing workflows and performance reporting. That lets the team deliver more content, faster. AI does not replace creative judgement: strategy, scripting decisions, editing and final approvals stay with our people, and every AI-assisted output goes through human quality control before it reaches a client or a platform.',
  },
  {
    q: 'Does PUSHWebb work with businesses in Dubai and the UAE?',
    a: 'Yes. PUSHWebb operates in Dubai and works with brands, creators and organisations across the UAE, while delivering for clients globally. PUSHWebb is a content, creative, performance and AI agency serving brands, creators and organisations from India and Dubai. UAE businesses get the full service mix — YouTube management, short-form content, video production, social media management, performance creative and AI content production — from one team structured for high-volume delivery.',
  },
  {
    q: 'Can PUSHWebb handle a single campaign before moving into a retainer?',
    a: 'Yes. You can start with a focused project — a single campaign, a content sprint, a podcast launch or a batch of short-form videos — before committing to an ongoing retainer. A project runs through the same discovery, strategy, execution and optimisation process as a retainer, so you see how the system works on real content. If it is a fit, what we learned carries straight into a longer engagement without starting from scratch.',
  },
];

function FAQItem({ q, a, id }: { q: string; a: string; id: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-5">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between gap-4 text-left"
          aria-expanded={open}
          aria-controls={id}
        >
          <span className="font-display text-ink font-medium text-sm sm:text-base">{q}</span>
          <span className="shrink-0 w-6 h-6 rounded-lg bg-surface border border-line flex items-center justify-center text-ink-soft">
            {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </span>
        </button>
      </h3>
      <div
        id={id}
        inert={!open}
        className={cn(
          'grid transition-[grid-template-rows] duration-300 ease-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p className="text-ink-soft text-sm leading-relaxed pt-3 pr-8">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="reveal-section relative py-16 md:py-32 border-t border-line bg-paper">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <p className="anim-eyebrow eyebrow mb-3">FAQs</p>
          <h2 className="split-h2 text-[1.75rem] sm:text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-1.5px]">
            Questions, Answered
          </h2>
        </div>
        <div className="reveal-stagger">
          {FAQS.map((item, i) => (
            <FAQItem key={item.q} q={item.q} a={item.a} id={`faq-answer-${i}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   FOOTER
──────────────────────────────────────────────────────────────── */
// The site footer lives in its own module now (it owns the gradient band).
// Re-exported here so existing imports from this file keep working.
export { Footer } from './site-footer';

export function AgencyLanding() {
  const pageRef = useRef<HTMLDivElement>(null);
  useGsapScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="bg-paper">
      <div className="sticky top-0 z-[100] -mb-[100px] sm:-mb-[112px] pointer-events-auto">
        <NavbarModernBlock />
      </div>
      {/* Stage — black room the robot is lit in, carried through the ticker.
          The extra top pull + matching pad lets the black ground reach the
          very top of the viewport (no hairline of page bg above the nav)
          without moving the hero content. */}
      <div className="on-dark bg-black pt-7">
        <InteractiveHeroSection />
        <MarqueeTicker />
      </div>

      {/* Order follows the revision brief: recognisable proof straight after
          the hero, then capabilities, work, about, process and reviews. */}
      <TrustedStrip />
      <WhatWeDoSection />

      {/* Work gets the navy stage so the long paper run after the hero is
          broken by real client work rather than another white band. */}
      <div className="on-dark dark-zone">
        <SelectedWorkSection />
      </div>

      <AboutSection />
      <FrameworkSection />
      <TestimonialsSection />

      {/* Proof runs roster → operating system → reasons. The workflow band
          breaks the dark stage on purpose: a white band between two navy
          ones keeps the headline figures from getting lost. */}
      <div className="on-dark dark-zone">
        <ClientLogoWall />
      </div>

      <BuiltForScaleSection />

      <div className="on-dark dark-zone">
        <WhyPushWebbSection />
      </div>

      <LocationsSection />
      <FAQSection />

      {/* Close — back to the dark room the page opened in */}
      <div className="on-dark dark-zone">
        <FinalCTASection />
        <SiteFooter />
      </div>
    </div>
  );
}
