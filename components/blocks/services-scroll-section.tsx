'use client';

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  SquarePlay,
  Clapperboard,
  Target,
  Bot,
  Share2,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  title: string;
  category: string;
  image: string;
  description: string;
  bullets: string[];
  cta: string;
};

const SERVICES: Service[] = [
  {
    icon: SquarePlay,
    title: 'YAAS — YouTube as a Service',
    category: 'Channel Growth',
    image: '/pushwebb-assets/generated/youtube-studio.jpg',
    description:
      'Complete YouTube ecosystem management from scripting to production, publishing, and SEO optimization so that audience growth becomes structured and predictable.',
    bullets: [
      'High-retention structure & packaging',
      'End-to-end production & thumbnails',
      'Continuous algorithmic optimization',
    ],
    cta: 'Explore YouTube as a Service',
  },
  {
    icon: Clapperboard,
    title: 'Microcontent Mastery',
    category: 'Short-Form Video',
    image: '/pushwebb-assets/generated/microcontent-shoot.jpg',
    description:
      'Platform-native short-form content engineered to capture attention in the first 3 seconds, maximize watch time, and drive rapid organic reach across Reels & Shorts.',
    bullets: [
      'Hook-driven narrative engineering',
      'High-velocity editing & pacing',
      'Data-backed format experimentation',
    ],
    cta: 'Explore Microcontent Mastery',
  },
  {
    icon: Target,
    title: 'ROI-Driven Ad Campaigns',
    category: 'Paid Performance',
    image: '/pushwebb-assets/generated/paid-campaign-review.jpg',
    description:
      'High-performing paid media campaigns combining creative storytelling with rigorous targeting, multivariate testing, and full-funnel optimization.',
    bullets: [
      'Full-funnel Meta, Google & YouTube ads',
      'Dynamic creative testing & iteration',
      'Obsessive ROAS & CAC optimization',
    ],
    cta: 'Explore ROI-Driven Ad Campaigns',
  },
  {
    icon: Bot,
    title: 'AI Automation',
    category: 'Intelligent Workflows',
    image: '/pushwebb-assets/generated/ai-workflow.jpg',
    description:
      'Building automated AI systems for content repurposing, metadata generation, distribution workflows, and real-time performance analytics.',
    bullets: [
      'Automated repurposing pipelines',
      'AI-powered scheduling & publishing',
      'Real-time predictive growth data',
    ],
    cta: 'Explore AI Automation',
  },
  {
    icon: Share2,
    title: 'Social Media Marketing',
    category: 'Brand Strategy',
    image: '/pushwebb-assets/generated/social-strategy.jpg',
    description:
      'Cultivating high-trust brand authority across social channels through cohesive visual direction, structured content calendars, and community engagement.',
    bullets: [
      'Cohesive omnichannel positioning',
      'Multi-platform content execution',
      'Audience conversion architecture',
    ],
    cta: 'Explore Social Media Marketing',
  },
  {
    icon: BarChart3,
    title: 'Performance Marketing',
    category: 'Growth & Scaling',
    image: '/pushwebb-assets/generated/performance-analytics.jpg',
    description:
      'Managing media budgets with surgical precision, measuring cross-channel attribution, and aggressively scaling top-performing customer acquisition funnels.',
    bullets: [
      'Comprehensive budget efficiency modeling',
      'Multi-touch attribution tracking',
      'Scalable paid acquisition engines',
    ],
    cta: 'Explore Performance Marketing',
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <article className="service-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-surface p-5 sm:p-6 shadow-[0_12px_32px_-18px_rgba(11,26,43,0.24)] transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-ink/30 hover:bg-surface-hover hover:shadow-[0_22px_44px_-20px_rgba(11,26,43,0.32)]">
      {/* Accent rule across the head */}
      <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-accent/40" />

      {/* Header: icon + category, watermark index */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-ink/20 bg-ink/10 text-ink">
            <Icon className="h-4 w-4" />
          </div>
          <span className="rounded-full border border-ink/15 bg-ink/[0.06] px-3 py-0.5 font-display text-[10px] font-medium uppercase tracking-wider text-ink">
            {service.category}
          </span>
        </div>
        <span className="font-display text-2xl font-bold tracking-tight text-ink/15 transition-colors duration-300 group-hover:text-ink/35">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Media */}
      <div className="relative mb-5 h-40 w-full overflow-hidden rounded-xl border border-ink/10 bg-paper-alt shadow-inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="h-full w-full scale-105 object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent opacity-60" />
      </div>

      {/* Copy */}
      <h3 className="mb-2 font-display text-lg font-medium tracking-tight text-ink sm:text-xl">
        {service.title}
      </h3>
      <p className="mb-4 text-[13px] leading-relaxed text-ink-soft">{service.description}</p>

      <ul className="mb-6 space-y-2">
        {service.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-xs leading-relaxed text-ink-soft">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.4} />
            {bullet}
          </li>
        ))}
      </ul>

      {/* Action */}
      <a
        href="/contact"
        className="mt-auto flex items-center justify-between border-t border-ink/[0.08] pt-4 font-display text-sm font-medium text-ink no-underline transition-colors duration-200 hover:text-accent"
      >
        <span className="tracking-wide">{service.cta}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 bg-ink/10 transition-all duration-200 group-hover:scale-105 group-hover:bg-ink group-hover:text-paper">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </a>
    </article>
  );
}

function UnifiedGrowthPanel() {
  return (
    <div className="relative mt-6 overflow-hidden rounded-2xl bg-ink p-8 sm:mt-8 sm:p-10 md:p-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-7 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="max-w-xl">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-paper">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="mb-2 block font-display text-xs font-medium uppercase tracking-widest text-paper/60">
            Unified Growth Engine
          </span>
          <h3 className="font-display text-2xl font-medium leading-tight text-paper sm:text-3xl">
            Every Growth Lever, Connected as One.
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-paper/70">
            We connect video, distribution, performance ads, and automation into a single scalable
            growth system.
          </p>
        </div>

        <a
          href="/contact"
          className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-paper px-6 py-3.5 font-display text-sm font-semibold text-ink no-underline transition-all duration-200 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
        >
          <span>Book a Brainstorming Call</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export function WhatWeDoSection() {
  return (
    <section
      id="services"
      className="reveal-section relative w-full overflow-hidden border-t border-line bg-paper py-16 md:py-28"
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.06] px-4 py-1 text-xs font-medium text-ink shadow-[inset_0_1px_0_rgba(11,26,43,0.15)]">
              <Sparkles className="h-3.5 w-3.5 text-ink" />
              <span>WHAT WE DO · 6 CORE DISCIPLINES</span>
            </div>

            <h2 className="split-h2 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
              We Turn Creative Ideas Into Growth Systems
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-ink-soft md:text-right">
            Six connected disciplines. Take one on its own, or run them together as a single growth
            system.
          </p>
        </div>

        {/* Grid */}
        <div className="reveal-stagger grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>

        <UnifiedGrowthPanel />
      </div>
    </section>
  );
}
