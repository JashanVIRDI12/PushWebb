'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { CLIENTS, formatCount, type Client, type LiveStats, type Stat } from '@/lib/clients';

/* ────────────────────────────────────────────────────────────────
   CLIENT ROSTER

   Solid white cards on the dark stage — no glass, no gradient fill.
   Each card carries a circular mark, the name, a category chip and a
   reach rail.

   `kind` reconciles three incompatible asset types inside one round
   frame: a `mark` is contained on a white disc so a wordmark keeps its
   air, a `tile` bleeds because the artwork already is the disc.

   Subscriber counts arrive from /api/channel-stats after mount and
   roll up from the last rendered value, so the section is complete on
   first paint whether or not the API key is configured.
──────────────────────────────────────────────────────────────── */

/** A rail entry. `raw` is present only for live figures, which are the ones
 *  that roll up — hand-entered strings like "50M+" are rendered as written. */
type RailItem = Stat & { raw?: number };

function ClientCard({ client, live }: { client: Client; live?: LiveStats }) {
  const cellRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const shownRef = useRef<Record<number, number>>({});

  const rail: RailItem[] = live
    ? [
        ...(live.subscribers !== null
          ? [{ value: formatCount(live.subscribers), platform: 'Subscribers', raw: live.subscribers }]
          : []),
        ...(live.views !== null
          ? [{ value: formatCount(live.views), platform: 'Views', raw: live.views }]
          : []),
      ]
    : (client.manual ?? []).slice(0, 2);

  // Roll each live figure up from whatever is already on screen, so a late
  // API response animates rather than snapping.
  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const tweens = rail.flatMap((item, i) => {
        const el = cellRefs.current[i];
        if (!el || item.raw === undefined) return [];
        if (reduced) {
          el.textContent = formatCount(item.raw);
          shownRef.current[i] = item.raw;
          return [];
        }
        const counter = { value: shownRef.current[i] ?? 0 };
        const target = item.raw;
        return [
          gsap.to(counter, {
            value: target,
            duration: 1.4,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = formatCount(Math.round(counter.value));
            },
            onComplete: () => {
              shownRef.current[i] = target;
            },
          }),
        ];
      });

      return () => tweens.forEach((t) => t.kill());
    },
    { dependencies: [live?.subscribers, live?.views] },
  );

  return (
    <article className="client-card on-light group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_32px_-14px_rgba(2,6,18,0.55)]">
      <div className="flex flex-1 flex-col items-center px-4 pb-5 pt-6 text-center sm:px-5 sm:pt-7">
        <div className="relative">
          <span
            aria-hidden
            className="absolute -inset-1 rounded-full border border-line opacity-0 transition-all duration-500 ease-out group-hover:-inset-[0.4rem] group-hover:opacity-100"
          />
          <div className="relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-full border border-line transition-transform duration-500 ease-out group-hover:scale-[1.06] sm:h-20 sm:w-20">
            {client.kind === 'mark' ? (
              <span className="absolute inset-0 bg-white">
                <Image src={client.src} alt={client.name} fill sizes="80px" className="object-contain p-[6%]" />
              </span>
            ) : (
              <Image src={client.src} alt={client.name} fill sizes="80px" className="object-cover" />
            )}
          </div>
        </div>

        <h3 className="mt-4 font-display text-[15px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-base">
          {client.name}
        </h3>

        {/* nowrap keeps every chip a single line — one wrapping label used to
            push its whole grid row out of alignment. */}
        <span className="mt-2.5 inline-block whitespace-nowrap rounded-full border border-line px-2.5 py-[0.3rem] font-mono text-[8px] uppercase leading-none tracking-[0.13em] text-ink-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-ink-soft sm:text-[9px]">
          {client.category}
        </span>
      </div>

      {rail.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(0,1fr))] divide-x divide-line border-t border-line bg-paper-alt">
          {rail.map((stat, i) => (
            <div key={stat.platform} className="px-2 py-3 text-center">
              <p className="font-display text-sm font-bold leading-none text-ink">
                <span
                  ref={(el) => {
                    cellRefs.current[i] = el;
                  }}
                >
                  {stat.value}
                </span>
              </p>
              <p className="mt-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-ink-muted">
                {stat.platform}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

export function ClientLogoWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [channels, setChannels] = useState<Record<string, LiveStats>>({});

  // Fetched after mount rather than server-rendered: the roster is inside a
  // client tree, and a failed or unconfigured lookup must never block paint.
  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/channel-stats', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.channels) setChannels(data.channels as Record<string, LiveStats>);
      })
      .catch(() => {
        /* Offline or upstream down — the hand-entered rails still render. */
      });
    return () => controller.abort();
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const grid = section.querySelector<HTMLElement>('.client-grid');
      const cards = gsap.utils.toArray<HTMLElement>('.client-card', section);
      if (!grid || !cards.length) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      // ── Entrance: the grid deals itself out from the middle, so the eye
      //    lands mid-roster and the corners resolve last.
      gsap.set(grid, { perspective: 1100 });
      gsap.set(cards, { autoAlpha: 0, y: 46, scale: 0.9, rotateX: -14, transformOrigin: '50% 0%' });

      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: { grid: 'auto', from: 'center', amount: 0.7 },
        scrollTrigger: { trigger: grid, start: 'top 82%', once: true },
      });

      // ── Hover: the card tilts toward the pointer. Pointer-only, and the
      //    tilt is clamped so a card never leaves its own hit box.
      const media = gsap.matchMedia();

      media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const teardown = cards.map((card) => {
          // One live tween per axis rather than a new one per pointermove.
          const rotX = gsap.quickTo(card, 'rotateX', { duration: 0.55, ease: 'power3' });
          const rotY = gsap.quickTo(card, 'rotateY', { duration: 0.55, ease: 'power3' });
          const lift = gsap.quickTo(card, 'y', { duration: 0.55, ease: 'power3' });

          const onMove = (event: PointerEvent) => {
            const rect = card.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            rotY(gsap.utils.clamp(-7, 7, px * 15));
            rotX(gsap.utils.clamp(-7, 7, -py * 15));
            lift(-6);
          };

          const onLeave = () => {
            rotX(0);
            rotY(0);
            lift(0);
          };

          card.addEventListener('pointermove', onMove);
          card.addEventListener('pointerleave', onLeave);
          return () => {
            card.removeEventListener('pointermove', onMove);
            card.removeEventListener('pointerleave', onLeave);
          };
        });

        return () => teardown.forEach((off) => off());
      });

      ScrollTrigger.refresh();

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="reveal-section relative overflow-hidden py-16 md:py-24"
    >
      <div className="container relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <div className="mb-10 sm:mb-14">
          <p className="anim-eyebrow eyebrow mb-3">Trusted By</p>
          <h2 className="split-h2 font-display text-3xl leading-[1.05] tracking-[-1.5px] text-ink sm:text-4xl md:text-5xl">
            The Brands and Creators
            <br className="hidden sm:block" /> We Build With
          </h2>
        </div>

        {/* 2 and 4 both divide the roster evenly — a 3- or 5-wide grid
            strands the last card alone on its own row. */}
        <div className="client-grid grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {CLIENTS.map((client) => (
            <ClientCard key={client.name} client={client} live={channels[client.name]} />
          ))}
        </div>
      </div>
    </section>
  );
}
