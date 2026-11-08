"use client";

import React, { useRef, useState, useEffect } from "react";

interface AnimasterSpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  enableTilt?: boolean;
}

/**
 * AnimasterSpotlightCard
 * Inspired by Animmaster Lib (animmasterlib.dev) PRO-level interactive UI components.
 * Features:
 * - Fluid cursor-following radial spotlight on card surface
 * - Luminous border illumination under mouse pointer
 * - Subtle 3D perspective spring tilt
 * - Graceful fallback for touch screens and prefers-reduced-motion
 */
export default function AnimasterSpotlightCard({
  children,
  className = "",
  spotlightColor = "rgba(225, 29, 72, 0.15)", // Theme rose accent
  enableTilt = true,
}: AnimasterSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(media.matches);

    const onChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isReducedMotion) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
    setOpacity(1);

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = ((y - centerY) / centerY) * -5; // Max 5 deg tilt
      const tiltY = ((x - centerX) / centerX) * 5;
      setTilt({ x: tiltX, y: tiltY });
    }
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt && !isReducedMotion
          ? `perspective(1000px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg)`
          : "none",
        transition: "transform 0.18s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease",
      }}
      className={`relative overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-[#262638] bg-white/60 dark:bg-[#12121A]/70 shadow-sm hover:shadow-md will-change-transform ${className}`}
    >
      {/* 1. Animaster Dynamic Radial Spotlight Fill */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* 2. Animaster Crisp Border Illumination Ring */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.4), transparent 45%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Card Children Content Container */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
}

