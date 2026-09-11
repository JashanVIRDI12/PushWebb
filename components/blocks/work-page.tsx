import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { NavbarModernBlock } from './navbar-modern';
import { Footer } from './site-footer';
import { ClientLogoWall } from './client-logo-wall';
import { CaseStudyLogo } from './selected-work';
import { JsonLd } from '@/components/seo/json-ld';
import { CASE_STUDIES } from '@/lib/case-studies';
import { CTA_HREF, CTA_LABEL, SCALE_PROOF } from '@/lib/site';
import { caseStudiesJsonLd } from '@/lib/structured-data';
import { SHORT_PIECES, WORK_FORMATS, WORK_PIECES, type WorkPiece } from '@/lib/work';

/* ────────────────────────────────────────────────────────────────
   /work — the reel first, then the written case studies, then the
   full roster. Set as the same ruled production document as /about:
   label column, value column, hairlines instead of card borders.

   Each case study keeps its slug as an anchor target for the home
   page's "View Case Study" links (/work#slug).
──────────────────────────────────────────────────────────────── */

const FIELDS = [
  { key: 'managed', label: 'What We Managed' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'system', label: 'System Built' },
  { key: 'result', label: 'Result' },
] as const;

function SheetLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[10px] uppercase tracking-[0.28em] text-ink-soft ${className ?? ''}`}>
      {children}
    </p>
  );
}

function WorkMasthead() {
  return (
    <header className="border-b border-line bg-paper">
      <div className="mx-auto max-w-[1240px] px-5 pb-14 pt-12 sm:px-8 md:pb-20 md:pt-16">
        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-4">
          <SheetLabel>Work</SheetLabel>
          <SheetLabel className="text-right">Podcasts · Documentaries · AI films</SheetLabel>
        </div>

        <div className="grid gap-12 pt-10 md:grid-cols-12 md:gap-10 md:pt-14">
          <div className="md:col-span-7">
            <h1 className="max-w-[26ch] font-display text-base font-bold normal-case leading-[1.35] tracking-[-0.01em] text-ink-soft sm:text-lg">
              Selected Work and Case Studies from PUSHWebb
            </h1>

            <p className="mt-9 border-t border-line-strong">
              {['Watch', 'The', 'Work.'].map((word, i) => (
                <span
                  key={word}
                  className={`display-caps block border-b border-line py-2.5 font-display text-[clamp(2.75rem,9vw,5.75rem)] leading-[0.92] tracking-[-0.035em] ${
                    i === 2 ? 'text-accent-hover' : 'text-ink'
                  }`}
                >
                  {word}
                </span>
              ))}
            </p>

            <p className="mt-9 max-w-[64ch] text-base leading-relaxed text-ink-soft">
              Long-form podcasts, documentaries, AI films and the systems behind them — produced,
              edited and published by the PUSHWebb team for creator-led channels and brands.
            </p>

            <div className="mt-10">
              <Link
                href={CTA_HREF}
                className="inline-flex h-[54px] select-none items-center justify-center gap-2.5 rounded-lg bg-ink px-8 text-sm font-semibold text-paper no-underline transition-colors duration-200 hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
              >
                {CTA_LABEL}
                <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <dl className="border-t border-line-strong">
              {SCALE_PROOF.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-3.5"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    {item.label}
                  </dt>
                  <dd className="font-display text-sm font-semibold tracking-[-0.01em] text-ink">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
              Formats we ship
            </p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {WORK_FORMATS.map((format) => (
                <li
                  key={format}
                  className="rounded-full border border-line px-3 py-1 text-xs text-ink-soft"
                >
                  {format}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </header>
  );
}

function FeaturedPiece({ piece }: { piece: WorkPiece }) {
  return (
    <article className="group">
      <Link
        href={piece.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
      >
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-surface">
          <Image
            src={piece.image}
            alt={piece.imageAlt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 560px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink/85 backdrop-blur-sm">
              <Play className="h-5 w-5 translate-x-[1px] fill-paper text-paper" />
            </span>
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4 border-t border-line pt-3.5">
          <div className="min-w-0">
            <h3 className="font-display text-base font-bold uppercase leading-snug tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-accent-hover sm:text-lg">
              {piece.title}
            </h3>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
              {piece.client} · {piece.format}
              {piece.views ? ` · ${piece.views} views` : ''}
            </p>
          </div>
          <ArrowUpRight
            aria-hidden
            className="mt-1 h-4 w-4 shrink-0 text-ink-soft transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-hover"
          />
        </div>
      </Link>
    </article>
  );
}

function TheReel() {
  return (
    <section aria-label="Selected work" className="border-b border-line bg-paper px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <SheetLabel className="mb-6">The reel</SheetLabel>
            <h2 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              Work our team produced, start to upload.
            </h2>
          </div>
          <div className="max-w-[62ch] md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-ink-soft">
              Research, scripting, production, editing, sound, colour and publishing run as one
              workflow rather than separate vendors. These are the pieces that came out of it.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-12 border-t border-line-strong pt-12 sm:grid-cols-2">
          {WORK_PIECES.map((piece) => (
            <FeaturedPiece key={piece.id} piece={piece} />
          ))}
        </div>

        <div className="mt-20 border-t border-line-strong pt-12">
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
            <SheetLabel>Vertical</SheetLabel>
            <p className="max-w-[52ch] text-sm leading-relaxed text-ink-soft">
              The same stories cut for the feed — hook, hold, act.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-5 sm:gap-8 lg:grid-cols-3">
            {SHORT_PIECES.map((short) => (
              <li key={short.id}>
                <Link
                  href={short.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/short block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
                >
                  <div className="relative aspect-[9/16] overflow-hidden rounded-2xl bg-surface">
                    <Image
                      src={short.image}
                      alt={short.imageAlt}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 320px"
                      className="object-cover transition-transform duration-700 ease-out group-hover/short:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-3.5 border-t border-line pt-3 font-display text-sm font-bold uppercase leading-snug tracking-[-0.01em] text-ink transition-colors duration-200 group-hover/short:text-accent-hover">
                    {short.title}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    {short.client} · Short
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CaseStudies() {
  return (
    <section aria-label="Case studies" className="border-b border-line bg-surface px-5 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-6">
            <SheetLabel className="mb-6">Case studies</SheetLabel>
            <h2 className="max-w-[16ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-ink">
              What we managed, and the system we built around it.
            </h2>
          </div>
          <div className="max-w-[62ch] md:col-span-5 md:col-start-8 md:self-end">
            <p className="text-base leading-relaxed text-ink-soft">
              Each engagement in the client&apos;s own words, with the scope, the challenge behind it
              and what the working system looks like once it is running.
            </p>
          </div>
        </div>

        <div className="mt-14 border-t border-line-strong">
          {CASE_STUDIES.map((study, index) => (
            <article
              key={study.slug}
              id={study.slug}
              className="case-study grid scroll-mt-28 gap-8 border-b border-line py-10 md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div className="md:col-span-5">
                <p className="font-mono text-[10px] tracking-[0.2em] text-ink-soft">
                  {String(index + 1).padStart(2, '0')} / {String(CASE_STUDIES.length).padStart(2, '0')}
                </p>
                <div className="mt-5 flex items-center gap-4">
                  <CaseStudyLogo study={study} size={52} />
                  <div>
                    <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
                      {study.client}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                      {study.category}
                    </p>
                  </div>
                </div>

                {study.quote ? (
                  <figure className="mt-8 border-t border-line pt-5">
                    <blockquote className="font-display text-base font-medium leading-relaxed text-ink sm:text-lg">
                      &ldquo;{study.quote.text}&rdquo;
                    </blockquote>
                    <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-gold-dark">
                      {study.quote.name} · {study.quote.role}
                    </figcaption>
                  </figure>
                ) : null}
              </div>

              <div className="md:col-span-6 md:col-start-7">
                <dl className="grid gap-6 sm:grid-cols-2">
                  {FIELDS.map((field) => (
                    <div key={field.key}>
                      <dt className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                        {field.label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-ink-soft md:text-[15px]">
                        {study[field.key]}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* The claim and the proof in the same place: every result
                    above is one click from the published work. */}
                <div className="mt-7 border-t border-line pt-5">
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                    Watch the work
                  </p>
                  <ul className="flex flex-wrap gap-2">
                    {study.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-ink no-underline transition-colors duration-200 hover:border-accent-hover hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                        >
                          {link.label}
                          <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkPage() {
  return (
    <div className="bg-paper">
      <JsonLd data={caseStudiesJsonLd()} />
      <NavbarModernBlock />
      <main>
        <WorkMasthead />
        <TheReel />
        <CaseStudies />

        <div className="on-dark dark-zone">
          <ClientLogoWall />
        </div>

        <div className="on-dark dark-zone">
          <section className="border-t border-line px-5 py-20 sm:px-8 md:py-28">
            <div className="mx-auto w-full max-w-[1240px]">
              <h2 className="max-w-[20ch] font-display text-[clamp(2.25rem,6vw,4.75rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-ink">
                Ready to Build a Content System That Actually Scales?
              </h2>
              <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-12">
                <p className="max-w-[62ch] text-base leading-relaxed text-ink-soft md:col-span-7">
                  Tell us where you want to grow. We&apos;ll show you the system required to get
                  there.
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
            </div>
          </section>
        </div>
      </main>
      <div className="on-dark bg-[#050b1c]">
        <Footer />
      </div>
    </div>
  );
}
