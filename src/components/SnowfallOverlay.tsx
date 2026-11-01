"use client";

import { useEffect, useRef } from "react";

interface Flake {
  x: number;
  y: number;
  radius: number;
  density: number;
  opacity: number;
  speedY: number;
  drift: number;
  driftSpeed: number;
}

export default function SnowfallOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Resize canvas to match display size
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create 45 natural snowflakes
    const flakeCount = 45;
    const flakes: Flake[] = [];

    const getWidth = () => canvas.getBoundingClientRect().width;
    const getHeight = () => canvas.getBoundingClientRect().height;

    for (let i = 0; i < flakeCount; i++) {
      flakes.push({
        x: Math.random() * (getWidth() || 800),
        y: Math.random() * (getHeight() || 250),
        radius: Math.random() * 2.2 + 0.8, // 0.8px to 3px
        density: Math.random() * 30,
        opacity: Math.random() * 0.5 + 0.35, // 0.35 to 0.85
        speedY: Math.random() * 0.7 + 0.4, // gentle fall speed
        drift: Math.random() * Math.PI * 2,
        driftSpeed: Math.random() * 0.015 + 0.008,
      });
    }

    let angle = 0;

    const render = () => {
      if (!isVisible) return;

      const width = getWidth();
      const height = getHeight();

      ctx.clearRect(0, 0, width, height);

      angle += 0.01;

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        // Gentle sinusoidal swaying drift
        f.drift += f.driftSpeed;
        const driftX = Math.sin(f.drift) * 0.6 + 0.3; // subtle rightward breeze

        f.y += f.speedY;
        f.x += driftX;

        // Reset if offscreen
        if (f.y > height + 5) {
          f.y = -5;
          f.x = Math.random() * width;
        }
        if (f.x > width + 5) {
          f.x = -5;
        } else if (f.x < -5) {
          f.x = width + 5;
        }

        // Draw snowflake with soft radial glow
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = `rgba(255, 255, 255, ${f.opacity})`;
        ctx.shadowColor = "rgba(255, 255, 255, 0.6)";
        ctx.shadowBlur = f.radius > 2 ? 3 : 1;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Pause rendering when header is scrolled out of viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = requestAnimationFrame(render);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      aria-hidden="true"
    />
  );
}
