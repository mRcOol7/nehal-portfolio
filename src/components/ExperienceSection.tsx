"use client";

import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<string | null>("encoraa-android");

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="experience" className="w-full mb-14 sm:mb-18">
      <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-6 sm:mb-8">
        Professional Experience
      </h2>

      <div className="w-full rounded-2xl dashed-container bg-white/40 dark:bg-[#14141B]/30 divide-y divide-dashed divide-neutral-200 dark:divide-neutral-800">
        {PORTFOLIO_DATA.experience.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div key={exp.id} className="p-4 sm:p-6 transition-colors">
              <button
                type="button"
                onClick={() => toggle(exp.id)}
                aria-expanded={isExpanded}
                aria-controls={`exp-content-${exp.id}`}
                className="w-full flex flex-col sm:flex-row sm:items-center justify-between text-left gap-2 sm:gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] rounded-lg group cursor-pointer"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1C1C24] dark:text-white group-hover:text-[#E11D48] transition-colors">
                      {exp.role}
                    </h3>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-medium">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-[#1C1C24] dark:text-white">{exp.company}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#E11D48]" />
                      {exp.location}
                    </span>
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3 shrink-0 pt-1 sm:pt-0">
                  <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-400">
                    {exp.period}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-neutral-700 dark:text-neutral-400 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {isExpanded ? (
                <div
                  id={`exp-content-${exp.id}`}
                  className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60 animate-in fade-in duration-200"
                >
                  <ul className="space-y-2 mb-4">
                    {exp.contributions.map((point, idx) => (
                      <li
                        key={idx}
                        className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200 flex items-start gap-2.5 leading-relaxed"
                      >
                        <span className="text-[#E11D48] mt-1 shrink-0">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-[11px] font-medium text-[#1C1C24] dark:text-[#E8E8EE]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
