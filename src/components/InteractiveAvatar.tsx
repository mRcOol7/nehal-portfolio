"use client";

import { useEffect, useRef, useState } from "react";

// 3x3 Grid of 9 Directional Frames matching Nehal's spritesheet
const DIRECTION_FRAMES = [
  "up-left", "up", "up-right",
  "left", "center", "right",
  "down-left", "down", "down-right",
];

// 3x3 Grid of 9 Reaction Expressions matching Nehal's reaction sheet
const REACTION_FRAMES = [
  "blink", "heart", "sparkle",
  "surprised", "wink", "bashful",
  "sleepy", "dizzy", "delighted",
];

// 8 Circular Directions mapped by angle from center
const ANGULAR_DIRECTIONS = [
  "right", "down-right", "down", "down-left",
  "left", "up-left", "up", "up-right",
];

const STEP_ANGLE = (Math.PI * 2) / ANGULAR_DIRECTIONS.length;
const ANGLE_HYSTERESIS = 0.12;
const DEAD_ZONE_RADIUS = 60; // px

const CLICK_REACTIONS = ["heart", "sparkle", "wink", "delighted"];
const BLINK_DELAY = 120;
const RESET_DELAY = 650;
const SQUISH_DURATION = 420;
const RAPID_CLICK_LIMIT = 4;
const CLICK_WINDOW = 1600;
const DIZZY_DURATION = 1200;

// The exact keyframes reverse-engineered from palakonweb.in
const SQUISH_KEYFRAMES: Keyframe[] = [
  { transform: "scale(1, 1)", easing: "ease-in" },
  { transform: "scale(1.10, 0.86)", offset: 0.18, easing: "ease-out" },
  { transform: "scale(0.95, 1.08)", offset: 0.45, easing: "ease-in-out" },
  { transform: "scale(1.03, 0.97)", offset: 0.72, easing: "ease-in-out" },
  { transform: "scale(1, 1)" },
];

function getFramePosition(index: number) {
  return {
    backgroundPosition: `${(index % 3) * 50}% ${Math.floor(index / 3) * 50}%`,
  };
}

function normalizeAngle(a: number) {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

export default function InteractiveAvatar({
  directions = "/mascots/nehal-directions.webp",
  reactions = "/mascots/nehal-reactions.webp",
  size = 124,
  label = "Nehal",
}: {
  directions?: string;
  reactions?: string;
  size?: number;
  label?: string;
}) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const timersRef = useRef<number[]>([]);
  const clickTracker = useRef({ count: 0, at: 0 });

  const [currentDirection, setCurrentDirection] = useState("center");
  const [currentReaction, setCurrentReaction] = useState<string | null>(null);
  const [boopCount, setBoopCount] = useState(0);

  // 1. Exact cursor-tracking algorithm from palakonweb
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let lastDirIndex = -1;
    let pointerPos: { x: number; y: number } | null = null;

    const updateDirection = () => {
      const btn = buttonRef.current;
      if (!btn || !pointerPos) return;

      const rect = btn.getBoundingClientRect();
      const dx = pointerPos.x - (rect.left + rect.width / 2);
      const dy = pointerPos.y - (rect.top + rect.height / 2);

      // Dead-zone check: look center directly at user
      if (Math.hypot(dx, dy) < DEAD_ZONE_RADIUS) {
        lastDirIndex = -1;
        setCurrentDirection("center");
        return;
      }

      // Calculate angle from center of avatar to cursor
      const angle = Math.atan2(dy, dx);

      // Hysteresis prevents flickering between adjacent directions
      if (
        lastDirIndex !== -1 &&
        Math.abs(normalizeAngle(angle - lastDirIndex * STEP_ANGLE)) <
        STEP_ANGLE / 2 + ANGLE_HYSTERESIS
      ) {
        return;
      }

      const dirIndex =
        (Math.round(angle / STEP_ANGLE) + ANGULAR_DIRECTIONS.length) %
        ANGULAR_DIRECTIONS.length;
      lastDirIndex = dirIndex;
      setCurrentDirection(ANGULAR_DIRECTIONS[dirIndex]);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointerPos = { x: e.clientX, y: e.clientY };
      updateDirection();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", updateDirection, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", updateDirection);
    };
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach(window.clearTimeout);
    };
  }, []);

  // 2. Interactive Click / Boop Reaction
  const handleClick = () => {
    timersRef.current.forEach(window.clearTimeout);
    timersRef.current = [];

    const schedule = (delay: number, reaction: string | null) => {
      const id = window.setTimeout(() => setCurrentReaction(reaction), delay);
      timersRef.current.push(id);
    };

    const now = Date.now();
    const tracker = clickTracker.current;

    // Track rapid consecutive clicks
    tracker.count = now - tracker.at < CLICK_WINDOW ? tracker.count + 1 : 1;
    tracker.at = now;
    setBoopCount((prev) => prev + 1);

    if (tracker.count >= RAPID_CLICK_LIMIT) {
      // 4+ rapid clicks: Nehal gets dizzy!
      tracker.count = 0;
      setCurrentReaction("dizzy");
      schedule(DIZZY_DURATION, null);
    } else {
      // Normal click: Blink -> Fun Reaction (heart, sparkle, or wink) -> Reset
      setCurrentReaction("blink");
      const chosenReaction =
        CLICK_REACTIONS[(tracker.count - 1) % CLICK_REACTIONS.length];
      schedule(BLINK_DELAY, chosenReaction);
      schedule(RESET_DELAY, null);
    }

    // Play palakonweb 420ms squish keyframe animation
    if (
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      spanRef.current
    ) {
      spanRef.current.animate(SQUISH_KEYFRAMES, {
        duration: SQUISH_DURATION,
        easing: "linear",
      });
    }
  };

  const spriteStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    backgroundSize: "300% 300%",
    backgroundRepeat: "no-repeat",
  };

  const dirIndex = DIRECTION_FRAMES.indexOf(currentDirection);
  const reactIndex = REACTION_FRAMES.indexOf(currentReaction ?? "blink");

  return (
    <div className="relative inline-block select-none">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        suppressHydrationWarning
        aria-label={`Boop ${label}`}
        title="Move your mouse to watch Nehal follow your cursor! Click to Boop!"
        className="relative block rounded-full p-1 bg-white dark:bg-[#0C0C10] shadow-xl overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E11D48] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black transition-transform hover:scale-[1.03] active:scale-[0.97] w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
        style={{
          touchAction: "manipulation",
        }}
      >
        <span
          ref={spanRef}
          className="relative block w-full h-full rounded-full overflow-hidden border-2 border-[#E11D48]"
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            height: "100%",
            transformOrigin: "50% 78%",
          }}
        >
          {/* Layer 1: Directional Face (Nehal looking in 9 directions with cursor) */}
          <span
            style={{
              ...spriteStyle,
              backgroundImage: `url(${directions})`,
              ...getFramePosition(dirIndex >= 0 ? dirIndex : 4),
              opacity: currentReaction ? 0 : 1,
              transition: "opacity 0.08s ease-out",
            }}
          />

          {/* Layer 2: Reaction Expression (Nehal with hearts, sparkles, wink, dizzy on click) */}
          <span
            style={{
              ...spriteStyle,
              backgroundImage: `url(${reactions})`,
              ...getFramePosition(reactIndex >= 0 ? reactIndex : 0),
              opacity: currentReaction ? 1 : 0,
              transition: "opacity 0.08s ease-out",
            }}
          />
        </span>
      </button>

      {/* Interactive Avatar button */}
    </div>
  );
}
