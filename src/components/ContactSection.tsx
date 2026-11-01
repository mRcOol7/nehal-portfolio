"use client";

import { useState } from "react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { Sparkles, Copy, Check, Mail, Send, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#6965F5", "#36C9E8", "#FFFFFF"],
      });
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#6965F5", "#36C9E8", "#FFFFFF"],
    });
  };

  const getSocialIcon = (name: string) => {
    if (name.includes("GitHub")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      );
    }
    if (name.includes("LinkedIn")) {
      return (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );
    }
    return (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 relative border-t border-white/[0.08]"
      aria-label="Contact Nehal Chauhan"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Outreach & Social Signals */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6965F5]/10 border border-[#6965F5]/20 text-xs font-mono text-[#6965F5] mb-4">
                <Sparkles className="w-3 h-3 text-[#36C9E8]" />
                <span>06 / Connection</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Let&apos;s build something <span className="gradient-text-accent">exceptional</span>
              </h2>

              <p className="text-sm sm:text-base text-[#A1A1B2] leading-relaxed mb-8">
                Whether you have an upcoming project, are looking to collaborate on high-performance frontend or React Native apps, or just want to discuss creative tech—my inbox is open.
              </p>

              {/* Direct Email Copy Card */}
              <div className="p-6 rounded-2xl bg-[#12121A] border border-white/[0.08] mb-8">
                <span className="text-[11px] font-mono uppercase text-[#A1A1B2] block mb-2">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-3">
                  <a
                    href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                    className="text-sm sm:text-base font-mono text-white hover:text-[#36C9E8] transition-colors truncate"
                  >
                    {PORTFOLIO_DATA.personal.email}
                  </a>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl glass-panel hover:bg-white/[0.08] text-white transition-all flex items-center gap-1.5 text-xs font-mono shrink-0"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#A1A1B2]" />
                        <span className="text-[#A1A1B2]">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Network Links */}
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#6E6E82] block mb-3">
                Digital Presence
              </span>
              <div className="flex flex-wrap gap-2.5">
                {PORTFOLIO_DATA.personal.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-xs font-mono text-[#A1A1B2] hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    {getSocialIcon(social.name)}
                    <span>{social.name}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#12121A] border border-white/[0.08]">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1B2] mb-6">
                Fill out the form below and I will respond within 24 hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 rounded-xl bg-[#6965F5]/10 border border-[#6965F5]/30 text-center animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#6965F5]/20 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white mb-1">
                    Message Sent Successfully
                  </h4>
                  <p className="text-xs sm:text-sm text-[#A1A1B2] max-w-sm mx-auto">
                    Thank you, {formData.name}! Your note has been received. I will be in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-6 px-4 py-2 rounded-full glass-panel text-xs font-mono text-white hover:bg-white/[0.08]"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-[#A1A1B2] mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl bg-[#171722] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6965F5] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-[#A1A1B2] mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#171722] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6965F5] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-mono text-[#A1A1B2] mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your product, timeline, and goals..."
                      className="w-full px-4 py-3 rounded-xl bg-[#171722] border border-white/[0.08] text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#6965F5] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#6965F5] hover:bg-[#5b57e8] text-white font-medium text-sm transition-all duration-300 shadow-xl shadow-[#6965F5]/25 hover:shadow-[#6965F5]/40"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
