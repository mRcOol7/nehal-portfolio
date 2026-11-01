import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import WhoIsNehal from "@/components/WhoIsNehal";
import TechStack from "@/components/TechStack";
import FreelancingCard from "@/components/FreelancingCard";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import DevicePlugScrollSection from "@/components/DevicePlugScrollSection";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] dark:bg-[#0C0C10] text-[#1C1C24] dark:text-[#E8E8EE] selection:bg-[#E11D48]/20 selection:text-[#E11D48] transition-colors duration-200">
      {/* Outer subtle ambient side-vignettes inspired by palakonweb */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-48 h-full bg-gradient-to-r from-blue-50/40 dark:from-indigo-950/20 to-transparent" />
        <div className="absolute top-0 right-0 w-48 h-full bg-gradient-to-l from-blue-50/40 dark:from-indigo-950/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full overflow-x-clip">
        {/* Navigation */}
        <Navbar />

        {/* Central Content Container with subtle dashed boundary lines */}
        <main className="max-w-4xl mx-auto px-3 sm:px-6 md:px-8 py-5 sm:py-8 border-x border-dashed border-[#DCE0E8] dark:border-[#272736] bg-[#FAFAFC]/60 dark:bg-[#0C0C10]/60 min-h-screen">
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
