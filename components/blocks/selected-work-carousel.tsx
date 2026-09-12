'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight, Minus, Play, Plus } from 'lucide-react';
import { CaseStudyLogo } from './selected-work';
import { CASE_STUDIES, type CaseStudy } from '@/lib/case-studies';
import { WORK_PIECES } from '@/lib/work';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   SELECTED WORK — the home page carousel.

   One case study per slide on a native scroll-snap track, so swipe,
   trackpad and keyboard scrolling all work without a library. The
   navigation above it reads as a video chapter bar: one segment per
   case, filled up to the playhead as the track moves — the people
   weighing this section live on YouTube and Reels, and already know
   how to read one.

   Copy and field order are the brief's: client, what we managed,
   challenge, system built, result, view case study. /services keeps
   the card grid in ./selected-work until the team's categorised links
   arrive. Service pages pass their own `studies`; with a single one
   the chapter bar and arrows drop away.
──────────────────────────────────────────────────────────────── */

/** Each case leads with the piece its first link points at — the same
 *  thumbnail /work shows, so the image is the published result itself. */
const COVERS = new Map(WORK_PIECES.map((piece) => [piece.url, piece]));

/** Opacity a slide settles at once it is a full step away from the playhead. */
const REST_OPACITY = 0.4;

const LABEL = 'font-mono text-[10px] font-bold uppercase tracking-[0.16em]';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper';
const ARROW_BUTTON = cn(
  'flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:bg-white hover:text-[#060d1d] disabled:pointer-events-none disabled:opacity-35',
  FOCUS_RING,
);

const pad = (n: number) => String(n).padStart(2, '0');
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function CaseSlide({
  study,
  index,
  total,
  slideRef,
}: {
  study: CaseStudy;
  index: number;
  total: number;
  slideRef: (el: HTMLElement | null) => void;
}) {
  const alone = total === 1;
  // Phones fold Challenge and System Built behind the same Details toggle the
  // scaling-system cards use, so a slide stays about one screen tall. From md
  // up both are always open.
  const [open, setOpen] = useState(false);
  const cover = COVERS.get(study.links[0]?.href ?? '');
  const detailsId = `case-${study.slug}-details`;

  return (
    <article
      ref={slideRef}
      id={`case-${study.slug}`}
      role={alone ? undefined : 'group'}
      aria-roledescription={alone ? undefined : 'slide'}
      aria-label={alone ? undefined : `${index + 1} of ${total}: ${study.client}`}
      // Resting state before the scroll handler takes this value over.
      style={{ opacity: index === 0 ? 1 : REST_OPACITY }}
      className={cn(
        'premium-card flex shrink-0 snap-start flex-col rounded-2xl bg-surface p-5 sm:p-7 lg:p-8',
        alone ? 'basis-full' : 'basis-[86%] md:basis-full',
      )}
    >
      <div className="grid gap-5 md:grid-cols-12 md:gap-x-8 md:gap-y-7">
        {cover ? (
          <Link
            href={cover.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${cover.title}: watch on YouTube (opens in a new tab)`}
            className={cn(
              'group/cover relative block aspect-video overflow-hidden rounded-xl bg-paper-alt md:col-span-6 lg:col-span-7',
              FOCUS_RING,
            )}
          >
            <Image
              src={cover.image}
              alt={cover.imageAlt}
              fill
              sizes="(min-width: 1024px) 600px, (min-width: 768px) 42vw, 72vw"
              className="object-cover transition-transform duration-700 ease-out group-hover/cover:scale-[1.03]"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#04091a]/70 to-transparent"
            />
            {/* Bottom-right is the corner thumbnail designers keep clear for
                YouTube's duration badge, so the button never sits on the
                artwork's own type. */}
            <span
              aria-hidden
              className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#060d1d] shadow-[0_10px_24px_-10px_rgba(0,0,0,0.7)] transition-transform duration-300 ease-out group-hover/cover:scale-110"
            >
              <Play className="h-4 w-4 translate-x-[1px] fill-current" />
            </span>
          </Link>
        ) : null}

        {/* The episode card: who it was for on top, what we ran on it lined
            up with the foot of the thumbnail. From lg the mark stacks over
            the name, so the name gets the column's full width. */}
        <div className="flex flex-col gap-5 md:col-span-6 md:justify-between lg:col-span-5">
          <header className="flex items-center gap-3.5 lg:flex-col lg:items-start lg:gap-5">
            <CaseStudyLogo study={study} size={48} />
            <div className="min-w-0">
              <h3 className="display-caps text-balance font-display text-[1.375rem] leading-[1] tracking-[-0.02em] text-ink sm:text-2xl lg:text-[2.25rem]">
                {study.client}
              </h3>
              <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                {study.category}
              </p>
            </div>
          </header>

          <dl className="border-t border-line pt-4">
            <dt className={cn(LABEL, 'text-ink-soft')}>What We Managed</dt>
            <dd className="mt-2 font-display text-base font-medium leading-snug text-ink sm:text-lg lg:text-xl">
              {study.managed}
            </dd>
          </dl>
        </div>

        <div className="flex flex-col md:col-span-12 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-6 lg:grid-cols-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={detailsId}
            className={cn(
              'flex w-full items-center justify-between gap-2 border-t border-line py-3.5 text-left font-display text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-soft transition-colors duration-200 hover:text-ink md:hidden',
              FOCUS_RING,
            )}
          >
            <span>{open ? 'Close' : 'Details'}</span>
            {open ? <Minus className="h-3 w-3 shrink-0" /> : <Plus className="h-3 w-3 shrink-0" />}
          </button>

          {/* Collapsed by height, not removed, so the copy stays in the page
              for crawlers. From md up the wrappers dissolve and the two
              fields sit in the register grid beside Result. */}
          <div
            id={detailsId}
            className={cn(
              'grid transition-[grid-template-rows,visibility] duration-300 ease-out md:contents',
              open ? 'grid-rows-[1fr]' : 'invisible grid-rows-[0fr] md:visible',
            )}
          >
            <div className="overflow-hidden md:contents">
              <dl className="border-t border-line py-4 md:pb-0">
                <dt className={cn(LABEL, 'text-ink-soft')}>Challenge</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  {study.challenge}
                </dd>
              </dl>
              <dl className="border-t border-line py-4 md:pb-0">
                <dt className={cn(LABEL, 'text-ink-soft')}>System Built</dt>
                <dd className="mt-2 text-sm leading-relaxed text-ink-soft md:text-[15px]">
                  {study.system}
                </dd>
              </dl>
            </div>
          </div>

          {/* Result carries the gold rule: it is the line the rest of the
              slide is there to support. */}
          <dl className="border-t border-gold/60 py-4 md:col-span-2 md:pb-0 lg:col-span-1">
            <dt className={cn(LABEL, 'text-gold')}>Result</dt>
            <dd className="mt-2 text-sm font-medium leading-relaxed text-ink md:text-[15px]">
              {study.result}
            </dd>
          </dl>
        </div>
      </div>

      <div className="mt-auto pt-2 md:pt-8">
        <Link
          href={`/work#${study.slug}`}
          className={cn(
            'group/cta flex items-center justify-between gap-4 rounded-sm border-t border-line pt-4 font-display text-sm font-medium text-ink no-underline',
            FOCUS_RING,
          )}
        >
          <span>View Case Study</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors duration-200 group-hover/cta:border-white group-hover/cta:bg-white group-hover/cta:text-[#060d1d]">
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />
          </span>
        </Link>
      </div>
    </article>
  );
}

export function SelectedWorkCarousel({ studies = CASE_STUDIES }: { studies?: CaseStudy[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const total = studies.length;
  const multiple = total > 1;

  // Scroll position → playhead. Written straight to the DOM every frame, so
  // React only re-renders when the case under the playhead changes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    let shown = 0;

    const sync = () => {
      frame = 0;
      const first = slideRefs.current[0];
      if (!first) return;

      // Where each slide sits in scroll terms. The last one clamps to the end
      // of the range: on phones the slides peek, so it can never reach its
      // own snap point, and the playhead still has to land on a whole number.
      const max = track.scrollWidth - track.clientWidth;
      const stops = slideRefs.current.map((slide) =>
        slide ? Math.min(max, slide.offsetLeft - first.offsetLeft) : max,
      );
      const x = track.scrollLeft;
      let playhead = 0;
      for (let i = 0; i < stops.length - 1; i++) {
        if (x >= stops[i + 1]) {
          playhead = i + 1;
          continue;
        }
        const span = stops[i + 1] - stops[i];
        playhead = i + (span > 0 ? (x - stops[i]) / span : 0);
        break;
      }

      fillRefs.current.forEach((fill, i) => {
        if (fill) fill.style.transform = `scaleX(${clamp01(playhead - i + 1)})`;
      });
      slideRefs.current.forEach((slide, i) => {
        if (slide) {
          slide.style.opacity = String(1 - clamp01(Math.abs(playhead - i)) * (1 - REST_OPACITY));
        }
      });

      const next = Math.round(playhead);
      if (next !== shown) {
        shown = next;
        setActive(next);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };

    sync();
    track.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      const first = slideRefs.current[0];
      const target = slideRefs.current[Math.max(0, Math.min(total - 1, index))];
      if (!track || !first || !target) return;
      const max = track.scrollWidth - track.clientWidth;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      track.scrollTo({
        left: Math.min(max, target.offsetLeft - first.offsetLeft),
        behavior: reduced ? 'auto' : 'smooth',
      });
    },
    [total],
  );

  return (
    <section id="work" className="reveal-section relative overflow-hidden py-16 md:py-24">
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-8 flex flex-col gap-5 sm:mb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="anim-eyebrow eyebrow mb-3">Case Studies</p>
            <h2 className="split-h2 text-[1.75rem] leading-[1.05] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
              Selected Work
            </h2>
          </div>
          <Link
            href="/work"
            className={cn(
              'group inline-flex shrink-0 items-center gap-2 rounded-sm font-display text-sm font-medium text-ink-soft no-underline transition-colors duration-200 hover:text-ink',
              FOCUS_RING,
            )}
          >
            View All Work
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div
          role={multiple ? 'region' : undefined}
          aria-roledescription={multiple ? 'carousel' : undefined}
          aria-label={multiple ? 'Selected work' : undefined}
          className="reveal-stagger"
        >
          {/* Chapter bar. Phones get the bare segments and a counter; from lg
              each segment carries its client, so the whole slate reads at a
              glance before anyone swipes. */}
          {multiple ? (
            <div className="mb-4 flex items-center gap-4 sm:mb-6">
              <ol
                className="grid min-w-0 flex-1 gap-1.5 sm:gap-2 lg:gap-4"
                style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
              >
                {studies.map((study, i) => (
                  <li key={study.slug} className="min-w-0">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-controls={`case-${study.slug}`}
                      aria-current={active === i ? 'true' : undefined}
                      className={cn('group/chapter block w-full rounded-sm py-3 text-left', FOCUS_RING)}
                    >
                      <span className="relative block h-[3px] overflow-hidden rounded-full bg-white/15 transition-colors duration-200 group-hover/chapter:bg-white/30">
                        <span
                          ref={(el) => {
                            fillRefs.current[i] = el;
                          }}
                          className="absolute inset-0 origin-left rounded-full bg-gold"
                          style={{ transform: `scaleX(${i === 0 ? 1 : 0})` }}
                        />
                      </span>
                      <span
                        className={cn(
                          'mt-3 hidden text-balance font-display text-xs font-semibold uppercase leading-snug tracking-[0.08em] transition-colors duration-200 lg:block',
                          active === i ? 'text-ink' : 'text-ink-soft group-hover/chapter:text-ink',
                        )}
                      >
                        {study.client}
                      </span>
                      <span className="mt-1 hidden truncate font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft lg:block">
                        {study.category}
                      </span>
                      <span className="sr-only lg:hidden">{study.client}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <div className="flex shrink-0 items-center gap-3">
                <p aria-hidden className="font-display text-xs tabular-nums text-ink-soft lg:hidden">
                  <span className="font-semibold text-ink">{pad(active + 1)}</span> / {pad(total)}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => goTo(active - 1)}
                    disabled={active === 0}
                    aria-label="Previous case study"
                    className={ARROW_BUTTON}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(active + 1)}
                    disabled={active === total - 1}
                    aria-label="Next case study"
                    className={ARROW_BUTTON}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          {/* Phones: the track bleeds to the screen edges so the next slide
              peeks in; the padding and scroll-padding keep the current one
              aligned with the column. The vertical padding is room for the
              card shadow, which the scroll box would otherwise clip. */}
          <div
            ref={trackRef}
            className="no-scrollbar relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto overscroll-x-contain px-4 pb-8 pt-1 md:mx-0 md:scroll-px-0 md:gap-6 md:px-0"
          >
            {studies.map((study, i) => (
              <CaseSlide
                key={study.slug}
                study={study}
                index={i}
                total={total}
                slideRef={(el) => {
                  slideRefs.current[i] = el;
                }}
              />
            ))}
          </div>

          {multiple ? (
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {`Case study ${active + 1} of ${total}: ${studies[active].client}`}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
