"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function DevicePlugScrollSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hasWebGL, setHasWebGL] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
    }

    // Check WebGL availability
    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // --- 1. Dynamic Ultra High-DPI Screen Canvas (1600x1000) ---
    const sCanvas = document.createElement("canvas");
    sCanvas.width = 1600;
    sCanvas.height = 1000;
    const sCtx = sCanvas.getContext("2d");

    let screenTexture: THREE.CanvasTexture | null = null;
    let frameCounter = 0;

    // Helper: Rounded rectangles for canvas 2D
    const roundRect = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y + r, x, y, r);
      ctx.closePath();
    };

    // Live 12-Hour AM/PM IST (Indian Standard Time: UTC+5:30)
    const getISTTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      const shortTime = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const dateStr = now.toLocaleDateString("en-US", {
        timeZone: "Asia/Kolkata",
        weekday: "long",
        month: "short",
        day: "numeric",
      });
      return { timeStr: `${timeStr} IST`, shortTime, dateStr };
    };

    // --- Dynamic Companion Android Phone Screen Canvas (480x960) ---
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 480;
    pCanvas.height = 960;
    const pCtx = pCanvas.getContext("2d");
    let phoneTexture: THREE.CanvasTexture | null = null;

    const drawPhoneContent = (isPlugged: boolean, shortTime: string) => {
      if (!pCtx) return;
      const pw = pCanvas.width;
      const ph = pCanvas.height;

      // Deep obsidian wallpaper with subtle emerald neon wave
      pCtx.fillStyle = "#0A0D14";
      pCtx.fillRect(0, 0, pw, ph);

      const pGrad = pCtx.createRadialGradient(pw / 2, ph / 2, 80, pw / 2, ph / 2, 400);
      pGrad.addColorStop(0, isPlugged ? "rgba(16, 185, 129, 0.24)" : "rgba(56, 189, 248, 0.15)");
      pGrad.addColorStop(1, "rgba(10, 13, 20, 0)");
      pCtx.fillStyle = pGrad;
      pCtx.fillRect(0, 0, pw, ph);

      // Top Status Bar
      pCtx.fillStyle = "#FFFFFF";
      pCtx.font = "bold 24px -apple-system, sans-serif";
      pCtx.textAlign = "left";
      pCtx.fillText(shortTime, 32, 54);

      pCtx.textAlign = "right";
      pCtx.fillText(isPlugged ? "⚡ 100% 5G" : "🔋 85% 5G", pw - 32, 54);

      // Punch Hole Camera (top center)
      pCtx.fillStyle = "#000000";
      pCtx.beginPath();
      pCtx.arc(pw / 2, 44, 11, 0, Math.PI * 2);
      pCtx.fill();

      // App Header (Android Native)
      const cardY = 120;
      pCtx.textAlign = "left";
      pCtx.font = "bold 32px -apple-system, sans-serif";
      pCtx.fillStyle = "#FFFFFF";
      pCtx.fillText("🤖 Android Studio", 32, cardY);

      pCtx.font = "bold 20px monospace";
      pCtx.fillStyle = "#10B981";
      pCtx.fillText("app:build_success • 60 FPS", 32, cardY + 36);

      // Native App Preview Card
      pCtx.fillStyle = "rgba(22, 27, 38, 0.95)";
      roundRect(pCtx, 28, cardY + 70, pw - 56, 260, 24);
      pCtx.fill();
      pCtx.strokeStyle = "rgba(16, 185, 129, 0.35)";
      pCtx.lineWidth = 2;
      pCtx.stroke();

      pCtx.font = "bold 28px -apple-system, sans-serif";
      pCtx.fillStyle = "#FFFFFF";
      pCtx.fillText("Native Android Core", 52, cardY + 125);

      pCtx.font = "20px -apple-system, sans-serif";
      pCtx.fillStyle = "#94A3B8";
      pCtx.fillText("Java • Android SDK • MVVM", 52, cardY + 165);
      pCtx.fillText("Hardware Accelerated UI", 52, cardY + 198);

      // Status Pill inside phone
      pCtx.fillStyle = isPlugged ? "rgba(16, 185, 129, 0.2)" : "rgba(56, 189, 248, 0.2)";
      roundRect(pCtx, 52, cardY + 235, 240, 44, 22);
      pCtx.fill();
      pCtx.font = "bold 18px monospace";
      pCtx.fillStyle = isPlugged ? "#10B981" : "#38BDF8";
      pCtx.fillText(isPlugged ? "● LIVE SYNC ACTIVE" : "● READY TO RUN", 70, cardY + 263);

      // App Icons Grid (bottom)
      const iconY = cardY + 370;
      const icons = [
        { label: "Android", icon: "🤖", color: "#10B981" },
        { label: "Next.js", icon: "🌐", color: "#6366F1" },
        { label: "Lens AR", icon: "🚀", color: "#F43F5E" },
      ];
      icons.forEach((item, i) => {
        const ix = 52 + i * 135;
        pCtx.fillStyle = "rgba(28, 34, 48, 0.9)";
        roundRect(pCtx, ix, iconY, 100, 100, 24);
        pCtx.fill();
        pCtx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        pCtx.lineWidth = 1.5;
        pCtx.stroke();

        pCtx.font = "44px sans-serif";
        pCtx.textAlign = "center";
        pCtx.fillText(item.icon, ix + 50, iconY + 62);

        pCtx.font = "bold 16px -apple-system, sans-serif";
        pCtx.fillStyle = "#CBD5E1";
        pCtx.fillText(item.label, ix + 50, iconY + 124);
      });

      // Bottom Android gesture pill
      pCtx.fillStyle = "rgba(255, 255, 255, 0.6)";
      roundRect(pCtx, pw / 2 - 60, ph - 32, 120, 6, 3);
      pCtx.fill();

      if (phoneTexture) {
        phoneTexture.needsUpdate = true;
      }
    };

    // --- Dynamic Window Blinds Ambient Shadow Canvas (512x512) ---
    const wCanvas = document.createElement("canvas");
    wCanvas.width = 512;
    wCanvas.height = 512;
    const wCtx = wCanvas.getContext("2d");
    let windowShadowTexture: THREE.CanvasTexture | null = null;

    if (wCtx) {
      wCtx.clearRect(0, 0, 512, 512);
      // Soft architectural window blind shadow slats (translucent on dark leather)
      wCtx.fillStyle = "rgba(0, 0, 0, 0.38)";
      for (let i = -1; i < 9; i++) {
        wCtx.beginPath();
        wCtx.moveTo(-30, i * 72);
        wCtx.lineTo(540, i * 72 + 60);
        wCtx.lineTo(540, i * 72 + 95);
        wCtx.lineTo(-30, i * 72 + 35);
        wCtx.closePath();
        wCtx.fill();
      }
    }

    // Render screen texture — dynamically responsive to mobile vs desktop
    const drawScreenContent = (screenProg: number, isConnected: boolean, isMobileView: boolean) => {
      if (!sCtx) return;
      frameCounter++;

      const { timeStr, shortTime, dateStr } = getISTTime();
      drawPhoneContent(isConnected, shortTime);

      const w = sCanvas.width;
      const h = sCanvas.height;

      // Base desktop wallpaper (deep elegant midnight indigo gradient)
      const bgGrad = sCtx.createRadialGradient(w / 2, h / 2, 100, w / 2, h / 2, w * 0.7);
      bgGrad.addColorStop(0, "#1F2335");
      bgGrad.addColorStop(0.5, "#131522");
      bgGrad.addColorStop(1, "#0A0B12");
      sCtx.fillStyle = bgGrad;
      sCtx.fillRect(0, 0, w, h);

      if (!isConnected && screenProg < 0.42) {
        // ==========================================
        // --- REAL LAPTOP LOCK / SLEEP SCREEN ---
        // ==========================================
        sCtx.fillStyle = "rgba(0, 0, 0, 0.45)";
        sCtx.fillRect(0, 0, w, h);

        // Top Status Bar (Lock screen)
        sCtx.font = isMobileView
          ? "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          : "bold 26px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        sCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
        sCtx.textAlign = "left";
        sCtx.fillText("Wi-Fi Connected", 50, isMobileView ? 62 : 52);

        sCtx.textAlign = "right";
        sCtx.fillText("🔋 15% Battery (Low Power)", w - 50, isMobileView ? 62 : 52);

        // Large clean clock displaying LIVE 12-HR IST TIME
        sCtx.textAlign = "center";
        sCtx.font = isMobileView
          ? "bold 180px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
          : "bold 150px -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif";
        sCtx.fillStyle = "#FFFFFF";
        sCtx.shadowColor = "rgba(0, 0, 0, 0.65)";
        sCtx.shadowBlur = 28;
        sCtx.fillText(shortTime, w / 2, h / 2 - (isMobileView ? 90 : 100));
        sCtx.shadowBlur = 0;

        // Date & IST Label
        sCtx.font = isMobileView
          ? "bold 44px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          : "bold 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        sCtx.fillStyle = "rgba(255, 255, 255, 0.92)";
        sCtx.fillText(`${dateStr} • India (IST)`, w / 2, h / 2 - (isMobileView ? 15 : 30));

        // User Profile Avatar Circle
        const avatarY = h / 2 + (isMobileView ? 85 : 75);
        const avatarR = isMobileView ? 65 : 56;
        sCtx.fillStyle = "#2D3145";
        sCtx.beginPath();
        sCtx.arc(w / 2, avatarY, avatarR, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        sCtx.lineWidth = 4;
        sCtx.stroke();

        sCtx.font = isMobileView ? "bold 56px sans-serif" : "bold 48px sans-serif";
        sCtx.fillStyle = "#FFFFFF";
        sCtx.fillText("N", w / 2, avatarY + (isMobileView ? 20 : 17));

        // User Name
        sCtx.font = isMobileView
          ? "bold 42px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          : "bold 36px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        sCtx.fillStyle = "#FFFFFF";
        sCtx.fillText("Nehal Chauhan", w / 2, avatarY + (isMobileView ? 120 : 115));

        // Friendly Plug-In Callout (pulsing gently)
        const pulse = Math.sin(frameCounter * 0.08) * 0.5 + 0.5;
        const pillW = isMobileView ? 680 : 520;
        const pillH = isMobileView ? 76 : 62;
        const pillX = w / 2 - pillW / 2;
        const pillY = avatarY + (isMobileView ? 155 : 155);

        sCtx.fillStyle = `rgba(244, 63, 94, ${0.18 + pulse * 0.22})`;
        roundRect(sCtx, pillX, pillY, pillW, pillH, pillH / 2);
        sCtx.fill();
        sCtx.strokeStyle = `rgba(244, 63, 94, ${0.5 + pulse * 0.35})`;
        sCtx.lineWidth = 3;
        sCtx.stroke();

        sCtx.font = isMobileView
          ? "bold 32px -apple-system, BlinkMacSystemFont, sans-serif"
          : "bold 26px -apple-system, BlinkMacSystemFont, sans-serif";
        sCtx.fillStyle = "#FFFFFF";
        sCtx.fillText(
          "⚡ Plug in charger to wake up display",
          w / 2,
          pillY + (isMobileView ? 49 : 41)
        );
      } else {
        // ==========================================
        // --- REAL ACTIVE MACOS DESKTOP DISPLAY ---
        // ==========================================
        const bootFade = Math.min(1.0, (screenProg - 0.42) / 0.22);

        // Top macOS Menu Bar
        const menuH = isMobileView ? 64 : 52;
        sCtx.fillStyle = "rgba(18, 20, 30, 0.96)";
        sCtx.fillRect(0, 0, w, menuH);

        // Apple Logo / Brand Icon
        sCtx.font = isMobileView ? "bold 28px sans-serif" : "bold 24px sans-serif";
        sCtx.fillStyle = "#FFFFFF";
        sCtx.textAlign = "left";
        sCtx.fillText("", 28, isMobileView ? 44 : 36);

        // Menu items
        if (!isMobileView) {
          sCtx.font = "bold 22px -apple-system, BlinkMacSystemFont, sans-serif";
          sCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
          sCtx.fillText("Nehal's Workstation", 68, 36);
          sCtx.fillStyle = "rgba(255, 255, 255, 0.7)";
          sCtx.fillText("About", 310, 36);
          sCtx.fillText("Projects", 410, 36);
          sCtx.fillText("Experience", 530, 36);
          sCtx.fillText("Contact", 680, 36);
        } else {
          sCtx.font = "bold 26px -apple-system, BlinkMacSystemFont, sans-serif";
          sCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
          sCtx.fillText("Nehal's Workstation", 68, 43);
        }

        // Top Right Menu Bar: Live 12-Hr IST Time & Battery
        sCtx.textAlign = "right";
        sCtx.font = isMobileView ? "bold 26px sans-serif" : "bold 22px sans-serif";
        sCtx.fillStyle = "#22C55E";
        sCtx.fillText("⚡ 100%", isMobileView ? w - 300 : w - 310, isMobileView ? 43 : 36);
        sCtx.fillStyle = "#FFFFFF";
        sCtx.fillText(timeStr, w - 32, isMobileView ? 43 : 36);

        // ------------------------------------------
        // Floating Portfolio Window (User-Friendly App)
        // ------------------------------------------
        const winX = isMobileView ? 36 : 60;
        const winY = isMobileView ? 82 : 80;
        const winW = w - winX * 2;
        const winH = isMobileView ? h - 110 : h - 200;

        // Window shadow & frosted body
        sCtx.save();
        sCtx.shadowColor = "rgba(0, 0, 0, 0.75)";
        sCtx.shadowBlur = 45;
        sCtx.shadowOffsetY = 18;
        sCtx.fillStyle = "#151826";
        roundRect(sCtx, winX, winY, winW, winH, 22);
        sCtx.fill();
        sCtx.restore();

        sCtx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        sCtx.lineWidth = 2.5;
        sCtx.stroke();

        // Window Header Bar
        const winHeaderH = isMobileView ? 72 : 64;
        sCtx.fillStyle = "#1E2234";
        roundRect(sCtx, winX, winY, winW, winHeaderH, 22);
        sCtx.fill();
        sCtx.fillRect(winX, winY + 32, winW, winHeaderH - 32);

        // Window traffic light buttons
        const dotR = isMobileView ? 12 : 11;
        const dotY = winY + winHeaderH / 2;
        sCtx.fillStyle = "#EF4444";
        sCtx.beginPath();
        sCtx.arc(winX + 36, dotY, dotR, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.fillStyle = "#F59E0B";
        sCtx.beginPath();
        sCtx.arc(winX + 72, dotY, dotR, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.fillStyle = "#10B981";
        sCtx.beginPath();
        sCtx.arc(winX + 108, dotY, dotR, 0, Math.PI * 2);
        sCtx.fill();

        // Window Title
        sCtx.textAlign = "center";
        sCtx.font = isMobileView
          ? "bold 26px -apple-system, BlinkMacSystemFont, sans-serif"
          : "bold 24px -apple-system, BlinkMacSystemFont, sans-serif";
        sCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
        sCtx.fillText("Nehal Chauhan — Developer Workstation", winX + winW / 2, dotY + 8);

        // ------------------------------------------
        // Window Content: Big, Bold, Crystal-Clear Cards
        // ------------------------------------------
        const contentX = winX + (isMobileView ? 40 : 50);
        const contentY = winY + winHeaderH + (isMobileView ? 24 : 32);

        // Friendly Greeting & Headline
        sCtx.textAlign = "left";
        sCtx.font = isMobileView
          ? "bold 64px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          : "bold 52px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
        sCtx.fillStyle = "#FFFFFF";
        sCtx.fillText("👋 Hi, I'm Nehal Chauhan", contentX, contentY + (isMobileView ? 44 : 35));

        sCtx.font = isMobileView
          ? "bold 32px -apple-system, BlinkMacSystemFont, sans-serif"
          : "bold 26px -apple-system, BlinkMacSystemFont, sans-serif";
        sCtx.fillStyle = "#94A3B8";
        sCtx.fillText(
          "Software Engineer • Native Android (Java) & Full-Stack Web",
          contentX,
          contentY + (isMobileView ? 96 : 80)
        );

        // 3 Large Horizontal Spotlight Rows (Huge Text for Crystal Clarity)
        const rowW = winW - (isMobileView ? 80 : 100);
        const rowH = isMobileView ? 116 : 92;
        const rowYStart = contentY + (isMobileView ? 134 : 120);
        const rowGap = isMobileView ? 24 : 20;

        const highlights = [
          {
            icon: "📱",
            title: "Native Android Developer",
            badge: "Java • Android SDK • MVVM Architecture • 60 FPS UI",
            badgeColor: "#38BDF8",
            border: "rgba(56, 189, 248, 0.4)",
            bg: "rgba(22, 30, 48, 0.9)",
          },
          {
            icon: "🌐",
            title: "Full-Stack Web Architect",
            badge: "React 19 • Next.js • TypeScript • Redis (< 0.8ms Latency)",
            badgeColor: "#C084FC",
            border: "rgba(192, 132, 252, 0.4)",
            bg: "rgba(28, 25, 48, 0.9)",
          },
          {
            icon: "🚀",
            title: "Viral Snapchat AR Creator",
            badge: "915.22M+ Global Impressions • Production Scale",
            badgeColor: "#FB7185",
            border: "rgba(251, 113, 133, 0.4)",
            bg: "rgba(38, 20, 36, 0.9)",
          },
        ];

        highlights.forEach((hItem, idx) => {
          const ry = rowYStart + idx * (rowH + rowGap);

          // Card Background
          sCtx.fillStyle = hItem.bg;
          roundRect(sCtx, contentX, ry, rowW, rowH, 18);
          sCtx.fill();
          sCtx.strokeStyle = hItem.border;
          sCtx.lineWidth = 2.5;
          sCtx.stroke();

          // Icon
          sCtx.font = isMobileView ? "54px sans-serif" : "42px sans-serif";
          sCtx.fillText(hItem.icon, contentX + 24, ry + (isMobileView ? 74 : 60));

          // Title
          sCtx.font = isMobileView
            ? "bold 38px -apple-system, BlinkMacSystemFont, sans-serif"
            : "bold 32px -apple-system, BlinkMacSystemFont, sans-serif";
          sCtx.fillStyle = "#FFFFFF";
          sCtx.fillText(hItem.title, contentX + (isMobileView ? 104 : 88), ry + (isMobileView ? 50 : 42));

          // Badge / Details
          sCtx.font = isMobileView
            ? "bold 28px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
            : "bold 23px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
          sCtx.fillStyle = hItem.badgeColor;
          sCtx.fillText(hItem.badge, contentX + (isMobileView ? 104 : 88), ry + (isMobileView ? 92 : 74));
        });

        // Bottom Availability Status Pill (Dynamic width to guarantee zero text truncation)
        const statusPillY = rowYStart + 3 * (rowH + rowGap) + (isMobileView ? 16 : 12);
        const statusPillH = isMobileView ? 58 : 48;

        sCtx.font = isMobileView
          ? "bold 26px -apple-system, BlinkMacSystemFont, sans-serif"
          : "bold 22px -apple-system, BlinkMacSystemFont, sans-serif";
        const statusText = "Available for Roles & Contracts (India / Remote)";
        const statusTextW = sCtx.measureText(statusText).width;
        const statusPillW = Math.min(rowW, statusTextW + (isMobileView ? 80 : 68));

        sCtx.fillStyle = "rgba(34, 197, 94, 0.16)";
        roundRect(sCtx, contentX, statusPillY, statusPillW, statusPillH, statusPillH / 2);
        sCtx.fill();
        sCtx.strokeStyle = "rgba(34, 197, 94, 0.55)";
        sCtx.lineWidth = 2.5;
        sCtx.stroke();

        // Single clean glowing indicator dot
        sCtx.fillStyle = "#22C55E";
        sCtx.beginPath();
        sCtx.arc(contentX + (isMobileView ? 28 : 24), statusPillY + statusPillH / 2, isMobileView ? 8 : 6.5, 0, Math.PI * 2);
        sCtx.fill();

        sCtx.fillStyle = "#FFFFFF";
        sCtx.fillText(
          statusText,
          contentX + (isMobileView ? 48 : 42),
          statusPillY + (isMobileView ? 39 : 32)
        );

        // Fast-charge popup banner when plugged in
        if (bootFade < 0.85) {
          const notifW = isMobileView ? 520 : 440;
          const notifH = isMobileView ? 54 : 48;
          const notifX = w - notifW - 32;
          const notifY = isMobileView ? 72 : 62;

          sCtx.save();
          sCtx.shadowColor = "rgba(0, 0, 0, 0.7)";
          sCtx.shadowBlur = 25;
          sCtx.fillStyle = "rgba(18, 22, 34, 0.98)";
          roundRect(sCtx, notifX, notifY, notifW, notifH, 24);
          sCtx.fill();
          sCtx.restore();

          sCtx.strokeStyle = "rgba(34, 197, 94, 0.65)";
          sCtx.lineWidth = 2;
          sCtx.stroke();

          sCtx.font = isMobileView ? "bold 23px -apple-system, sans-serif" : "bold 20px -apple-system, sans-serif";
          sCtx.fillStyle = "#22C55E";
          sCtx.textAlign = "center";
          sCtx.fillText("⚡ 100W Fast Charger Connected • Display Active", notifX + notifW / 2, notifY + (isMobileView ? 35 : 31));
        }
      }

      if (screenTexture) {
        screenTexture.needsUpdate = true;
      }
    };

    // Initial render of textures
    const initialIsMobile = (canvas.clientWidth || window.innerWidth) < 640;
    drawScreenContent(0, false, initialIsMobile);

    screenTexture = new THREE.CanvasTexture(sCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.generateMipmaps = false;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    phoneTexture = new THREE.CanvasTexture(pCanvas);
    phoneTexture.colorSpace = THREE.SRGBColorSpace;
    phoneTexture.generateMipmaps = false;
    phoneTexture.minFilter = THREE.LinearFilter;
    phoneTexture.magFilter = THREE.LinearFilter;

    windowShadowTexture = new THREE.CanvasTexture(wCanvas);
    windowShadowTexture.wrapS = THREE.RepeatWrapping;
    windowShadowTexture.wrapT = THREE.RepeatWrapping;
    windowShadowTexture.repeat.set(2, 2);

    // --- 2. Three.js Scene, Camera, & Renderer ---
    const scene = new THREE.Scene();
    scene.background = null;

    const initialWidth = canvas.clientWidth || canvas.parentElement?.clientWidth || 800;
    const initialHeight = canvas.clientHeight || canvas.parentElement?.clientHeight || 580;

    const camera = new THREE.PerspectiveCamera(40, initialWidth / initialHeight, 0.1, 100);
    camera.position.set(0, 1.8, 4.4);
    camera.lookAt(0, 0.4, -0.2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(initialWidth, initialHeight, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.0));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    if (screenTexture && maxAnisotropy > 1) {
      screenTexture.anisotropy = maxAnisotropy;
      phoneTexture.anisotropy = maxAnisotropy;
    }

    // --- 3. Scene Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf1f5f9, 3.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const sideLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    sideLight.position.set(-6, 3, 2);
    scene.add(sideLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    rimLight.position.set(0, 6, -4);
    scene.add(rimLight);

    const screenGlowLight = new THREE.PointLight(0x38bdf8, 0.4, 8);
    screenGlowLight.position.set(0, 0.8, -1.8);
    scene.add(screenGlowLight);

    // --- 4. Materials ---
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x363a45,
      metalness: 0.85,
      roughness: 0.25,
    });

    const screenBezelMat = new THREE.MeshStandardMaterial({
      color: 0x14151a,
      metalness: 0.9,
      roughness: 0.2,
    });

    const screenDisplayMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
      side: THREE.DoubleSide,
    });

    const keyboardWellMat = new THREE.MeshStandardMaterial({
      color: 0x23262e,
      metalness: 0.6,
      roughness: 0.4,
    });

    const keycapMat = new THREE.MeshStandardMaterial({
      color: 0x1c1e24,
      metalness: 0.5,
      roughness: 0.35,
    });

    const cableConnectorMat = new THREE.MeshStandardMaterial({
      color: 0x52525b,
      metalness: 0.9,
      roughness: 0.2,
    });

    const cablePinMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      metalness: 0.98,
      roughness: 0.1,
    });

    const cableCordMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.6,
      metalness: 0.2,
    });

    // Scale settings responsive to viewport
    let isMobile = initialWidth < 640 || (initialWidth / initialHeight) < 0.85;
    let baseScale = isMobile ? 0.58 : 0.76;

    let laptopX = isMobile ? 0.0 : -0.22;
    let laptopY = isMobile ? -0.15 : -0.2;

    let targetPortX = laptopX - 1.605 * baseScale;
    let targetPortY = laptopY + 0.07 * baseScale;
    let targetPortZ = 0.4 * baseScale;

    let restPlugX = laptopX - (1.605 + (isMobile ? 0.42 : 0.58)) * baseScale;
    let restPlugY = laptopY + 0.04 * baseScale;
    let restPlugZ = (isMobile ? 0.75 : 0.85) * baseScale;
    const restPlugRotY = 0.32;

    // --- 5. Studio Desk Diorama Construction ---

    // A. Desk Mat Surface (Luxury dark graphite leather mat with stitched perimeter)
    const deskMatGeo = new THREE.BoxGeometry(8.8, 0.03, 5.4);
    const deskMatMat = new THREE.MeshStandardMaterial({
      color: 0x161822,
      roughness: 0.82,
      metalness: 0.12,
    });
    const deskMatMesh = new THREE.Mesh(deskMatGeo, deskMatMat);
    deskMatMesh.position.set(0.1, laptopY - 0.015, 0.1);
    scene.add(deskMatMesh);

    // Desk Mat Edge Bevel Border
    const deskBorderGeo = new THREE.BoxGeometry(8.84, 0.02, 5.44);
    const deskBorderMat = new THREE.MeshStandardMaterial({
      color: 0x272b3c,
      roughness: 0.45,
      metalness: 0.25,
    });
    const deskBorderMesh = new THREE.Mesh(deskBorderGeo, deskBorderMat);
    deskBorderMesh.position.set(0.1, laptopY - 0.02, 0.1);
    scene.add(deskBorderMesh);

    // B. Swaying Window Blinds Atmospheric Light & Shadow Plane (Aarya.wtf inspired)
    const windowShadowGeo = new THREE.PlaneGeometry(8.6, 5.2);
    windowShadowGeo.rotateX(-Math.PI / 2);
    const windowShadowMat = new THREE.MeshBasicMaterial({
      map: windowShadowTexture,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
    });
    const windowShadowMesh = new THREE.Mesh(windowShadowGeo, windowShadowMat);
    windowShadowMesh.position.set(0.1, laptopY + 0.005, 0.1);
    scene.add(windowShadowMesh);

    // C. Workstation Laptop Geometry Construction
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(laptopX, laptopY, 0);
    laptopGroup.scale.set(baseScale, baseScale, baseScale);

    // Base Chassis
    const baseGeo = new THREE.BoxGeometry(3.2, 0.12, 2.2);
    const baseMesh = new THREE.Mesh(baseGeo, chassisMat);
    baseMesh.position.set(0, 0.06, 0);
    laptopGroup.add(baseMesh);

    // Keyboard well indent
    const kbWellGeo = new THREE.BoxGeometry(2.8, 0.02, 1.1);
    const kbWellMesh = new THREE.Mesh(kbWellGeo, keyboardWellMat);
    kbWellMesh.position.set(0, 0.125, -0.28);
    laptopGroup.add(kbWellMesh);

    // Keycaps
    const keyRows = 4;
    const keyCols = 12;
    const keyW = 0.2;
    const keyH = 0.02;
    const keyD = 0.2;
    const gap = 0.03;
    const keyGeo = new THREE.BoxGeometry(keyW, keyH, keyD);

    const keysGroup = new THREE.Group();
    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keyCols; c++) {
        const key = new THREE.Mesh(keyGeo, keycapMat);
        const x = (c - (keyCols - 1) / 2) * (keyW + gap);
        const z = -0.28 + (r - (keyRows - 1) / 2) * (keyD + gap);
        key.position.set(x, 0.14, z);
        keysGroup.add(key);
      }
    }
    laptopGroup.add(keysGroup);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(1.0, 0.01, 0.65);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0x262932,
      metalness: 0.7,
      roughness: 0.3,
    });
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpadMesh.position.set(0, 0.125, 0.65);
    laptopGroup.add(trackpadMesh);

    // Screen Lid Group (hinged at z = -1.1)
    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, 0.12, -1.1);

    const lidGeo = new THREE.BoxGeometry(3.2, 2.05, 0.08);
    const lidMesh = new THREE.Mesh(lidGeo, screenBezelMat);
    lidMesh.position.set(0, 1.025, 0);
    screenLidGroup.add(lidMesh);

    const displayGeo = new THREE.PlaneGeometry(3.0, 1.88);
    const displayMesh = new THREE.Mesh(displayGeo, screenDisplayMat);
    displayMesh.position.set(0, 1.025, 0.045);
    screenLidGroup.add(displayMesh);

    screenLidGroup.rotation.x = -0.22;
    laptopGroup.add(screenLidGroup);

    // USB-C Port Cut on left side of laptop base
    const portGeo = new THREE.BoxGeometry(0.04, 0.04, 0.12);
    const portMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const portMesh = new THREE.Mesh(portGeo, portMat);
    portMesh.position.set(-1.605, 0.07, 0.4);
    laptopGroup.add(portMesh);

    const portLedGeo = new THREE.SphereGeometry(0.03, 12, 12);
    const portLedMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const portLedMesh = new THREE.Mesh(portLedGeo, portLedMat);
    portLedMesh.position.set(-1.605, 0.07, 0.52);
    laptopGroup.add(portLedMesh);

    scene.add(laptopGroup);

    // D. Companion Android Phone (Native Android showcase device)
    const phoneGroup = new THREE.Group();
    phoneGroup.scale.set(baseScale, baseScale, baseScale);
    phoneGroup.position.set(
      laptopX + (1.605 + 0.62) * baseScale,
      laptopY + 0.015,
      0.45 * baseScale
    );
    phoneGroup.rotation.y = -0.16;

    const phoneBodyGeo = new THREE.BoxGeometry(0.72, 0.035, 1.48);
    const phoneBodyMat = new THREE.MeshStandardMaterial({
      color: 0x1f222b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const phoneBodyMesh = new THREE.Mesh(phoneBodyGeo, phoneBodyMat);
    phoneBodyMesh.position.set(0, 0.018, 0);
    phoneGroup.add(phoneBodyMesh);

    // Camera bump on phone back/top
    const phoneCameraVisorGeo = new THREE.BoxGeometry(0.70, 0.015, 0.22);
    const phoneCameraVisorMesh = new THREE.Mesh(phoneCameraVisorGeo, chassisMat);
    phoneCameraVisorMesh.position.set(0, 0.036, -0.56);
    phoneGroup.add(phoneCameraVisorMesh);

    // Phone OLED display plane
    const phoneDisplayGeo = new THREE.PlaneGeometry(0.68, 1.42);
    phoneDisplayGeo.rotateX(-Math.PI / 2);
    const phoneDisplayMat = new THREE.MeshBasicMaterial({
      map: phoneTexture,
      side: THREE.DoubleSide,
    });
    const phoneDisplayMesh = new THREE.Mesh(phoneDisplayGeo, phoneDisplayMat);
    phoneDisplayMesh.position.set(0, 0.037, 0);
    phoneGroup.add(phoneDisplayMesh);

    scene.add(phoneGroup);

    // E. Ceramic Coffee Mug
    const mugGroup = new THREE.Group();
    mugGroup.scale.set(baseScale, baseScale, baseScale);
    mugGroup.position.set(
      laptopX + (1.605 + 0.85) * baseScale,
      laptopY,
      -0.65 * baseScale
    );

    const mugMat = new THREE.MeshStandardMaterial({
      color: 0x242834,
      roughness: 0.45,
      metalness: 0.08,
    });

    const mugBodyGeo = new THREE.CylinderGeometry(0.24, 0.20, 0.48, 22);
    const mugBodyMesh = new THREE.Mesh(mugBodyGeo, mugMat);
    mugBodyMesh.position.set(0, 0.24, 0);
    mugGroup.add(mugBodyMesh);

    // Coffee Liquid
    const coffeeGeo = new THREE.CylinderGeometry(0.21, 0.21, 0.02, 22);
    const coffeeMat = new THREE.MeshStandardMaterial({
      color: 0x1b110a,
      roughness: 0.12,
      metalness: 0.2,
    });
    const coffeeMesh = new THREE.Mesh(coffeeGeo, coffeeMat);
    coffeeMesh.position.set(0, 0.44, 0);
    mugGroup.add(coffeeMesh);

    // Mug Handle
    const mugHandleGeo = new THREE.TorusGeometry(0.12, 0.035, 10, 16, Math.PI * 1.25);
    mugHandleGeo.rotateZ(Math.PI / 2);
    const mugHandleMesh = new THREE.Mesh(mugHandleGeo, mugMat);
    mugHandleMesh.position.set(0.25, 0.24, 0);
    mugGroup.add(mugHandleMesh);

    scene.add(mugGroup);

    // --- 6. Cable & Connector Plug Setup ---
    const plugGroup = new THREE.Group();
    plugGroup.position.set(restPlugX, restPlugY, restPlugZ);
    plugGroup.rotation.y = restPlugRotY;
    plugGroup.scale.set(baseScale, baseScale, baseScale);

    const tipGeo = new THREE.BoxGeometry(0.18, 0.035, 0.1);
    const tipMesh = new THREE.Mesh(tipGeo, cablePinMat);
    tipMesh.position.set(0.09, 0, 0);
    plugGroup.add(tipMesh);

    const connectorBodyGeo = new THREE.BoxGeometry(0.38, 0.07, 0.14);
    const connectorBodyMesh = new THREE.Mesh(connectorBodyGeo, cableConnectorMat);
    connectorBodyMesh.position.set(-0.19, 0, 0);
    plugGroup.add(connectorBodyMesh);

    const plugLedGeo = new THREE.TorusGeometry(0.045, 0.012, 8, 20);
    plugLedGeo.rotateY(Math.PI / 2);
    const plugLedMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const plugLedMesh = new THREE.Mesh(plugLedGeo, plugLedMat);
    plugLedMesh.position.set(-0.19, 0, 0);
    plugGroup.add(plugLedMesh);

    const bootGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.14, 16);
    bootGeo.rotateZ(Math.PI / 2);
    const bootMesh = new THREE.Mesh(bootGeo, cableCordMat);
    bootMesh.position.set(-0.43, 0, 0);
    plugGroup.add(bootMesh);

    scene.add(plugGroup);

    // Dynamic Cable Spline Tube
    let cableMesh: THREE.Mesh | null = null;

    const updateCableSpline = (currentPlugPos: THREE.Vector3) => {
      if (cableMesh) {
        scene.remove(cableMesh);
        cableMesh.geometry.dispose();
      }

      const p0X = isMobile ? -1.9 * (baseScale / 0.58) : -3.0 * (baseScale / 0.76);
      const p1X = isMobile ? -1.5 * (baseScale / 0.58) : -2.2 * (baseScale / 0.76);

      const p0 = new THREE.Vector3(p0X, laptopY, 1.4 * (baseScale / 0.76));
      const p1 = new THREE.Vector3(p1X, laptopY + 0.02, 1.0 * (baseScale / 0.76));
      const p2 = new THREE.Vector3(
        currentPlugPos.x - 0.35 * (baseScale / 0.76),
        Math.max(laptopY, currentPlugPos.y * 0.7),
        currentPlugPos.z + 0.1 * (baseScale / 0.76)
      );
      const p3 = new THREE.Vector3(
        currentPlugPos.x - 0.3 * (baseScale / 0.76),
        currentPlugPos.y,
        currentPlugPos.z
      );

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3]);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.032 * (baseScale / 0.76), 12, false);
      cableMesh = new THREE.Mesh(tubeGeo, cableCordMat);
      scene.add(cableMesh);
    };

    updateCableSpline(plugGroup.position);

    // --- 7. Scroll Animation Loop ---
    let targetProgress = 0;
    let smoothProgress = 0;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = rect.height - windowH;
      if (totalDist <= 0) return;

      const scrolled = -rect.top;
      const rawProg = Math.max(0, Math.min(1, scrolled / totalDist));
      targetProgress = rawProg;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      smoothProgress += (targetProgress - smoothProgress) * 0.12;

      // Atmospheric swaying window light motion (Aarya.wtf style)
      windowShadowMesh.position.x = 0.1 + Math.sin(frameCounter * 0.008) * 0.15;
      windowShadowMesh.position.z = 0.1 + Math.cos(frameCounter * 0.006) * 0.10;

      const plugProgress = Math.min(1.0, smoothProgress / 0.42);
      const isNowPlugged = smoothProgress >= 0.42;

      const curX = THREE.MathUtils.lerp(restPlugX, targetPortX - 0.06 * (baseScale / 0.76), plugProgress);
      const curY = THREE.MathUtils.lerp(restPlugY, targetPortY, plugProgress);
      const curZ = THREE.MathUtils.lerp(restPlugZ, targetPortZ, plugProgress);
      const curRotY = THREE.MathUtils.lerp(restPlugRotY, 0, plugProgress);

      plugGroup.position.set(curX, curY, curZ);
      plugGroup.rotation.y = curRotY;

      updateCableSpline(new THREE.Vector3(curX, curY, curZ));

      // DYNAMIC RESPONSIVE FRUSTUM-ACCURATE ZOOM
      const fullWorldW = baseScale * (isMobile ? 3.8 : 5.4);
      const horizViewFactor = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;

      // Standby camera distance
      const standbyZ = Math.max(isMobile ? 4.4 : 4.2, (fullWorldW * (isMobile ? 1.05 : 1.10)) / horizViewFactor);

      // Exact world coordinates of screen display center
      const screenCenterWorldY = laptopY + 1.12 * baseScale;
      const screenCenterWorldZ = -1.324 * baseScale;

      // Full laptop lid width including bezels is 3.2 * baseScale
      const laptopLidW = 3.2 * baseScale;
      const targetZoomDist = (laptopLidW * (isMobile ? 1.16 : 1.18)) / horizViewFactor;
      const zoomedY = screenCenterWorldY + targetZoomDist * (isMobile ? 0.16 : 0.10);
      const zoomedZ = screenCenterWorldZ + targetZoomDist * (isMobile ? 0.98 : 0.99);

      let camX = 0;
      let camY = 1.8;
      let camZ = standbyZ;
      let targetLookY = 0.45;
      let targetLookZ = -0.2;

      if (smoothProgress < 0.42) {
        // Pre-plug phase: Standby framing of the full desk diorama
        const subProg = smoothProgress / 0.42;
        camX = THREE.MathUtils.lerp(isMobile ? 0.0 : 0.1, laptopX, subProg);
        camY = THREE.MathUtils.lerp(isMobile ? 1.6 : 1.9, isMobile ? 1.5 : 1.7, subProg);
        camZ = THREE.MathUtils.lerp(standbyZ, standbyZ * 0.96, subProg);
        targetLookY = isMobile ? 0.35 : 0.45;
        targetLookZ = -0.2;
      } else {
        // Post-plug phase: Smooth cinematic zoom directly facing the illuminated screen
        const zoomProg = Math.min(1.0, (smoothProgress - 0.42) / 0.25);
        camX = THREE.MathUtils.lerp(laptopX, laptopX, zoomProg);
        camY = THREE.MathUtils.lerp(isMobile ? 1.5 : 1.7, zoomedY, zoomProg);
        camZ = THREE.MathUtils.lerp(standbyZ * 0.96, zoomedZ, zoomProg);
        targetLookY = THREE.MathUtils.lerp(isMobile ? 0.35 : 0.45, screenCenterWorldY, zoomProg);
        targetLookZ = THREE.MathUtils.lerp(-0.2, screenCenterWorldZ, zoomProg);
      }

      camera.position.set(camX, camY, camZ);
      camera.lookAt(laptopX, targetLookY, targetLookZ);

      // Emissive & LED reactions
      if (isNowPlugged) {
        const power = Math.min(1.0, (smoothProgress - 0.42) / 0.2);
        screenGlowLight.intensity = power * 2.2;
        portLedMat.color.setHex(0x22c55e);
        plugLedMat.color.setHex(0x22c55e);
      } else {
        screenGlowLight.intensity = 0.3;
        portLedMat.color.setHex(0xef4444);
        plugLedMat.color.setHex(0xf59e0b);
      }

      drawScreenContent(smoothProgress, isNowPlugged, isMobile);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas || !renderer) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width || canvas.parentElement?.clientWidth || 800;
      const height = rect.height || canvas.parentElement?.clientHeight || 580;
      if (width > 0 && height > 0) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);

        isMobile = width < 640 || (width / height) < 0.85;
        baseScale = isMobile ? 0.58 : 0.76;
        laptopX = isMobile ? 0.0 : -0.22;
        laptopY = isMobile ? -0.15 : -0.2;

        laptopGroup.position.set(laptopX, laptopY, 0);
        laptopGroup.scale.set(baseScale, baseScale, baseScale);
        plugGroup.scale.set(baseScale, baseScale, baseScale);

        phoneGroup.scale.set(baseScale, baseScale, baseScale);
        phoneGroup.position.set(
          laptopX + (1.605 + 0.62) * baseScale,
          laptopY + 0.015,
          0.45 * baseScale
        );

        mugGroup.scale.set(baseScale, baseScale, baseScale);
        mugGroup.position.set(
          laptopX + (1.605 + 0.85) * baseScale,
          laptopY,
          -0.65 * baseScale
        );

        targetPortX = laptopX - 1.605 * baseScale;
        targetPortY = laptopY + 0.07 * baseScale;
        targetPortZ = 0.4 * baseScale;

        restPlugX = laptopX - (1.605 + (isMobile ? 0.42 : 0.58)) * baseScale;
        restPlugY = laptopY + 0.04 * baseScale;
        restPlugZ = (isMobile ? 0.75 : 0.85) * baseScale;
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      baseGeo.dispose();
      kbWellGeo.dispose();
      keyGeo.dispose();
      trackpadGeo.dispose();
      lidGeo.dispose();
      displayGeo.dispose();
      portGeo.dispose();
      portMat.dispose();
      portLedGeo.dispose();
      portLedMat.dispose();
      tipGeo.dispose();
      connectorBodyGeo.dispose();
      plugLedGeo.dispose();
      plugLedMat.dispose();
      bootGeo.dispose();
      if (cableMesh) {
        cableMesh.geometry.dispose();
      }
      deskMatGeo.dispose();
      deskMatMat.dispose();
      deskBorderGeo.dispose();
      deskBorderMat.dispose();
      windowShadowGeo.dispose();
      windowShadowMat.dispose();
      phoneBodyGeo.dispose();
      phoneBodyMat.dispose();
      phoneCameraVisorGeo.dispose();
      phoneDisplayGeo.dispose();
      phoneDisplayMat.dispose();
      mugBodyGeo.dispose();
      mugMat.dispose();
      coffeeGeo.dispose();
      coffeeMat.dispose();
      mugHandleGeo.dispose();

      chassisMat.dispose();
      screenBezelMat.dispose();
      screenDisplayMat.dispose();
      keyboardWellMat.dispose();
      keycapMat.dispose();
      trackpadMat.dispose();
      cableConnectorMat.dispose();
      cablePinMat.dispose();
      cableCordMat.dispose();
      if (screenTexture) screenTexture.dispose();
      if (phoneTexture) phoneTexture.dispose();
      if (windowShadowTexture) windowShadowTexture.dispose();
    };
  }, []);

  return (
    <section
      id="workstation"
      ref={containerRef}
      className="relative w-full h-[220vh] sm:h-[240vh] my-6"
      aria-label="Interactive 3D Workstation Experience"
    >
      {/* Seamless Sticky Viewport — No outer container boxes, no borders, no outer text */}
      <div className="sticky top-12 sm:top-16 h-[88vh] sm:h-[calc(100vh-5rem)] w-full flex items-center justify-center overflow-hidden pointer-events-none">
        {/* Subtle Ambient Radial Backlight */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full blur-[120px] bg-cyan-500/10 dark:bg-cyan-500/15" />
        </div>

        {/* 3D WebGL Canvas Layer */}
        {hasWebGL && !reducedMotion ? (
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-default"
            />
          </div>
        ) : (
          /* Accessible Non-WebGL / Reduced Motion Fallback */
          <div className="w-full max-w-lg mx-auto p-6 text-left font-sans space-y-3 pointer-events-auto text-neutral-300">
            <h3 className="text-xl font-bold text-white">👋 Hi, I&apos;m Nehal Chauhan</h3>
            <p className="text-sm text-neutral-400">Software Engineer specializing in Native Android & Full-Stack Web.</p>
            <div className="space-y-1.5 text-xs">
              <p className="text-blue-400">📱 Native Android: Java, MVVM, 60 FPS</p>
              <p className="text-purple-400">🌐 Full-Stack: React 19, Next.js, TypeScript, Redis</p>
              <p className="text-rose-400">🚀 Viral AR: 915M+ Impressions on Snapchat</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
