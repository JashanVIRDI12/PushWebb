'use client';

import { useRef } from 'react';
import { Mail, MapPin, Clock, Eye, Clapperboard } from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './agency-landing';
import { useGsapScrollAnimations } from '@/components/animations/gsap-scroll-provider';
import { CalendlyInline } from '@/components/ui/calendly-inline';
import { CALENDLY_URL, CONTACT_EMAIL, CTA_LABEL, SOCIAL } from '@/lib/site';

function ContactHeader() {
  return (
    <section className="relative overflow-hidden bg-paper pb-12 pt-28 md:pb-16 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(55% 45% at 15% 0%, rgba(11,26,43,0.05) 0%, transparent 70%), radial-gradient(45% 40% at 88% 90%, rgba(30,47,168,0.06) 0%, transparent 72%)',
        }}
      />
      <div className="container relative z-10 mx-auto max-w-3xl px-4 text-center md:px-8">
        <p id="hero-tagline" className="eyebrow mb-5">Contact</p>
        {/* The display line carries the positioning; the H1 states the page
            plainly so search engines and AI systems read it unambiguously. */}
        <h1 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-muted">
          Contact PUSHWebb
        </h1>
        <p
          id="hero-headline"
          className="mb-5 font-display text-[clamp(2rem,5.4vw,3.9rem)] font-medium leading-[0.96] tracking-[-0.02em] text-ink"
        >
          Let&apos;s Build the Right Growth System for It.
        </p>
        <p className="mx-auto max-w-xl text-sm leading-relaxed text-ink-soft md:text-base">
          Tell us what you&apos;re building, where growth is getting stuck, and what you want content
          to achieve. We&apos;ll help map the right next step.
        </p>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────
   WHAT HAPPENS NEXT — sets expectations before a call is booked
──────────────────────────────────────────────────────────────── */
const NEXT_STEPS = [
  {
    title: "Tell Us What You're Building",
    description: 'Share your business, goals, current content setup and where you need support.',
  },
  {
    title: 'We Review the Fit',
    description:
      'Our team reviews your requirements and identifies where PUSHWebb can create the most value.',
  },
  {
    title: 'Build the Roadmap',
    description:
      "If there's a fit, we get on a strategy call, define the right scope and map the path from strategy to execution.",
  },
];

function WhatHappensNext() {
  return (
    <div className="on-dark dark-zone">
      <section className="reveal-section relative border-t border-line py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4 md:px-8">
          <div className="mb-10 text-center md:mb-14">
            <p className="anim-eyebrow eyebrow mb-3">What Happens Next</p>
            <h2 className="split-h2 text-3xl leading-[1.06] tracking-[-0.02em] text-ink sm:text-4xl">
              Three Simple Steps. No Sales Maze.
            </h2>
          </div>

          <div className="reveal-stagger grid gap-6 md:grid-cols-3">
            {NEXT_STEPS.map((step, i) => (
              <div key={step.title} className="relative pt-6">
                <span aria-hidden className="absolute inset-x-0 top-0 h-px bg-line" />
                <span className="font-display text-xs font-semibold tracking-[0.18em] text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mb-2 mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** Scale figures sit beside the calendar, where someone is deciding whether
 *  to book a time. Brand book numbers, same as the About page. */
const FORM_PROOF = [
  {
    icon: Eye,
    value: '5B+',
    label: 'Views Generated',
    note: 'Across content and channels worked on by our team',
  },
  {
    icon: Clapperboard,
    value: '1,500+',
    label: 'Videos Per Month',
    note: 'Built through structured production systems',
  },
];

function InfoPanel() {
  const items = [
    {
      icon: Mail,
      label: 'Email',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
    },
    {
      icon: Clock,
      label: 'Response time',
      value: 'Reply within 24 hours',
    },
  ];

  const socials: { label: string; href: string | null }[] = [
    { label: 'Instagram', href: SOCIAL.instagram },
    { label: 'LinkedIn', href: SOCIAL.linkedin },
    { label: 'YouTube', href: SOCIAL.youtube },
  ];

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const Icon = item.icon;
        const content = (
          <>
            <div className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center mb-4 shrink-0">
              <Icon className="w-4 h-4 text-ink" />
            </div>
            <p className="text-ink-muted text-[10px] uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-ink font-medium text-sm">{item.value}</p>
          </>
        );
        return item.href ? (
          <a key={item.label} href={item.href} className="premium-card bg-surface hover:bg-surface-hover border border-line rounded-xl p-5">
            {content}
          </a>
        ) : (
          <div key={item.label} className="premium-card bg-surface border border-line rounded-xl p-5">
            {content}
          </div>
        );
      })}

      {/* Proof, not more contact detail — this is the moment someone decides
          whether to book. */}
      {FORM_PROOF.map((proof) => {
        const Icon = proof.icon;
        return (
          <div key={proof.value} className="premium-card bg-surface border border-line rounded-xl p-5">
            <div className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center mb-4">
              <Icon className="w-4 h-4 text-ink" />
            </div>
            <p className="font-display text-3xl font-semibold leading-none tracking-[-0.03em] text-ink">
              {proof.value}
            </p>
            <p className="text-ink font-medium text-sm mt-1.5">{proof.label}</p>
            <p className="text-ink-muted text-[11px] leading-relaxed mt-2">{proof.note}</p>
          </div>
        );
      })}

      <div className="premium-card bg-surface border border-line rounded-xl p-5">
        <div className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center mb-4">
          <MapPin className="w-4 h-4 text-ink" />
        </div>
        <p className="text-ink-muted text-[10px] uppercase tracking-widest mb-2">
          Dubai · Global Delivery
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] text-ink-soft bg-surface border border-line rounded-lg px-2.5 py-1">Dubai, UAE</span>
          <span className="text-[11px] text-ink-soft bg-surface border border-line rounded-lg px-2.5 py-1">Global markets</span>
        </div>
      </div>

      <div className="premium-card bg-surface border border-line rounded-xl p-5">
        <p className="text-ink-muted text-[10px] uppercase tracking-widest mb-3">Follow PUSHWebb</p>
        <div className="flex gap-4 text-ink-soft text-sm">
          {socials.map((social) =>
            social.href ? (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink transition-colors duration-200"
              >
                {social.label}
              </a>
            ) : (
              // No profile URL yet — the name stays, the link doesn't.
              <span key={social.label} className="text-ink-muted">
                {social.label}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   BOOK A STRATEGY CALL — the calendar is the conversion path now;
   the enquiry form it replaced sent mail through EmailJS.
──────────────────────────────────────────────────────────────── */
function BookingSection() {
  return (
    <section id="contact" className="relative bg-paper border-t border-line pb-16 md:pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 pt-10 md:pt-14">
        <div className="grid md:grid-cols-5 gap-4">

          <div className="md:col-span-2 order-2 md:order-1">
            <InfoPanel />
          </div>

          <div className="premium-card md:col-span-3 order-1 md:order-2 bg-surface border border-line rounded-2xl p-5 sm:p-7">
            {/* Who we work with, stated before the calendar, so a visitor
                knows whether they fit before picking a time. */}
            <p className="anim-eyebrow eyebrow mb-2">
              Working across Dubai · Global markets
            </p>
            <p className="mb-5 text-[11px] text-ink-muted">
              Creators · Brands · Marketing Teams · Agencies
            </p>
            <h2 className="text-2xl sm:text-3xl text-ink leading-[1.1] tracking-[-1px] mb-3">
              {CTA_LABEL}
            </h2>
            <p className="mb-6 max-w-xl text-sm leading-relaxed text-ink-soft">
              Pick a time that works for you. We&apos;ll come prepared with questions about your
              content, your channels and where growth is getting stuck.
            </p>

            <CalendlyInline url={CALENDLY_URL} className="-mx-3 sm:mx-0" />

            {/* Email stays the fallback for anyone who would rather write. */}
            <p className="mt-5 border-t border-line pt-4 text-center text-[11px] leading-relaxed text-ink-muted">
              Prefer email? Write to{' '}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {CONTACT_EMAIL}
              </a>{' '}
              and we&apos;ll reply within 24 hours.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export function ContactPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  useGsapScrollAnimations(pageRef);

  return (
    <div ref={pageRef} className="bg-paper">
      <NavbarModernBlock />
      <ContactHeader />
      <BookingSection />
      <WhatHappensNext />
      <div className="on-dark dark-zone">
        <Footer />
      </div>
    </div>
  );
}
