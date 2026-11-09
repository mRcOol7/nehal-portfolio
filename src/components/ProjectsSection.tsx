"use client";

import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
} from "lucide-react";

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
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");
  const [activeSlide, setActiveSlide] = useState(0);

  // Hover state for editorial list view
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const carouselRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveSlide(Math.min(Math.max(index, 0), filteredProjects.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 16
      : 360;
    container.scrollTo({
      left: index * cardWidth,
      behavior: "smooth",
    });
    setActiveSlide(index);
  };

  const handlePrev = () => {
    scrollToSlide(Math.max(activeSlide - 1, 0));
  };

  const handleNext = () => {
    scrollToSlide(Math.min(activeSlide + 1, filteredProjects.length - 1));
  };

  useEffect(() => {
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedFilter]);

  return (
    <section id="projects" className="w-full mb-16 sm:mb-20">
      {/* Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] dark:bg-[#FB7185]" />
            <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400">
              Selected works
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            Featured Projects
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
            Production systems, computer vision controllers, and interactive web architecture.
          </p>
        </div>

        {/* Filter Pills & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Filter Bar */}
          <div className="flex items-center gap-1 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80">
            {FILTER_OPTIONS.map((opt) => {
              const isSelected = selectedFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedFilter(opt.id)}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs"
                      : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
                  }`}
                >
                  {opt.label}
                  <span className="ml-1.5 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
                    {opt.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-900/80">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
              title="Carousel view"
              aria-label="Switch to carousel view"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-xs"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-300"
              }`}
              title="List view"
              aria-label="Switch to list view"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Carousel Arrows */}
          {viewMode === "carousel" && filteredProjects.length > 1 && (
            <div className="hidden sm:flex items-center gap-1 pl-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeSlide === 0}
                className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeSlide === filteredProjects.length - 1}
                className="p-1.5 rounded-md border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                aria-label="Next project"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 pl-1.5 tabular-nums">
                {String(activeSlide + 1).padStart(2, "0")}/{String(filteredProjects.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =============================================================== */}
      {/* VIEW 1: COMPACT CAROUSEL (Quiet, Precision Crafted)             */}
      {/* =============================================================== */}
      {viewMode === "carousel" && (
        <div className="w-full">
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pt-1 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className="snap-start shrink-0 w-[84vw] sm:w-[340px] lg:w-[360px] rounded-xl bg-white dark:bg-[#141417] border border-neutral-200 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors p-5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Meta Header: Index, Category, Metric */}
                  <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-100 dark:border-neutral-800/60">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 tabular-nums">
                        #{String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                        {project.category}
                      </span>
                    </div>

                    {project.metrics ? (
                      <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/80 px-2 py-0.5 rounded">
                        {project.metrics.split("·")[0]?.trim()}
                      </span>
                    ) : null}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                    {project.title}
                  </h3>

                  <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mt-1.5 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Highlights Bullet */}
                  <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800/50">
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-normal line-clamp-2">
                      {project.highlights[0]}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-1.5 mt-3.5">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-800"
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
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center justify-between pt-3.5 mt-4 border-t border-neutral-100 dark:border-neutral-800/60">
                  <div className="flex items-center gap-1.5">
                    {project.links.demo ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Live
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                        Open source
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        aria-label={`GitHub repository for ${project.title}`}
                        title="GitHub repository"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}

                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
                      >
                        <span>Visit live</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <span>Source</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Pagination Dots */}
          <div className="flex items-center justify-between mt-3 px-0.5">
            <span className="text-xs font-mono text-neutral-400 sm:hidden">
              Swipe to explore
            </span>

            <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    activeSlide === i
                      ? "w-5 bg-neutral-900 dark:bg-neutral-100"
                      : "w-1.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <span className="hidden sm:inline-block text-xs font-mono text-neutral-400 tabular-nums">
              {filteredProjects.length} builds curated
            </span>
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/* VIEW 2: EDITORIAL LIST (Minimalist, Hover Preview)               */}
      {/* =============================================================== */}
      {viewMode === "list" && (
        <div className="w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#141417] divide-y divide-neutral-100 dark:divide-neutral-800/80 overflow-hidden">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onMouseEnter={(e) => {
                setHoveredProject(project);
                setMousePos({ x: e.clientX, y: e.clientY });
              }}
              onMouseMove={(e) => {
                setMousePos({ x: e.clientX, y: e.clientY });
              }}
              onMouseLeave={() => setHoveredProject(null)}
              className="group p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            >
              {/* Index & Title */}
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500 w-6 tabular-nums">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-base font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-[#E11D48] dark:group-hover:text-[#FB7185] transition-colors">
                      {project.title}
                    </h4>
                    {project.links.demo && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Live production" />
                    )}
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                    {project.tagline}
                  </p>
                </div>
              </div>

              {/* Stack & Action */}
              <div className="flex items-center justify-between sm:justify-end gap-3 pl-9 sm:pl-0">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {project.stack.slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-400 border border-neutral-200/80 dark:border-neutral-800 whitespace-nowrap"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label={`GitHub for ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-md text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                      aria-label={`Visit ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Floating Hover Card (Desktop Only, Follows Cursor) */}
          {hoveredProject && (
            <div
              className="hidden lg:block fixed pointer-events-none z-50 w-72 p-4 rounded-xl bg-neutral-900/95 dark:bg-[#1C1C22]/95 backdrop-blur-md border border-neutral-700/80 shadow-xl text-white transition-opacity duration-150 ease-out"
              style={{
                left: `${Math.min(mousePos.x + 20, window.innerWidth - 310)}px`,
                top: `${Math.min(mousePos.y - 30, window.innerHeight - 240)}px`,
              }}
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-neutral-800 text-[10px] font-mono text-neutral-400">
                <span>{hoveredProject.category}</span>
                {hoveredProject.metrics ? (
                  <span className="text-emerald-400">{hoveredProject.metrics.split("·")[0]?.trim()}</span>
                ) : null}
              </div>
              <h5 className="font-serif font-bold text-sm text-neutral-100 line-clamp-1">
                {hoveredProject.title}
              </h5>
              <p className="text-xs text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                {hoveredProject.tagline}
              </p>
              <div className="mt-2.5 pt-2 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                <span>{hoveredProject.stack.slice(0, 3).join(", ")}</span>
                <span className="text-neutral-300">View project →</span>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
