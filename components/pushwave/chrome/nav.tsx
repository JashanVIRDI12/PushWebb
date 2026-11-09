'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';
import { BRAND, NAV_CTA, NAV_LINKS } from '@/lib/pushwave/content';
import { PwButton } from '../ui/pw-button';
import { WaveGlyph } from '../ui/primitives';
import { useScrollToHash } from '../hooks';

/**
 * TODO(logo): replace the typographic wordmark with the supplied PUSHWAVE
 * logo file once it exists (keep the "by PUSHWebb" lockup and the link).
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <WaveGlyph className="h-4 w-8 text-pw-wave" />
      <span className="flex items-baseline gap-2">
        <span className="font-pw-display text-[1.25rem] font-semibold leading-none tracking-[-0.03em] text-pw-ink">
          {BRAND.name}
        </span>
        <span className="hidden text-xs font-medium text-pw-steel sm:inline">by {BRAND.parent}</span>
      </span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const scrollToHash = useScrollToHash();

  const lenis = useLenis(({ scroll, progress }) => {
    setScrolled(scroll > 24);
    if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
  });

  // Without Lenis (or before it starts) fall back to native scroll events.
  useEffect(() => {
    if (lenis) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lenis]);

  // The open menu owns the page: stop Lenis, close on Escape, restore focus.
  useEffect(() => {
    if (!menuOpen) return;
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const button = menuButtonRef.current;
    return () => {
      lenis?.start();
      window.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [menuOpen, lenis]);

  const jump = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setMenuOpen(false);
    // Let Lenis restart before scrolling when coming from the menu.
    requestAnimationFrame(() => scrollToHash(href));
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'relative transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out',
          scrolled
            ? 'bg-[rgb(7_7_10/0.62)] shadow-[inset_0_-1px_0_rgb(242_242_240/0.08)] backdrop-blur-xl backdrop-saturate-150'
            : 'bg-transparent',
        )}
      >
        <nav
          aria-label="PUSHWAVE"
          className={cn(
            'pw-shell flex items-center justify-between gap-6 transition-[height] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled ? 'h-16' : 'h-[72px] md:h-20',
          )}
        >
          <a href="#top" onClick={(event) => jump(event, '#top')} className="rounded-full" aria-label={`${BRAND.byline}, back to top`}>
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(event) => jump(event, link.href)}
                  className="rounded-full px-4 py-2 text-[0.9375rem] font-medium text-pw-soft transition-colors duration-300 hover:bg-[rgb(242_242_240/0.06)] hover:text-pw-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <PwButton cta={NAV_CTA} size="sm" className="hidden sm:inline-flex" />
            <button
              ref={menuButtonRef}
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-pw-ink shadow-[inset_0_0_0_1px_rgb(242_242_240/0.18)] transition-colors hover:bg-[rgb(242_242_240/0.06)] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="pw-mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden className="relative block h-3 w-5">
                <span
                  className={cn(
                    'absolute left-0 top-0 h-[1.5px] w-full rounded bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    menuOpen && 'translate-y-[5px] rotate-45',
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 left-0 h-[1.5px] w-full rounded bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    menuOpen && '-translate-y-[5.5px] -rotate-45',
                  )}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Page progress, drawn like a video scrubber. */}
        <div className="absolute inset-x-0 bottom-0 h-px overflow-hidden" aria-hidden>
          <div ref={progressRef} className="h-full origin-left scale-x-0 bg-pw-wave shadow-[0_0_12px_rgb(59_91_255/0.9)]" />
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="pw-mobile-menu"
        className={cn(
          'fixed inset-0 top-0 -z-10 flex flex-col bg-pw-void px-4 pb-8 pt-28 transition-[clip-path,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden',
          menuOpen ? 'visible [clip-path:inset(0_0_0_0)]' : 'invisible [clip-path:inset(0_0_100%_0)]',
        )}
        inert={!menuOpen}
      >
        <ul className="flex flex-col">
          {NAV_LINKS.map((link, index) => (
            <li key={link.href} className="border-b border-pw-line">
              <a
                href={link.href}
                onClick={(event) => jump(event, link.href)}
                className={cn(
                  'flex items-baseline justify-between py-5 font-pw-display text-[2.5rem] font-semibold leading-none tracking-[-0.04em] transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
                )}
                style={{ transitionDelay: menuOpen ? `${0.12 + index * 0.05}s` : '0s' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-col gap-4">
          <PwButton cta={NAV_CTA} block onClick={() => setMenuOpen(false)} />
          <Link href="/" className="text-center text-sm text-pw-steel transition-colors hover:text-pw-ink">
            {BRAND.parent} home
          </Link>
        </div>
      </div>
    </header>
  );
}
