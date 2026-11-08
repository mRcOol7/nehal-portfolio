"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface ScrolltideGlassLensProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

/**
 * ScrolltideGlassLens
 * Inspired by Scrolltide (scrolltide.co) "Meniscus" & "Glass Tabs" liquid glass physics.
 * Features:
 * - Dynamic cursor-tracked specular light reflection
 * - Chromatic refraction glint along the lens rim (cyan + rose)
 * - Tactile glass depth without decorative slop
 * - Zero sound, touch-safe fallback
 */
export default function ScrolltideGlassLens({
  children,
  className = "",
  intensity = 1,
}: ScrolltideGlassLensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse coordinate motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring motion values for fluid liquid lag
  const springX = useSpring(mouseX, { stiffness: 260, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 260, damping: 25 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
      onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/70 dark:bg-[#12131A]/70 backdrop-blur-xl transition-colors ${className}`}
    >
      {/* Specular Liquid Light Refraction (Active on Hover) */}
      {!isTouchDevice && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? intensity : 0,
            background: `radial-gradient(420px circle at ${springX}px ${springY}px, rgba(255, 255, 255, 0.08), transparent 65%)`,
          }}
        />
      )}

      {/* Meniscus Chromatic Prism Rim Glint */}
      {!isTouchDevice && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 mix-blend-screen"
          style={{
            opacity: isHovered ? intensity * 0.75 : 0,
            background: `radial-gradient(240px circle at ${springX}px ${springY}px, rgba(225, 29, 72, 0.12), rgba(56, 189, 248, 0.08), transparent 75%)`,
          }}
        />
      )}

      {/* Surface Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
