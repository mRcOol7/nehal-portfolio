"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import AnimasterMarquee from "./AnimasterMarquee";
import { Sparkles } from "lucide-react";

export default function TechStack() {
  const { languages, frameworks, databasesAndCloud, coreCompetencies } =
    PORTFOLIO_DATA.skills;

  const marqueeSkills = [
    { name: "Native Android", badge: "Java SDK" },
    { name: "TypeScript", badge: "Full-Stack" },
    { name: "React 19 & Next.js", badge: "App Router" },
    { name: "Three.js", badge: "WebGL" },
    { name: "Redis & TiDB", badge: "Distributed Cache" },
    { name: "Node.js & Express", badge: "REST APIs" },
    { name: "Tailwind CSS", badge: "Modern UI" },
    { name: "OAuth 2.0 & JWT", badge: "Security" },
    { name: "API & Unit QA", badge: "Automation" },
  ];

  return (
    <section id="tech-stack" className="w-full mb-10 sm:mb-12">
      <div className="flex items-center justify-between gap-3 mb-4 sm:mb-5">
        <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
          Technical Skills
        </h2>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono text-[#E11D48] dark:text-[#FB7185] bg-rose-500/10 border border-rose-500/20">
          <Sparkles className="w-3 h-3" />
          <span>Active Stack</span>
        </div>
      </div>

      {/* Animaster Kinetic Velocity Marquee Ribbon */}
      <div className="mb-6 sm:mb-8 py-2 border-y border-dashed border-neutral-200 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/20">
        <AnimasterMarquee speed={32} pauseOnHover={true}>
          {marqueeSkills.map((s, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 text-xs text-[#1C1C24] dark:text-[#EDEDF2] shadow-sm whitespace-nowrap hover:border-[#E11D48] hover:scale-[1.02] transition-all cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
              <span className="font-medium">{s.name}</span>
              <span className="text-[10px] font-mono text-[#646478] dark:text-[#8E8EA2] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                {s.badge}
              </span>
            </div>
          ))}
        </AnimasterMarquee>
      </div>

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
