"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";

export default function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function trackVisit() {
      try {
        const res = await fetch(`/api/visitors?_t=${Date.now()}`, {
          method: "POST",
          cache: "no-store",
          headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
          const data = await res.json();
          if (active && typeof data.count === "number") {
            setVisitorCount(data.count);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to fetch visitor count:", err);
      }

      if (active) {
        setLoading(false);
      }
    }

    trackVisit();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-[#161622] border border-neutral-300 dark:border-neutral-800 text-[11px] font-mono text-neutral-700 dark:text-neutral-300 shadow-2xs select-none"
      title="Visitor count"
    >
      <Users className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />

      <span>
        {loading && visitorCount === null ? (
          <span className="inline-block w-12 h-3 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        ) : (
          <>
            <span className="font-semibold text-neutral-900 dark:text-white">
              {(visitorCount ?? 1489).toLocaleString()}
            </span>{" "}
            visitors
          </>
        )}
      </span>
    </div>
  );
}
