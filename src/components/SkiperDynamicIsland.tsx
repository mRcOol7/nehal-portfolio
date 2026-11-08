"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Mail,
  Copy,
  Check,
  FileDown,
  X,
  Clock,
  MapPin,
  ChevronUp,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

/**
 * SkiperDynamicIsland
 * Inspired by Skiper UI (skiper-ui.com) uncommon interactive components.
 * Features:
 * - Fluid morphing state transitions powered by Framer Motion layout springs
 * - Compact HUD capsule in resting state with live availability pulse
 * - Expands into an interactive developer command island
 * - Live IST time clock & rapid one-click clipboard copying
 * - Fully accessible and responsive across mobile and desktop
 */
export default function SkiperDynamicIsland() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  // Show island after slight scroll past initial hero fold
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live India Standard Time (IST) clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setCurrentTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none max-w-[94vw]">
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 380,
          damping: 28,
          mass: 0.8,
        }}
        onClick={() => !isExpanded && setIsExpanded(true)}
        className={`relative overflow-hidden rounded-3xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white/90 dark:bg-[#12131A]/90 backdrop-blur-xl shadow-2xl text-[#1C1C24] dark:text-[#EDEDF2] transition-colors ${isExpanded
            ? "w-[340px] sm:w-[380px] p-5 cursor-default"
            : "px-3.5 py-2 cursor-pointer hover:border-[#E11D48]/50 hover:shadow-rose-500/10"
          }`}
      >
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            /* ================= COMPACT ISLAND HUD ================= */
            <motion.div
              key="compact"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="flex items-center gap-3 text-xs"
            >
              {/* Availability live pulse dot */}
              <div className="flex items-center gap-1.5 pl-0.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-medium text-[11px] text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
                  Open to Roles
                </span>
              </div>

              <span className="h-3 w-px bg-neutral-200 dark:bg-neutral-800" />

              {/* Quick Jump anchors */}
              <div className="flex items-center gap-2 text-[#646478] dark:text-[#8E8EA2] text-[11px] font-medium">
                <a
                  href="#projects"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-[#E11D48] transition-colors"
                >
                  Projects
                </a>
                <span>•</span>
                <a
                  href="#tech-stack"
                  onClick={(e) => e.stopPropagation()}
                  className="hover:text-[#E11D48] transition-colors"
                >
                  Stack
                </a>
              </div>

              <span className="h-3 w-px bg-neutral-200 dark:bg-neutral-800" />

              {/* Expand prompt button */}
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#E11D48] dark:text-[#FB7185] pl-0.5">
                <span>Quick HUD</span>
                <ChevronUp className="w-3 h-3 animate-bounce" />
              </div>
            </motion.div>
          ) : (
            /* ================= EXPANDED SKIPER ISLAND COMMAND ================= */
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Header: Name, Status & Close */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#E11D48] to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    NC
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm leading-tight text-[#1C1C24] dark:text-white">
                      Nehal Chauhan
                    </h4>
                    <p className="text-[11px] text-[#646478] dark:text-[#8E8EA2]">
                      Software Engineer • Android &amp; Full-Stack
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsExpanded(false);
                  }}
                  className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Close HUD"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status and Location Bar */}
              <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-100/70 dark:bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60">
                <div className="flex items-center gap-1.5 text-[#3E3E4E] dark:text-[#C4C4D4]">
                  <MapPin className="w-3 h-3 text-[#E11D48]" />
                  <span>Gujarat, India</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#3E3E4E] dark:text-[#C4C4D4] font-mono justify-end">
                  <Clock className="w-3 h-3 text-emerald-500" />
                  <span>{currentTime || "IST"}</span>
                </div>
              </div>

              {/* Quick Actions Row */}
              <div className="space-y-2">
                {/* Copy Email Button */}
                <button
                  onClick={copyEmail}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800/80 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 text-xs font-medium text-[#1C1C24] dark:text-white transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
                    <span className="font-mono text-[11px]">
                      {PORTFOLIO_DATA.personal.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-[#646478] dark:text-[#8E8EA2] group-hover:text-[#E11D48]">
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span className="text-emerald-500 font-mono">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </div>
                </button>

                {/* Resume Download & Social Shortcuts */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={PORTFOLIO_DATA.personal.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#1C1C24] dark:bg-white text-white dark:text-[#1C1C24] text-xs font-medium hover:opacity-90 transition-opacity"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Resume</span>
                  </a>

                  <a
                    href="https://github.com/mRcOol7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-medium text-[#1C1C24] dark:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    <span>GitHub</span>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/nehal-chauhan19"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-xs font-medium text-[#1C1C24] dark:text-white transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-[#0A66C2]" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
