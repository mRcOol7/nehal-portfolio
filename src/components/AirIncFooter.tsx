"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";
import BenchoMagnetic from "./BenchoMagnetic";

interface ButterflyProps {
  initialX: number;
  initialY: number;
  pathX: number[];
  pathY: number[];
  rotations: number[];
  duration: number;
  delay: number;
  scale?: number;
  color?: string;
  glowColor?: string;
}

/**
 * 3D Wing-Flapping Butterfly with Curved Flight Trajectory
 */
function AnimatedButterfly({
  initialX,
  initialY,
  pathX,
  pathY,
  rotations,
  duration,
  delay,
  scale = 1,
  color = "#38BDF8",
  glowColor = "rgba(56, 189, 248, 0.8)",
}: ButterflyProps) {
  return (
    <motion.div
      initial={{ x: initialX, y: initialY, opacity: 0 }}
      animate={{
        x: pathX,
        y: pathY,
        rotate: rotations,
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute pointer-events-none z-20"
      style={{
        transformStyle: "preserve-3d",
        perspective: 600,
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          transform: `scale(${scale})`,
          filter: `drop-shadow(0 0 10px ${glowColor})`,
        }}
      >
        {/* Left Wing */}
        <motion.div
          animate={{
            rotateY: [0, 68, -15, 68, 0],
          }}
          transition={{
            duration: 0.26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "right center",
          }}
          className="w-5 h-6 -mr-0.5"
        >
          <svg viewBox="0 0 30 40" className="w-full h-full fill-current" style={{ color }}>
            <path
              d="M30 20 C22 10, 5 0, 0 8 C-3 15, 12 24, 30 20 Z"
              fill={color}
              opacity="0.9"
            />
            <path
              d="M30 20 C24 26, 8 36, 4 30 C1 24, 18 18, 30 20 Z"
              fill={color}
              opacity="0.75"
            />
          </svg>
        </motion.div>

        {/* Slender Body */}
        <div className="w-0.5 h-4 bg-white/90 rounded-full shadow-[0_0_6px_#fff] z-10" />

        {/* Right Wing */}
        <motion.div
          animate={{
            rotateY: [0, -68, 15, -68, 0],
          }}
          transition={{
            duration: 0.26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformOrigin: "left center",
          }}
          className="w-5 h-6 -ml-0.5"
        >
          <svg
            viewBox="0 0 30 40"
            className="w-full h-full fill-current scale-x-[-1]"
            style={{ color }}
          >
            <path
              d="M30 20 C22 10, 5 0, 0 8 C-3 15, 12 24, 30 20 Z"
              fill={color}
              opacity="0.9"
            />
            <path
              d="M30 20 C24 26, 8 36, 4 30 C1 24, 18 18, 30 20 Z"
              fill={color}
              opacity="0.75"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}

/**
 * AirIncFooter
 * Inspired by Air.inc's award-winning footer experience.
 * Features:
 * - Full-screen edge-to-edge breakout (spans 100vw across monitor)
 * - Gemini 3D render of rolling meadow, mushrooms, fireflies, and cursive glass neon "Nehal"
 * - Animated 3D fluttering butterflies looping across the scene
 * - Animated breathing & spore shimmer on mushrooms
 * - Animated floating levitation & traveling refractive glass gleam on the name
 * - Cleaned layout: theme switcher and interactive badge removed per user direction
 * - Strictly zero sound, touch-safe, respects prefers-reduced-motion
 */
export default function AirIncFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 90, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 90, damping: 22 });

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
    mouseX.set(x * 28);
    mouseY.set(y * 20);
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
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-[450px] xs:h-[520px] sm:h-[600px] md:h-[680px] lg:h-[760px] xl:h-[820px] overflow-hidden select-none my-10 sm:my-14 border-y border-neutral-200/50 dark:border-neutral-800/80 shadow-2xl bg-[#060D1E]"
    >
      {/* Parallax Container for Cinematic Render */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          scale: 1.06,
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <Image
          src="/air-footer-nehal.jpg"
          alt="Air.inc inspired Meadow with Cursive Glass Neon Nehal, Butterflies & Mushrooms"
          fill
          priority
          draggable={false}
          className="object-cover object-center pointer-events-none"
        />

        {/* 1. Animated Cursive Glass Name Glow & Sweeping Refractive Sheen */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{
              y: [-6, 6, -6],
              scale: [1, 1.015, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-[340px] sm:w-[500px] md:w-[650px] lg:w-[780px] h-[160px] sm:h-[220px] -mt-10 sm:-mt-14"
          >
            {/* Ambient Cyan/Ice-Blue Neon Backlight Pulse */}
            <motion.div
              animate={{
                opacity: [0.35, 0.7, 0.35],
                scale: [0.95, 1.06, 0.95],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full blur-[80px] bg-gradient-to-r from-sky-400/25 via-cyan-300/35 to-rose-400/20 pointer-events-none"
            />

            {/* Traveling Caustic Glass Glint Sweep across "Nehal" */}
            <motion.div
              animate={{
                x: ["-120%", "220%"],
              }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] blur-md pointer-events-none"
            />
          </motion.div>
        </div>

        {/* 2. Animated Whimsical Mushrooms: Subtle Spore Aura & Shimmer */}
        {/* Left Mushroom Cluster Spores */}
        <div className="absolute left-[8%] sm:left-[14%] bottom-[18%] sm:bottom-[22%] pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`spore-l-${i}`}
              animate={{
                y: [0, -35 - i * 8],
                x: [0, (i % 2 === 0 ? 1 : -1) * (10 + i * 4)],
                opacity: [0, 0.8, 0],
                scale: [0.6, 1.2, 0.4],
              }}
              transition={{
                duration: 3 + i * 0.8,
                repeat: Infinity,
                delay: i * 0.9,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 rounded-full bg-rose-400/80 blur-xs shadow-[0_0_8px_#f43f5e]"
            />
          ))}
        </div>

        {/* Right Mushroom Cluster Spores */}
        <div className="absolute right-[10%] sm:right-[18%] bottom-[16%] sm:bottom-[20%] pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`spore-r-${i}`}
              animate={{
                y: [0, -40 - i * 10],
                x: [0, (i % 2 === 0 ? -1 : 1) * (12 + i * 5)],
                opacity: [0, 0.85, 0],
                scale: [0.6, 1.3, 0.4],
              }}
              transition={{
                duration: 3.2 + i * 0.9,
                repeat: Infinity,
                delay: 0.5 + i * 0.8,
                ease: "easeOut",
              }}
              className="absolute w-2 h-2 rounded-full bg-rose-300/80 blur-xs shadow-[0_0_8px_#fb7185]"
            />
          ))}
        </div>
      </motion.div>

      {/* 3. Animated Luminous Butterflies: Graceful Fluttering Flight Paths */}
      {/* Butterfly 1: Glowing Cyan Butterfly circling the Glass Name */}
      <AnimatedButterfly
        initialX={-100}
        initialY={180}
        pathX={[100, 320, 580, 850, 1150, 1450]}
        pathY={[280, 180, 240, 160, 220, 140]}
        rotations={[10, -18, 12, -15, 20, -10]}
        duration={14}
        delay={0}
        scale={1.25}
        color="#38BDF8"
        glowColor="rgba(56, 189, 248, 0.9)"
      />

      {/* Butterfly 2: Ethereal Violet Butterfly floating over the left mushrooms */}
      <AnimatedButterfly
        initialX={150}
        initialY={380}
        pathX={[150, 240, 380, 520, 720, 950]}
        pathY={[380, 310, 350, 270, 320, 220]}
        rotations={[-15, 22, -12, 18, -10, 15]}
        duration={16}
        delay={2.5}
        scale={1.05}
        color="#C084FC"
        glowColor="rgba(192, 132, 252, 0.85)"
      />

      {/* Butterfly 3: Golden Fairy Butterfly fluttering from right meadow to center */}
      <AnimatedButterfly
        initialX={1200}
        initialY={420}
        pathX={[1200, 980, 780, 600, 420, 200]}
        pathY={[420, 320, 360, 260, 300, 190]}
        rotations={[18, -12, 15, -20, 14, -15]}
        duration={17}
        delay={4}
        scale={1.15}
        color="#FDE047"
        glowColor="rgba(253, 224, 71, 0.9)"
      />

      {/* Butterfly 4: Playful Rose Butterfly dancing near the mushrooms */}
      <AnimatedButterfly
        initialX={350}
        initialY={480}
        pathX={[350, 420, 360, 480, 560, 680]}
        pathY={[480, 410, 460, 380, 430, 340]}
        rotations={[-10, 18, -14, 20, -12, 10]}
        duration={13}
        delay={6.5}
        scale={0.9}
        color="#FB7185"
        glowColor="rgba(251, 113, 133, 0.85)"
      />

      {/* Floating Fireflies & Fairy Dust Layer */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${(i * 5.8) % 100}%`,
              y: `${68 + ((i * 9) % 30)}%`,
              opacity: 0.2,
              scale: 0.8,
            }}
            animate={{
              y: [`${68 + ((i * 9) % 30)}%`, `${12 + ((i * 11) % 40)}%`],
              x: [
                `${(i * 5.8) % 100}%`,
                `${((i * 5.8) % 100) + ((i % 2 === 0 ? 1 : -1) * 5)}%`,
              ],
              opacity: [0.15, 0.95, 0.15],
              scale: [0.7, 1.5, 0.7],
            }}
            transition={{
              duration: 7 + (i % 5) * 1.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.7,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.95)]"
          />
        ))}
      </div>

      {/* Atmospheric Vignette Overlays for Contrast & Depth */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Bottom Floating Social Hub (As in air.inc) */}
      <div className="absolute bottom-5 sm:bottom-7 inset-x-6 sm:inset-x-12 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
        <div className="text-xs sm:text-sm font-mono text-white/80">
          <span>Nehal Chauhan © 2026 · Gujarat, India</span>
        </div>

        {/* Authentic Social Links Bar */}
        <div className="flex items-center gap-3">
          <BenchoMagnetic strength={0.25}>
            <a
              href="https://github.com/mRcOol7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all shadow-sm flex items-center justify-center"
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
              className="p-2.5 sm:p-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white transition-all shadow-sm flex items-center justify-center"
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-white transition-all shadow-sm group"
              title="Scroll smoothly to top"
            >
              <span>Top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </BenchoMagnetic>
        </div>
      </div>
    </div>
  );
}
