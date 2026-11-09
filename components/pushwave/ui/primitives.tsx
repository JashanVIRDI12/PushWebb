import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * A heading split into masked words on the server, so the reveal can run
 * from CSS before hydration (hero) or be driven by a client component.
 * Screen readers get the plain sentence; the split copy is decorative.
 */
export function SplitWords({
  text,
  as: Tag = 'span',
  className,
  wordClassName = 'pw-rise',
  baseDelay = 0,
  step = 0.055,
  lines,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: string;
  baseDelay?: number;
  step?: number;
  /** Optional explicit line groups (desktop line breaks). Must join back to `text`. */
  lines?: string[];
  id?: string;
}) {
  const groups = (lines ?? [text]).map((line) => line.split(' '));
  // Word index where each line starts, so the stagger runs across lines.
  const starts = groups.map((_, lineIndex) => groups.slice(0, lineIndex).reduce((total, words) => total + words.length, 0));

  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {groups.map((line, lineIndex) => (
          <span key={lineIndex} className={cn(lines && 'md:block')}>
            {line.map((word, wordIndex, words) => {
              const delay = baseDelay + (starts[lineIndex] + wordIndex) * step;
              return (
                <span key={wordIndex}>
                  <span className="pw-mask">
                    <span className={wordClassName} style={{ '--d': `${delay}s` } as React.CSSProperties}>
                      {word}
                    </span>
                  </span>
                  {wordIndex < words.length - 1 ? ' ' : null}
                </span>
              );
            })}
            {lineIndex < groups.length - 1 ? ' ' : null}
          </span>
        ))}
      </span>
    </Tag>
  );
}

/** Label + headline + optional lead, the standard section opening. */
export function SectionIntro({
  label,
  headline,
  lead,
  id,
  className,
  headlineClassName,
  children,
}: {
  label?: string;
  headline: string;
  lead?: ReactNode;
  id?: string;
  className?: string;
  headlineClassName?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn('max-w-[62rem]', className)}>
      {label ? (
        <p className="pw-label" data-reveal>
          {label}
        </p>
      ) : null}
      <h2 id={id} className={cn('pw-d2 mt-6', headlineClassName)} data-split>
        {headline}
      </h2>
      {lead ? (
        <div className="pw-lead mt-8 max-w-[60ch]" data-reveal>
          {lead}
        </div>
      ) : null}
      {children}
    </div>
  );
}

/** Disclaimers and small print: always visible, smaller and muted. */
export function FinePrint({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn('pw-fine', className)} data-reveal>
      {children}
    </p>
  );
}

/**
 * A designed empty slot for an asset that hasn't been supplied yet. The
 * bracketed label from the brief is shown as-is, so nobody mistakes it for
 * real content.
 */
export function PlaceholderSlot({
  label,
  kind,
  className,
  children,
  cursor,
}: {
  label: string;
  kind: string;
  className?: string;
  children?: ReactNode;
  cursor?: 'play' | 'drag';
}) {
  return (
    <div className={cn('pw-slot', className)} data-cursor={cursor} role="img" aria-label={`Placeholder: ${label}`}>
      <span className="pw-todo relative z-[1]">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-pw-wave" />
        {kind}
      </span>
      {children}
      <p className="relative z-[1] text-sm font-medium leading-snug text-pw-soft">{label}</p>
    </div>
  );
}

/** Small check glyph used in inclusion lists. */
export function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden className={cn('h-4 w-4 flex-none', className)}>
      <circle cx="8" cy="8" r="7.25" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
      <path d="M5 8.3l2 2 4-4.6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The PUSHWAVE wave glyph: one line, one crest. */
export function WaveGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 16" aria-hidden className={cn('h-4 w-8', className)}>
      <path
        d="M1 8c3.5 0 3.5-6 7-6s3.5 12 7 12 3.5-12 7-12 3.5 6 9 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Splits "From ₹250 per clip" into lead / amount / tail for typesetting, without changing the text. */
export function splitPrice(price: string) {
  const match = price.match(/^(.*?)(₹[\d,]+)(.*)$/);
  if (!match) return { lead: '', amount: price, tail: '' };
  return { lead: match[1], amount: match[2], tail: match[3] };
}
