"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUp, Globe } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import VisitorCounter from "./VisitorCounter";

export default function ContactFooter() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="w-full pt-4 sm:pt-6 pb-12">
      {/* Contact Prompt Box */}
      <div className="p-5 sm:p-8 md:p-10 rounded-2xl dashed-container bg-white/60 dark:bg-[#14141B]/50 mb-8 sm:mb-10 text-center flex flex-col items-center">
        <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-2 sm:mb-3">
          let&apos;s talk
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-[#646478] dark:text-[#A1A1B2] max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
          Open for Software Engineering, Native Android, and Full-Stack Web opportunities.
        </p>

        {/* Email Contact Bar (Mobile number removed as requested) */}
        <div className="w-full max-w-sm flex items-center justify-center mb-6 px-1">
          {/* Email Copy Pill */}
          <div className="max-w-full inline-flex items-center justify-between gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-neutral-100 dark:bg-[#1E1E28] border border-neutral-200 dark:border-neutral-700/80">
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E11D48] shrink-0" />
              <span className="text-[11px] xs:text-xs sm:text-sm font-mono text-[#1C1C24] dark:text-[#E8E8EE] truncate">
                {PORTFOLIO_DATA.personal.email}
              </span>
            </div>
            <button
              onClick={copyEmail}
              className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#646478] dark:text-[#A1A1B2] transition-colors shrink-0"
              title="Copy email address"
              aria-label="Copy email address"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* Authentic Social Links from Resume */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {/* GitHub */}
          <a
            href="https://github.com/mRcOol7"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white dark:bg-[#1A1A24] border border-neutral-200 dark:border-neutral-800 text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white hover:border-[#E11D48] transition-all shadow-sm"
            aria-label="GitHub Profile"
            title="GitHub: github.com/mRcOol7"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nehal-chauhan19"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white dark:bg-[#1A1A24] border border-neutral-200 dark:border-neutral-800 text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white hover:border-[#E11D48] transition-all shadow-sm"
            aria-label="LinkedIn Profile"
            title="LinkedIn: linkedin.com/in/nehal-chauhan19"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>

          {/* Live Portfolio */}
          <a
            href="https://nehalchauhanportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white dark:bg-[#1A1A24] border border-neutral-200 dark:border-neutral-800 text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white hover:border-[#E11D48] transition-all shadow-sm"
            aria-label="Live Sandbox Portfolio"
            title="Live Portfolio Sandbox"
          >
            <Globe className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Bottom Bar with Visitor Count & Back to Top */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8E8EA2] dark:text-[#646478] px-2 font-medium">
        <span>© 2026 {PORTFOLIO_DATA.personal.displayName} · Gujarat, India</span>

        {/* Live Visitor Counter */}
        <VisitorCounter />

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 hover:text-[#1C1C24] dark:hover:text-white transition-colors"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
