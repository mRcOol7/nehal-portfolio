"use client";

import { ArrowRight, Mail } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function FreelancingCard() {
  return (
    <section className="w-full mb-10 sm:mb-12">
      <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-5 sm:mb-6">
        Collaboration & Opportunities
      </h2>

      <div className="p-4 sm:p-6 md:p-8 rounded-2xl dashed-container bg-[#FFF1F2]/60 dark:bg-[#1E1218]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
        <p className="text-xs sm:text-sm md:text-base text-[#3E3E4E] dark:text-[#D4C4CA] leading-relaxed max-w-xl">
          Specializing in Native Android and Full-Stack Web Development.
          Available for engineering roles, production web & mobile builds, and technical collaboration.
        </p>

        <a
          href={`mailto:${PORTFOLIO_DATA.personal.email}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white dark:bg-[#14141B] hover:bg-neutral-50 dark:hover:bg-[#1E1E28] border border-neutral-300 dark:border-neutral-700 text-[#1C1C24] dark:text-white text-xs sm:text-sm font-medium transition-all shadow-sm group whitespace-nowrap"
        >
          <Mail className="w-4 h-4 text-[#E11D48]" />
          <span>Get in Touch</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
