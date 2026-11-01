"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Sparkles, Calendar, MapPin, CheckCircle2, Briefcase } from "lucide-react";

export default function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="py-24 sm:py-32 relative border-t border-white/[0.08]"
      aria-label="Experience & Milestones"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6965F5]/10 border border-[#6965F5]/20 text-xs font-mono text-[#6965F5] mb-3">
            <Sparkles className="w-3 h-3 text-[#36C9E8]" />
            <span>04 / Journey</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Experience & Impact
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1B2] mt-2 max-w-xl">
            Track record of shipping mission-critical web applications and mobile products with cross-functional teams.
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 sm:pl-8 border-l border-white/[0.1] space-y-12 max-w-4xl">
          {PORTFOLIO_DATA.experience.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#12121A] border-2 border-[#6965F5] group-hover:border-[#36C9E8] group-hover:scale-125 transition-all duration-300">
                {item.isCurrent && (
                  <span className="absolute inset-0 rounded-full bg-[#6965F5] animate-ping opacity-60" />
                )}
              </div>

              {/* Timeline Card */}
              <div className="p-7 sm:p-8 rounded-2xl bg-[#12121A] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-white transition-colors">
                      {item.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#36C9E8] mt-1">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>{item.company}</span>
                      <span className="text-white/20">·</span>
                      <span className="flex items-center gap-1 text-[#A1A1B2]">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-[#171722] border border-white/[0.08] text-[#A1A1B2] self-start sm:self-auto">
                    <Calendar className="w-3 h-3 text-[#6965F5]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#A1A1B2] leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Key Contributions */}
                <div className="space-y-2.5 mb-6">
                  {item.contributions.map((contribution, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1B2]">
                      <CheckCircle2 className="w-4 h-4 text-[#6965F5] shrink-0 mt-0.5" />
                      <span>{contribution}</span>
                    </div>
                  ))}
                </div>

                {/* Technologies */}
                <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#171722] border border-white/[0.06] text-[11px] font-mono text-[#A1A1B2]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
