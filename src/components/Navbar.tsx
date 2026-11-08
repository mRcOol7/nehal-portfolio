"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Default to dark mode unless user explicitly selected light
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
      setIsDark(true);
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#tech-stack" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "let's talk", href: "#contact" },
  ];

  return (
      <header className="relative w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 pt-5 sm:pt-6 pb-4">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Interactive Badge Pass Pill */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <a
              href="#badge-hero"
              className="font-serif italic text-xl sm:text-2xl font-bold tracking-tight text-[#1C1C24] dark:text-white hover:opacity-80 transition-opacity"
            >
              Nehal Chauhan
            </a>
            <a
              href="#badge-hero"
              title="View 3D Staff ID Badge"
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-neutral-200/70 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-[10px] font-mono font-semibold text-neutral-600 dark:text-neutral-300 hover:border-[#E11D48] dark:hover:border-[#E11D48] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Pass</span>
            </a>
          </div>

          {/* Navigation Links & Theme Switcher */}
          <div className="flex items-center gap-3 sm:gap-8">
            <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-[#646478] dark:text-[#A1A1B2]">
              <a
                href="#home"
                className="text-[#1C1C24] dark:text-white underline underline-offset-8 decoration-[#E11D48] decoration-2"
              >
                Home
              </a>
              <a
                href="#projects"
                className="hover:text-[#1C1C24] dark:hover:text-white transition-colors"
              >
                Projects
              </a>
              <a
                href="#experience"
                className="hover:text-[#1C1C24] dark:hover:text-white transition-colors"
              >
                Experience
              </a>
              <a
                href="#about"
                className="hover:text-[#1C1C24] dark:hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="hover:text-[#1C1C24] dark:hover:text-white transition-colors"
              >
                let&apos;s talk
              </a>
            </nav>

            {/* Sun/Moon Toggle Switch like palakonweb */}
            <button
              onClick={toggleTheme}
              className="relative inline-flex items-center w-12 h-6 rounded-full p-1 bg-[#E8E8EE] dark:bg-[#252532] transition-colors focus:outline-none shrink-0"
              aria-label="Toggle dark mode"
            >
              <div
                className={`w-4 h-4 rounded-full bg-white dark:bg-[#E11D48] shadow-sm transform transition-transform duration-200 flex items-center justify-center ${isDark ? "translate-x-6" : "translate-x-0"
                  }`}
              >
                {isDark ? (
                  <Moon className="w-2.5 h-2.5 text-white" />
                ) : (
                  <Sun className="w-2.5 h-2.5 text-amber-500" />
                )}
              </div>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-1.5 rounded-lg text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#E11D48]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-3 p-3 rounded-2xl dashed-container bg-white/95 dark:bg-[#14141B]/95 shadow-lg backdrop-blur-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-[#646478] dark:text-[#A1A1B2] hover:text-[#1C1C24] dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
      );
}
