"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface Milestone {
  id: string;
  label: string;
  num: string;
}

const MILESTONES: Milestone[] = [
  { id: "home", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "workstation", label: "Lab", num: "03" },
  { id: "projects", label: "Work", num: "04" },
  { id: "tech-stack", label: "Stack", num: "05" },
  { id: "experience", label: "Career", num: "06" },
  { id: "contact", label: "Contact", num: "07" },
];

/**
 * ScrolltideTracker
 * Inspired by Scrolltide (scrolltide.co) cinematic scroll-driven storytelling.
 * Features:
 * - Fluid tide wave progress groove with spring-damped meniscus bead
 * - Live section waypoint detection & interactive smooth scrolling
 * - Ethereal coordinate readout & numeric depth
 * - Hidden on smaller viewports to protect mobile breathing room
 * - Strictly zero sound and respects prefers-reduced-motion
 */
export default function ScrolltideTracker() {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    mass: 0.2,
  });

  const tideFill = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
  const percentage = useTransform(smoothProgress, (v) => `${Math.round(v * 100)}%`);

  // Detect active section via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -40% 0px",
        threshold: 0,
      }
    );

    MILESTONES.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mql.matches);

    return () => observer.disconnect();
  }, []);

  const scrollToMilestone = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: isReducedMotion ? "auto" : "smooth" });
    }
  };

  return (
    <aside
      aria-label="Scroll Tide Navigation Tracker"
      className="hidden 2xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center select-none pointer-events-auto"
    >
      {/* Scroll Depth Counter Badge */}
      <motion.div
        className="mb-3 px-2 py-0.5 rounded-full bg-white/70 dark:bg-[#12131A]/80 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-800/80 text-[10px] font-mono text-neutral-600 dark:text-neutral-300 shadow-xs flex items-center gap-1.5"
        title="Scroll Depth"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
        <motion.span>{percentage}</motion.span>
      </motion.div>

      {/* Vertical Tide Track Container */}
      <div className="relative flex items-center justify-center py-2">
        {/* Background Groove */}
        <div className="relative w-1 h-56 bg-neutral-200/80 dark:bg-neutral-800/90 rounded-full overflow-hidden">
          {/* Animated Tide Fill */}
          <motion.div
            style={{ height: tideFill }}
            className="w-full bg-gradient-to-b from-[#E11D48] via-[#FB7185] to-[#38BDF8] rounded-full"
          />
        </div>

        {/* Floating Meniscus Bead */}
        <motion.div
          style={{ top: tideFill }}
          className="absolute -left-1 w-3 h-3 rounded-full bg-white dark:bg-[#1C1C24] border-2 border-[#E11D48] shadow-sm -translate-y-1/2 pointer-events-none transition-transform duration-75"
        >
          <div className="w-1 h-1 rounded-full bg-[#E11D48] mx-auto mt-0.5" />
        </motion.div>

        {/* Milestone Waypoints */}
        <div className="absolute inset-y-2 left-5 flex flex-col justify-between py-1">
          {MILESTONES.map((m) => {
            const isActive = activeSection === m.id;
            const isHovered = hoveredSection === m.id;

            return (
              <div
                key={m.id}
                className="relative flex items-center group cursor-pointer"
                onMouseEnter={() => setHoveredSection(m.id)}
                onMouseLeave={() => setHoveredSection(null)}
                onClick={() => scrollToMilestone(m.id)}
              >
                {/* Interactive Waypoint Pip */}
                <button
                  aria-label={`Scroll to ${m.label}`}
                  className={`relative -left-7 w-2 h-2 rounded-full transition-all duration-200 ${
                    isActive
                      ? "scale-125 bg-[#E11D48] ring-4 ring-[#E11D48]/20"
                      : "bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500"
                  }`}
                />

                {/* Waypoint Label Popout */}
                <span
                  className={`text-[10px] font-mono tracking-wider transition-all duration-200 whitespace-nowrap pl-1 ${
                    isActive
                      ? "text-[#E11D48] dark:text-[#FB7185] font-semibold translate-x-0 opacity-100"
                      : isHovered
                      ? "text-neutral-900 dark:text-neutral-100 translate-x-0 opacity-100"
                      : "text-neutral-400 dark:text-neutral-600 -translate-x-1 opacity-40 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                >
                  <span className="opacity-50 mr-1">{m.num}</span>
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
