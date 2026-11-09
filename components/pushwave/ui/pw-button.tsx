'use client';

import Link from 'next/link';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { Cta } from '@/lib/pushwave/content';
import { prefillBuilder } from '@/lib/pushwave/estimate';
import { useMagnetic, useScrollToHash } from '../hooks';

type Variant = 'primary' | 'ghost' | 'ink';

type PwButtonProps = {
  cta?: Cta;
  label?: string;
  href?: string;
  variant?: Variant;
  size?: 'md' | 'sm';
  icon?: ReactNode;
  className?: string;
  block?: boolean;
  magnetic?: boolean;
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  'aria-describedby'?: string;
};

function Label({ text, icon }: { text: string; icon?: ReactNode }) {
  return (
    <>
      {icon ? (
        <span className="pw-btn__icon" aria-hidden>
          {icon}
        </span>
      ) : null}
      <span className="pw-btn__roll">
        <span>{text}</span>
        <span aria-hidden>{text}</span>
      </span>
    </>
  );
}

/**
 * The one button. Links to `#section` scroll smoothly through Lenis; a CTA
 * with `prefill` presets the campaign builder before scrolling to it.
 */
export function PwButton({
  cta,
  label,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  className,
  block,
  magnetic = true,
  type = 'button',
  disabled,
  onClick,
  ...aria
}: PwButtonProps) {
  const magnetRef = useRef<HTMLSpanElement>(null);
  useMagnetic(magnetRef, magnetic && !block ? 0.28 : 0);
  const scrollToHash = useScrollToHash();

  const text = label ?? cta?.label ?? '';
  const target = href ?? cta?.href;
  const classes = cn(
    'pw-btn',
    `pw-btn--${variant}`,
    size === 'sm' && 'pw-btn--sm',
    block && 'w-full',
    className,
  );

  const handleHashClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!target?.startsWith('#')) return;
    event.preventDefault();
    if (cta?.prefill) prefillBuilder(cta.prefill);
    onClick?.();
    scrollToHash(target);
  };

  let control: ReactNode;
  if (target?.startsWith('#')) {
    control = (
      <a href={target} className={classes} onClick={handleHashClick} {...aria}>
        <Label text={text} icon={icon} />
      </a>
    );
  } else if (target) {
    control = (
      <Link href={target} className={classes} onClick={onClick} {...aria}>
        <Label text={text} icon={icon} />
      </Link>
    );
  } else {
    control = (
      <button type={type} className={classes} onClick={onClick} disabled={disabled} {...aria}>
        <Label text={text} icon={icon} />
      </button>
    );
  }

  return (
    <span ref={magnetRef} className={cn('inline-flex will-change-transform', block && 'flex w-full')}>
      {control}
    </span>
  );
}
