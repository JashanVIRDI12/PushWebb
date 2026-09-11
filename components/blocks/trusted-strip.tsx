import Image from 'next/image';
import { FEATURED_CLIENTS } from '@/lib/clients';
import { cn } from '@/lib/utils';

/* ────────────────────────────────────────────────────────────────
   TRUSTED BEHIND — the first proof after the hero.

   Deliberately lighter than the full roster further down: one line of
   heading, one line of copy, and a single drifting row of name chips.
   The heading does the work; the chips confirm it. The full cards,
   categories and reach figures stay in the roster section.

   The row is rendered twice for a seamless loop. Each chip carries its
   own right margin (not a flex gap) so the -50% keyframe lands exactly
   on the seam. The duplicate is aria-hidden, and reduced-motion users
   get the first copy as a static, wrapped cluster instead.
──────────────────────────────────────────────────────────────── */

export function TrustedStrip() {
  const loop = [...FEATURED_CLIENTS, ...FEATURED_CLIENTS];

  return (
    <section
      id="trusted"
      className="reveal-section relative overflow-hidden border-t border-line bg-paper py-14 md:py-20"
    >
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid gap-5 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <p className="anim-eyebrow eyebrow mb-3">Trusted Behind</p>
            <h2 className="split-h2 text-[1.75rem] leading-[1.05] tracking-[-1px] text-ink sm:text-4xl md:text-[2.75rem]">
              Content That Millions Have Watched.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-ink-soft md:col-span-5 md:text-[15px]">
            From creator led media brands to growing businesses, our team has built and operated
            content systems across YouTube, social media, production and performance.
          </p>
        </div>
      </div>

      <div className="reveal-stagger mt-9 md:mt-12">
        <div className="logo-marquee relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)]">
          <ul className="logo-marquee-track flex w-max" aria-label="Brands and creators we have worked with">
            {loop.map((client, i) => {
              const duplicate = i >= FEATURED_CLIENTS.length;
              return (
                <li
                  key={`${client.name}-${i}`}
                  aria-hidden={duplicate || undefined}
                  className="mr-3 flex h-12 shrink-0 items-center gap-3 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-5 shadow-[0_6px_18px_-12px_rgba(11,26,43,0.35)]"
                >
                  <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line bg-white">
                    <Image
                      src={client.src}
                      alt={duplicate ? '' : `${client.name} logo`}
                      width={36}
                      height={36}
                      className={cn(
                        'h-full w-full',
                        client.kind === 'mark' ? 'object-contain p-[6%]' : 'object-cover',
                      )}
                    />
                  </span>
                  <span className="whitespace-nowrap font-display text-sm font-semibold tracking-[-0.01em] text-ink">
                    {client.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
