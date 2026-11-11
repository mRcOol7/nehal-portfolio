"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import AnimasterMarquee from "./AnimasterMarquee";
import AwwwardsTextReveal from "./AwwwardsTextReveal";
import { ArrowRight } from "lucide-react";

const ENGINEERING_STACK = [
  { name: "Native Android", badge: "Java SDK" },
  { name: "React 19 & Next.js", badge: "App Router" },
  { name: "TypeScript", badge: "ES6+ Strict" },
  { name: "Three.js", badge: "WebGL 3D" },
  { name: "Node.js & Express", badge: "Server Runtimes" },
  { name: "Tailwind CSS", badge: "Modern UI" },
  { name: "TanStack Router", badge: "Type-Safe Routing" },
];

const SYSTEMS_AND_CLOUD_STACK = [
  { name: "Redis & TiDB", badge: "Distributed Cache" },
  { name: "SQL & MySQL", badge: "Relational DB" },
  { name: "MongoDB", badge: "Document Store" },
  { name: "RESTful APIs", badge: "Architecture" },
  { name: "OAuth 2.0 & JWT", badge: "Auth & Security" },
  { name: "Postman & API QA", badge: "Testing & Validation" },
  { name: "Vercel & Git", badge: "CI/CD & Cloud" },
];

export default function TechStack() {
  const engineeringStack = ENGINEERING_STACK;
  const systemsAndCloudStack = SYSTEMS_AND_CLOUD_STACK;

  return (
      <section id="tech-stack" className="w-full mb-14 sm:mb-18">
        {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <AwwwardsTextReveal
                as="h2"
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C24] dark:text-white"
              >
                Technical Stack
              </AwwwardsTextReveal>
              <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400 mt-1.5 max-w-2xl">
                Engineered with modern mobile runtimes, reactive web frameworks, and low-latency data layers.
              </p>
            </div>

              <a
                href={PORTFOLIO_DATA.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                suppressHydrationWarning
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-[#E11D48] dark:text-[#FB7185] hover:underline whitespace-nowrap self-start sm:self-auto"
              >
                <span>Full Resume Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Dual-Track Velocity Marquee - Seamless, Single-Display, Zero Duplication */}
            <div className="p-4 sm:p-6 rounded-2xl border border-dashed border-[#DCE0E8] dark:border-[#272736] bg-white/40 dark:bg-[#14141B]/30 backdrop-blur-xs space-y-3">
              {/* Track 1: Mobile & Web Engineering (Flows Left) */}
              <AnimasterMarquee speed={32} direction="left" pauseOnHover={true}>
                {engineeringStack.map((s, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white dark:bg-[#12121A] border border-neutral-200 dark:border-neutral-800 text-xs text-[#1C1C24] dark:text-[#EDEDF2] shadow-2xs whitespace-nowrap hover:border-[#E11D48] transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                    <span className="font-medium tracking-tight">{s.name}</span>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
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
                    className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white dark:bg-[#12121A] border border-neutral-200 dark:border-neutral-800 text-xs text-[#1C1C24] dark:text-[#EDEDF2] shadow-2xs whitespace-nowrap hover:border-[#E11D48] transition-colors cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48]" />
                    <span className="font-medium tracking-tight">{s.name}</span>
                    <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
                      {s.badge}
                    </span>
                  </div>
                ))}
              </AnimasterMarquee>
            </div>
          </section>
          );
}
