'use client';

const DEFAULT_ITEMS = [
  'YAAS',
  'MICROCONTENT MASTERY',
  'AD CAMPAIGNS',
  'AI AUTOMATION',
  'SOCIAL MEDIA MARKETING',
  'PERFORMANCE MARKETING',
];

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
            <span className="font-display text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-[#b4b4b4] px-6 sm:px-8 select-none">
              {item}
            </span>
            <span className="text-white/25 text-[8px] shrink-0">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
