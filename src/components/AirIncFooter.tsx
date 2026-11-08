"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Sun, Moon, Sunrise, Sunset, ArrowUp } from "lucide-react";
import BenchoMagnetic from "./BenchoMagnetic";

type TimeOfDay = "night" | "dusk" | "day" | "dawn";

interface TimeFilter {
  name: string;
  overlay: string;
  filter: string;
}

const TIME_FILTERS: Record<TimeOfDay, TimeFilter> = {
  night: {
    name: "Night",
    overlay: "bg-transparent",
    filter: "brightness(1) contrast(1.05)",
  },
  dusk: {
    name: "Dusk",
    overlay:
      "bg-gradient-to-t from-rose-950/40 via-purple-900/30 to-amber-950/30 mix-blend-color-dodge",
    filter: "brightness(1.08) hue-rotate(-15deg) saturate(1.2)",
  },
  dawn: {
    name: "Dawn",
    overlay:
      "bg-gradient-to-t from-sky-950/40 via-teal-900/20 to-amber-950/20 mix-blend-screen",
    filter: "brightness(1.05) hue-rotate(15deg) saturate(1.1)",
  },
  day: {
    name: "Day",
    overlay: "bg-sky-500/10 mix-blend-soft-light",
    filter: "brightness(1.2) contrast(1.1) saturate(1.25)",
  },
};

/**
 * AirIncFooter
 * Inspired by the award-winning air.inc 3D footer.
 * Features:
 * - High-definition visual render of rolling meadow, fireflies, red mushrooms, and cursive glass neon "Nehal"
 * - Dynamic Time-of-Day modes (Night, Dusk, Dawn, Day) with smooth atmospheric lighting filters
 * - Fluid interactive cursor parallax tilt
 * - Lightweight floating ambient fireflies
 * - Authentic Air.inc layout with floating time pill & responsive social dock
 */
export default function AirIncFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeMode, setTimeMode] = useState<TimeOfDay>("night");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Cursor parallax coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x * 24); // max 24px drift
    mouseY.set(y * 18);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[380px] xs:h-[440px] sm:h-[520px] md:h-[600px] lg:h-[680px] xl:h-[720px] rounded-3xl overflow-hidden select-none my-8 sm:my-10 border border-neutral-200/60 dark:border-neutral-800/80 shadow-2xl transition-all duration-700 bg-[#060D1E]"
    >
      {/* Parallax Container for Cinematic Render */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: 1.05,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Image
          src="/air-footer-nehal.jpg"
          alt="Air.inc inspired 3D Meadow with Cursive Glass Neon Nehal, Red Mushrooms & Fireflies"
          fill
          priority
          draggable={false}
          className="object-cover object-center pointer-events-none transition-all duration-700 ease-out"
          style={{
            filter: TIME_FILTERS[timeMode].filter,
          }}
        />
      </motion.div>

      {/* Dynamic Time-of-Day Atmospheric Blend Overlay */}
      <div
        className={`pointer-events-none absolute inset-0 transition-all duration-700 ${TIME_FILTERS[timeMode].overlay}`}
      />

      {/* Atmospheric Vignette Overlays for Depth & Readability */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Floating Fireflies Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(14)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 7) % 100}%`,
              y: `${70 + ((i * 11) % 30)}%`,
              opacity: 0.3,
              scale: 0.8,
            }}
            animate={{
              y: [`${70 + ((i * 11) % 30)}%`, `${15 + ((i * 13) % 40)}%`],
              x: [
                `${(i * 7) % 100}%`,
                `${((i * 7) % 100) + ((i % 2 === 0 ? 1 : -1) * 4)}%`,
              ],
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 6 + (i % 5) * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 6) * 0.8,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
          />
        ))}
      </div>

      {/* Top Left Badge Overlay */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-white text-xs font-mono shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Meadow · Air.inc Inspired</span>
        </div>
      </div>

      {/* Floating Time-of-Day Switcher Pill (Featured on air.inc on the right) */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 p-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-xl text-white">
        <button
          onClick={() => setTimeMode("dawn")}
          title="Dawn (Morning Mist)"
          aria-label="Set Dawn Mode"
          className={`p-2.5 rounded-full transition-all ${
            timeMode === "dawn"
              ? "bg-white/25 text-sky-300 scale-110 shadow-sm"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sunrise className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTimeMode("day")}
          title="Daytime (Bright Sun)"
          aria-label="Set Daytime Mode"
          className={`p-2.5 rounded-full transition-all ${
            timeMode === "day"
              ? "bg-white/25 text-amber-300 scale-110 shadow-sm"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTimeMode("dusk")}
          title="Dusk (Sunset Twilight)"
          aria-label="Set Dusk Mode"
          className={`p-2.5 rounded-full transition-all ${
            timeMode === "dusk"
              ? "bg-white/25 text-rose-300 scale-110 shadow-sm"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sunset className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTimeMode("night")}
          title="Night (Midnight Stars & Fireflies)"
          aria-label="Set Night Mode"
          className={`p-2.5 rounded-full transition-all ${
            timeMode === "night"
              ? "bg-white/25 text-indigo-300 scale-110 shadow-sm"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Floating Social Hub (As seen in air.inc) */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        <div className="text-xs font-mono text-white/80">
          <span>Nehal Chauhan © 2026 · Gujarat, India</span>
        </div>

        {/* Authentic Social Links Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <BenchoMagnetic strength={0.25}>
            <a
              href="https://github.com/mRcOol7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all shadow-sm flex items-center justify-center"
              title="GitHub: github.com/mRcOol7"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </BenchoMagnetic>

          <BenchoMagnetic strength={0.25}>
            <a
              href="https://www.linkedin.com/in/nehal-chauhan19"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all shadow-sm flex items-center justify-center"
              title="LinkedIn: linkedin.com/in/nehal-chauhan19"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </BenchoMagnetic>

          <BenchoMagnetic strength={0.25}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all shadow-sm group"
              title="Scroll smoothly to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </BenchoMagnetic>
        </div>
      </div>
    </div>
  );
}
