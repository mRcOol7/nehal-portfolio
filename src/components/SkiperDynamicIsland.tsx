"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
  ChevronDown,
  Sun,
  Moon,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

/**
 * SkiperDynamicIsland
 * Unified Floating Dynamic Island Navigation & Action Dock.
 * Inspired by Skiper UI (skiper-ui.com) uncommon interactive components.
 * Features:
 * - Hidden on the 3D ID Badge Hero fold; fades in only when website content enters viewport
 * - Smooth spring slide-down entrance & exit
 * - Integrated theme switch (Dark/Light mode)
 * - Navigation links with smooth anchor transitions
 * - Live availability status pulse
 * - Fluid spring morph into developer command center with live IST clock & one-click email copying
 */
export default function SkiperDynamicIsland() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [isDark, setIsDark] = useState(true);

  // Synchronize Dark / Light Theme
  useEffect(() => {
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  // Visibility detection: DO NOT display while user is viewing the 3D ID card hero
  useEffect(() => {
    const handleScroll = () => {
      const websiteContent = document.getElementById("website-content");
      if (websiteContent) {
        const rect = websiteContent.getBoundingClientRect();
        // Only show when the website content has reached near the top of the viewport
        if (rect.top <= 140) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIsExpanded(false);
        }
      } else {
        if (window.scrollY > 450) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setIsExpanded(false);
        }
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

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Stack", href: "#tech-stack" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto select-none max-w-[96vw]">
          <motion.div
            initial={{ y: -70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -70, opacity: 0 }}
            layout
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 28,
              mass: 0.8,
            }}
            className={`relative overflow-hidden rounded-full sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800/90 bg-white/90 dark:bg-[#12131A]/90 backdrop-blur-xl shadow-2xl text-[#1C1C24] dark:text-[#EDEDF2] transition-colors ${isExpanded
              ? "!rounded-3xl w-[340px] sm:w-[420px] p-5 cursor-default"
              : "px-3 sm:px-4 py-2 cursor-pointer hover:border-[#E11D48]/50 hover:shadow-rose-500/10"
              }`}
            onClick={() => !isExpanded && setIsExpanded(true)}
          >
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                /* ================= COMPACT FLOATING ISLAND NAVBAR ================= */
                <motion.div
                  key="compact"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.16 }}
                  className="flex items-center gap-2 sm:gap-4 text-xs"
                >
                  {/* Brand & 3D Pass Trigger */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#E11D48] dark:border-[#FB7185] shadow-xs shrink-0 bg-neutral-900">
                        <Image
                          src="/nehal-chauhan.jpg"
                          alt="Nehal Chauhan"
                          width={24}
                          height={24}
                          draggable={false}
                          onContextMenu={(e) => e.preventDefault()}
                          className="w-full h-full object-cover object-top pointer-events-none select-none [-webkit-user-drag:none]"
                        />
                      </div>
                      <a
                        href="#home"
                        onClick={(e) => e.stopPropagation()}
                        className="font-serif italic text-sm sm:text-base font-bold text-[#1C1C24] dark:text-white hover:text-[#E11D48] transition-colors"
                      >
                        Nehal
                      </a>
                      <a
                        href="#badge-hero"
                        onClick={(e) => e.stopPropagation()}
                        title="View 3D Staff Pass"
                        className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-600 dark:text-neutral-300 hover:text-[#E11D48] border border-neutral-200 dark:border-neutral-700 transition-colors"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="hidden xs:inline">Pass</span>
                      </a>
                    </div>

                    <span className="hidden sm:inline-block h-3.5 w-px bg-neutral-200 dark:bg-neutral-800 shrink-0" />

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-3.5 text-xs font-medium text-[#646478] dark:text-[#A1A1B2]">
                      {navLinks.slice(1).map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-[#1C1C24] dark:hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      ))}
                    </nav>

                    <span className="hidden md:inline-block h-3.5 w-px bg-neutral-200 dark:bg-neutral-800 shrink-0" />

                    {/* Status Pulse */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                      </span>
                      <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap hidden sm:inline">
                        Open to Roles
                      </span>
                    </div>

                    <span className="h-3.5 w-px bg-neutral-200 dark:bg-neutral-800 shrink-0" />

                    {/* Sun/Moon Theme Toggle */}
                    <button
                      onClick={toggleTheme}
                      className="p-1 rounded-full text-neutral-500 dark:text-neutral-400 hover:text-[#1C1C24] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shrink-0"
                      aria-label="Toggle theme"
                    >
                      {isDark ? (
                        <Moon className="w-3.5 h-3.5 text-rose-400" />
                      ) : (
                        <Sun className="w-3.5 h-3.5 text-amber-500" />
                      )}
                    </button>

                    {/* Expand HUD Pill */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/10 text-[11px] font-mono text-[#E11D48] dark:text-[#FB7185] border border-rose-500/20 shrink-0">
                      <Sparkles className="w-3 h-3" />
                      <span className="hidden xs:inline">HUD</span>
                      <ChevronDown className="w-2.5 h-2.5" />
                    </div>
                </motion.div>
              ) : (
                /* ================= EXPANDED DYNAMIC COMMAND CENTER ================= */
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="space-y-4"
                >
                  {/* Header: Name, Role & Close */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#E11D48] dark:border-[#FB7185] shadow-md shrink-0 bg-neutral-900">
                          <Image
                            src="/nehal-chauhan.jpg"
                            alt="Nehal Chauhan"
                            width={48}
                            height={48}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            className="w-full h-full object-cover object-top pointer-events-none select-none [-webkit-user-drag:none]"
                          />
                        </div>
                        <div>
                          <h3 className="font-serif font-bold text-base leading-tight text-[#1C1C24] dark:text-white">
                            Nehal Chauhan
                          </h3>
                          <p className="text-xs text-[#646478] dark:text-[#8E8EA2]">
                            Software Engineer • Android &amp; Full-Stack
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={toggleTheme}
                          className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-800 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Toggle theme"
                        >
                          {isDark ? (
                            <Moon className="w-4 h-4 text-rose-400" />
                          ) : (
                            <Sun className="w-4 h-4 text-amber-500" />
                          )}
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(false);
                          }}
                          className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          aria-label="Close HUD"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Status and Location Bar */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-neutral-100/70 dark:bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60">
                      <div className="flex items-center gap-1.5 text-[#3E3E4E] dark:text-[#C4C4D4]">
                        <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
                        <span>Gujarat, India</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[#3E3E4E] dark:text-[#C4C4D4] font-mono justify-end">
                        <Clock className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{currentTime || "IST"}</span>
                      </div>
                    </div>

                    {/* Quick Navigation Grid */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E8EA2] dark:text-[#646478] block mb-1.5">
                        Quick Navigation
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
                        {navLinks.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsExpanded(false)}
                            className="px-2.5 py-1.5 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-center text-[#3E3E4E] dark:text-[#C4C4D4] hover:text-[#E11D48] dark:hover:text-[#FB7185] transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Actions: Copy Email & Resume */}
                    <div className="space-y-2 pt-1 border-t border-neutral-100 dark:border-neutral-800/80">
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

                      <div className="grid grid-cols-3 gap-2">
                        <a
                          href={PORTFOLIO_DATA.personal.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          suppressHydrationWarning
                          className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl bg-[#1C1C24] dark:bg-white text-white dark:text-[#1C1C24] text-xs font-medium hover:opacity-90 transition-opacity"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Resume</span>
                        </a>

                        <a
                          href="https://github.com/mRcOol7"
                          target="_blank"
                          rel="noopener noreferrer"
                          suppressHydrationWarning
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
                          suppressHydrationWarning
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
      )
      }
    </AnimatePresence >
  );
}
