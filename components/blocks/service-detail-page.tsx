import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Plus, ShieldCheck } from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './site-footer';
import { SelectedWorkCarousel } from './selected-work-carousel';
import { ExpandButton } from '@/components/ui/expand-button';
import { JsonLd } from '@/components/seo/json-ld';
import { CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';
import { faqsById, type Faq } from '@/lib/faqs';
import { SCALING_STEPS, SERVICE_CHANNELS, serviceHref, type ServiceChannel } from '@/lib/services';
import { CTA_HREF, CTA_LABEL } from '@/lib/site';
import { serviceJsonLd } from '@/lib/structured-data';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   /services/<slug> — one capability in depth. Set as the same ruled
   production document as /about and /work: label column, value
   column, hairlines instead of card borders.

   Every line of copy is already on the site: the service's own
   section on /services, its case studies, the scaling system and the
   shared FAQ. A page never says more than the brief does.
──────────────────────────────────────────────────────────────── */

const pad = (n: number) => String(n).padStart(2, '0');

/** "The Podcast Content Engine" → "the-podcast-content-engine". The old
 *  /podcast-production URL redirects to that anchor (next.config.ts). */
const anchorFor = (label: string) =>
  label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-paper';

const SECTION_HEADING =
  'font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink';

/** Small mono label used as a register heading, as on /about and /work. */
function SheetLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn('font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft', className)}>
      {children}
    </p>
  );
}

function Masthead({ service, index }: { service: ServiceChannel; index: number }) {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-baseline gap-x-2 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft">
              <li>
                <Link
                  href="/services"
                  className={cn('rounded-sm no-underline transition-colors duration-200 hover:text-ink', FOCUS_RING)}
                >
                  Services
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {service.navLabel}
              </li>
            </ol>
          </nav>
          <SheetLabel className="text-right">
            Channel {pad(index + 1)} / {pad(SERVICE_CHANNELS.length)}
          </SheetLabel>
        </div>

        <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-10 md:pt-14">
          <div className="md:col-span-7">
            {/* The plain service name is the H1 for search; the hook carries
                the page visually, the same split as /about and /contact. */}
            <h1 className="max-w-[30ch] font-display text-base font-bold normal-case leading-[1.35] tracking-[-0.01em] text-ink-soft sm:text-lg">
              {service.name}
            </h1>
            <p className="display-caps mt-7 max-w-[17ch] text-balance border-t border-line-strong pt-6 font-display text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.94] tracking-[-0.035em] text-ink">
              {service.hook}
            </p>

            <div className="mt-9 max-w-[64ch] space-y-4">
              {service.description.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href={CTA_HREF}
                className={cn(
                  'inline-flex h-[54px] select-none items-center justify-center gap-2.5 rounded-lg bg-ink px-8 text-sm font-semibold text-paper no-underline transition-colors duration-200 hover:bg-accent-hover',
                  FOCUS_RING,
                )}
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
              <ExpandButton href="/work" label="See Our Work" />
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-surface">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                loading="eager"
                sizes="(max-width: 768px) 100vw, 380px"
                className="object-cover"
              />
            </div>
            {/* One substantiated proof line, where the brief gives one. */}
            {service.proof ? (
              <p className="mt-5 flex items-start gap-2.5 border-t border-line pt-4 text-sm font-medium text-ink">
                <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
                {service.proof}
              </p>
            ) : null}
          </aside>
        </div>
      </div>
    </header>
  );
}

function CoverSection({ service, tone }: { service: ServiceChannel; tone: string }) {
  return (
    <section id="what-we-cover" className={cn('scroll-mt-28 border-b border-line px-5 py-20 sm:px-8 md:py-28', tone)}>
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className={SECTION_HEADING}>What We Cover</h2>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ol className="border-t border-line-strong">
            {service.cover.map((item, i) => (
              <li key={item} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="w-6 shrink-0 font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                  {pad(i + 1)}
                </span>
                <span className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-ink sm:text-xl">
                  {item}
                </span>
              </li>
            ))}
          </ol>

          {/* The search topics the brief lists for this page, as written. */}
          {service.topics ? (
            <div className="mt-10">
              <SheetLabel className="mb-4">Also covers</SheetLabel>
              <ul className="flex flex-wrap gap-2">
                {service.topics.map((topic) => (
                  <li
                    key={topic}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-ink-soft first-letter:uppercase"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type Framework = NonNullable<ServiceChannel['frameworks']>[number];

function FrameworkSection({ framework, tone }: { framework: Framework; tone: string }) {
  return (
    <section
      id={anchorFor(framework.label)}
      className={cn('scroll-mt-28 border-b border-line px-5 py-20 sm:px-8 md:py-24', tone)}
    >
      <div className="mx-auto max-w-[1240px]">
        <h2 className={cn(SECTION_HEADING, 'max-w-[18ch]')}>{framework.label}</h2>
        <dl className="mt-10 grid gap-px border-y border-line-strong bg-line-strong md:grid-cols-3">
          {framework.items.map((item) => (
            <div key={item.name} className={cn('px-5 py-7 sm:px-7', tone)}>
              <dt className="font-display text-lg font-bold uppercase leading-snug tracking-[-0.01em] text-ink">
                {item.name}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-soft md:text-[15px]">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function ScalingSection({ tone }: { tone: string }) {
  return (
    <section className={cn('border-b border-line px-5 py-20 sm:px-8 md:py-28', tone)}>
      <div className="mx-auto max-w-[1240px]">
        <SheetLabel className="mb-6">The PUSHWebb Scaling System</SheetLabel>
        <h2 className={cn(SECTION_HEADING, 'max-w-[18ch]')}>From Strategy to Scale. One Connected System.</h2>

        <ol className="mt-12 grid gap-px border-y border-line-strong bg-line-strong sm:grid-cols-2 lg:grid-cols-4">
          {SCALING_STEPS.map((step) => (
            <li key={step.step} className={cn('px-5 py-7 sm:px-6', tone)}>
              <p className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">{step.step}</p>
              <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
              <p className="mt-2 font-mono text-[10px] font-bold uppercase leading-relaxed tracking-[0.14em] text-gold-dark">
                {step.tag}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FaqSection({ faqs, tone }: { faqs: Faq[]; tone: string }) {
  return (
    <section id="faq" className={cn('border-b border-line px-5 py-20 sm:px-8 md:py-28', tone)}>
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <h2 className={SECTION_HEADING}>Questions, Answered</h2>
        </div>

        {/* <details> keeps every answer in the page for crawlers. */}
        <div className="border-t border-line-strong md:col-span-7 md:col-start-6">
          {faqs.map((item) => (
            <details key={item.id} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-base font-bold uppercase tracking-[-0.01em] text-ink transition-colors duration-200 hover:text-accent-hover focus-visible:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-paper [&::-webkit-details-marker]:hidden sm:text-lg">
                {item.q}
                <Plus className="h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45 group-open:text-accent-hover" />
              </summary>
              <p className="max-w-[68ch] pb-6 pr-8 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** All six, with this one marked — the page is one entry point into the
 *  system, not a standalone offer. */
function CapabilitiesSection({ service, tone }: { service: ServiceChannel; tone: string }) {
  return (
    <section className={cn('px-5 py-20 sm:px-8 md:py-28', tone)}>
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <SheetLabel className="mb-6">One Team · Six Growth Capabilities</SheetLabel>
            <h2 className={cn(SECTION_HEADING, 'max-w-[16ch]')}>One Team. Every Content Growth Lever.</h2>
          </div>
          <p className="max-w-[58ch] text-base leading-relaxed text-ink-soft md:col-span-4 md:col-start-9 md:self-end">
            From strategy and production to distribution, paid performance and AI, PUSHWebb connects
            the disciplines required to build consistent growth.
          </p>
        </div>

        <ul className="mt-12 border-t border-line-strong">
          {SERVICE_CHANNELS.map((channel, i) => {
            const current = channel.id === service.id;
            const row = (
              <>
                <span className="font-mono text-[10px] tracking-[0.2em] text-ink-soft md:col-span-1">
                  {pad(i + 1)}
                </span>
                <h3
                  className={cn(
                    'font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em] sm:text-2xl md:col-span-5',
                    current ? 'text-ink-soft' : 'text-ink transition-colors duration-200 group-hover:text-accent-hover',
                  )}
                >
                  {channel.name}
                </h3>
                <span className="text-sm leading-relaxed text-ink-soft md:col-span-5">{channel.hook}</span>
              </>
            );

            return (
              <li key={channel.id} className="border-b border-line">
                {current ? (
                  <div aria-current="page" className="grid gap-2 py-6 md:grid-cols-12 md:items-baseline md:gap-8">
                    {row}
                  </div>
                ) : (
                  <Link
                    href={serviceHref(channel.id)}
                    className={cn(
                      'group grid gap-2 rounded-sm py-6 no-underline md:grid-cols-12 md:items-baseline md:gap-8',
                      FOCUS_RING,
                    )}
                  >
                    {row}
                    <ArrowUpRight
                      aria-hidden
                      className="hidden h-5 w-5 justify-self-end text-ink-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-hover md:col-span-1 md:block"
                    />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <Link
          href="/services"
          className={cn(
            'group mt-10 inline-flex items-center gap-2 rounded-sm font-display text-sm font-semibold text-ink no-underline transition-colors duration-200 hover:text-accent-hover',
            FOCUS_RING,
          )}
        >
          All services
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}

/** The /services close, verbatim: one service to start, one system to scale. */
function Close() {
  return (
    <div className="on-dark dark-zone">
      <section className="px-5 py-20 sm:px-8 md:py-28">
        <div className="mx-auto w-full max-w-[1240px]">
          <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-ink">
            Start With One Service. Scale With One System.
          </h2>
          <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
            <p className="max-w-[62ch] text-base leading-relaxed text-ink-soft md:col-span-7">
              Tell us where growth is currently getting stuck. We&apos;ll help identify the right
              combination of strategy, content, distribution, performance and AI.
            </p>
            <div className="md:col-span-4 md:col-start-9 md:text-right">
              <Link
                href={CTA_HREF}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-6 font-display text-sm font-semibold text-[#060d1d] no-underline transition-colors duration-200 hover:bg-[#eaeaea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Entity and geography as plain crawlable text (services brief #21). */}
          <p className="mt-12 max-w-[72ch] border-t border-line pt-8 text-sm leading-relaxed text-ink-soft">
            PUSHWebb delivers content, creative, performance and AI services for brands and creators
            across India, Dubai and international markets.
          </p>
        </div>
      </section>
    </div>
  );
}

export function ServiceDetailPage({ service }: { service: ServiceChannel }) {
  const index = SERVICE_CHANNELS.findIndex((channel) => channel.id === service.id);
  const studies = (service.caseStudies ?? [])
    .map((slug) => CASE_STUDIES.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => Boolean(study));

  // Light sections alternate surface and paper in whatever order this
  // service's page happens to have; the navy work band sits outside it.
  let light = 0;
  const tone = () => (light++ % 2 === 0 ? 'bg-surface' : 'bg-paper');

  return (
    <div className="bg-paper">
      <JsonLd data={serviceJsonLd(service)} />
      <NavbarModernBlock />
      <main>
        <Masthead service={service} index={index} />
        <CoverSection service={service} tone={tone()} />
        {service.frameworks?.map((framework) => (
          <FrameworkSection key={framework.label} framework={framework} tone={tone()} />
        ))}
        {studies.length > 0 ? (
          <div className="on-dark dark-zone">
            <SelectedWorkCarousel studies={studies} />
          </div>
        ) : null}
        <ScalingSection tone={tone()} />
        <FaqSection faqs={faqsById(service.faqs)} tone={tone()} />
        <CapabilitiesSection service={service} tone={tone()} />
        <Close />
      </main>
      {/* Outside <main> so the footer stays the contentinfo landmark. */}
      <div className="on-dark bg-[#050b1c]">
        <Footer />
      </div>
    </div>
  );
}
