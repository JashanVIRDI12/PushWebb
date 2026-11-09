'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useCardHover } from '../hooks';

type Meta = { label: string; value: string };

function embedUrl(src: string) {
  const youtube = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{6,})/);
  if (youtube) return `https://www.youtube-nocookie.com/embed/${youtube[1]}?autoplay=1&rel=0&modestbranding=1`;
  const vimeo = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1&dnt=1`;
  return null;
}

/**
 * Cinematic 16:9 frame with a custom play button. The player only loads
 * after the click (no third-party iframe on page load). Without a `src`
 * it renders the labelled placeholder and the play mark is decorative.
 */
export function VslPlayer({ src, title, placeholder, meta }: { src: string; title: string; placeholder: string; meta: Meta[] }) {
  const [playing, setPlaying] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  useCardHover(frameRef, { lift: 0, pull: 6 });
  const hasVideo = Boolean(src);
  const iframe = hasVideo ? embedUrl(src) : null;

  const playMark = (
    <span className="relative grid h-24 w-24 place-items-center md:h-32 md:w-32">
      <span className="absolute inset-0 rounded-full bg-pw-wave/30 motion-safe:animate-ping [animation-duration:2.4s]" />
      <span className="absolute inset-0 rounded-full bg-pw-wave shadow-[0_20px_60px_-12px_rgb(59_91_255/0.9)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
      <svg viewBox="0 0 24 24" className="relative h-7 w-7 translate-x-0.5 text-white md:h-9 md:w-9" aria-hidden>
        <path d="M7 4.5v15l12-7.5z" fill="currentColor" />
      </svg>
    </span>
  );

  return (
    <div
      ref={frameRef}
      className="pw-card group relative aspect-[4/5] overflow-hidden rounded-[32px] sm:aspect-video"
      data-cursor={hasVideo && !playing ? 'play' : undefined}
    >
      {playing && hasVideo ? (
        iframe ? (
          <iframe
            src={iframe}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video src={src} title={title} controls autoPlay playsInline className="absolute inset-0 h-full w-full object-cover" />
        )
      ) : (
        <>
          {/* Poster: light leak and scan lines, no imagery invented. */}
          <div
            aria-hidden
            className="absolute inset-0 [background:radial-gradient(60%_80%_at_70%_30%,rgb(59_91_255/0.28),transparent_70%),radial-gradient(40%_60%_at_20%_80%,rgb(242_242_240/0.06),transparent_70%),linear-gradient(180deg,#121219,#07070a)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 opacity-40 [background:repeating-linear-gradient(0deg,rgb(242_242_240/0.03)_0_1px,transparent_1px_4px)]"
          />

          {hasVideo ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 grid place-items-center"
              aria-label={`Play video: ${title}`}
            >
              {playMark}
            </button>
          ) : (
            <div className="absolute inset-0 grid place-items-center" role="img" aria-label={`Placeholder: ${placeholder}`}>
              <div className="flex flex-col items-center gap-6">
                <span aria-hidden>{playMark}</span>
                <span className="pw-todo">{placeholder}</span>
              </div>
            </div>
          )}

          <dl
            className={cn(
              'pointer-events-none absolute inset-x-0 bottom-0 grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-end md:p-8',
              '[background:linear-gradient(0deg,rgb(7_7_10/0.85),transparent)]',
            )}
          >
            {meta.map((item, index) => (
              <div key={item.label} className={cn(index === 1 && 'sm:text-right')}>
                <dt className="text-xs font-medium text-pw-steel">{item.label}</dt>
                <dd className={cn('mt-1 text-pw-ink', index === 0 ? 'pw-title max-w-[28ch]' : 'text-sm font-medium')}>{item.value}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
