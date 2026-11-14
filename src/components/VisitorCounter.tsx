"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";

const BASELINE = 1496;

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number>(() => {
    if (typeof window !== "undefined") {
      try {
        const cached = window.localStorage.getItem("nehal_visitor_count");
        if (cached) {
          const num = parseInt(cached, 10);
          if (!isNaN(num) && num >= BASELINE) return num;
        }
      } catch {
        // Fallback to baseline
      }
    }
    return BASELINE;
  });

  useEffect(() => {
    let active = true;

    async function syncVisitors() {
      try {
        // Detect if this browser session has already counted a visit
        let hasHit = false;
        try {
          hasHit = !!window.sessionStorage.getItem("nehal_visited");
        } catch {
          // Ignore storage restrictions
        }

        // New session triggers POST (hit/increment); existing session queries GET (live read)
        const method = hasHit ? "GET" : "POST";
        const res = await fetch(`/api/visitors?_t=${Date.now()}`, {
          method,
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          if (active && typeof data.count === "number" && data.count >= BASELINE) {
            setVisitorCount(data.count);
            try {
              window.sessionStorage.setItem("nehal_visited", "true");
              window.localStorage.setItem("nehal_visitor_count", String(data.count));
            } catch {
              // Ignore storage restrictions
            }
          }
        }
      } catch (err) {
        console.error("Failed to sync visitor count:", err);
      }
    }

    syncVisitors();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-[#161622] border border-neutral-300 dark:border-neutral-800 text-[11px] font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs select-none transition-transform duration-200 hover:scale-[1.02]"
      title="Verified Unique Portfolio Visitors"
    >
      <Users className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
      <span>
        <span className="font-semibold text-neutral-900 dark:text-white tabular-nums">
          {visitorCount.toLocaleString()}
        </span>{" "}
        visitors
      </span>
    </div>
  );
}
