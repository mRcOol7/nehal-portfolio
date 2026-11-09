"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import AnimasterSpotlightCard from "./AnimasterSpotlightCard";
import BenchoMagnetic from "./BenchoMagnetic";
import BenchoSegmentedControl from "./BenchoSegmentedControl";

const FILTER_OPTIONS = [
  { id: "all", label: "All Works", count: PORTFOLIO_DATA.projects.length },
  {
    id: "production",
    label: "Production",
    count: PORTFOLIO_DATA.projects.filter((p) =>
      p.category.toLowerCase().includes("production")
    ).length,
  },
  {
    id: "fullstack",
    label: "Full-Stack",
    count: PORTFOLIO_DATA.projects.filter((p) =>
      p.category.toLowerCase().includes("full-stack")
    ).length,
  },
  {
    id: "creative",
    label: "3D & AI",
    count: PORTFOLIO_DATA.projects.filter(
      (p) =>
        p.category.toLowerCase().includes("personal") ||
        p.category.toLowerCase().includes("vision") ||
        p.stack.includes("Three.js") ||
        p.stack.includes("Python")
    ).length,
  },
];

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filterOptions = FILTER_OPTIONS;

  const filteredProjects = PORTFOLIO_DATA.projects.filter((project) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "production")
      return project.category.toLowerCase().includes("production");
    if (selectedFilter === "fullstack")
      return project.category.toLowerCase().includes("full-stack");
    if (selectedFilter === "creative")
      return (
        project.category.toLowerCase().includes("personal") ||
        project.category.toLowerCase().includes("vision") ||
        project.stack.includes("Three.js") ||
        project.stack.includes("Python")
      );
    return true;
  });

  return (
    <section id="projects" className="w-full mb-14 sm:mb-18">
      {/* Header & Bencho Segmented Filter */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
        <div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-neutral-700 dark:text-neutral-400 mt-1.5">
            Production builds, native mobile architectures, and creative interfaces
          </p>
        </div>

        {/* Bencho Gesture-Driven Magnetic Segmented Control */}
        <div className="self-start lg:self-auto overflow-x-auto max-w-full pb-1 lg:pb-0">
          <BenchoSegmentedControl
            options={filterOptions}
            selectedId={selectedFilter}
            onSelect={setSelectedFilter}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {filteredProjects.map((project) => (
          <AnimasterSpotlightCard
            key={project.id}
            spotlightColor="rgba(225, 29, 72, 0.14)"
            enableTilt={true}
            className="p-6 sm:p-8 rounded-2xl dashed-container bg-white/50 dark:bg-[#14141B]/40 hover:bg-white dark:hover:bg-[#181822] transition-colors flex flex-col justify-between group"
          >
            <div>
              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-1 text-xs text-neutral-600 dark:text-neutral-400 mb-3">
                <span className="font-medium text-[#E11D48] dark:text-[#FB7185]">
                  {project.category}
                </span>
                <span className="font-mono text-[11px] text-neutral-600 dark:text-neutral-400">
                  {project.metrics}
                </span>
              </div>

              {/* Title & Tagline */}
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#1C1C24] dark:text-white group-hover:text-[#E11D48] transition-colors mb-2.5">
                {project.title}
              </h3>

              <p className="text-sm sm:text-base text-neutral-800 dark:text-neutral-200 leading-relaxed mb-5">
                {project.tagline}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5 mb-5">
                {project.highlights.map((h, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-[#E11D48] mt-0.5 shrink-0">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Stack Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Links Row with Bencho Magnetic Pull on action buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-800/80">
              <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                Production Code
              </span>

              <div className="flex items-center gap-2 sm:gap-3">
                {project.links.github ? (
                  <BenchoMagnetic strength={0.3}>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 sm:p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white transition-colors block"
                      aria-label={`GitHub Repository for ${project.title}`}
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  </BenchoMagnetic>
                ) : null}
                {project.links.demo ? (
                  <BenchoMagnetic strength={0.3}>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C1C24] dark:bg-white text-white dark:text-[#1C1C24] text-xs font-medium hover:bg-black dark:hover:bg-neutral-100 transition-colors whitespace-nowrap"
                      aria-label={`Live Demo for ${project.title}`}
                    >
                      <span>Visit Live</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </BenchoMagnetic>
                ) : null}
              </div>
            </div>
          </AnimasterSpotlightCard>
        ))}
      </div>
    </section>
  );
}
