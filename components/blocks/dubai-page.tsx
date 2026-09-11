import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './site-footer';
import { SERVICE_CHANNELS, serviceHref } from '@/lib/services';
import { CTA_HREF, CTA_LABEL, OPERATING_PROOF, WHY_POINTS } from '@/lib/site';

/* ────────────────────────────────────────────────────────────────
   /dubai — the location page for UAE searches. Every service it
   lists links to that service's section on /services.
──────────────────────────────────────────────────────────────── */

const FAQS = [
  {
    q: 'Does PUSHWebb work with businesses in Dubai and the UAE?',
    a: 'Yes. PUSHWebb operates in Dubai and works with brands, creators and organisations across the UAE, while delivering for clients globally. UAE businesses get the full service mix — YouTube management, short-form content, video production, social media management, performance creative and AI content production — from one team structured for high-volume delivery.',
  },
  {
    q: 'Can you create content for audiences outside the UAE?',
    a: 'Yes. We operate in Dubai and work globally, planning and producing content for audiences across markets and adapting formats and platform strategy to each one.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a Strategy Call. We start by understanding your goals, current content and constraints, then recommend the service or working model that fits — from a single campaign to an ongoing content retainer.',
  },
];

export function DubaiPage() {
  return (
    <div className="bg-paper">
      <NavbarModernBlock />
      <main>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="on-dark relative isolate overflow-hidden bg-black">
          <Image
            src="/pushwebb-assets/generated/dubai-dusk.jpg"
            alt="Dubai skyline at dusk with the Burj Khalifa"
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover opacity-60"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#04091a] via-[#04091a]/70 to-[#04091a]/30" />
          <div className="container mx-auto max-w-6xl px-4 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
            <p className="mb-6 font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-gold">
              PUSHWebb / Dubai
            </p>
            <h1 className="max-w-3xl text-[2.1rem] leading-[1.0] tracking-[-0.02em] text-ink text-balance sm:text-5xl md:text-[3.9rem]">
              A Content and Growth Agency Operating in Dubai.
            </h1>
            <div className="mt-6 max-w-xl space-y-3">
              <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                PUSHWebb operates in Dubai and works with brands, creators and organisations across the
                UAE, while delivering for clients globally.
              </p>
              <p className="text-sm leading-relaxed text-ink-soft md:text-base">
                One team covers the full content growth system — YouTube management, short-form content,
                video production and post production, social media management, performance creative and
                AI content production — so UAE businesses get strategy and execution without managing a
                stack of separate vendors.
              </p>
            </div>
            <Link
              href={CTA_HREF}
              className="mt-8 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-lg bg-white px-7 text-sm font-semibold text-[#060d1d] no-underline transition-colors duration-200 hover:bg-[#eaeaea]"
            >
              {CTA_LABEL}
              <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
            </Link>
          </div>
        </section>

        {/* ── Services ───────────────────────────────────────── */}
        <section className="bg-paper py-16 md:py-24">
          <div className="container mx-auto max-w-6xl px-4 md:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="eyebrow mb-3">What We Do in the UAE</p>
              <h2 className="text-[1.75rem] leading-[1.05] tracking-[-1px] text-ink sm:text-4xl md:text-5xl">
                One Team. Every Content Growth Lever.
              </h2>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICE_CHANNELS.map((service, i) => (
                <li key={service.id}>
                  <Link
                    href={serviceHref(service.id)}
                    className="premium-card group flex h-full flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-6 no-underline"
                  >
                    <div>
                      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                        Service {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-ink">
                        {service.name}
                      </h3>
                    </div>
                    <span className="inline-flex items-center justify-between font-display text-sm font-medium text-ink-soft group-hover:text-ink">
                      Explore
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Why ────────────────────────────────────────────── */}
        <div className="on-dark dark-zone">
          <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-4 md:px-8">
              <div className="mb-10 max-w-2xl">
                <p className="eyebrow mb-3">Why PUSHWebb</p>
                <h2 className="text-[1.75rem] leading-[1.05] tracking-[-1px] text-ink sm:text-4xl md:text-5xl">
                  One Partner. One System. Less Chaos.
                </h2>
              </div>
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {WHY_POINTS.map((point) => (
                  <li key={point.title} className="bg-[#071024] p-6 sm:p-7">
                    <h3 className="font-display text-lg font-semibold text-ink">{point.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{point.copy}</p>
                  </li>
                ))}
              </ul>

              <dl className="mt-12 grid grid-cols-2 gap-y-8 md:grid-cols-4">
                {OPERATING_PROOF.map((item) => (
                  <div key={item.label} className="flex flex-col-reverse border-l border-line pl-5">
                    <dt className="mt-1.5 text-xs font-medium uppercase tracking-[0.12em] text-ink-muted">
                      {item.label}
                    </dt>
                    <dd className="font-display text-3xl font-bold tracking-[-1px] text-ink md:text-4xl">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        </div>

        {/* ── FAQ ────────────────────────────────────────────── */}
        <section className="bg-paper py-16 md:py-24">
          <div className="container mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-12 md:gap-12 md:px-8">
            <div className="md:col-span-4">
              <p className="eyebrow mb-3">FAQs</p>
              <h2 className="text-[1.75rem] leading-[1.05] tracking-[-1px] text-ink sm:text-4xl">
                Questions, Answered
              </h2>
            </div>
            <div className="border-t border-line md:col-span-8">
              {FAQS.map((faq) => (
                <details key={faq.q} className="group border-b border-line">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-semibold text-ink focus-visible:outline-none focus-visible:text-accent-hover [&::-webkit-details-marker]:hidden sm:text-lg">
                    {faq.q}
                    <Plus className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Close ──────────────────────────────────────────── */}
        <div className="on-dark dark-zone">
          <section className="border-t border-line py-20 text-center md:py-28">
            <div className="container mx-auto max-w-3xl px-4 md:px-8">
              <p className="eyebrow mb-5">Let&apos;s Talk</p>
              <h2 className="mb-5 text-[1.75rem] leading-[1.08] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
                Operating in Dubai. Working Globally.
              </h2>
              <p className="mx-auto mb-8 max-w-lg text-sm leading-relaxed text-ink-soft text-balance md:text-base">
                Tell us where you want to grow. We&apos;ll show you the system required to get there.
              </p>
              <Link
                href={CTA_HREF}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-[#060d1d] no-underline transition-colors duration-200 hover:bg-[#eaeaea]"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
          <Footer />
        </div>
      </main>
    </div>
  );
}
