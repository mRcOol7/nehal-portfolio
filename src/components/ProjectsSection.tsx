"use client";

import { useState } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import { ArrowUpRight } from "lucide-react";
import AwwwardsTextReveal from "./AwwwardsTextReveal";

export default function ProjectsSection() {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const projects = PORTFOLIO_DATA.projects;

  return (
    <section id="projects" className="w-full mb-16 sm:mb-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <AwwwardsTextReveal
            as="h2"
            className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
          >
            Featured Projects
          </AwwwardsTextReveal>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
            Production systems, computer vision controllers, and interactive web architecture.
          </p>
        </div>

        <div className="self-start sm:self-auto">
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-2.5 py-1 rounded-md tabular-nums">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
      </div>

      {/* Editorial List with Floating Hover Preview */}
      <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141417] divide-y divide-neutral-100 dark:divide-neutral-800/80 overflow-hidden shadow-xs">
        {projects.map((project, idx) => (
          <div
            key={project.id}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("a") || target.closest("button")) {
                setHoveredProject(null);
                return;
              }
              setHoveredProject(project);
              setMousePos({ x: e.clientX, y: e.clientY });
            }}
            onMouseMove={(e) => {
              const target = e.target as HTMLElement;
              if (target.closest("a") || target.closest("button")) {
                setHoveredProject(null);
                return;
              }
              setHoveredProject(project);
              setMousePos({ x: e.clientX, y: e.clientY });
            }}
            onMouseLeave={() => setHoveredProject(null)}
            className="group p-4 sm:p-5 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
          >
            {/* Index & Title Info */}
            <div className="flex items-start sm:items-center gap-3.5">
              <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 w-6 pt-0.5 sm:pt-0 tabular-nums shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-[#E11D48] dark:group-hover:text-[#FB7185] transition-colors">
                    {project.title}
                  </h3>
                  {project.links.demo ? (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                      title="Live production"
                    />
                  ) : (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-neutral-400 shrink-0"
                      title="Open source"
                    />
                  )}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                  {project.tagline}
                </p>
              </div>
            </div>

            {/* Tech Stack & Action Links */}
            <div className="flex items-center justify-between sm:justify-end gap-3 pl-9 sm:pl-0">
              <div className="hidden md:flex items-center gap-1.5 overflow-x-auto">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800 whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>

              <div
                className="flex items-center gap-2 shrink-0"
                onMouseEnter={(e) => {
                  e.stopPropagation();
                  setHoveredProject(null);
                }}
                onMouseMove={(e) => {
                  e.stopPropagation();
                  setHoveredProject(null);
                }}
              >
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    aria-label={`GitHub repository for ${project.title}`}
                    title="View GitHub repository"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
                {project.links.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Visit live</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Source</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Hover Preview Card (Follows cursor on desktop) */}
      {hoveredProject && (
        <div
          className="hidden lg:block fixed pointer-events-none z-50 w-80 p-4 rounded-xl bg-neutral-950/95 dark:bg-[#16161C]/95 backdrop-blur-md border border-neutral-700/80 shadow-2xl text-white transition-opacity duration-150 ease-out"
          style={{
            left: `${Math.min(mousePos.x + 24, typeof window !== "undefined" ? window.innerWidth - 340 : 800)}px`,
            top: `${Math.min(mousePos.y - 20, typeof window !== "undefined" ? window.innerHeight - 260 : 400)}px`,
          }}
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[10px] font-mono text-neutral-400">
            <span>{hoveredProject.category}</span>
            {hoveredProject.metrics ? (
              <span className="text-emerald-400 font-medium">
                {hoveredProject.metrics.split("·")[0]?.trim()}
              </span>
            ) : null}
          </div>

          <h4 className="font-serif font-bold text-sm text-neutral-100 line-clamp-1">
            {hoveredProject.title}
          </h4>

          <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed">
            {hoveredProject.tagline}
          </p>

          {hoveredProject.highlights[0] && (
            <p className="text-[11px] text-neutral-400 line-clamp-2 mt-2 pt-2 border-t border-neutral-800/60 leading-normal">
              {hoveredProject.highlights[0]}
            </p>
          )}

          <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>{hoveredProject.stack.slice(0, 3).join(", ")}</span>
            <span className="text-neutral-200">View project →</span>
          </div>
        </div>
      )}
    </section>
  );
}
