"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface AwwwardsTextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  triggerOnScroll?: boolean;
  stagger?: number;
  duration?: number;
}

export default function AwwwardsTextReveal({
  children,
  as: Component = "h2",
  className = "",
  delay = 0,
  triggerOnScroll = true,
  stagger = 0.05,
  duration = 0.85,
}: AwwwardsTextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const wordElements = el.querySelectorAll<HTMLElement>(".reveal-word-inner");
    if (!wordElements.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordElements,
        {
          yPercent: 115,
          rotateZ: 2.5,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateZ: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger,
          delay,
          scrollTrigger: triggerOnScroll
            ? {
                trigger: el,
                start: "top 88%",
                once: true,
              }
            : undefined,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, stagger, triggerOnScroll]);

  const words = children.trim().split(/\s+/);

  return (
    <Component
      ref={containerRef as any}
      className={className}
      aria-label={children}
    >
      <span className="sr-only">{children}</span>
      <span aria-hidden="true" className="inline-block">
        {words.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="inline-block overflow-hidden py-1.5 -my-1.5 mr-[0.28em] last:mr-0 align-top"
          >
            <span className="reveal-word-inner inline-block will-change-transform">
              {word}
            </span>
          </span>
        ))}
      </span>
    </Component>
  );
}

