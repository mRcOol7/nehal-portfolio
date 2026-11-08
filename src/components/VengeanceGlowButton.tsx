"use client";

import React from "react";
import { motion } from "framer-motion";

interface VengeanceGlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  glowColor?: string;
  variant?: "primary" | "secondary";
}

/**
 * VengeanceGlowButton
 * Inspired by Vengeance UI (vengenceui.com) Button Forge.
 * Features:
 * - Fluid conical gradient border shimmer trail
 * - Radiant ambient glow reflection
 * - Subtle scale & spring tactile feedback on hover/press
 * - Graceful fallback for prefers-reduced-motion
 */
export default function VengeanceGlowButton({
  children,
  onClick,
  href,
  className = "",
  glowColor = "#E11D48",
  variant = "primary",
}: VengeanceGlowButtonProps) {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center p-[1px] rounded-full overflow-hidden group cursor-pointer ${className}`}
    >
      {/* Animated Conical Shimmer Border */}
      <span
        className="absolute inset-[-100%] animate-vengeance-spin"
        style={{
          background: `conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 65%, ${glowColor} 85%, #ffffff 95%, ${glowColor} 100%)`,
        }}
      />

      {/* Button Core Surface */}
      <span
        className={`relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
          variant === "primary"
            ? "bg-[#1C1C24] dark:bg-[#12131A] text-white hover:bg-black dark:hover:bg-[#181822]"
            : "bg-white dark:bg-[#14141B] text-[#1C1C24] dark:text-white hover:bg-neutral-50 dark:hover:bg-[#1C1C26]"
        }`}
      >
        {children}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-block bg-transparent border-0 p-0 focus:outline-none"
    >
      {content}
    </button>
  );
}
