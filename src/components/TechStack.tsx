"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";

export default function TechStack() {
  const { languages, frameworks, databasesAndCloud, coreCompetencies } =
    PORTFOLIO_DATA.skills;

  return (
    <section id="tech-stack" className="w-full mb-10 sm:mb-12">
      <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-5 sm:mb-6">
        Technical Skills
      </h2>

      <div className="space-y-4 sm:space-y-5">
        {/* Languages */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#E11D48] dark:text-[#FB7185] block mb-2 sm:mb-2.5">
            Languages
          </span>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {languages.map((item) => (
              <span
                key={item}
                className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 shadow-sm text-xs font-medium text-[#1C1C24] dark:text-[#E8E8EE] hover:border-[#E11D48] transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#646478] dark:text-[#8E8EA2] block mb-2.5">
            Frameworks & Libraries
          </span>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 shadow-sm text-xs font-medium text-[#1C1C24] dark:text-[#E8E8EE] hover:border-[#E11D48] transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Databases & Cloud */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#646478] dark:text-[#8E8EA2] block mb-2.5">
            Databases & Developer Tooling
          </span>
          <div className="flex flex-wrap gap-2">
            {databasesAndCloud.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 shadow-sm text-xs font-medium text-[#1C1C24] dark:text-[#E8E8EE] hover:border-[#E11D48] transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Core Competencies */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#646478] dark:text-[#8E8EA2] block mb-2.5">
            Architecture & Competencies
          </span>
          <div className="flex flex-wrap gap-2">
            {coreCompetencies.map((item) => (
              <span
                key={item}
                className="px-3.5 py-1.5 rounded-full bg-neutral-100 dark:bg-neutral-800/60 text-xs font-medium text-[#3E3E4E] dark:text-[#C4C4D4]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
