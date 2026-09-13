'use client';

import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './agency-landing';
import { useGsapScrollAnimations } from '@/components/animations/gsap-scroll-provider';
import { MarqueeTicker } from '@/components/animations/marquee-ticker';
import { ServicesChannelList } from './services-channels';
import { SelectedWorkSection } from './selected-work';
import { ExpandButton } from '@/components/ui/expand-button';
import { SERVICE_CHANNELS } from '@/lib/services';
import { CTA_HREF, CTA_LABEL } from '@/lib/site';

// One ticker entry per section below, so a new service shows up in both.
const TICKER_ITEMS = SERVICE_CHANNELS.map((channel) => channel.name.toUpperCase());

/* Proof sits directly under the hero: someone on the Services page is
   already evaluating whether PUSHWebb can deliver, so the figures come
   before any further explanation. */
const PROOF_BAR = [
  { value: '5B+', label: 'Views Generated' },
  { value: '1,500+', label: 'Videos Per Month' },
  { value: '10+', label: 'YouTube Channels Managed' },
  { value: '7+', label: 'Years in Content' },
];

function ServicesHero() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper pb-14 pt-12 md:pb-20 md:pt-16">
      {/* Faint scanline texture — broadcast/monitor atmosphere, kept subtle */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #0B1A2B 0px, #0B1A2B 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="container relative z-10 mx-auto max-w-5xl px-4 text-center md:px-8">
        <p id="hero-tagline" className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-gold font-bold">
          Content · Creative · Performance · AI
        </p>
        <h1
          id="hero-headline"
          className="mx-auto max-w-3xl font-display font-medium leading-[1.03] tracking-[-1.5px] text-ink text-[clamp(2.25rem,6vw,4.25rem)]"
        >
          Six Growth Capabilities. One Connected Content System.
        </h1>
        <div id="hero-services" className="mx-auto mt-6 max-w-xl space-y-3">
          <p className="text-sm leading-relaxed text-ink-soft md:text-base">
            PUSHWebb brings YouTube, short form content, video production, social media, paid
            performance and AI under one operating system, giving brands one team from strategy to
            execution and optimisation.
          </p>
        </div>
        <div id="hero-cta" className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={CTA_HREF}
            className="inline-flex h-[54px] select-none items-center justify-center gap-2.5 rounded-lg bg-ink hover:bg-ink/90 px-8 text-sm font-semibold text-paper no-underline transition-all duration-200 active:scale-[0.97]"
          >
            {CTA_LABEL}
            <ArrowRight className="w-4 h-4" strokeWidth={2.4} />
          </a>
          <ExpandButton href="/work" label="See Our Work" />
        </div>
      </div>
    </section>
  );
}

function ProofBar() {
  return (
    <section className="reveal-section border-b border-line bg-surface">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <dl className="reveal-stagger grid grid-cols-2 md:grid-cols-4">
          {PROOF_BAR.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col items-center gap-1.5 px-3 py-7 text-center md:py-8 ${
                i % 2 === 1 ? 'border-l border-line' : ''
              } ${i >= 2 ? 'border-t border-line md:border-t-0' : ''} ${
                i === 2 ? 'md:border-l md:border-line' : ''
              }`}
            >
              <dt className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-bold leading-none tracking-[-0.03em] text-ink">
                {item.value}
              </dt>
              <dd className="font-mono text-[9px] uppercase leading-[1.5] tracking-[0.13em] text-ink-muted sm:text-[10px]">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function HowPushWebbWorks() {
  return (
    <section id="services" className="reveal-section relative bg-paper py-14 md:py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center md:px-8">
        <p className="anim-eyebrow eyebrow mb-3">How PUSHWebb Works</p>
        <h2 className="split-h2 mb-6 font-display text-3xl leading-[1.08] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
          Use One Capability. Or Connect the Whole System.
        </h2>
        <p className="reveal-stagger text-sm leading-relaxed text-ink-soft md:text-base">
          Start with the service you need today. As your content operation grows, PUSHWebb can
          connect strategy, production, distribution, performance and AI into one scalable workflow.
        </p>
      </div>
    </section>
  );
}

/** The single mid-page booking prompt, dropped between service 03 and 04. */
function MidPageCTA() {
  return (
    <div className="on-dark dark-zone">
      <section className="reveal-section border-t border-line py-14 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center md:px-8">
          <h2 className="split-h2 mb-4 font-display text-2xl leading-[1.1] tracking-[-1px] text-ink sm:text-3xl md:text-4xl">
            Not sure which capability you need first?
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
            Tell us where growth is getting stuck and we will point you at the right starting
            point — one service or the whole system.
          </p>
          <a
            href={CTA_HREF}
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#060d1d] no-underline transition-all duration-200 hover:bg-[#eaeaea] active:scale-[0.98]"
          >
            <span>{CTA_LABEL}</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </section>
    </div>
  );
}

function ServicesFinalCTA() {
  return (
    <section className="reveal-section relative overflow-hidden border-t border-line bg-paper py-16 md:py-36">
      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
        <p className="anim-eyebrow eyebrow mb-5">Ready to Build Something Together?</p>
        <h2 className="split-h2 mb-6 font-display text-3xl leading-[1.08] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
          Start With One Service. Scale With One System.
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
          Tell us where growth is currently getting stuck. We&apos;ll help identify the right
          combination of strategy, content, distribution, performance and AI.
        </p>
        <a
          href={CTA_HREF}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-ink hover:bg-ink/90 px-8 py-3.5 text-sm font-semibold text-paper no-underline transition-all duration-200 active:scale-[0.98]"
        >
          <span>{CTA_LABEL}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>

        {/* Entity and geography, as plain crawlable text. The homepage
            carries the fuller geographic story. */}
        <p className="mx-auto mt-12 max-w-2xl border-t border-line pt-8 text-xs leading-relaxed text-ink-muted sm:text-sm">
          PUSHWebb delivers content, creative, performance and AI services for brands and creators
          across Dubai and international markets.
        </p>
      </div>
    </section>
  );
}

export function ServicesPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useGsapScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="bg-paper">
      <NavbarModernBlock />
      <ServicesHero />
      <ProofBar />
      <MarqueeTicker items={TICKER_ITEMS} />
      <HowPushWebbWorks />
      <ServicesChannelList midBlock={<MidPageCTA />} />

      {/* Proof between the service explanation and the sales ask */}
      <div className="on-dark dark-zone">
        <SelectedWorkSection />
      </div>

      <ServicesFinalCTA />
      <Footer />
    </div>
  );
}
