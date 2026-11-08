"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import AnimasterMarquee from "./AnimasterMarquee";
import { ArrowRight } from "lucide-react";

export default function TechStack() {
  const engineeringStack = [
    { name: "Native Android", badge: "Java SDK" },
    { name: "React 19 & Next.js", badge: "App Router" },
    { name: "TypeScript", badge: "ES6+ Strict" },
    { name: "Three.js", badge: "WebGL 3D" },
    { name: "Node.js & Express", badge: "Server Runtimes" },
    { name: "Tailwind CSS", badge: "Modern UI" },
    { name: "TanStack Router", badge: "Type-Safe Routing" },
  ];

  const systemsAndCloudStack = [
    { name: "Redis & TiDB", badge: "Distributed Cache" },
    { name: "SQL & MySQL", badge: "Relational DB" },
    { name: "MongoDB", badge: "Document Store" },
    { name: "RESTful APIs", badge: "Architecture" },
    { name: "OAuth 2.0 & JWT", badge: "Auth & Security" },
    { name: "Postman & API QA", badge: "Testing & Validation" },
    { name: "Vercel & Git", badge: "CI/CD & Cloud" },
  ];

  return (
    <section id="tech-stack" className="w-full mb-12 sm:mb-14">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 sm:gap-4 mb-5 sm:mb-6">
        <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-[#646478] dark:text-[#8E8EA2] bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
              <span>Active ecosystem</span>
            </div>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
              Technical Stack
            </h2>
            <p className="text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2] mt-1">
              Engineered with modern mobile runtimes, reactive web frameworks, and low-latency data layers.
            </p>
          </div>

          <a
            href={PORTFOLIO_DATA.personal.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            suppressHydrationWarning
            className="inline-flex items-center gap-1 text-xs font-mono text-[#E11D48] dark:text-[#FB7185] hover:underline whitespace-nowrap self-start sm:self-auto"
          >
            <span>Full Resume Specs</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>

        {/* Dual-Track Velocity Marquee - Seamless, Single-Display, Zero Duplication */}
        <div className="p-3 sm:p-4 rounded-2xl border border-dashed border-[#DCE0E8] dark:border-[#272736] bg-white/40 dark:bg-[#14141B]/30 backdrop-blur-xs space-y-2.5">
          {/* Track 1: Mobile & Web Engineering (Flows Left) */}
          <AnimasterMarquee speed={32} direction="left" pauseOnHover={true}>
            {engineeringStack.map((s, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#14141B] border border-neutral-200/90 dark:border-neutral-800 text-xs text-[#1C1C24] dark:text-[#EDEDF2] shadow-xs whitespace-nowrap hover:border-[#E11D48] transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                <span className="font-medium">{s.name}</span>
                <span className="text-[10px] font-mono text-[#646478] dark:text-[#8E8EA2] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800">
                  {s.badge}
                </span>
              </div>
            ))}
          </AnimasterMarquee>

          {/* Track 2: Systems, Databases & Cloud (Flows Right) */}
          <AnimasterMarquee speed={36} direction="right" pauseOnHover={true}>
            {systemsAndCloudStack.map((s, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-[#14141B] border border-neutral-200/90 dark:border-neutral-800 text-xs text-[#1C1C24] dark:text-[#EDEDF2] shadow-xs whitespace-nowrap hover:border-[#E11D48] transition-colors cursor-default"
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
    </section>
  );
}
