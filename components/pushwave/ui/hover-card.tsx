'use client';

import { useRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useCardHover } from '../hooks';

type HoverCardProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
  className?: string;
  /** Keeps the accent border lit without hover (e.g. "Most Popular"). */
  featured?: boolean;
  lift?: number;
  pull?: number;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

/**
 * A `.pw-card` that lifts toward the pointer while its accent border
 * follows it. Transform-only, fine pointers only (see useCardHover).
 */
export function HoverCard<T extends ElementType = 'div'>({
  as,
  children,
  className,
  featured,
  lift = 10,
  pull = 8,
  ...rest
}: HoverCardProps<T>) {
  const Tag: ElementType = as ?? 'div';
  const ref = useRef<HTMLElement>(null);
  useCardHover(ref, { lift, pull });

  return (
    <Tag ref={ref} className={cn('pw-card will-change-transform', className)} data-featured={featured ? 'true' : undefined} {...rest}>
      {children}
    </Tag>
  );
}
