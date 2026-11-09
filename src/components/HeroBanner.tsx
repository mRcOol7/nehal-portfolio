"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import InteractiveAvatar from "./InteractiveAvatar";
import SnowfallOverlay from "./SnowfallOverlay";
import BenchoMagnetic from "./BenchoMagnetic";

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
    <section id="home" className="w-full mb-10 sm:mb-14">
      {/* Animated Landscape Header Banner - Expansive Widescreen */}
      <div className="relative w-full h-48 xs:h-56 sm:h-72 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-neutral-200 dark:border-neutral-800 bg-[#0C0C10]">
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
      <div className="relative px-2 sm:px-6 flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 mb-4 sm:mb-6 gap-3 sm:gap-4">
        {/* Interactive Boop Avatar with cursor tracking and spring physics */}
        <div className="z-20 shrink-0">
          <InteractiveAvatar />
        </div>

        {/* Action Buttons Aligned on the Right (Stack neatly on narrow screens) */}
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-4 pb-1 w-full sm:w-auto">
          <BenchoMagnetic strength={0.25} className="flex-1 sm:flex-initial">
            <a
              href="#projects"
              suppressHydrationWarning
              className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#1C1C24] hover:bg-black dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-[#1C1C24] text-xs sm:text-sm md:text-base font-medium transition-all shadow-2xs group whitespace-nowrap"
            >
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </BenchoMagnetic>

          {/* Links directly to the real resume PDF */}
          <BenchoMagnetic strength={0.25} className="flex-1 sm:flex-initial">
            <a
              href={PORTFOLIO_DATA.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Nehal_Chauhan_Resume.pdf"
              suppressHydrationWarning
              className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white dark:bg-[#14141B] hover:bg-neutral-50 dark:hover:bg-[#1C1C26] border border-neutral-300 dark:border-neutral-700 text-[#1C1C24] dark:text-white text-xs sm:text-sm md:text-base font-medium transition-all shadow-2xs group whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E11D48]" />
              <span>Resume</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#646478] dark:text-[#8E8EA2] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </BenchoMagnetic>
        </div>
      </div>

      {/* Name, Typewriter Title & Location cleanly below banner */}
      <div className="px-2 sm:px-6 mt-1 sm:mt-3">
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
            {PORTFOLIO_DATA.personal.displayName}
          </h1>
        </div>

        {/* Dynamic Typewriter Role */}
        <div className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-serif text-[#E11D48] dark:text-[#FB7185] font-semibold min-h-[2rem] sm:min-h-[2.5rem] lg:min-h-[3rem] flex items-center mt-1 sm:mt-2">
          <span>{displayedText}</span>
          <span className="w-0.5 h-5 sm:h-6 lg:h-7 bg-[#E11D48] ml-1.5 animate-pulse motion-reduce:animate-none" />
        </div>

        <p className="text-sm sm:text-base md:text-lg text-neutral-700 dark:text-neutral-400 mt-1.5 font-medium max-w-2xl">
          {PORTFOLIO_DATA.personal.location} · Available for opportunities
        </p>
      </div>
    </section>
  );
}
