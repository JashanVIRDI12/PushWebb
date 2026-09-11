'use client';

import { SERVICE_CHANNELS } from '@/lib/services';

// The six capabilities under their brief names, read from the same list as
// the /services sections so the ticker can't drift back to retired ones.
const DEFAULT_ITEMS = SERVICE_CHANNELS.map((channel) => channel.name.toUpperCase());

export function MarqueeTicker({ items = DEFAULT_ITEMS }: { items?: string[] }) {
  // Tripled for a truly seamless loop at all viewport widths
  const repeated = [...items, ...items, ...items];

  return (
    // Carries the hero's black room and navy glow (.marquee-band), and
    // scopes .on-dark itself so it reads the same whether it follows the
    // black hero or sits between two paper sections on /services.
    <div className="on-dark marquee-band relative border-t border-b border-white/10 py-[14px] overflow-hidden">
      {/* Left + right edge fades, matching the band's black ground */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="marquee-outer flex w-max">
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="font-display text-[9px] sm:text-[10px] font-bold tracking-[0.38em] uppercase text-gold-gradient px-6 sm:px-8 select-none">
              {item}
            </span>
            <span className="text-[#f3ca68]/50 text-[8px] shrink-0">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
