"use client";

import React, { ReactNode } from "react";

interface AnimasterMarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  className?: string;
}

/**
 * AnimasterMarquee
 * Inspired by Animmaster Lib (animmasterlib.dev) continuous velocity marquee ribbons.
 * Features:
 * - 60fps GPU-accelerated infinite horizontal conveyor
 * - Seamless dual-track loop without stutter or layout shifts
 * - Interactive pause on hover
 * - Smooth edge-fade masks for seamless dark/light integration
 */
export default function AnimasterMarquee({
  children,
  direction = "left",
  speed = 28,
  pauseOnHover = true,
  className = "",
}: AnimasterMarqueeProps) {
  const animDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={`relative w-full overflow-hidden flex select-none ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div
        className={`flex shrink-0 items-center gap-3 py-1 animate-animaster-marquee ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""
          }`}
        style={
          {
            "--marquee-duration": `${speed}s`,
            animationDirection: animDirection,
          } as React.CSSProperties
        }
      >
        {children}
      </div>

      <div
        aria-hidden="true"
        className={`flex shrink-0 items-center gap-3 py-1 animate-animaster-marquee ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""
          }`}
        style={
          {
            "--marquee-duration": `${speed}s`,
            animationDirection: animDirection,
          } as React.CSSProperties
        }
      >
        {children}
      </div>
    </div>
  );
}