"use client";

import { useEffect } from "react";

const STORAGE_KEY = "nehal_portfolio_has_visited";

/**
 * FirstTimeVisitorController
 * - First-time visitor: starts from the interactive 3D Lanyard ID Badge Hero at the top.
 * - Returning visitor: directly opens at the actual website content below (#website-content).
 * - Clicking the logo or #badge-hero allows anyone to view the badge anytime.
 */
export default function FirstTimeVisitorController() {
  useEffect(() => {
    try {
      // Allow testing reset via console or URL: ?badge=true or ?reset=true
      if (typeof window !== "undefined") {
        (window as unknown as { resetVisitorStatus?: () => void }).resetVisitorStatus = () => {
          localStorage.removeItem(STORAGE_KEY);
          window.location.href = window.location.pathname;
        };

        if (window.location.search.includes("reset=true") || window.location.search.includes("reset=1")) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }

        const hasVisited = localStorage.getItem(STORAGE_KEY);
        const isBadgeExplicit =
          window.location.hash === "#badge-hero" ||
          window.location.search.includes("badge=true") ||
          window.location.search.includes("badge=1");

        if (hasVisited && !isBadgeExplicit) {
          // Returning visitor: directly open the below part (actual website)
          const target = document.getElementById("website-content");
          if (target) {
            const jumpToContent = () => {
              target.scrollIntoView({ behavior: "instant" });
            };
            jumpToContent();
            requestAnimationFrame(jumpToContent);
            setTimeout(jumpToContent, 80);
          }
        } else {
          // First-time visitor: mark as visited for future visits
          localStorage.setItem(STORAGE_KEY, "true");
        }
      }
    } catch {
      // Graceful fallback if localStorage is disabled in strict private mode
    }
  }, []);

  return null;
}
