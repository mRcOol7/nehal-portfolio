"use client";

import React, { useState, useEffect } from "react";
import {
  Mail,
  Copy,
  Check,
  ArrowUp,
  ArrowUpRight,
  MapPin,
  Clock,
  Terminal,
  FileText,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import VisitorCounter from "./VisitorCounter";
import BenchoMagnetic from "./BenchoMagnetic";
import ScrolltideGlassLens from "./ScrolltideGlassLens";
import VengeanceGlowButton from "./VengeanceGlowButton";

/**
 * ContactFooter
 * Inspired by the best curated web footers on footer.design (Adith Narein, Nick DiMatteo, Niklas Bubori).
 * Features:
 * - High-impact CTA with real-time availability status beacon
 * - One-click email copier with tactile feedback & Vengeance Glow contact trigger
 * - 4-Column Architectural Colophon (Navigation, Connect, Engineering Specs, Live Telemetry)
 * - Live India Standard Time (IST) clock with live seconds ticker
 * - Giant typographic watermark brand signature ("NEHAL CHAUHAN")
 * - Magnetic "Back to Top" trigger and live visitor telemetry
 * - Strictly zero sound, 100% accessible and responsive across all screens
 */
export default function ContactFooter() {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Live India Standard Time (IST) Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About & Story", href: "#about" },
    { label: "Interactive Lab", href: "#workstation" },
    { label: "Selected Works", href: "#projects" },
    { label: "Technical Stack", href: "#tech-stack" },
    { label: "Work Experience", href: "#experience" },
    { label: "3D Staff Pass", href: "#badge-hero" },
  ];

  return (
    <footer id="contact" className="w-full pt-8 sm:pt-12 pb-12 sm:pb-16 select-none">
      {/* High-Impact Conversion Hub - Scrolltide Liquid Glass Box */}
      <ScrolltideGlassLens className="p-8 sm:p-12 lg:p-16 mb-12 sm:mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">
          <div className="max-w-2xl">
            {/* Live Availability Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Full-Time, Remote &amp; Contract Roles</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C24] dark:text-white leading-[1.1] mb-4">
              Let&apos;s build something <span className="text-[#E11D48] dark:text-[#FB7185] italic font-serif">remarkable</span> together.
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-[#646478] dark:text-[#A1A1B2] leading-relaxed">
              Have an opening, a production challenge, or a collaborative vision?
              I specialize in Native Android systems and reactive Full-Stack web architectures.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0">
            {/* One-Click Copy Email Pill */}
            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-full bg-white dark:bg-[#1A1A24] hover:bg-neutral-50 dark:hover:bg-[#20202E] border border-neutral-300/80 dark:border-neutral-700/80 text-xs sm:text-sm font-medium text-[#1C1C24] dark:text-white transition-all shadow-sm"
              title="Click to copy email address"
              aria-label="Copy email address"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E11D48]" />
                <span className="font-mono">{PORTFOLIO_DATA.personal.email}</span>
              </div>
              <span className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[#646478] dark:text-[#A1A1B2]">
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </button>

            {/* Direct Send Email Trigger */}
            <VengeanceGlowButton href={`mailto:${PORTFOLIO_DATA.personal.email}`}>
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </VengeanceGlowButton>
          </div>
        </div>
      </ScrolltideGlassLens>

      {/* 4-Column Architectural Colophon Grid (Inspired by footer.design) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 py-10 sm:py-12 border-y border-dashed border-neutral-200 dark:border-neutral-800">
        {/* Col 1: Sitemap & Navigation */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1C24] dark:text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
            <span>Navigation</span>
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2]">
            {navLinks.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="hover:text-[#1C1C24] dark:hover:text-white hover:translate-x-0.5 inline-block transition-all"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 2: Authentic Network & Profiles */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1C24] dark:text-white font-semibold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
            <span>Connect &amp; Profiles</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2]">
            <li>
              <a
                href="https://github.com/mRcOol7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#1C1C24] dark:hover:text-white transition-colors group"
              >
                <span>GitHub</span>
                <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600">@mRcOol7</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/nehal-chauhan19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#1C1C24] dark:hover:text-white transition-colors group"
              >
                <span>LinkedIn</span>
                <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600">/nehal-chauhan19</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </li>
            <li>
              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-[#1C1C24] dark:hover:text-white transition-colors group"
              >
                <FileText className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Resume PDF</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="inline-flex items-center gap-2 hover:text-[#1C1C24] dark:hover:text-white transition-colors group"
              >
                <Mail className="w-3.5 h-3.5 text-[#E11D48]" />
                <span>Direct Mail</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Engineering Colophon */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1C24] dark:text-white font-semibold mb-4 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Colophon &amp; Stack</span>
          </h3>
          <p className="text-xs text-[#646478] dark:text-[#8E8EA2] leading-relaxed mb-3">
            Architected and engineered from the ground up as a bespoke personal developer portfolio.
          </p>
          <div className="space-y-1.5 text-[11px] font-mono text-[#8E8EA2] dark:text-[#646478]">
            <div>Framework: Next.js 16 (Turbopack)</div>
            <div>Language: TypeScript &amp; React 19</div>
            <div>Styling: Tailwind CSS v4</div>
            <div>Motion: Framer Motion &amp; GSAP</div>
            <div>3D Engine: Three.js &amp; R3F</div>
          </div>
        </div>

        {/* Col 4: Location, Time & Telemetry */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#1C1C24] dark:text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Local Time &amp; Base</span>
          </h3>
          <div className="space-y-3 text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
              <span>Gujarat, India (IST / UTC+5:30)</span>
            </div>

            {/* Live Ticking Clock */}
            <div className="p-3 rounded-xl bg-white dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 shadow-2xs font-mono text-xs">
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-1">
                India Standard Time
              </div>
              <div
                suppressHydrationWarning
                className="text-sm font-semibold text-[#1C1C24] dark:text-white flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{currentTime || "12:00:00 PM"}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span>All services operational</span>
            </div>
          </div>
        </div>
      </div>

      {/* Giant Stylized Brand Signature Watermark (Iconic footer.design hallmark) */}
      <div
        aria-hidden="true"
        className="pt-10 sm:pt-14 pb-4 sm:pb-6 overflow-hidden pointer-events-none select-none text-center"
      >
        <span className="font-serif italic text-[11vw] font-black tracking-tight leading-none text-neutral-900/[0.04] dark:text-white/[0.05] whitespace-nowrap block">
          Nehal Chauhan
        </span>
      </div>

      {/* Bottom Bar: Copyright, Telemetry, Back to Top */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8EA2] dark:text-[#646478] px-2 font-medium">
        <span>© 2026 {PORTFOLIO_DATA.personal.displayName}. All rights reserved.</span>

        {/* Live Visitor Counter */}
        <VisitorCounter />

        <BenchoMagnetic strength={0.3}>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800/80 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-[#1C1C24] dark:hover:text-white transition-all shadow-2xs group"
            title="Scroll smoothly back to the top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </BenchoMagnetic>
      </div>
    </footer>
  );
}
