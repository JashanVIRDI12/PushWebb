'use client';

import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Mail,
  MapPin,
  Clock,
  Phone,
  Eye,
  Clapperboard,
} from 'lucide-react';
import { useToast } from '@/components/ui/toast';
import { cn } from '@/lib/utils';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './agency-landing';
import { useGsapScrollAnimations } from '@/components/animations/gsap-scroll-provider';
import { CalendlyInline } from '@/components/ui/calendly-inline';
import { CALENDLY_URL, CONTACT_EMAIL, PHONES, SOCIAL } from '@/lib/site';

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
   WHAT HAPPENS NEXT — sets expectations before the form is sent
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

/** Scale figures sit beside the form, where someone is deciding whether to
 *  hand over their details. Brand book numbers, same as the About page. */
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
          whether to submit their details. */}
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

      {/* Numbers are hidden for now; the card returns when PHONES has entries. */}
      {PHONES.length > 0 ? (
        <div className="premium-card bg-surface border border-line rounded-xl p-5">
          <div className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center mb-4">
            <Phone className="w-4 h-4 text-ink" />
          </div>
          <p className="text-ink-muted text-[10px] uppercase tracking-widest mb-2">Speak with our team</p>
          <div className="flex flex-col gap-1">
            {PHONES.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                className="text-ink font-medium text-sm hover:text-accent transition-colors duration-200"
              >
                {phone.label}
              </a>
            ))}
          </div>
        </div>
      ) : null}

      <div className="premium-card bg-surface border border-line rounded-xl p-5">
        <div className="w-9 h-9 rounded-lg bg-surface border border-line flex items-center justify-center mb-4">
          <MapPin className="w-4 h-4 text-ink" />
        </div>
        <p className="text-ink-muted text-[10px] uppercase tracking-widest mb-2">
          India · Dubai · Global Delivery
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="text-[11px] text-ink-soft bg-surface border border-line rounded-lg px-2.5 py-1">India</span>
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

function ContactFormSection() {
  const { toast } = useToast();
  const [fields, setFields] = useState({
    name: '',
    email: '',
    brand: '',
    website: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    const timer = window.setTimeout(() => setStatus('idle'), 4000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === 'success' || status === 'error') setStatus('idle');
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) {
      setStatus('error');
      toast({
        type: 'error',
        title: 'Missing fields',
        message: 'Please fill in your name, email, and message.',
      });
      return;
    }

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus('error');
      toast({
        type: 'error',
        title: 'Email not configured',
        message: `Please try again later or email us at ${CONTACT_EMAIL}.`,
      });
      return;
    }

    setStatus('sending');
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: fields.name,
          from_email: fields.email,
          reply_to: fields.email,
          brand: fields.brand || '—',
          website: fields.website || '—',
          message: fields.message,
          to_email: CONTACT_EMAIL,
        },
        { publicKey },
      );
      setStatus('success');
      setFields({ name: '', email: '', brand: '', website: '', message: '' });
      toast({
        type: 'success',
        title: 'Message sent!',
        message: "We'll get back to you within 24 hours.",
      });
    } catch {
      setStatus('error');
      toast({
        type: 'error',
        title: 'Failed to send',
        message: `Something went wrong. Please try again or email ${CONTACT_EMAIL}.`,
      });
    }
  };

  const inputCls = "bg-paper border border-line rounded-lg px-4 py-3 text-sm text-ink placeholder:text-ink-muted outline-none focus:border-ink focus:bg-white transition-colors duration-200";
  const labelCls = "text-[10px] text-ink-muted tracking-[0.2em] uppercase font-medium";

  return (
    <section id="contact" className="relative bg-paper border-t border-line pb-16 md:pb-32">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10 pt-10 md:pt-14">
        <div className="grid md:grid-cols-5 gap-4">

          <div className="md:col-span-2 order-2 md:order-1">
            <InfoPanel />
          </div>

          <div className="premium-card md:col-span-3 order-1 md:order-2 bg-surface border border-line rounded-2xl p-6 sm:p-8 md:p-10">
            {/* Who we work with, stated before the first field, so a visitor
                knows whether they fit before investing any effort. */}
            <p className="anim-eyebrow eyebrow mb-2">
              Working across India · Dubai · Global markets
            </p>
            <p className="mb-5 text-[11px] text-ink-muted">
              Creators · Brands · Marketing Teams · Agencies
            </p>
            <h2 className="text-2xl sm:text-3xl text-ink leading-[1.1] tracking-[-1px] mb-7">
              Start a Conversation
            </h2>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="form-field grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Your name</label>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Work email</label>
                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="form-field grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Brand / company</label>
                  <input
                    type="text"
                    name="brand"
                    value={fields.brand}
                    onChange={handleChange}
                    placeholder="Brand or company name"
                    className={inputCls}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Website or social profile</label>
                  <input
                    type="text"
                    name="website"
                    value={fields.website}
                    onChange={handleChange}
                    placeholder="yourbrand.com or @handle"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="form-field flex flex-col gap-1.5">
                <label className={labelCls}>Tell us a little more</label>
                <textarea
                  rows={4}
                  name="message"
                  value={fields.message}
                  onChange={handleChange}
                  placeholder="What's happening today, what would you like to improve, and what does success look like?"
                  required
                  className={`${inputCls} resize-none`}
                />
              </div>

              <div className="form-field">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={cn(
                    'group relative w-full flex items-center justify-center gap-2 font-semibold py-3.5 rounded-lg text-sm transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed',
                    status === 'idle' && 'bg-ink hover:bg-ink/90 text-paper',
                    status === 'sending' && 'bg-ink/80 text-paper opacity-80',
                    status === 'success' && 'bg-green-600 text-ink',
                    status === 'error' && 'bg-red-600 text-ink',
                  )}
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending…</span>
                    </>
                  ) : status === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Sent!</span>
                    </>
                  ) : status === 'error' ? (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      <span>Try Again</span>
                    </>
                  ) : (
                    <>
                      <span>Start the Conversation</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </>
                  )}
                </button>
                <p className="text-ink-muted text-[11px] leading-relaxed text-center mt-3">
                  We&apos;ll review your brief and reply within 24 hours. If there&apos;s a fit,
                  we&apos;ll map the smartest next step together.
                </p>

                {/* Second conversion path: high-intent visitors skip the
                    qualification form and go straight to the calendar. */}
                {CALENDLY_URL ? (
                  <div className="mt-5 border-t border-line pt-5 text-center">
                    <p className="text-ink-soft text-xs">Already know what you need?</p>
                    <a
                      href="#book"
                      className="mt-1.5 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-ink no-underline transition-colors hover:text-accent"
                    >
                      Book a Strategy Call
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                ) : null}
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

function BookingSection() {
  if (!CALENDLY_URL) {
    // Nothing to show publicly until the link is configured; in development
    // the gap would be silent, so say why it is empty.
    return process.env.NODE_ENV === 'development' ? (
      <section className="border-t border-line bg-paper py-16">
        <div className="container mx-auto max-w-3xl px-4 md:px-8">
          <p className="rounded-xl border border-dashed border-line p-6 text-center text-sm text-ink-muted">
            Calendly booking section is hidden — set{' '}
            <code className="font-mono text-ink">NEXT_PUBLIC_CALENDLY_URL</code> in{' '}
            <code className="font-mono text-ink">.env.local</code> to enable it.
          </p>
        </div>
      </section>
    ) : null;
  }

  return (
    <section id="book" className="scroll-mt-28 border-t border-line bg-paper py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4 md:px-8">
        <div className="mb-8 text-center md:mb-12">
          <p className="eyebrow mb-3">Straight to the calendar</p>
          <h2 className="text-3xl leading-[1.06] tracking-[-0.02em] text-ink sm:text-4xl">
            Book a Strategy Call
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
            Pick a time that works for you. We&apos;ll come prepared with questions about your
            content, your channels and where growth is getting stuck.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-line bg-surface">
          <CalendlyInline url={CALENDLY_URL} />
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
      <ContactFormSection />
      <WhatHappensNext />
      <BookingSection />
      <div className="on-dark dark-zone">
        <Footer />
      </div>
    </div>
  );
}
