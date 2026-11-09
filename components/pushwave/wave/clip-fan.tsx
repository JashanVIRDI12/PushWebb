import type { CSSProperties } from 'react';
import { cn } from '@/lib/utils';

/** One 9:16 clip drawn in CSS: subject, subtitles, creator row, progress. */
export function MiniClip({
  accent,
  progress = 40,
  className,
  style,
}: {
  accent?: boolean;
  progress?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn('pw-frame', className)}
      data-accent={accent ? 'true' : undefined}
      style={{ ...style, '--p': `${progress}%` } as CSSProperties}
    >
      <div className="absolute inset-x-[22%] bottom-[30%] flex flex-col items-center gap-[5%]">
        <span className="block h-[0.5em] w-full rounded-full bg-white/90 text-[clamp(4px,0.8vw,9px)]" />
        <span className="block h-[0.5em] w-2/3 rounded-full bg-white/90 text-[clamp(4px,0.8vw,9px)]" />
      </div>
      {accent ? <span className="absolute left-[38%] top-[69.5%] block h-[3.4%] w-[18%] rounded-full bg-pw-wave" /> : null}
      <span className="absolute bottom-[13%] left-[9%] block aspect-square w-[11%] rounded-full bg-white/80" />
      <span className="absolute bottom-[14.5%] left-[23%] block h-[2%] w-[26%] rounded-full bg-white/60" />
      <span className="absolute right-[8%] top-[52%] flex w-[8%] flex-col gap-[40%]">
        <span className="block aspect-square w-full rounded-full bg-white/70" />
        <span className="block aspect-square w-full rounded-full bg-white/70" />
        <span className="block aspect-square w-full rounded-full bg-white/70" />
      </span>
    </div>
  );
}

/**
 * The CSS stand-in for the WebGL wave: a fan of clips spreading out from one
 * master clip. Used on phones and wherever WebGL or motion is unavailable.
 * Floating stops under reduced motion (pushwave.css).
 */
export function ClipFan({ count = 9, className }: { count?: number; className?: string }) {
  const half = (count - 1) / 2;
  return (
    <div className={cn('relative', className)} aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const t = half === 0 ? 0 : (i - half) / half; // -1 … 1
        const depth = 1 - Math.abs(t);
        const isMaster = i === Math.round(half);
        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 w-[clamp(84px,17%,190px)]"
            style={{
              transform: `translate(-50%, -50%) translate(${t * 168}%, ${Math.pow(Math.abs(t), 1.6) * 22}%) rotate(${t * 14}deg) scale(${0.62 + depth * 0.5})`,
              zIndex: Math.round(depth * 10),
              opacity: 0.35 + depth * 0.65,
            }}
          >
            <MiniClip
              accent={isMaster || i % 4 === 1}
              progress={20 + ((i * 37) % 70)}
              className="pw-float"
              style={{ '--fd': `${-i * 0.7}s` } as CSSProperties}
            />
          </div>
        );
      })}
    </div>
  );
}
