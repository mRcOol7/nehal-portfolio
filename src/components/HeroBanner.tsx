"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import InteractiveAvatar from "./InteractiveAvatar";
import SnowfallOverlay from "./SnowfallOverlay";

export default function HeroBanner() {
  const titles = PORTFOLIO_DATA.personal.roles;

  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(titles[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = titles[currentTitleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayedText !== fullText) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 90);
    } else if (isDeleting && displayedText !== "") {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
      }, 45);
    } else if (!isDeleting && displayedText === fullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTitleIndex, titles]);

  return (
    <section id="home" className="w-full mb-8 sm:mb-10">
      {/* Animated Landscape Header Banner */}
      <div className="relative w-full h-36 xs:h-44 sm:h-56 md:h-64 rounded-2xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800 bg-[#0C0C10]">
        <Image
          src="/animated-header.jpg"
          alt="Winter Landscape Header Banner"
          fill
          priority
          draggable={false}
          className="object-cover object-center pointer-events-none select-none [-webkit-user-drag:none]"
        />

        {/* Live Cinematic Falling Snow Overlay */}
        <SnowfallOverlay />
      </div>

      {/* Overlapping Avatar & Action Buttons Row */}
      <div className="relative px-1 sm:px-4 flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-10 sm:-mt-14 md:-mt-16 mb-4 gap-3">
        {/* Interactive Boop Avatar with cursor tracking and spring physics */}
        <div className="z-20 shrink-0">
          <InteractiveAvatar />
        </div>

        {/* Action Buttons Aligned on the Right (Stack neatly on narrow screens) */}
        <div className="flex items-center gap-2 sm:gap-3 pb-1 w-full sm:w-auto">
          <a
            href="#projects"
            suppressHydrationWarning
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#1C1C24] hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-[#1C1C24] text-xs sm:text-sm font-medium transition-all shadow-sm group whitespace-nowrap"
          >
            <span>View Projects</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Links directly to the real resume PDF */}
          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white dark:bg-[#14141B] hover:bg-neutral-50 dark:hover:bg-[#1C1C26] border border-neutral-300 dark:border-neutral-700 text-[#1C1C24] dark:text-white text-xs sm:text-sm font-medium transition-all shadow-sm group whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5 text-[#E11D48]" />
            <span>Resume</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#646478] dark:text-[#8E8EA2] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      {/* Name, Typewriter Title & Location cleanly below banner */}
      <div className="px-1 sm:px-4 mt-1 sm:mt-2">
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
            {PORTFOLIO_DATA.personal.displayName}
          </h1>
        </div>

        {/* Dynamic Typewriter Role */}
        <div className="text-lg xs:text-xl sm:text-2xl font-serif text-[#E11D48] dark:text-[#FB7185] font-semibold min-h-[1.75rem] sm:min-h-[2rem] flex items-center mt-0.5 sm:mt-1">
          <span>{displayedText}</span>
          <span className="w-0.5 h-4 sm:h-5 bg-[#E11D48] ml-1 animate-pulse" />
        </div>

        <p className="text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2] mt-1 font-medium">
          {PORTFOLIO_DATA.personal.location} · Available for opportunities
        </p>
      </div>
    </section>
  );
}
