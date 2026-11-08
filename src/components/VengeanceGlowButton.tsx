"use client";

import React from "react";
import { motion } from "framer-motion";

interface VengeanceGlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

/**
 * VengeanceGlowButton (Unslopped)
 * Refactored according to heydamir/unslop craft principles:
 * - Removed noisy spinning conic loop in favor of razor-sharp hairline borders
 * - Tactile micro-press feedback
 * - Solid high-contrast text and clean background transition
 */
export default function VengeanceGlowButton({
  children,
  onClick,
  href,
  className = "",
  variant = "primary",
}: VengeanceGlowButtonProps) {
  const content = (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
      className={`relative inline-flex items-center justify-center p-[1px] rounded-full group cursor-pointer ${className}`}
    >
      {/* Button Surface */}
      <span
        className={`relative inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
          variant === "primary"
            ? "bg-[#1C1C24] dark:bg-white text-white dark:text-[#1C1C24] border-neutral-700/80 dark:border-white/20 hover:bg-black dark:hover:bg-neutral-100"
            : "bg-white dark:bg-[#14141B] text-[#1C1C24] dark:text-white border-neutral-300 dark:border-neutral-700 hover:border-[#E11D48]"
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
