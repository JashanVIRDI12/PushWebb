"use client";

import React from "react";
import { Plus } from "lucide-react";

type TextColorProps = {
  /** Exactly three words — each takes a turn lighting up with a gradient. */
  words?: [string, string, string];
  className?: string;
};

/**
 * Cycling gradient wordmark. Every word rests as solid ink; one at a time
 * lights up with a PUSHWebb-toned gradient (indigo → sky → violet → ink).
 * Animation + colour classes live in globals.css (`.pw-word-*`, `.pw-gradient-*`).
 */
export function TextColor({
  words = ["Strategy.", "Story.", "Growth."],
  className = "",
}: TextColorProps) {
  const fg = ["pw-word-cycle-1", "pw-word-cycle-2", "pw-word-cycle-3"];
  const bg = ["pw-word-cycle-bg-1", "pw-word-cycle-bg-2", "pw-word-cycle-bg-3"];
  const grad = ["pw-gradient-1", "pw-gradient-2", "pw-gradient-3"];

  return (
    <div className={`mx-auto w-full max-w-3xl px-2 ${className}`}>
      <div className="relative h-full w-full border border-line px-6 py-10 [mask-image:radial-gradient(200rem_40rem_at_center,white,transparent)] sm:px-10">
        <Plus className="absolute -left-4 -top-4 h-8 w-8 text-accent" aria-hidden />
        <Plus className="absolute -bottom-4 -left-4 h-8 w-8 text-accent" aria-hidden />
        <Plus className="absolute -right-4 -top-4 h-8 w-8 text-accent" aria-hidden />
        <Plus className="absolute -bottom-4 -right-4 h-8 w-8 text-accent" aria-hidden />

        <h1 className="flex select-none flex-col items-center justify-center text-center text-[clamp(2.5rem,10vw,5rem)] font-extrabold leading-[0.95] tracking-tighter">
          {words.map((word, i) => (
            <span key={word} data-content={word} className={`relative ${bg[i]}`}>
              <span
                className={`relative z-10 block px-2 pw-gradient-text ${grad[i]} ${fg[i]}`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
