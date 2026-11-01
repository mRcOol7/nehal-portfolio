"use client";

import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full mb-12">
      <div className="mb-5 sm:mb-6">
        <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
          Featured Projects
        </h2>
        <p className="text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2] mt-1">
          Production builds, native mobile architectures, and creative interfaces
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {PORTFOLIO_DATA.projects.map((project) => (
          <div
            key={project.id}
            className="p-4 sm:p-6 rounded-2xl dashed-container bg-white/50 dark:bg-[#14141B]/40 hover:bg-white dark:hover:bg-[#181822] transition-all duration-200 flex flex-col justify-between group"
          >
            <div>
              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-[#646478] dark:text-[#8E8EA2] mb-3">
                <span className="font-medium text-[#E11D48] dark:text-[#FB7185]">
                  {project.category}
                </span>
                <span className="font-mono text-[11px] text-[#646478] dark:text-[#8E8EA2]">
                  {project.metrics}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-[#1C1C24] dark:text-white group-hover:text-[#E11D48] transition-colors mb-2">
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#3E3E4E] dark:text-[#C4C4D4] leading-relaxed mb-4">
                {project.tagline}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-5">
                {project.highlights.map((h, idx) => (
                  <li key={idx} className="text-xs text-[#646478] dark:text-[#8E8EA2] flex items-start gap-2 leading-relaxed">
                    <span className="text-[#E11D48] mt-0.5 shrink-0">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-[#646478] dark:text-[#A1A1B2]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-neutral-100 dark:border-neutral-800/80">
              <span className="text-[11px] font-mono text-[#8E8EA2] dark:text-[#646478]">
                Production Code
              </span>

              <div className="flex items-center gap-2 sm:gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white transition-colors"
                    aria-label={`GitHub Repository for ${project.title}`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#1C1C24] dark:bg-white text-white dark:text-[#1C1C24] text-xs font-medium hover:bg-black dark:hover:bg-neutral-100 transition-colors whitespace-nowrap"
                    aria-label={`Live Demo for ${project.title}`}
                  >
                    <span>Visit Live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

