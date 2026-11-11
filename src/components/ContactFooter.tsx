"use client";

import React, { useState } from "react";
import {
  Mail,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import ScrolltideGlassLens from "./ScrolltideGlassLens";
import VengeanceGlowButton from "./VengeanceGlowButton";
import AwwwardsTextReveal from "./AwwwardsTextReveal";

/**
 * ContactFooter
 * Streamlined high-impact footer with conversion hub, authentic profiles,
 * brand watermark, and clean bottom bar.
 */
export default function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="w-full pt-8 sm:pt-12 pb-3 sm:pb-4 select-none">
      {/* High-Impact Full-Width Conversion Hub - Scrolltide Liquid Glass Box */}
      <ScrolltideGlassLens className="p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10">
        <div className="w-full">
          {/* Live Availability Status */}
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-3 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="tracking-wide">Available for Full-Time, Remote &amp; Contract Roles</span>
          </div>

          {/* Full-Width Expansive Heading */}
          <AwwwardsTextReveal
            as="h2"
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C24] dark:text-white leading-[1.15] mb-3"
          >
            Let&apos;s build something remarkable together.
          </AwwwardsTextReveal>

          {/* Full-Width Subtext */}
          <p className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 max-w-4xl">
            Have an opening, a production challenge, or a collaborative vision?
            I specialize in Native Android systems and reactive Full-Stack web architectures.
          </p>

          {/* Streamlined Action CTAs Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
            {/* Direct Send Email Trigger */}
            <VengeanceGlowButton
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="w-full sm:w-auto"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </VengeanceGlowButton>

            {/* One-Click Copy Email Button */}
            <button
              onClick={copyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-white dark:bg-[#161620] hover:bg-neutral-50 dark:hover:bg-[#1C1C28] border border-neutral-300 dark:border-neutral-800 text-xs sm:text-sm font-medium text-neutral-900 dark:text-white transition-all shadow-2xs"
              title="Click to copy email address"
              aria-label="Copy email address"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E11D48]" />
                <span className="font-mono">{PORTFOLIO_DATA.personal.email}</span>
              </div>
              <span className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </span>
            </button>

            {/* Social Icons (GitHub & LinkedIn) - 2-Column Full Width on Mobile, Compact on Desktop */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-2 w-full sm:w-auto sm:flex sm:items-center">
              <a
                href="https://github.com/mRcOol7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#161620] hover:bg-neutral-50 dark:hover:bg-[#1C1C28] border border-neutral-300 dark:border-neutral-800 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white transition-all shadow-2xs w-full sm:w-auto text-xs sm:text-sm font-medium"
                title="GitHub: github.com/mRcOol7"
                aria-label="GitHub Profile"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span className="sm:hidden font-mono">GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nehal-chauhan19"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white dark:bg-[#161620] hover:bg-neutral-50 dark:hover:bg-[#1C1C28] border border-neutral-300 dark:border-neutral-800 text-neutral-700 hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white transition-all shadow-2xs w-full sm:w-auto text-xs sm:text-sm font-medium"
                title="LinkedIn: linkedin.com/in/nehal-chauhan19"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="sm:hidden font-mono">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </ScrolltideGlassLens>
    </footer>
  );
}
