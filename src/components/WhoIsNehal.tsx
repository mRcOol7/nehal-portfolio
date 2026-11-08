"use client";

import React, { useEffect, useRef } from "react";
import { Award, GraduationCap } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VengeanceCounter from "./VengeanceCounter";

export default function WhoIsNehal() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. The Karaoke Typographic Scroll Scrub
      if (textRef.current) {
        const words = textRef.current.querySelectorAll(".scrub-word");
        if (words.length > 0) {
          gsap.fromTo(
            words,
            {
              opacity: 0.25,
              y: 2,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              ease: "none",
              scrollTrigger: {
                trigger: textRef.current,
                start: "top 82%",
                end: "bottom 48%",
                scrub: 0.8,
              },
            }
          );
        }
      }

      // 2. Smooth Milestone Card Stagger
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".milestone-card");
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              y: 24,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              stagger: 0.12,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Helper to split sentence into individual scrub words
  const renderScrubWords = (
    text: string,
    isBold = false,
    isAccent = false
  ) => {
    const words = text.split(" ");
    return words.map((word, idx) => {
      if (!word) return null;
      let className = "scrub-word inline-block mr-1.5 transition-colors duration-150";
      if (isAccent) {
        className += " font-semibold text-[#E11D48] dark:text-[#FB7185]";
      } else if (isBold) {
        className += " font-semibold text-[#1C1C24] dark:text-white";
      } else {
        className += " text-[#3E3E4E] dark:text-[#C4C4D4]";
      }
      return (
        <span key={`${word}-${idx}`} className={className}>
          {word}
        </span>
      );
    });
  };

  return (
    <section ref={sectionRef} id="about" className="w-full mb-10 sm:mb-12">
      <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-4 sm:mb-5">
        Who is Nehal?
      </h2>

      {/* Professional Summary with Interactive Karaoke Scroll Scrub */}
      <div
        ref={textRef}
        className="space-y-3 sm:space-y-4 text-sm sm:text-base md:text-lg leading-relaxed font-normal mb-6 sm:mb-8"
      >
        <p>
          {renderScrubWords("I am a")}
          {renderScrubWords(
            "Software Engineer specializing in Native Android (Java) and Full-Stack Web Development",
            true
          )}
          {renderScrubWords("(React.js, Next.js, TypeScript, Node.js).")}
        </p>
        <p>
          {renderScrubWords(
            "I build production platforms and high-performance applications, delivering low-latency distributed caching (Redis, TiDB), secure REST APIs, and automated/manual QA test suites, alongside creating a viral"
          )}
          {renderScrubWords(
            "Snapchat AR Lens capturing 915.22M+ global impressions.",
            true,
            true
          )}
        </p>
      </div>

      {/* Key Achievements Grid directly from Resume */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Award className="w-4 h-4 text-[#E11D48] shrink-0" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#646478] dark:text-[#8E8EA2]">
            Key Career Milestones & Impact
          </h3>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          {PORTFOLIO_DATA.achievements.map((item) => {
            const match = item.metric.match(/^([\d.]+)(.*)$/);
            const val = match ? parseFloat(match[1]) : 0;
            const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
            const suffix = match ? match[2] : "";

            return (
              <div
                key={item.title}
                className="milestone-card p-3.5 sm:p-4 rounded-xl dashed-container bg-white/50 dark:bg-[#14141B]/40 hover:bg-white dark:hover:bg-[#181824] transition-colors"
              >
                <div className="text-base sm:text-lg font-serif font-bold text-[#E11D48] dark:text-[#FB7185] mb-1">
                  {match ? (
                    <VengeanceCounter
                      value={val}
                      decimals={decimals}
                      suffix={suffix}
                      duration={2.2}
                      className="font-serif font-bold"
                    />
                  ) : (
                    item.metric
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#1C1C24] dark:text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-xs text-[#646478] dark:text-[#8E8EA2] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Education & Certifications Row */}
      <div className="p-4 sm:p-5 rounded-2xl dashed-container bg-neutral-50/60 dark:bg-[#14141B]/30">
        <div className="flex items-center gap-2 mb-3">
          <GraduationCap className="w-4 h-4 text-[#1C1C24] dark:text-white" />
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#646478] dark:text-[#8E8EA2]">
            Education & Background
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-dashed divide-neutral-200 dark:divide-neutral-800">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div key={edu.institution} className={idx > 0 ? "pt-3 sm:pt-0 sm:pl-4" : ""}>
              <h4 className="text-sm font-bold text-[#1C1C24] dark:text-white">
                {edu.institution}
              </h4>
              <p className="text-xs text-[#3E3E4E] dark:text-[#C4C4D4] mt-0.5">
                {edu.degree}
              </p>
              <div className="flex items-center gap-3 text-[11px] font-mono text-[#646478] dark:text-[#8E8EA2] mt-1">
                <span>{edu.period}</span>
                <span>•</span>
                <span className="text-[#E11D48] dark:text-[#FB7185] font-semibold">{edu.grade}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
