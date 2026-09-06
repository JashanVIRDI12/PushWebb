"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface RecedingTextPlaneProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Degrees the plane rakes away from the viewer. */
  angle?: number;
  /** Copy laid onto the plane. */
  children: React.ReactNode;
  /** Slides the slab along the raked plane, in pixels. */
  offset?: number;
  /** Viewer distance in pixels. */
  perspective?: number;
  /** Semantic element used for the receding copy. */
  as?: "p" | "h1" | "h2";
}

export function RecedingTextPlane({
  angle = 30,
  as: Text = "p",
  children,
  className,
  offset = 0,
  perspective = 200,
  ...props
}: RecedingTextPlaneProps) {
  return (
    <div
      className={cn(
        "relative isolate h-screen w-full overflow-clip [contain:layout_paint_size]",
        className,
      )}
      {...props}
    >
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
      >
        <Text
          className="w-full max-w-4xl text-center text-4xl font-bold tracking-tighter text-ink sm:text-5xl md:text-6xl"
          style={{
            transform: `rotateX(${angle}deg) translateY(${offset}px) translateZ(10px)`,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </Text>
      </div>
    </div>
  );
}
