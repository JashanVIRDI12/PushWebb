"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowRight,
  Compass,
  Layers,
  Rocket,
  TrendingUp,
  Users,
  Workflow,
  Sparkles,
  MapPin,
  Plus,
  Minus,
  Quote,
  Star,
} from 'lucide-react';
import { InteractiveHeroSection } from './interactive-hero-section';
import { NavbarModernBlock } from './navbar-modern';
import { useGsapScrollAnimations } from '@/components/animations/gsap-scroll-provider';
import { MarqueeTicker } from '@/components/animations/marquee-ticker';
import { ClientLogoWall } from './client-logo-wall';
import { WhatWeDoSection } from './services-scroll-section';
import { Footer as SiteFooter } from './site-footer';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   MISSION STATEMENT — bridges the hero into What We Do
──────────────────────────────────────────────────────────────── */
function MissionSection() {
  return (
    <section className="reveal-section relative overflow-hidden border-t border-line bg-paper py-14 md:py-20">
      <div className="container mx-auto max-w-5xl px-4 relative z-10 md:px-8">
        <div className="reveal-stagger grid gap-4 md:grid-cols-5 items-stretch">
          <div className="premium-card bg-surface border border-ink/10 rounded-2xl p-6 sm:p-8 md:p-9 md:col-span-3 flex flex-col sm:flex-row gap-6 backdrop-blur-xl">
            <div className="w-full h-44 sm:w-44 sm:h-auto md:w-52 shrink-0 rounded-xl overflow-hidden border border-ink/10 relative shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/pushwebb-assets/generated/team-studio.jpg"
                alt="The PUSHWebb creative and engineering team"
                loading="lazy"
                className="w-full h-full object-cover scale-105 transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ink/[0.06] px-3 py-0.5 text-[11px] font-medium text-ink w-fit mb-3">
                <Sparkles className="h-3 w-3 text-ink" />
                <span>MISSION</span>
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-medium tracking-tight text-ink">
                We Turn Content Into Scalable Business Growth
              </h3>
            </div>
          </div>

          <div className="relative premium-navy-card border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col justify-center gap-3.5 overflow-hidden md:col-span-2 shadow-[0_18px_44px_-20px_rgba(6,13,29,0.65)]">
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-3xl pointer-events-none" />
            <span className="font-display text-xs font-semibold tracking-widest text-gold uppercase mb-1 drop-shadow-[0_1px_6px_rgba(243,202,104,0.3)]">
              Ready to Expand?
            </span>
            <h4 className="font-display text-xl font-medium text-white leading-tight mb-2">
              Let&apos;s Architect Your Content Engine.
            </h4>
            <a
              href="/contact"
              className="group relative z-10 inline-flex items-center justify-center gap-2 bg-white hover:bg-[#eaeaea] text-[#060d1d] font-semibold py-3.5 px-5 rounded-xl text-xs font-display transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Book a Brainstorming Call</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#services"
              className="group relative z-10 inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-semibold py-3 px-5 rounded-xl text-xs font-display transition-colors duration-200 hover:bg-white/20 active:scale-[0.98]"
            >
              <span>Explore Our Disciplines</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   4-STEP GROWTH FRAMEWORK
──────────────────────────────────────────────────────────────── */
const FRAMEWORK_STEPS = [
  {
    icon: Compass,
    step: '01',
    title: 'Discovery',
    tag: 'We Listen Before We Build.',
    image: '/pushwebb-assets/generated/discovery-workshop.jpg',
    description:
      'Every strong strategy comes with understanding the brand behind it. We analyze goals, workflows, and audience dynamics to pinpoint the strongest growth opportunities.',
  },
  {
    icon: Layers,
    step: '02',
    title: 'Strategy & Blueprint',
    tag: 'Clarity Before Creativity.',
    image: '/pushwebb-assets/generated/strategy-blueprint.jpg',
    description:
      'We turn research into a comprehensive growth plan across content platforms, scripting frameworks, publishing rhythms, and scalable paid acquisition funnels.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Execution',
    tag: 'Ideas Engineered Into Impact.',
    image: '/pushwebb-assets/generated/video-production.jpg',
    description:
      'From studio video production and fast-paced microcontent editing to multi-channel ad campaign launches, every deliverable is executed with relentless precision.',
  },
  {
    icon: TrendingUp,
    step: '04',
    title: 'Optimization & Scale',
    tag: 'Growth is Never One-and-Done.',
    image: '/pushwebb-assets/generated/performance-analytics.jpg',
    description:
      'We continuously analyze retention curves, conversion metrics, and algorithmic trends to scale winning creative formats and maximize ROAS over time.',
  },
];

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
            <span>HOW WE WORK · 4-STEP FRAMEWORK</span>
          </div>
          <h2 className="split-h2 font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ink leading-[1.08] tracking-[-1.5px] mb-4">
            AI is Changing Marketing.<br />We Help You Use It to Scale.
          </h2>
        </div>

        <div className="framework-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FRAMEWORK_STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="framework-card premium-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 sm:p-6 transition-colors duration-300 hover:border-ink/30 hover:bg-surface-hover"
              >
                {/* Draws across the card head as the step lands */}
                <span aria-hidden className="framework-rule absolute inset-x-0 top-0 h-px origin-left bg-accent/50" />

                <div>
                  {/* Top Step Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="framework-icon flex h-9 w-9 items-center justify-center rounded-xl border border-ink/20 bg-ink/10 text-ink">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="framework-step font-display text-2xl font-bold tracking-tight text-ink/20 group-hover:text-ink/40 transition-colors">
                      {s.step}
                    </span>
                  </div>

                  {/* Thumbnail Image */}
                  <div className="relative mb-4 h-32 w-full overflow-hidden rounded-xl border border-ink/10 bg-paper-alt shadow-inner">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="framework-thumb h-full w-full object-cover scale-105 transition-transform duration-700 ease-out group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04091a]/88 via-[#0a1630]/18 to-transparent opacity-75" />
                  </div>

                  <h3 className="framework-copy font-display text-lg font-medium text-ink mb-1">{s.title}</h3>
                  <p className="framework-copy text-gold font-semibold text-[11px] tracking-wide uppercase mb-2">{s.tag}</p>
                </div>

                <CardDetail text={s.description} className="mt-2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   STATS — Good Work Gets Seen. Great Work Performs.
──────────────────────────────────────────────────────────────── */
const STATS = [
  { count: 5, suffix: 'B+', label: 'Views Generated Across YouTube & Social' },
  { count: 40, suffix: '+', label: 'Brands & Creators Worked With' },
  { count: 5, suffix: 'K+', label: 'Content Assets Delivered' },
  { count: 120, suffix: '+', label: 'Projects & Systems Completed' },
];

function StatsSection() {
  return (
    <section className="reveal-section relative overflow-hidden border-t border-line bg-paper py-16 md:py-28">
      <div className="container relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-12 text-center">
          <p className="anim-eyebrow eyebrow mb-3">By The Numbers</p>
          <h2 className="split-h2 mb-4 text-3xl leading-[1.05] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
            Good Work Gets Seen.<br />Great Work Performs.
          </h2>
        </div>

        {/* White ground, so the cards are white too and the headline number
            inverts to navy instead — one dark tile carries the focus that a
            uniform grid of boxes never did. */}
        <div className="reveal-stagger grid grid-cols-2 gap-3 lg:auto-rows-[170px] lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                'stat-card group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center transition-shadow duration-500',
                i === 0
                  ? 'on-dark premium-navy-card border border-white/10 shadow-[0_22px_50px_-24px_rgba(11,26,43,0.55)] lg:col-span-2 lg:row-span-2'
                  : 'border border-ink/[0.07] bg-white shadow-[0_12px_32px_-18px_rgba(11,26,43,0.28)] hover:shadow-[0_20px_44px_-20px_rgba(30,47,168,0.32)]',
                i === 1 && 'lg:col-span-2',
              )}
            >
              {/* Hairline that draws across the card head as it lands */}
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
                {s.count}{s.suffix}
              </div>
              <p
                className={cn(
                  'relative leading-relaxed text-ink-soft',
                  i === 0 ? 'max-w-[18ch] text-sm' : 'text-xs',
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
const WHY_ITEMS = [
  {
    icon: Users,
    title: 'Audience-led content',
    description: 'Every idea starts with understanding what will make people see, click, and engage with it.',
  },
  {
    icon: Workflow,
    title: 'Strategy Meets Execution',
    description: 'The strategy behind the content stays connected to the team actually creating and delivering it.',
  },
  {
    icon: TrendingUp,
    title: 'Designed for Growth',
    description: 'Repeatable workflows help increase output while maintaining consistency and creative quality.',
  },
  {
    icon: Sparkles,
    title: 'AI that brings value',
    description: 'We use insights and AI-driven workflows to improve decisions, streamline execution, and keep evolving what works.',
  },
];

function WhyPushWebbSection() {
  return (
    <section className="reveal-section relative py-16 md:py-32 border-t border-line overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="anim-eyebrow eyebrow mb-3">Why PUSHWebb</p>
            <h2 className="split-h2 text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-1.5px] max-w-xl">
              More Than Content. A System Built to Grow.
            </h2>
          </div>
        </div>

        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px] gap-3 mb-8">
          {WHY_ITEMS.map((item, i) => {
            const Icon = item.icon;
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
                <h3 className={cn('font-display text-ink font-medium mb-2', big ? 'text-lg' : 'text-sm')}>
                  {item.title}
                </h3>
                <CardDetail text={item.description} />
              </div>
            );
          })}
        </div>

        <a
          href="/contact"
          className="group inline-flex items-center gap-2 font-display text-ink-muted hover:text-ink text-sm font-medium transition-colors duration-200"
        >
          Know more
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   STORIES OF TRUST AND GROWTH (client proof)
   Quotes stay verbatim; the two proof tiles are set in the agency
   voice like the rest of the deck.
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

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'PUSHWebb understood my vision clearly and delivered strategies that exceeded my expectations!',
    name: 'Dr. Lalit Arora',
    role: 'Sales Coach',
    span: 'md:col-span-5',
    avatar: '/logos/lalit-arora.jpg',
  },
  {
    quote:
      'PUSHWebb’s content and video editing services gave our brand a fresh edge. They turn ideas into impactful stories.',
    name: 'Ansh Bhayana',
    role: 'Capture a Trip',
    span: 'md:col-span-4',
    avatar: '/logos/ansh-bhayana.jpg',
  },
  {
    quote:
      'His design skills are unmatched. He transformed my ideas into a high-performing, visually striking website.',
    name: 'Karandeep Singh',
    role: 'Serial Industrialist',
    span: 'md:col-span-4',
  },
  {
    quote:
      'Their video editing skills are top-notch. Transformed raw content into polished, impactful visuals that truly stand out.',
    name: 'FRND',
    role: 'Company',
    span: 'md:col-span-5',
    avatar: '/logos/frnd.webp',
  },
];

const PROOF_TILES = [
  {
    count: 98,
    suffix: '%',
    label: 'Satisfaction Rate',
    detail: 'We’ve worked with 50+ happy clients',
  },
  {
    count: 200,
    suffix: '%',
    label: 'Growth',
    detail: 'Our work helped clients grow their revenue by 200%',
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
          <h2 className="split-h2 mb-4 font-display text-3xl leading-[1.08] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
            Stories of Trust and Growth
          </h2>
        </div>

        <div className="reveal-stagger grid gap-4 md:grid-cols-12">
          {TESTIMONIALS.slice(0, 2).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}

          {PROOF_TILES.map((tile) => (
            <div
              key={tile.label}
              className="premium-navy-card relative flex flex-col justify-center overflow-hidden rounded-2xl border border-white/15 p-6 shadow-[0_18px_44px_-20px_rgba(6,13,29,0.65)] md:col-span-3"
            >
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
              <div
                className="stat-number relative font-display text-4xl font-bold leading-none tracking-[-1px] text-white sm:text-5xl"
                data-count={String(tile.count)}
                data-suffix={tile.suffix}
              >
                {tile.count}{tile.suffix}
              </div>
              <p className="relative mt-2 font-display text-sm font-medium text-white">{tile.label}</p>
              <p className="relative mt-1 text-[11px] leading-relaxed text-[#b4b4b4]">{tile.detail}</p>
            </div>
          ))}

          {TESTIMONIALS.slice(2).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   ABOUT US
──────────────────────────────────────────────────────────────── */
function AboutSection() {
  const stats = [
    {
      value: '06',
      label: 'Growth disciplines under one roof',
      detail: 'Strategy · Production · Performance · AI',
      count: 6,
      suffix: '',
    },
    {
      value: '04',
      label: 'Step scaling & execution framework',
      detail: 'Discover · Architect · Scale · Automate',
      count: 4,
      suffix: '',
    },
    {
      value: '24h',
      label: 'Strategy response & turnaround SLA',
      detail: 'Direct access to senior creative leads',
      count: 24,
      suffix: 'h',
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

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-[-1.5px] text-ink leading-[1.08] max-w-3xl">
            We Don&apos;t Just Produce Content. We Build Growth Systems.
          </h2>
        </div>

        {/* 2-Column Minimalist Grid */}
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-stretch">

          {/* Left Column: Narrative Card */}
          <div
            id="about-main-card"
            className="premium-card lg:col-span-3 flex flex-col justify-between rounded-3xl border border-ink/10 bg-surface p-7 sm:p-9 backdrop-blur-2xl hover:border-ink/20"
          >
            <div className="space-y-4">
              <p className="font-display text-lg sm:text-xl text-ink font-medium leading-relaxed">
                PUSHWebb is a creative, AI-powered marketing agency providing structured and predictable growth to creators, brands, and enterprise teams.
              </p>


            </div>

            {/* Bottom Founder / Team Trust & Action Row */}
            <div className="mt-8 pt-6 border-t border-ink/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="about-avatars flex -space-x-2.5">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-paper shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/pushwebb-assets/generated/team-studio.jpg" alt="PUSHWebb team" className="w-full h-full object-cover" />
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

              <a
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-2.5 font-display text-xs font-semibold text-paper no-underline shadow-[0_8px_20px_-12px_rgba(11,26,43,0.3)] transition-all duration-200 hover:bg-ink/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Know More About Us</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Minimal Glass Stat Tiles */}
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

                <p className="text-ink text-sm font-medium mb-1">{s.label}</p>
                <p className="text-ink-muted text-xs">{s.detail}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   LOCATIONS
──────────────────────────────────────────────────────────────── */
function LocationsSection() {
  return (
    <section id="locations" className="reveal-section relative py-16 md:py-28 bg-paper border-t border-line overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.06] px-4 py-1 text-xs font-medium text-ink backdrop-blur-md mb-3 shadow-[inset_0_1px_0_rgba(11,26,43,0.15)]">
            <MapPin className="h-3.5 w-3.5 text-ink" />
            <span>GLOBAL FOOTPRINT · WHERE WE OPERATE</span>
          </div>
          <h2 className="split-h2 font-display text-3xl sm:text-4xl md:text-5xl font-medium text-ink leading-[1.08] tracking-[-1.5px] mb-4 max-w-2xl mx-auto">
            Serving Brands Across India, Dubai &amp; Beyond
          </h2>
        </div>

        <div className="reveal-stagger grid md:grid-cols-5 gap-6 mb-10">
          <div className="group relative md:col-span-3 min-h-[360px] sm:min-h-[380px] rounded-3xl border border-ink/15 overflow-hidden shadow-[0_18px_50px_-24px_rgba(11,26,43,0.30)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pushwebb-assets/generated/mumbai-blue-hour.jpg"
              alt="Mumbai skyline, India"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04091a] via-[#0a1630]/72 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-7 sm:p-9">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="inline-block font-display text-[10px] tracking-widest uppercase text-white bg-white/15 border border-white/25 backdrop-blur-md rounded-full px-3 py-1 mb-3 w-fit">
                Headquarters · Studio
              </span>
              <h3 className="font-display text-white font-medium text-2xl mb-2">India</h3>
            </div>
          </div>

          <div className="group relative md:col-span-2 min-h-[360px] sm:min-h-[380px] rounded-3xl border border-ink/15 overflow-hidden shadow-[0_18px_50px_-24px_rgba(11,26,43,0.30)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/pushwebb-assets/generated/dubai-dusk.jpg"
              alt="Dubai skyline, UAE"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#04091a] via-[#0a1630]/72 to-transparent" />
            <div className="relative z-10 h-full flex flex-col justify-end p-7 sm:p-9">
              <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/25 backdrop-blur-md flex items-center justify-center mb-5">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="inline-block font-display text-[10px] tracking-widest uppercase text-white bg-white/15 border border-white/25 backdrop-blur-md rounded-full px-3 py-1 mb-3 w-fit">
                Growing Regional Hub
              </span>
              <h3 className="font-display text-white font-medium text-2xl mb-2">Dubai, UAE</h3>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/contact"
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
        <h2 className="split-h2 text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.08] tracking-[-1.5px] mb-5">
          Ready to Build a Better Growth System?
        </h2>
        <a
          href="/contact"
          className="group inline-flex items-center justify-center gap-2 bg-white hover:bg-[#eaeaea] text-[#060d1d] font-semibold py-3.5 px-8 rounded-lg text-sm transition-all duration-200 active:scale-[0.98]"
        >
          <span>Book a Strategy Call</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   FAQ
──────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What kind of clients does PUSHWebb work with?',
    a: 'We work with creators, personal brands, businesses, and marketing teams that need stronger content systems, more consistent execution, or additional creative and performance support.',
  },
  {
    q: 'Can PUSHWebb manage our social media end-to-end?',
    a: 'Yes. Depending on the scope, we can handle strategy, content planning, creative execution, captions, publishing, and ongoing performance monitoring across social platforms.',
  },
  {
    q: 'Do you work on both organic content and paid campaigns?',
    a: 'Yes. PUSHWebb works across organic content and paid marketing, helping brands connect creative, distribution, and performance instead of treating them as separate functions.',
  },
  {
    q: 'Do you handle content repurposing?',
    a: 'Yes. We can turn suitable long-form content, podcasts, and existing video assets into short-form content designed for platforms such as Instagram Reels and YouTube Shorts.',
  },
  {
    q: 'Does PUSHWebb provide video production and editing?',
    a: 'Yes. Production and post-production are part of our content capabilities and can be included depending on the service and project scope.',
  },
  {
    q: 'How do you decide what content to create?',
    a: 'We start by understanding your audience, goals, brand positioning, current content, and what you are trying to achieve. From there, we build a content direction around what makes sense for your brand and platform.',
  },
  {
    q: 'Do you provide reporting and performance insights?',
    a: 'Yes. Depending on the engagement, we review relevant performance data to understand what is working, what needs improvement, and what should inform the next phase of content or campaigns.',
  },
  {
    q: 'Can PUSHWebb help us increase content output without building a larger internal team?',
    a: 'Yes. Our workflows are designed to support consistent content execution and help brands manage higher output without having to build every capability in-house.',
  },
  {
    q: 'Can we hire PUSHWebb for a specific campaign or project?',
    a: 'Yes. Alongside ongoing engagements, we can work on focused projects where the scope fits our capabilities.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-ink font-medium text-sm sm:text-base">{q}</span>
        <span className="shrink-0 w-6 h-6 rounded-lg bg-surface border border-line flex items-center justify-center text-ink-soft">
          {open ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
        </span>
      </button>
      {open && (
        <p className="text-ink-soft text-sm leading-relaxed mt-3 pr-8">{a}</p>
      )}
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="reveal-section relative py-16 md:py-32 border-t border-line bg-paper">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <p className="anim-eyebrow eyebrow mb-3">FAQs</p>
          <h2 className="split-h2 text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05] tracking-[-1.5px]">
            Questions, Answered
          </h2>
        </div>
        <div className="reveal-stagger">
          {FAQS.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
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

      {/* Paper — the deck's light body */}
      <MissionSection />
      <WhatWeDoSection />
      <AboutSection />
      <FrameworkSection />
      <TestimonialsSection />

      {/* Proof runs roster → numbers → method. The numbers break the dark
          stage on purpose: a white band between two navy ones keeps the
          headline figures from getting lost inside one long dark stretch. */}
      <div className="on-dark dark-zone">
        <ClientLogoWall />
      </div>

      <StatsSection />

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
