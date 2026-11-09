'use client';

import { useId, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

/**
 * Disclosure row. The panel animates its height with grid-template-rows
 * (no measuring) and is `inert` while closed, so hidden text is neither
 * focusable nor read out.
 */
export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  className,
  titleClassName,
  as: Heading = 'h3',
}: {
  title: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  titleClassName?: string;
  as?: 'h3' | 'h4' | 'div';
}) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const buttonId = `${id}-trigger`;
  const panelId = `${id}-panel`;

  return (
    <div className={cn('pw-acc', className)} data-open={open}>
      <Heading className="m-0">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'group flex w-full items-center justify-between gap-6 py-6 text-left transition-colors duration-300 hover:text-white',
            titleClassName,
          )}
        >
          <span>{title}</span>
          <span className="pw-acc__icon text-pw-ink" aria-hidden />
        </button>
      </Heading>
      <div className="pw-acc__panel">
        <div id={panelId} role="region" aria-labelledby={buttonId} className="pw-acc__inner" inert={!open}>
          <div className="pw-acc__content pb-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
