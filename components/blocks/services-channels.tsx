'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import {
  ArrowRight,
  SquarePlay,
  Clapperboard,
  Bot,
  Share2,
  BarChart3,
  Film,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react';
import { SERVICE_CHANNELS, serviceHref, type ServiceChannel } from '@/lib/services';
import { cn } from '@/lib/utils';

type Channel = ServiceChannel;

/* The channel copy lives in lib/services so the navbar, the home cards and
   the Dubai page link to exactly these sections. Icons stay here. */
const CHANNELS = SERVICE_CHANNELS;

const CHANNEL_ICONS: Record<string, LucideIcon> = {
  yaas: SquarePlay,
  'short-form': Clapperboard,
  'video-production': Film,
  'ai-content': Bot,
  'social-media': Share2,
  performance: BarChart3,
};

/** A framed image that drifts subtly within its frame as the page scrolls past it. */
function ChannelFrame({ src, alt }: { src: string; alt: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const frame = frameRef.current;
    const imgWrap = imgWrapRef.current;
    if (!frame || !imgWrap) return;

    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        imgWrap,
        { y: -36 },
        {
          y: 36,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
        },
      );
    });

    return () => mm.revert();
  }, { scope: frameRef });

  return (
    <div ref={frameRef} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line md:aspect-[5/6]">
      <div
        ref={imgWrapRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: -36, height: 'calc(100% + 72px)' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/60 px-2.5 py-1 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-red-500" />
          <span className="font-mono text-[10px] tracking-widest text-white/85">REC</span>
        </span>
      </div>
    </div>
  );
}

function ChannelSection({ channel, index, reversed }: { channel: Channel; index: number; reversed: boolean }) {
  const Icon = CHANNEL_ICONS[channel.id] ?? SquarePlay;

  return (
    <section id={channel.id} className="channel-section reveal-section relative scroll-mt-28 border-t border-line py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
          <div className={cn('md:col-span-7', reversed && 'md:order-2')}>
            <div className="reveal-stagger">
              <p className="anim-eyebrow mb-4 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
                <Icon className="h-3.5 w-3.5 text-gold" />
                <span className="text-gold font-bold">Channel {String(index + 1).padStart(2, '0')}</span> — {channel.name}
              </p>
              <h2 className="split-h2 mb-5 font-display text-3xl leading-[1.08] tracking-[-1px] text-ink sm:text-4xl md:text-[2.6rem]">
                {channel.hook}
              </h2>
              <div className="mb-8 max-w-xl space-y-4">
                {channel.description.map((p) => (
                  <p key={p} className="text-sm leading-relaxed text-ink-soft md:text-base">
                    {p}
                  </p>
                ))}
              </div>

              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-gold font-bold">What We Cover</p>
              <ul className="mb-8 max-w-xl border-t border-line">
                {channel.cover.map((item, i) => (
                  <li key={item} className="flex items-baseline gap-4 border-b border-line py-2.5">
                    <span className="w-5 shrink-0 font-mono text-[10px] text-ink-muted">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm leading-relaxed text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Named delivery models — the deck's own structure for how
                  this capability is actually produced. */}
              {channel.frameworks?.map((framework) => (
                <div key={framework.label} className="mb-8 max-w-xl">
                  <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
                    {framework.label}
                  </p>
                  <dl className="border-t border-line">
                    {framework.items.map((item) => (
                      <div key={item.name} className="border-b border-line py-3">
                        <dt className="font-display text-sm font-bold uppercase tracking-[-0.01em] text-ink">
                          {item.name}
                        </dt>
                        <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}

              {/* One substantiated proof line, where there is one — the
                  answer to "why believe PUSHWebb is good at this". */}
              {channel.proof ? (
                <p className="mb-6 flex items-start gap-2.5 text-sm text-ink">
                  <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                  <span className="font-medium">{channel.proof}</span>
                </p>
              ) : null}

              {/* Contextual link rather than a sixth identical booking
                  button; Book a Strategy Call stays in the navbar, the
                  hero, the mid-page block and the final CTA. */}
              <Link
                href={serviceHref(channel.id)}
                className="group inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-surface-hover"
              >
                {channel.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className={cn('md:col-span-5', reversed && 'md:order-1')}>
            <ChannelFrame src={channel.image} alt={channel.imageAlt} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Fixed left-edge service navigator — visible only alongside the channel
 *  list, highlights whichever section is centred in view. Numbers and names
 *  both show, so it navigates instead of just marking position. */
function ChannelRail() {
  return (
    <nav
      aria-label="Services"
      className="channel-rail pointer-events-none fixed left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 opacity-0 transition-opacity duration-300 xl:flex"
    >
      {CHANNELS.map((channel, i) => (
        <a
          key={channel.id}
          href={`#${channel.id}`}
          data-channel-rail-item={i}
          className="channel-rail-item group flex items-center gap-3"
          aria-label={channel.name}
        >
          <span className="channel-rail-dot h-1.5 w-1.5 rounded-full" />
          <span className="channel-rail-tag font-mono text-[10px] tracking-widest">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="channel-rail-label font-display text-xs font-semibold tracking-[-0.01em]">
            {channel.navLabel}
          </span>
        </a>
      ))}
    </nav>
  );
}

/** `midBlock` lands after the third service — the brief keeps one booking
 *  prompt mid-page, between the modules rather than after all six. */
export function ServicesChannelList({ midBlock }: { midBlock?: React.ReactNode }) {
  const scopeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const root = scopeRef.current;
    if (!root) return;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const triggers: ScrollTrigger[] = [];
      const zone = root.querySelector('#channel-rail-zone');
      const rail = root.querySelector('.channel-rail');

      if (zone && rail) {
        triggers.push(ScrollTrigger.create({
          trigger: zone,
          start: 'top center',
          end: 'bottom center',
          toggleClass: { targets: rail, className: 'is-visible' },
        }));
      }

      CHANNELS.forEach((channel, index) => {
        const section = root.querySelector(`#${channel.id}`);
        const item = root.querySelector(`[data-channel-rail-item="${index}"]`);
        if (!section || !item) return;
        triggers.push(ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleClass: { targets: item, className: 'is-active' },
        }));
      });

      return () => triggers.forEach((trigger) => trigger.kill());
    });
    return () => media.revert();
  }, { scope: scopeRef });

  return (
    <div ref={scopeRef} className="contents">
      <ChannelRail />
      <div id="channel-rail-zone">
        {CHANNELS.map((channel, i) => (
          <React.Fragment key={channel.id}>
            <ChannelSection channel={channel} index={i} reversed={i % 2 === 1} />
            {i === 2 ? midBlock : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
