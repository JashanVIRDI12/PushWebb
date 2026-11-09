'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceholderSlot } from '../ui/primitives';

function PlayMark() {
  return (
    <span aria-hidden className="relative z-[1] grid h-14 w-14 place-items-center rounded-full bg-[rgb(242_242_240/0.08)] shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-[background-color,transform] duration-500 group-hover/slide:scale-110 group-hover/slide:bg-pw-wave">
      <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-px text-pw-ink">
        <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
      </svg>
    </span>
  );
}

/**
 * TODO(clip-samples): replace each placeholder with the approved sample
 * (a muted, looping 9:16 MP4 with a poster, or an embed). The labels are
 * the brief's own, so nobody mistakes a slot for real work.
 */
export function WorkCarousel({ samples }: { samples: string[] }) {
  const [viewportRef, embla] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', dragFree: true });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const sync = useCallback(() => {
    if (!embla) return;
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on('select', sync).on('reInit', sync).on('scroll', sync);
    // First read once Embla has measured.
    const frame = requestAnimationFrame(sync);
    return () => {
      cancelAnimationFrame(frame);
      embla.off('select', sync).off('reInit', sync).off('scroll', sync);
    };
  }, [embla, sync]);

  const arrow =
    'grid h-12 w-12 place-items-center rounded-full text-pw-ink shadow-[inset_0_0_0_1px_var(--color-pw-line-strong)] transition-[background-color,opacity,scale] duration-300 hover:bg-[rgb(242_242_240/0.08)] active:scale-95 disabled:pointer-events-none disabled:opacity-30';

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Clip sample placeholders">
      <div className="flex justify-end gap-3">
        <button type="button" className={arrow} onClick={() => embla?.scrollPrev()} disabled={!canPrev} aria-label="Previous samples">
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </button>
        <button type="button" className={arrow} onClick={() => embla?.scrollNext()} disabled={!canNext} aria-label="Next samples">
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <div ref={viewportRef} className="mt-6 overflow-hidden" data-cursor="drag">
        <ul className="flex touch-pan-y gap-4">
          {samples.map((label, index) => {
            const beforeAfter = /BEFORE\/AFTER/.test(label);
            return (
              <li
                key={label}
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${samples.length}`}
                className={cn('group/slide min-w-0 flex-none', beforeAfter ? 'w-[min(86vw,560px)]' : 'w-[min(64vw,300px)]')}
              >
                <PlaceholderSlot
                  label={label}
                  kind="Clip sample"
                  className={cn(beforeAfter ? 'aspect-[18/16]' : 'aspect-[9/16]')}
                >
                  {beforeAfter ? (
                    <div aria-hidden className="relative z-[1] grid flex-1 grid-cols-2 gap-3">
                      {['Before', 'After'].map((side) => (
                        <div key={side} className="flex flex-col items-center justify-center gap-3 rounded-[14px] bg-[rgb(7_7_10/0.5)] shadow-[inset_0_0_0_1px_var(--color-pw-line)]">
                          <PlayMark />
                          <span className="text-xs font-medium text-pw-steel">{side}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative z-[1] grid flex-1 place-items-center">
                      <PlayMark />
                    </div>
                  )}
                </PlaceholderSlot>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
