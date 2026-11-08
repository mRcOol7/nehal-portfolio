"use client";

import React, { useEffect, useRef, useState } from "react";

interface VengeanceCounterProps {
  value: number;
  duration?: number; // duration in seconds
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * VengeanceCounter
 * Inspired by Vengeance UI (vengenceui.com) Motion Kernel.
 * Features:
 * - Viewport-triggered animated numeric roll-up
 * - Ease-out quartic interpolation curve
 * - Tabular font styling to prevent layout jitter
 * - Handles decimal precision and custom suffixes
 */
export default function VengeanceCounter({
  value,
  duration = 2.2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: VengeanceCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);

            // Quartic ease-out curve
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const current = easeOut * value;

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toString();

  return (
    <span
      ref={elementRef}
      className={`tabular-nums font-mono ${className}`}
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

