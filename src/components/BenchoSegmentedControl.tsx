"use client";

import React from "react";
import { motion } from "framer-motion";
import BenchoMagnetic from "./BenchoMagnetic";

interface Option {
  id: string;
  label: string;
  count?: number;
}

interface BenchoSegmentedControlProps {
  options: Option[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}

/**
 * BenchoSegmentedControl
 * Inspired by Bencho (bencho.dev) interactive select & tab blocks.
 * Features:
 * - Fluid gliding indicator pill with spring physics
 * - Subtle individual magnetic pull per option
 * - Accessible keyboard navigation & ARIA roles
 * - Zero sound effects
 */
export default function BenchoSegmentedControl({
  options,
  selectedId,
  onSelect,
  className = "",
}: BenchoSegmentedControlProps) {
  return (
    <div
      role="tablist"
      className={`inline-flex items-center gap-1 p-1 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-100/80 dark:bg-[#12121A]/80 backdrop-blur-xs select-none ${className}`}
    >
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <BenchoMagnetic key={opt.id} strength={0.2}>
            <button
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(opt.id)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus:outline-none cursor-pointer ${
                isSelected
                  ? "text-[#1C1C24] dark:text-white"
                  : "text-neutral-700 dark:text-neutral-300 hover:text-[#1C1C24] dark:hover:text-white"
              }`}
            >
              {isSelected && (
                <motion.span
                  layoutId="bencho-active-pill"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                  className="absolute inset-0 rounded-lg bg-white dark:bg-[#20202E] shadow-2xs border border-neutral-200/60 dark:border-neutral-700/60 z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>{opt.label}</span>
                {typeof opt.count === "number" && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${
                      isSelected
                        ? "bg-neutral-100 dark:bg-neutral-800 text-[#E11D48] dark:text-[#FB7185] font-semibold"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    {opt.count}
                  </span>
                )}
              </span>
            </button>
          </BenchoMagnetic>
        );
      })}
    </div>
  );
}
