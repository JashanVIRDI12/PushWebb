"use client";

// Ruixen Gradient Footer — a normal footer that sits at the bottom of the page.
// Its content reads first; the blurred rainbow is pinned to the bottom of the
// viewport and stretches up from the floor over the last stretch of scroll,
// hitting full height exactly when you reach the end of the page.
// One inline <svg> — no canvas, no giant scroll spacer.
//
// Gradient design inspired by Dia Browser — https://www.diabrowser.com

import {
  useId,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Stop = { offset: number; color: string };

const VBW = 1271;
const VBH = 599;

// Ruixen's stops, floor (0) → top (1): dark ember → blue → near-white → yellow
// → red-orange → magenta → transparent pink.
const RUIXEN_STOPS: Stop[] = [
  { offset: 0, color: "#340B05" },
  { offset: 0.1827, color: "#0358F7" },
  { offset: 0.2837, color: "#5092C7" },
  { offset: 0.4135, color: "#E1ECFE" },
  { offset: 0.5866, color: "#FFD400" },
  { offset: 0.6827, color: "#FA3D1D" },
  { offset: 0.8029, color: "#FD02F5" },
  { offset: 1, color: "#FFC0FD00" },
];

// Height curve: a gentle power falloff, giving the flatter, pyramid-like rise of
// the original footer (short edges, tallest middle).
function bellHeights(n: number, peak: number, valley: number): number[] {
  const out: number[] = [];
  const mid = (n - 1) / 2;
  for (let i = 0; i < n; i++) {
    const t = mid === 0 ? 0 : Math.abs(i - mid) / mid; // 0 center → 1 edge
    const eased = 1 - Math.pow(t, 1.24);
    out.push(peak * VBH * (valley + (1 - valley) * eased));
  }
  return out;
}

export interface RuixenGradientFooterProps {
  /** Footer content — links, wordmark, copyright — shown above the glow. */
  children?: ReactNode;
  /**
   * Height of the glow band pinned to the viewport bottom. Doubles as the
   * scroll distance the reveal takes, and the room reserved under the content.
   */
  gradientHeight?: string;
  /**
   * Resting height of the glow, as a fraction of the band — a thin, flat strip
   * of rainbow along the bottom edge before the scroll reveal starts. `0` keeps
   * it hidden until the last screen.
   */
  minReveal?: number;
  /** Number of blurred columns. */
  bars?: number;
  /** Blur in viewBox units. */
  blur?: number;
  /** Peak height as a fraction of the viewBox. */
  peak?: number;
  /** Edge height as a fraction of the peak (0..1). */
  valley?: number;
  /** Vertical rainbow gradient stops, floor (0) → top (1). */
  stops?: Stop[];
  className?: string;
  style?: CSSProperties;
}

export function RuixenGradientFooter({
  children,
  gradientHeight = "65vh",
  minReveal = 0.045,
  bars = 9,
  blur = 15,
  peak = 0.98,
  valley = 0.55,
  stops = RUIXEN_STOPS,
  className,
  style,
}: RuixenGradientFooterProps) {
  const uid = useId().replace(/:/g, "");
  const footerRef = useRef<HTMLElement>(null);
  const bandRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const band = bandRef.current;
    if (!band) return;

    const media = gsap.matchMedia();
    const range = () => ({
      start: Math.max(0, ScrollTrigger.maxScroll(window) - band.offsetHeight),
      end: ScrollTrigger.maxScroll(window),
    });

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        band,
        { scaleY: minReveal },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            start: () => range().start,
            end: () => range().end,
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    media.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(band, { scaleY: minReveal });
      const setScale = gsap.quickSetter(band, 'scaleY');
      ScrollTrigger.create({
        start: () => range().end,
        onEnter: () => setScale(1),
        onLeaveBack: () => setScale(minReveal),
      });
      return () => setScale(minReveal);
    });

    return () => media.revert();
  }, { scope: footerRef, dependencies: [minReveal], revertOnUpdate: true });

  const colW = VBW / bars;

  return (
    // The glow is pinned to the viewport, so the footer reserves the same
    // height beneath its content for the glow to land in.
    <footer
      ref={footerRef}
      className={className}
      style={{ paddingBottom: gradientHeight, ...style }}
    >
      {children}

      {/* ponytail: fixed to the viewport — a transformed/filtered ancestor
          would capture it. Give the footer a plain containing block. */}
      <div
        ref={bandRef}
        aria-hidden
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          height: gradientHeight,
          pointerEvents: "none",
          transformOrigin: "bottom",
          transform: `scaleY(${minReveal})`,
          willChange: "transform",
        }}
      >
        <svg
          style={{ height: "100%", width: "100%", display: "block" }}
          viewBox={`0 0 ${VBW} ${VBH}`}
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-${uid}`} x1="0" y1="1" x2="0" y2="0">
              {stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.color} />
              ))}
            </linearGradient>
            <filter
              id={`blur-${uid}`}
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation={blur} />
            </filter>
          </defs>
          {bellHeights(bars, peak, valley).map((barH, i) => (
            <g key={i} filter={`url(#blur-${uid})`}>
              <rect
                x={i * colW}
                y={VBH - barH}
                width={colW * 1.23}
                height={barH}
                fill={`url(#grad-${uid})`}
              />
            </g>
          ))}
        </svg>
      </div>
    </footer>
  );
}
