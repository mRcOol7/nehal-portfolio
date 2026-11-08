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
        <section ref={sectionRef} id="about" className="w-full mb-12 sm:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1C1C24] dark:text-white mb-5 sm:mb-6">
            Who is Nehal?
          </h2>

      {/* Professional Summary with Interactive Karaoke Scroll Scrub */}
      <div
        ref={textRef}
        className="space-y-4 sm:space-y-5 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-normal mb-8 sm:mb-12 w-full"
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

      {/* Key Achievements Grid directly from Resume - Balanced 2-Column Full-Width Bento */}
      <div className="mb-8 sm:mb-12">
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-4 h-4 text-[#E11D48] shrink-0" />
          <h3 className="text-xs font-mono tracking-wider text-[#646478] dark:text-[#8E8EA2]">
            Key milestones &amp; impact
          </h3>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full">
          {PORTFOLIO_DATA.achievements.map((item) => {
            const match = item.metric.match(/^([\d.]+)(.*)$/);
            const val = match ? parseFloat(match[1]) : 0;
            const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;
            const suffix = match ? match[2] : "";

            return (
              <div
                key={item.title}
                className="milestone-card p-5 sm:p-7 rounded-2xl dashed-container bg-white/50 dark:bg-[#14141B]/40 hover:bg-white dark:hover:bg-[#181824] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#E11D48] dark:text-[#FB7185] mb-2">
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
                  <h4 className="text-sm sm:text-base font-bold text-[#1C1C24] dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#646478] dark:text-[#8E8EA2] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Education & Certifications Row - Full-Width Balanced Grid */}
      <div className="p-6 sm:p-8 rounded-2xl dashed-container bg-neutral-50/60 dark:bg-[#14141B]/30 w-full">
        <div className="flex items-center gap-2 mb-4">
          <GraduationCap className="w-4 h-4 text-[#1C1C24] dark:text-white" />
          <h3 className="text-xs font-mono tracking-wider text-[#646478] dark:text-[#8E8EA2]">
            Education &amp; background
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y md:divide-y-0 md:divide-x divide-dashed divide-neutral-200 dark:divide-neutral-800">
          {PORTFOLIO_DATA.education.map((edu, idx) => (
            <div key={edu.institution} className={idx > 0 ? "pt-4 md:pt-0 md:pl-6" : ""}>
              <h4 className="text-base font-bold text-[#1C1C24] dark:text-white">
                {edu.institution}
              </h4>
              <p className="text-xs sm:text-sm text-[#3E3E4E] dark:text-[#C4C4D4] mt-1">
                {edu.degree}
              </p>
              <div className="flex items-center gap-3 text-xs font-mono text-[#646478] dark:text-[#8E8EA2] mt-2">
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
