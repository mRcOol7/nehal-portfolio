"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import VisitorCounter from "./VisitorCounter";
import BenchoMagnetic from "./BenchoMagnetic";
import { initViaductScene } from "@/lib/viaductScene";

/**
 * ScenicViaductFooter
 * Full-width edge-to-edge panoramic viaduct footer with:
 * - Dynamic Day / Dusk adaptive photo switching (light / dark mode)
 * - Mountain ridge contour silhouette mask blending into page background
 * - WebGL Vande Bharat Express (bidirectional EMU with front & rear DTC cabs)
 * - Zero smoke/steam emission (100% clean electric traction)
 * - Self-drawing animated handwriting signature (Nehal Chauhan) via sequential SVG pen-masking
 * - Analog CRT scanlines, vignette, and ambient film aesthetic
 * - Live visitor telemetry and bottom navigation bar
 */
export default function ScenicViaductFooter() {
  const artRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  // Initialize WebGL Scenic Landscape
  useEffect(() => {
    setMounted(true);
    if (!artRef.current) return;

    const cleanup = initViaductScene(artRef.current);
    return () => {
      cleanup();
    };
  }, []);

  // Self-writing handwriting signature animation (matching reuka.design WAAPI pen mask)
  useEffect(() => {
    const signature = signatureRef.current;
    if (!signature || !signature.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ink = signature.querySelector(".signature-ink") as SVGElement | null;
    const pens = Array.from(signature.querySelectorAll("mask path")).map((p) => {
      const path = p as SVGPathElement;
      const length = path.getTotalLength();
      const hidden = length + 8;
      path.style.strokeDasharray = `${length}px ${length + 2 * hidden}px`;
      path.style.strokeDashoffset = `${hidden}px`;
      return {
        path,
        duration: Number(path.getAttribute("data-ms")) || 320,
        pause: Number(path.getAttribute("data-pause")) || 30,
      };
    });

    const finish = () => ink?.removeAttribute("mask");
    ink?.setAttribute("mask", "url(#signature-pen)");

    let started = false;
    const startWriting = () => {
      if (started) return;
      started = true;
      let at = 200;
      let lastAnim: Animation | undefined;
      for (const { path, duration, pause } of pens) {
        at += pause;
        lastAnim = path.animate(
          [
            { strokeDashoffset: `${path.getTotalLength() + 8}px` },
            { strokeDashoffset: "0px" },
          ],
          {
            duration,
            delay: at,
            fill: "forwards",
            easing: "cubic-bezier(0.28, 0.11, 0.32, 1)",
          }
        );
        at += duration;
      }
      lastAnim?.finished.then(finish, finish);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        startWriting();
      },
      { threshold: 0.1 }
    );

    observer.observe(signature);

    if (signature.getBoundingClientRect().top <= window.innerHeight + 200) {
      startWriting();
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full overflow-hidden select-none">
      {/* Preload critical WebGL train atlas and daylight plate for instantaneous rendering on reload */}
      <link rel="preload" href="/footer/train.webp" as="image" type="image/webp" />
      <link rel="preload" href="/footer/chenab-day.webp" as="image" type="image/webp" />

      {/* Full-Width Panoramic Scenic Viaduct Display */}
      <div ref={artRef} className="foot-art w-full">
        {/* Day / Dusk Base High-Resolution Plates (Chenab Rail Bridge, Jammu & Kashmir) */}
        <img
          className="day day-pic select-none pointer-events-none"
          src="/footer/chenab-day.webp"
          alt="Chenab Rail Bridge by Day - Jammu & Kashmir, India"
          width={1920}
          height={1080}
          decoding="async"
        />
        <img
          className="dusk dusk-pic select-none pointer-events-none"
          src="/footer/chenab-dusk.webp"
          alt="Chenab Rail Bridge at Twilight - Jammu & Kashmir, India"
          width={1920}
          height={1080}
          decoding="async"
        />

        {/* Floating Controls & Brand Signature Overlay */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-6 sm:px-12 md:px-16 lg:px-24 py-6 sm:py-8 flex flex-col gap-6">
          {/* Centered Self-Drawing Animated Signature (Nehal Chauhan) */}
          <div className="w-full flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center">
              <svg
                ref={signatureRef}
                className="foot-signature w-[280px] sm:w-[350px] md:w-[420px] h-auto overflow-visible select-none drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]"
                viewBox="0 0 540 140"
                role="img"
                aria-label="Nehal Chauhan’s signature"
              >
                <defs>
                  <filter id="sig-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity={0.85} />
                  </filter>
                </defs>

                {/* Pen Strokes Mask: Sweeps across letter by letter */}
                <mask id="signature-pen" maskUnits="userSpaceOnUse" x="0" y="0" width="540" height="140">
                  <g fill="none" stroke="#ffffff" strokeWidth="140" strokeLinecap="round" strokeLinejoin="round">
                    <path data-ms="1100" data-pause="0" d="M 10,70 L 530,70" />
                  </g>
                </mask>

                {/* The Signature Content (revealed by the pen mask, then unmasked) */}
                <g className="signature-ink" mask="url(#signature-pen)" filter="url(#sig-glow)">
                  {/* Luxury Cursive Signature Name */}
                  <text
                    x="270"
                    y="82"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    style={{
                      fontFamily: "var(--font-alex-brush), 'Alex Brush', cursive",
                      fontSize: "66px",
                      letterSpacing: "1.5px",
                    }}
                  >
                    Nehal Chauhan
                  </text>

                  {/* Elegant Dynamic Underline Flourish */}
                  <path
                    d="M 50,112 C 160,105 320,105 450,109 C 480,111 498,114 502,116"
                    fill="none"
                    stroke="#F8FAFC"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                  />
                </g>
              </svg>

              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-white/70 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)] mt-1">
                Software Engineer · Mobile &amp; Web Architect
              </span>
            </div>
          </div>

          {/* Bottom Bar: Copyright, Telemetry, and Socials */}
          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 pt-3 border-t border-white/15 text-xs text-white/80 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            {/* Left: Copyright & Location */}
            <div className="flex items-center gap-2 text-center md:text-left">
              <span>
                © 2026 {PORTFOLIO_DATA.personal.displayName}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">Gujarat, India</span>
            </div>

            {/* Center: Live Visitor Telemetry */}
            <div className="flex items-center">
              <VisitorCounter />
            </div>

            {/* Right: Social Profiles & Smooth Scroll to Top */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://github.com/mRcOol7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 hover:text-white border border-white/15 transition-all text-xs font-medium shadow-md"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nehal-chauhan19"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-black/70 backdrop-blur-md text-white/90 hover:text-white border border-white/15 transition-all text-xs font-medium shadow-md"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </a>

              <BenchoMagnetic strength={0.3}>
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/25 transition-all text-xs font-medium shadow-md group cursor-pointer"
                  title="Scroll smoothly back to the top"
                  aria-label="Back to top"
                >
                  <span>Top</span>
                  <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </BenchoMagnetic>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
