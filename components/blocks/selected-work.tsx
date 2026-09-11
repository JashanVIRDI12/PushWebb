import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   SELECTED WORK — case studies between the services and About.

   Every card answers the same five questions in the same order —
   client, what we managed, challenge, system built, result — so the
   row reads as a comparison rather than three unrelated stories.
──────────────────────────────────────────────────────────────── */

const FIELDS: { key: 'managed' | 'challenge' | 'system' | 'result'; label: string }[] = [
  { key: 'managed', label: 'What We Managed' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'system', label: 'System Built' },
  { key: 'result', label: 'Result' },
];

export function CaseStudyLogo({ study, size = 44 }: { study: CaseStudy; size?: number }) {
  /* Initials where there is no logo file yet, rather than a broken
     image or a grey placeholder box. */
  const monogram = study.client
    .split(' ')
    .filter((word) => /^[A-Za-z]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');

  return (
    <span
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-white"
      style={{ width: size, height: size }}
    >
      {study.logo ? (
        <Image
          src={study.logo}
          alt={`${study.client} logo`}
          width={size}
          height={size}
          className={cn(
            'h-full w-full',
            study.logoKind === 'mark' ? 'object-contain p-[10%]' : 'object-cover',
          )}
        />
      ) : (
        <span
          aria-hidden
          className="font-display font-bold tracking-[-0.02em] text-ink-soft"
          style={{ fontSize: size * 0.36 }}
        >
          {monogram}
        </span>
      )}
    </span>
  );
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="premium-card group flex flex-col rounded-2xl border border-line bg-surface p-6 sm:p-7">
      <header className="flex items-center gap-3.5 border-b border-line pb-5">
        <CaseStudyLogo study={study} />
        <div className="min-w-0">
          <h3 className="truncate font-display text-lg font-semibold tracking-[-0.01em] text-ink">
            {study.client}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted">
            {study.category}
          </p>
        </div>
      </header>

      <dl className="flex-1 space-y-4 py-5">
        {FIELDS.map((field) => (
          <div key={field.key}>
            <dt className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
              {field.label}
            </dt>
            <dd
              className={cn(
                'text-sm leading-relaxed',
                field.key === 'result' || field.key === 'managed'
                  ? 'font-medium text-ink'
                  : 'text-ink-soft',
              )}
            >
              {study[field.key]}
            </dd>
          </div>
        ))}
      </dl>

      <Link
        href={`/work#${study.slug}`}
        className="group/cta mt-auto inline-flex items-center justify-between border-t border-line pt-4 font-display text-sm font-medium text-ink no-underline"
      >
        <span>View Case Study</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-colors duration-200 group-hover/cta:bg-ink group-hover/cta:text-paper">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </article>
  );
}

export function SelectedWorkSection() {
  return (
    <section id="work" className="reveal-section relative overflow-hidden py-16 md:py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 flex flex-col gap-5 sm:mb-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="anim-eyebrow eyebrow mb-3">Case Studies</p>
            <h2 className="split-h2 text-[1.75rem] leading-[1.05] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
              Selected Work
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft md:text-base">
              What we managed, the challenge behind it and the system we built to solve it.
            </p>
          </div>
          <Link
            href="/work"
            className="group inline-flex shrink-0 items-center gap-2 font-display text-sm font-medium text-ink-soft no-underline transition-colors duration-200 hover:text-ink"
          >
            View All Work
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="reveal-stagger grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.slug} study={study} />
          ))}
        </div>
      </div>
    </section>
  );
}
