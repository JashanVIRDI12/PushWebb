'use client';

import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import {
  ArrowRight,
  ArrowUpRight,
  SquarePlay,
  Clapperboard,
  Target,
  Bot,
  Share2,
  BarChart3,
  ChevronLeft,
  ChevronRight,
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
    <div className="service-card premium-card premium-lift group relative flex h-[490px] w-[340px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-surface p-6 backdrop-blur-2xl hover:-translate-y-1 hover:border-ink/30 hover:bg-surface-hover sm:w-[370px] sm:p-7 md:w-[390px]">
      {/* Ambient aura */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-ink/[0.04] opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/20 bg-ink/10 text-ink shadow-inner">
              <Icon className="h-4 w-4" />
            </div>
            <span className="rounded-full border border-ink/15 bg-ink/[0.06] px-3 py-0.5 font-display text-[10px] font-medium uppercase tracking-wider text-ink">
              {service.category}
            </span>
          </div>

          <span className="watermark-number font-display text-2xl font-bold tracking-tight text-ink/20 transition-colors duration-300 group-hover:text-ink/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Media */}
        <div className="card-media-wrapper relative mb-5 h-44 w-full overflow-hidden rounded-2xl border border-ink/15 bg-paper-alt shadow-inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="card-media-img h-full w-full scale-125 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04091a]/88 via-[#0a1630]/18 to-transparent opacity-75" />
        </div>

        <h3 className="mb-2 font-display text-xl font-medium tracking-tight text-ink sm:text-2xl">
          {service.title}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-ink-soft sm:text-[13px]">
          {service.description}
        </p>
      </div>

      <div className="relative z-10 border-t border-ink/[0.08] pt-4">
        <a
          href="/contact"
          className="group/cta inline-flex w-full items-center justify-between font-display text-xs font-medium text-ink no-underline transition-colors duration-200 sm:text-sm"
        >
          <span className="tracking-wide">{service.cta}</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-ink/15 bg-ink/10 transition-all duration-200 group-hover/cta:scale-105 group-hover/cta:bg-ink group-hover/cta:text-paper">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
          </div>
        </a>
      </div>
    </div>
  );
}

function ClosingCard() {
  return (
    <div className="service-card group relative flex h-[490px] w-[340px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl bg-[#0a152c] border border-white/15 p-7 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.6)] transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[0_26px_60px_-24px_rgba(0,0,0,0.8)] sm:w-[370px] sm:p-8 md:w-[390px]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white transition-transform duration-300 group-hover:scale-110">
          <Sparkles className="h-5 w-5 text-white" />
        </div>

        <span className="mb-3 block font-display text-xs font-medium uppercase tracking-widest text-[#b4b4b4]">
          Unified Growth Engine
        </span>

        <h3 className="mb-4 font-display text-2xl font-medium leading-tight text-white sm:text-3xl">
          Every Growth Lever, Connected as One.
        </h3>

        <p className="text-xs leading-relaxed text-[#b4b4b4] sm:text-sm">
          We connect video, distribution, performance ads, and automation into a single scalable
          growth system.
        </p>
      </div>

      <div className="relative z-10 border-t border-white/15 pt-4">
        <a
          href="/contact"
          className="group/btn flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-3.5 font-display text-sm font-semibold text-[#060d1d] no-underline transition-all duration-200 hover:scale-[1.02] hover:bg-[#eaeaea] active:scale-[0.98]"
        >
          <span>Book a Brainstorming Call</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </a>
      </div>
    </div>
  );
}

export function WhatWeDoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressLabelRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) return;

      const mm = gsap.matchMedia();

      // ── Touch / small screens: native horizontal scroll, drive the progress UI
      mm.add('(max-width: 1023px)', () => {
        let frame = 0;
        let activeIndex = -1;
        const setProgressScale = progressBarRef.current
          ? gsap.quickSetter(progressBarRef.current, 'scaleX')
          : null;
        const updateProgress = () => {
          frame = 0;
          const max = Math.max(1, track.scrollWidth - track.clientWidth);
          const progress = Math.max(0, Math.min(1, track.scrollLeft / max));
          const nextIndex = Math.min(
            SERVICES.length - 1,
            Math.round(progress * (SERVICES.length - 1)),
          );
          if (nextIndex !== activeIndex && progressLabelRef.current) {
            activeIndex = nextIndex;
            progressLabelRef.current.textContent = String(nextIndex + 1).padStart(2, '0');
          }
          setProgressScale?.(Math.max(0.16, progress));
        };
        const scheduleProgress = () => {
          if (!frame) frame = requestAnimationFrame(updateProgress);
        };
        track.addEventListener('scroll', scheduleProgress, { passive: true });
        updateProgress();
        return () => {
          cancelAnimationFrame(frame);
          track.removeEventListener('scroll', scheduleProgress);
        };
      });

      // ── Desktop: pin the section, map vertical scroll 1:1 onto the row
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        // Exact horizontal overrun — no fudge factors, so the vertical scroll
        // maps straight onto it.
        const getDistance = () => Math.max(0, track.scrollWidth - track.clientWidth);
        // Hold the pin below the floating navbar.
        const getNavOffset = () => {
          const raw = getComputedStyle(document.documentElement).getPropertyValue(
            '--site-nav-height',
          );
          return (parseInt(raw, 10) || 80) + 28;
        };
        // One card + the flex gap (gap-6 = 24px), as a fraction of total travel.
        const getStep = () => {
          const first = track.querySelector<HTMLElement>('.service-card');
          const dist = getDistance();
          if (!first || dist <= 0) return 0;
          return (first.offsetWidth + 24) / dist;
        };
        let activeIndex = -1;
        const setProgressScale = progressBarRef.current
          ? gsap.quickSetter(progressBarRef.current, 'scaleX')
          : null;

        const tween = gsap.to(track, {
          x: () => -getDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: stage,
            start: () => `top top+=${getNavOffset()}`,
            end: () => `+=${getDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Settle on a whole card when the scroll stops.
            snap: {
              snapTo: (value) => {
                const step = getStep();
                return step > 0 ? Math.min(1, Math.round(value / step) * step) : value;
              },
              duration: { min: 0.15, max: 0.35 },
              delay: 0.04,
              ease: 'power1.inOut',
            },
            onUpdate: (self) => {
              const nextIndex = Math.min(
                SERVICES.length - 1,
                Math.round(self.progress * (SERVICES.length - 1)),
              );
              if (nextIndex !== activeIndex && progressLabelRef.current) {
                activeIndex = nextIndex;
                progressLabelRef.current.textContent = String(nextIndex + 1).padStart(2, '0');
              }
              setProgressScale?.(Math.max(0.16, self.progress));
            },
          },
        });

        // Parallax the card images against the horizontal scroll.
        const cards = gsap.utils.toArray<HTMLElement>(track.querySelectorAll('.service-card'));
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>('.card-media-img');
          if (!img) return;
          gsap.fromTo(
            img,
            { xPercent: -12 },
            {
              xPercent: 12,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: 'left 95%',
                end: 'right 5%',
                scrub: true,
              },
            },
          );
        });

        let refreshFrame = 0;
        const refresh = () => ScrollTrigger.refresh();
        if (document.readyState === 'complete') {
          refreshFrame = requestAnimationFrame(refresh);
        } else {
          window.addEventListener('load', refresh);
        }

        return () => {
          cancelAnimationFrame(refreshFrame);
          window.removeEventListener('load', refresh);
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  const scrollBy = (direction: 'left' | 'right') => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -420 : 420, behavior: 'smooth' });
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="reveal-section relative w-full overflow-hidden border-t border-line bg-paper pt-14 pb-2 md:pt-20 md:pb-4"
    >
      <div ref={stageRef} className="w-full">
        {/* Header */}
        <div className="mb-6 w-full px-4 sm:mb-8 sm:px-8 lg:px-12">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-ink/[0.06] px-4 py-1 text-xs font-medium text-ink shadow-[inset_0_1px_0_rgba(11,26,43,0.15)] backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 text-ink" />
                <span>WHAT WE DO · 6 CORE DISCIPLINES</span>
              </div>

              <h2 className="split-h2 max-w-3xl font-display text-3xl font-medium leading-[1.08] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
                We Turn Creative Ideas Into Growth Systems
              </h2>

            </div>

            {/* Progress + manual nav */}
            <div className="flex shrink-0 items-center gap-4">
              <div className="flex items-center gap-2.5">
                <span ref={progressLabelRef} className="font-display text-sm font-semibold text-ink">
                  01
                </span>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-ink/15">
                  <div
                    ref={progressBarRef}
                    className="h-full origin-left bg-ink shadow-[0_0_8px_rgba(11,26,43,0.8)]"
                    style={{ transform: 'scaleX(0.16)' }}
                  />
                </div>
                <span className="font-display text-xs text-ink-muted">
                  {String(SERVICES.length).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-1.5 lg:hidden">
                <button
                  type="button"
                  onClick={() => scrollBy('left')}
                  aria-label="Scroll left"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-ink/10 text-ink transition-all hover:bg-ink hover:text-paper active:scale-95"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollBy('right')}
                  aria-label="Scroll right"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-ink/10 text-ink transition-all hover:bg-ink hover:text-paper active:scale-95"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll track. The viewport clips the row sideways; the
            track's vertical padding keeps card hover-lift and drop shadows
            inside that clip box so nothing gets sheared. */}
        <div className="services-track-viewport w-full overflow-hidden">
          <div
            ref={trackRef}
            className="services-track no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-4 pt-8 pb-20 will-change-transform sm:px-8 lg:overflow-visible lg:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
            <ClosingCard />
          </div>
        </div>
      </div>
    </section>
  );
}
