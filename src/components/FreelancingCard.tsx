"use client";

import React, { useState } from "react";
import { ArrowRight, Mail, Copy, Check } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import VengeanceGlowButton from "./VengeanceGlowButton";
import ScrolltideGlassLens from "./ScrolltideGlassLens";

export default function FreelancingCard() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(false);
    }
  };

  return (
    <section id="collaboration" className="w-full mb-14 sm:mb-18 scroll-mt-24">
      <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-4 sm:mb-8 break-words">
        Collaboration &amp; Opportunities
      </h2>

      <ScrolltideGlassLens className="p-5 sm:p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
          <p className="text-sm sm:text-base md:text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed max-w-2xl">
            Specializing in Native Android and Full-Stack Web Development.
            Available for engineering roles, production web &amp; mobile builds, and technical collaboration.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/80 dark:bg-[#14141B]/80 hover:bg-white dark:hover:bg-[#1E1E28] border border-neutral-300 dark:border-neutral-700 text-[#1C1C24] dark:text-white text-xs sm:text-sm font-medium transition-all shadow-2xs"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <VengeanceGlowButton
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="w-full sm:w-auto"
            >
              <Mail className="w-4 h-4 text-[#E11D48]" />
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </VengeanceGlowButton>
          </div>
        </div>
      </ScrolltideGlassLens>
    </section>
  );
}
