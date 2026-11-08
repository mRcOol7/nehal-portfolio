import LanyardBadgeHero from "@/components/LanyardBadgeHero";
import FirstTimeVisitorController from "@/components/FirstTimeVisitorController";
import HeroBanner from "@/components/HeroBanner";
import WhoIsNehal from "@/components/WhoIsNehal";
import TechStack from "@/components/TechStack";
import FreelancingCard from "@/components/FreelancingCard";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import DevicePlugScrollSection from "@/components/DevicePlugScrollSection";
import ContactFooter from "@/components/ContactFooter";
import SkiperDynamicIsland from "@/components/SkiperDynamicIsland";
import ScrolltideTracker from "@/components/ScrolltideTracker";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0C0C10] text-[#1C1C24] dark:text-[#E8E8EE] selection:bg-[#E11D48]/20 selection:text-[#E11D48] transition-colors duration-200">
      {/* Route returning visitors directly to the website while allowing 1st-time visitors to see the 3D pass */}
      <FirstTimeVisitorController />

      {/* Initial 100vh Interactive 3D ID Badge Lanyard Experience */}
      <LanyardBadgeHero />

      {/* Outer subtle ambient side-vignettes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-blue-50/40 dark:from-indigo-950/20 to-transparent" />
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-blue-50/40 dark:from-indigo-950/20 to-transparent" />
      </div>

      <div id="website-content" className="relative z-10 w-full overflow-x-clip">
        {/* Skiper UI Dynamic Island - Unified Floating Navigation Bar & Command Dock */}
        <SkiperDynamicIsland />

        {/* Scrolltide Cinematic Tide Navigation & Depth Tracker (2xl screens) */}
        <ScrolltideTracker />

          {/* Central Content Container - Expansive Full-Screen Widescreen Architecture */}
          <main className="w-full max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-16 sm:pt-24 pb-12 sm:pb-20 border-x border-dashed border-[#DCE0E8]/70 dark:border-[#272736]/70 bg-[#FAFAFC]/60 dark:bg-[#0C0C10]/60 min-h-screen transition-all duration-200">
            {/* Animated Hero Banner with landscape header & animated circular avatar */}
            <HeroBanner />

            {/* Who is Nehal? (About Narrative & Key Milestones) */}
            <WhoIsNehal />

            {/* Interactive Scroll-Driven Device Plug-In Workstation (The Hook) */}
            <DevicePlugScrollSection />

            {/* Featured Projects (Proof of Work) */}
            <ProjectsSection />

            {/* Tech Stack Pills (Technical Depth & Tooling) */}
            <TechStack />

            {/* Work Experience (Career Timeline & Milestones) */}
            <ExperienceSection />

            {/* Freelancing & Collaboration Banner (High-Intent Conversion CTA) */}
            <FreelancingCard />

            {/* Contact & Footer */}
            <ContactFooter />
          </main>
      </div>
    </div>
  );
}
