"use client";

import { useState, useRef, useEffect } from "react";
import { PORTFOLIO_DATA, Project } from "@/data/portfolioData";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Sparkles,
  ShieldCheck,
  Cpu,
  ShoppingBag,
  IdCard,
  FileText,
  ExternalLink,
} from "lucide-react";
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

// Project visual preview styling metadata
const PROJECT_THEMES: Record<
  string,
  {
    gradient: string;
    borderAccent: string;
    badgeBg: string;
    beaconColor: string;
    icon: typeof Sparkles;
    status: string;
    accentHex: string;
  }
> = {
  "mukesh-ladies-tailor": {
    gradient: "from-rose-950/60 via-amber-950/20 to-neutral-900/90",
    borderAccent: "group-hover:border-rose-500/40",
    badgeBg: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    beaconColor: "bg-rose-400",
    status: "Live Store",
    icon: ShoppingBag,
    accentHex: "#E11D48",
  },
  "ai-hand-tracking-steering": {
    gradient: "from-cyan-950/60 via-emerald-950/20 to-neutral-900/90",
    borderAccent: "group-hover:border-cyan-500/40",
    badgeBg: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
    beaconColor: "bg-cyan-400",
    status: "60 FPS Vision",
    icon: Cpu,
    accentHex: "#06B6D4",
  },
  "nehal-portfolio-showcase": {
    gradient: "from-indigo-950/60 via-purple-950/20 to-neutral-900/90",
    borderAccent: "group-hover:border-indigo-500/40",
    badgeBg: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    beaconColor: "bg-indigo-400",
    status: "nehalchauhan.site",
    icon: IdCard,
    accentHex: "#6366F1",
  },
  "social-auth-platform": {
    gradient: "from-blue-950/60 via-sky-950/20 to-neutral-900/90",
    borderAccent: "group-hover:border-blue-500/40",
    badgeBg: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    beaconColor: "bg-blue-400",
    status: "OAuth 2.0 & Redis",
    icon: ShieldCheck,
    accentHex: "#3B82F6",
  },
  "cloud-invoice-system": {
    gradient: "from-teal-950/60 via-slate-900 to-neutral-900/90",
    borderAccent: "group-hover:border-teal-500/40",
    badgeBg: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    beaconColor: "bg-teal-400",
    status: "TiDB & Cloudinary",
    icon: FileText,
    accentHex: "#14B8A6",
  },
};

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"carousel" | "list">("carousel");
  const [activeSlide, setActiveSlide] = useState(0);

  // Hover state for editorial list view (image/card on hover)
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

  // Track active slide on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollPosition = container.scrollLeft;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 20
      : 360;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveSlide(Math.min(Math.max(index, 0), filteredProjects.length - 1));
  };

  const scrollToSlide = (index: number) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cardWidth = container.firstElementChild
      ? (container.firstElementChild as HTMLElement).offsetWidth + 20
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

  // Reset slide index when filter changes
  useEffect(() => {
    setActiveSlide(0);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [selectedFilter]);

  return (
    <section id="projects" className="w-full mb-14 sm:mb-18">
      {/* Header & Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#E11D48] animate-pulse" />
            <span className="text-[11px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
              Selected Works
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
            Production builds, computer vision systems, and creative web platforms
          </p>
        </div>

        {/* View Mode Toggle + Filter + Carousel Arrows */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
          {/* Bencho Filter */}
          <div className="overflow-x-auto max-w-full">
            <BenchoSegmentedControl
              options={FILTER_OPTIONS}
              selectedId={selectedFilter}
              onSelect={setSelectedFilter}
            />
          </div>

          {/* View Mode Switcher (Carousel / Minimal List) */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                viewMode === "carousel"
                  ? "bg-white dark:bg-neutral-800 text-[#1C1C24] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              }`}
              title="Carousel View"
              aria-label="Switch to Carousel View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                viewMode === "list"
                  ? "bg-white dark:bg-neutral-800 text-[#1C1C24] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-neutral-800 dark:hover:text-white"
              }`}
              title="Compact List View (Hover Preview)"
              aria-label="Switch to List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Arrows for Carousel */}
          {viewMode === "carousel" && filteredProjects.length > 1 && (
            <div className="hidden sm:flex items-center gap-1.5 pl-1">
              <BenchoMagnetic strength={0.3}>
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeSlide === 0}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </BenchoMagnetic>
              <BenchoMagnetic strength={0.3}>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeSlide === filteredProjects.length - 1}
                  className="p-2 rounded-lg bg-neutral-100 dark:bg-[#14141B] border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </BenchoMagnetic>
              <span className="text-xs font-mono text-neutral-500 dark:text-neutral-400 pl-1">
                {String(activeSlide + 1).padStart(2, "0")}/{String(filteredProjects.length).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* =============================================================== */}
      {/* MODE 1: COMPACT SNAPPING CAROUSEL (Default)                     */}
      {/* =============================================================== */}
      {viewMode === "carousel" && (
        <div className="relative w-full">
          {/* Scrollable Container with Snap */}
          <div
            ref={carouselRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 pt-1 no-scrollbar -mx-2 px-2 sm:mx-0 sm:px-0"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {filteredProjects.map((project, idx) => {
              const theme = PROJECT_THEMES[project.id] || {
                gradient: "from-neutral-900 to-neutral-950",
                borderAccent: "group-hover:border-neutral-600",
                badgeBg: "text-neutral-400 bg-neutral-800",
                beaconColor: "bg-neutral-400",
                status: "Production",
                icon: Sparkles,
                accentHex: "#E11D48",
              };
              const ThemeIcon = theme.icon;

              return (
                <div
                  key={project.id}
                  className={`snap-start shrink-0 w-[86vw] sm:w-[350px] lg:w-[380px] rounded-xl bg-white/70 dark:bg-[#14141B]/70 border border-neutral-200/90 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md p-4 sm:p-5 relative overflow-hidden`}
                >
                  <div>
                    {/* Visual Card Header Preview Banner */}
                    <div
                      className={`relative w-full h-24 sm:h-28 rounded-lg bg-linear-to-br ${theme.gradient} border border-neutral-200/30 dark:border-white/5 p-3 flex flex-col justify-between overflow-hidden mb-3.5 transition-transform duration-300 group-hover:scale-[1.01]`}
                    >
                      {/* Subtle Grid / Circuit Ambient Pattern */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px] opacity-10 pointer-events-none" />

                      {/* Top Bar inside Visual Header */}
                      <div className="flex items-center justify-between relative z-10">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${theme.badgeBg} font-medium flex items-center gap-1.5`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.beaconColor}`} />
                          {project.category}
                        </span>

                        <span className="text-[10px] font-mono text-neutral-300 dark:text-neutral-400 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
                          {theme.status}
                        </span>
                      </div>

                      {/* Center Decorative Visual Icon */}
                      <div className="flex items-center justify-between relative z-10 mt-auto">
                        <div className="p-2 rounded-lg bg-white/10 dark:bg-white/5 backdrop-blur-xs border border-white/10 text-white shadow-xs group-hover:scale-110 transition-transform">
                          <ThemeIcon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono text-neutral-400 tracking-tight">
                          {project.metrics}
                        </span>
                      </div>
                    </div>

                    {/* Project Title & Tagline */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1C24] dark:text-white group-hover:text-[#E11D48] dark:group-hover:text-[#FB7185] transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mt-1.5 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Tech Stack Chips (Compact) */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-[10px] font-mono text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-neutral-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono text-neutral-500">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Links Bar */}
                  <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-neutral-200/70 dark:border-neutral-800/80">
                    <span className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                      #{String(idx + 1).padStart(2, "0")}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                          aria-label={`GitHub for ${project.title}`}
                          title="View GitHub Repository"
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1C1C24] dark:bg-white text-white dark:text-[#1C1C24] text-[11px] font-medium hover:bg-black dark:hover:bg-neutral-100 transition-colors"
                        >
                          <span>Visit Live</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 text-[11px] font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <span>Repository</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Pagination Dots & Swipe Hint */}
          <div className="flex items-center justify-between mt-3 px-1">
            <span className="text-[11px] font-mono text-neutral-500 sm:hidden">
              ← Swipe to view all projects
            </span>

            {/* Clickable Pagination Pills */}
            <div className="flex items-center gap-1.5 mx-auto sm:mx-0">
              {filteredProjects.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToSlide(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeSlide === i
                      ? "w-6 bg-[#E11D48] dark:bg-[#FB7185]"
                      : "w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400"
                  }`}
                  aria-label={`Go to project slide ${i + 1}`}
                />
              ))}
            </div>

            <span className="hidden sm:inline-block text-[11px] font-mono text-neutral-400">
              {filteredProjects.length} projects curated
            </span>
          </div>
        </div>
      )}

      {/* =============================================================== */}
      {/* MODE 2: EDITORIAL LIST WITH HOVER PREVIEW (Image on hover text)  */}
      {/* =============================================================== */}
      {viewMode === "list" && (
        <div className="relative w-full rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-[#14141B]/40 divide-y divide-neutral-200/80 dark:divide-neutral-800/80 overflow-hidden">
          {filteredProjects.map((project, idx) => {
            const theme = PROJECT_THEMES[project.id] || {
              gradient: "from-neutral-900 to-neutral-950",
              borderAccent: "",
              badgeBg: "text-neutral-400 bg-neutral-800",
              beaconColor: "bg-neutral-400",
              status: "Production",
              icon: Sparkles,
              accentHex: "#E11D48",
            };

            return (
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
                className="group p-3.5 sm:p-4 hover:bg-white dark:hover:bg-[#181824] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                {/* Index + Title + Category */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-neutral-400 w-6">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base sm:text-lg font-bold text-[#1C1C24] dark:text-white group-hover:text-[#E11D48] dark:group-hover:text-[#FB7185] transition-colors">
                        {project.title}
                      </h4>
                      <span className={`w-1.5 h-1.5 rounded-full ${theme.beaconColor}`} />
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                      {project.tagline}
                    </p>
                  </div>
                </div>

                {/* Tech Chips + Link */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pl-9 sm:pl-0">
                  <div className="flex items-center gap-1.5 overflow-x-auto">
                    {project.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 whitespace-nowrap"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {project.links.demo && (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-[#1C1C24] hover:text-white dark:hover:bg-white dark:hover:text-[#1C1C24] transition-colors"
                        aria-label={`Visit ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                        aria-label={`GitHub for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Floating Hover Preview Card (Following mouse pointer on desktop) */}
          {hoveredProject && (
            <div
              className="hidden lg:block fixed pointer-events-none z-50 w-72 p-3.5 rounded-xl bg-[#14141B]/95 backdrop-blur-md border border-neutral-700/80 shadow-2xl transition-transform duration-75 ease-out text-white"
              style={{
                left: `${Math.min(mousePos.x + 20, window.innerWidth - 310)}px`,
                top: `${Math.min(mousePos.y - 40, window.innerHeight - 260)}px`,
              }}
            >
              {(() => {
                const theme = PROJECT_THEMES[hoveredProject.id] || {
                  gradient: "from-neutral-900 to-neutral-950",
                  status: "Production",
                  icon: Sparkles,
                };
                const ThemeIcon = theme.icon;
                return (
                  <div>
                    <div
                      className={`w-full h-20 rounded-lg bg-linear-to-br ${theme.gradient} border border-white/10 p-2.5 flex items-center justify-between mb-2.5`}
                    >
                      <div className="p-1.5 rounded-md bg-white/10 backdrop-blur-xs text-white">
                        <ThemeIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono text-neutral-300 bg-black/40 px-2 py-0.5 rounded-md">
                        {theme.status}
                      </span>
                    </div>

                    <h5 className="font-serif font-bold text-sm text-white line-clamp-1">
                      {hoveredProject.title}
                    </h5>
                    <p className="text-[11px] text-neutral-300 line-clamp-2 mt-1">
                      {hoveredProject.tagline}
                    </p>
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/10 text-[10px] font-mono text-neutral-400">
                      <span>{hoveredProject.category}</span>
                      <span className="text-rose-400">{hoveredProject.metrics}</span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
