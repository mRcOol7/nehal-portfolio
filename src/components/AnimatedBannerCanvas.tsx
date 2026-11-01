"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBannerCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 240);

    // Resize handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle definition: gentle drifting snow & stardust
    const particleCount = 45;
    const particles: {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      opacity: number;
      swayOffset: number;
      swaySpeed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.7 + 0.3,
        speedX: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.6 + 0.25,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Warm street lamp glow coordinates (normalized in % of banner)
    const lamps = [
      { x: 0.63, y: 0.66, radius: 24, color: "rgba(255, 180, 80," },
      { x: 0.71, y: 0.52, radius: 28, color: "rgba(255, 200, 100," },
      { x: 0.76, y: 0.46, radius: 34, color: "rgba(255, 210, 120," },
    ];

    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw gentle pulsating glow for the streetlamps
      lamps.forEach((lamp) => {
        const lx = width * lamp.x;
        const ly = height * lamp.y;
        const pulse = Math.sin(time * 2 + lamp.x * 10) * 0.15 + 0.85;
        const currentRadius = lamp.radius * pulse;

        const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, currentRadius);
        glow.addColorStop(0, `${lamp.color} ${0.35 * pulse})`);
        glow.addColorStop(0.5, `${lamp.color} ${0.12 * pulse})`);
        glow.addColorStop(1, `${lamp.color} 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(lx, ly, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw drifting snow & stardust
      particles.forEach((p) => {
        p.y += p.speedY;
        p.swayOffset += p.swaySpeed;
        p.x += Math.sin(p.swayOffset) * 0.4 + p.speedX;

        // Wrap around
        if (p.y > height) {
          p.y = -5;
          p.x = Math.random() * width;
        }
        if (p.x > width) p.x = 0;
        if (p.x < 0) p.x = width;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
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
