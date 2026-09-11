'use client';

import { useEffect, useRef } from 'react';

/* Calendly ships no npm package for the embed — the widget is a script that
   mounts itself into a host element. Loading it here (rather than in the
   layout) keeps it off every other page, and initialising by hand means a
   client-side navigation back to /contact re-mounts the calendar instead of
   leaving an empty box behind. */

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export function CalendlyInline({ url, className }: { url: string; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;

    const mount = () => {
      if (cancelled || !window.Calendly) return;
      host.replaceChildren();
      window.Calendly.initInlineWidget({ url, parentElement: host });
    };

    if (!document.querySelector(`link[href="${WIDGET_CSS}"]`)) {
      const stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = WIDGET_CSS;
      document.head.appendChild(stylesheet);
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT}"]`);
    if (window.Calendly) {
      mount();
    } else if (existing) {
      existing.addEventListener('load', mount);
    } else {
      const script = document.createElement('script');
      script.src = WIDGET_SCRIPT;
      script.async = true;
      script.addEventListener('load', mount);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      existing?.removeEventListener('load', mount);
    };
  }, [url]);

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ minWidth: 320, height: 720 }}
      aria-label="Book a strategy call"
    />
  );
}
