"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import * as THREE from "three";

interface LanyardBadgeHeroProps {
  onScrollDown?: () => void;
}

export default function LanyardBadgeHero({ onScrollDown }: LanyardBadgeHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);

  const [accentColor, setAccentColor] = useState<string>("#e11d48");
  const [isFlipped, setIsFlipped] = useState(false);

  const accentRef = useRef(accentColor);
  accentRef.current = accentColor;

  const flipTriggerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const domCard = cardRef.current;
    const domSpin = spinRef.current;
    const container = containerRef.current;
    if (!canvas || !domCard || !domSpin || !container) return;

    let W = container.clientWidth || window.innerWidth;
    let H = container.clientHeight || window.innerHeight;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, -1000, 1000);
    camera.position.z = 100;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    } catch (e) {
      console.warn("WebGL not supported for LanyardBadgeHero canvas", e);
      return;
    }

    // --- STANDARD CR80 CORPORATE ID BADGE DIMENSIONS ---
    // Realistic proportions (1:1.54) with responsive height safeguards
    let CW = Math.min(Math.round(W * 0.72), 304, Math.round(H * 0.42));
    CW = Math.max(260, CW);
    let CH = Math.min(Math.round(CW * 1.54), Math.round(H * 0.64));
    CH = Math.max(420, CH);
    let CLIP = CW * 0.09;
    domCard.style.setProperty("--cw", `${CW}px`);
    domCard.style.setProperty("--ch", `${CH}px`);

    let Ay = H / 2 + 10;
    let targetClipScreenY = Math.max(70, Math.min(120, H * 0.12));
    let restY = H / 2 - targetClipScreenY;
    let L = Ay - restY;
    const G = 2400;
    const K = 290;

    const P = new THREE.Vector2(0, restY);
    const V = new THREE.Vector2(0, 0);
    let theta = 0, thetaV = 0;
    let flip = 0, flipV = 0, flipTarget = 0;
    let isBack = false;
    let lastFlipTime = 0;
    let tiltX = 0, tiltY = 0;
    let tiltTargetX = 0, tiltTargetY = 0;

    let isDragging = false;
    const dragOffset = { x: 0, y: 0 };
    const dragTarget = { x: 0, y: 0 };
    let startX = 0, startY = 0, startTime = 0;

    // --- LANYARD STRAP TEXTURE & MESH ---
    // 34px physical ribbon width with high-resolution canvas & clean top-to-bottom typography
    const SEGMENTS = 28;
    const strapGeo = new THREE.PlaneGeometry(34, 1, 1, SEGMENTS);
    const strapCanvas = document.createElement("canvas");
    strapCanvas.width = 128;
    strapCanvas.height = 1024;
    const sCtx = strapCanvas.getContext("2d");

    let strapTexture: THREE.CanvasTexture | null = null;

    function renderStrapTexture(color: string) {
      if (!sCtx) return;
      // Deep lanyard strap ribbon base
      sCtx.fillStyle = "#0e1017";
      sCtx.fillRect(0, 0, 128, 1024);

      // Distinct corporate edge stitches in current accent color
      sCtx.fillStyle = color;
      sCtx.fillRect(0, 0, 8, 1024);
      sCtx.fillRect(120, 0, 8, 1024);

      // Inner subtle contrast stitch lines
      sCtx.fillStyle = "rgba(255, 255, 255, 0.22)";
      sCtx.fillRect(14, 0, 2, 1024);
      sCtx.fillRect(112, 0, 2, 1024);

      // Fine woven herringbone texture simulation
      sCtx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for (let i = 18; i < 110; i += 6) {
        sCtx.fillRect(i, 0, 2, 1024);
      }
      sCtx.fillStyle = "rgba(0, 0, 0, 0.4)";
      for (let j = 0; j < 1024; j += 6) {
        sCtx.fillRect(8, j, 112, 2);
      }

      // Top decorative emblem
      sCtx.save();
      sCtx.translate(64, 170);
      sCtx.rotate(Math.PI / 2);
      sCtx.fillStyle = color;
      sCtx.textAlign = "center";
      sCtx.textBaseline = "middle";
      sCtx.font = "900 32px sans-serif";
      sCtx.fillText("✦", 0, 0);
      sCtx.restore();

      // Bold, clean, razor-sharp corporate typography (reads downwards from top to bottom)
      sCtx.save();
      sCtx.translate(64, 512);
      sCtx.rotate(Math.PI / 2);
      sCtx.fillStyle = "#ffffff";
      sCtx.textAlign = "center";
      sCtx.textBaseline = "middle";
      sCtx.font = "900 50px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      sCtx.shadowColor = "rgba(0, 0, 0, 0.95)";
      sCtx.shadowBlur = 8;
      sCtx.fillText("NEHAL CHAUHAN", 0, 0);
      sCtx.restore();

      // Bottom decorative emblem
      sCtx.save();
      sCtx.translate(64, 854);
      sCtx.rotate(Math.PI / 2);
      sCtx.fillStyle = color;
      sCtx.textAlign = "center";
      sCtx.textBaseline = "middle";
      sCtx.font = "900 32px sans-serif";
      sCtx.fillText("✦", 0, 0);
      sCtx.restore();

      if (strapTexture) {
        strapTexture.needsUpdate = true;
      } else {
        strapTexture = new THREE.CanvasTexture(strapCanvas);
        strapTexture.flipY = false;
        strapTexture.wrapS = THREE.ClampToEdgeWrapping;
        strapTexture.wrapT = THREE.RepeatWrapping;
        strapTexture.generateMipmaps = true;
        strapTexture.minFilter = THREE.LinearMipmapLinearFilter;
        strapTexture.magFilter = THREE.LinearFilter;
        if (renderer) {
          strapTexture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 16);
        }
      }
    }

    renderStrapTexture(accentRef.current);

    const strapMat = new THREE.MeshBasicMaterial({
      map: strapTexture,
      side: THREE.DoubleSide,
    });
    const strapMesh = new THREE.Mesh(strapGeo, strapMat);
    scene.add(strapMesh);

    // Realistic Drop Shadow
    const shadowGeo = new THREE.PlaneGeometry(1, 1);
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, "rgba(0,0,0,0.65)");
      grad.addColorStop(0.4, "rgba(0,0,0,0.25)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.5,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    scene.add(shadowMesh);

    // --- UPDATE STRAP VERTICES & ARC-LENGTH DYNAMIC UV MAPPING ---
    function updateStrapGeometry() {
      const pos = strapGeo.attributes.position;
      const uv = strapGeo.attributes.uv;
      const hw = 17; // 34px width ribbon matching lanyard clip
      const dx = P.x;
      const dy = P.y - Ay;
      const dist = Math.hypot(dx, dy) || 1;
      const sag = Math.sqrt(Math.max(0, L * L - dist * dist)) * 0.35;

      const midX = P.x / 2;
      const midY = (Ay + P.y) / 2 - sag;

      let cumLen = 0;
      let prevX = 0;
      let prevY = Ay;

      for (let i = 0; i <= SEGMENTS; i++) {
        const t = i / SEGMENTS;
        const u = 1 - t;

        const x = 2 * u * t * midX + t * t * P.x;
        const y = u * u * Ay + 2 * u * t * midY + t * t * P.y;

        if (i > 0) {
          cumLen += Math.hypot(x - prevX, y - prevY);
        }
        prevX = x;
        prevY = y;

        const tx = 2 * (1 - t) * midX + 2 * t * (P.x - midX);
        const ty = 2 * (1 - t) * (midY - Ay) + 2 * t * (P.y - midY);
        const tl = Math.hypot(tx, ty) || 1;
        const nx = -ty / tl;
        const ny = tx / tl;

        const idx = i * 2;
        pos.setXYZ(idx, x - nx * hw, y - ny * hw, 0);
        pos.setXYZ(idx + 1, x + nx * hw, y + ny * hw, 0);

        // Map UV coordinates along ribbon length: 160 world units per repeat cycle
        // Centers "NEHAL CHAUHAN" on the visible strap with zero squishing or collision
        const v = cumLen / 160;
        uv.setXY(idx, 0, v);
        uv.setXY(idx + 1, 1, v);
      }
      pos.needsUpdate = true;
      uv.needsUpdate = true;
    }

    // --- PHYSICS LOOP ---
    const STEP = 1 / 120;
    function updatePhysics(dt: number) {
      let ax = 0, ay = 0;

      if (isDragging) {
        ax = (dragTarget.x - P.x) * 600 - V.x * 45;
        ay = (dragTarget.y - P.y) * 600 - V.y * 45;
      } else {
        ay = -G;
        ax -= V.x * 1.6;
        ay -= V.y * 1.6;
      }

      const dx = P.x;
      const dy = P.y - Ay;
      const dist = Math.hypot(dx, dy) || 1;
      if (dist > L) {
        const nx = dx / dist, ny = dy / dist;
        const vr = V.x * nx + V.y * ny;
        const f = -K * (dist - L) - 25 * vr;
        ax += nx * f;
        ay += ny * f;
      }

      V.x += ax * dt;
      V.y += ay * dt;
      P.x += V.x * dt;
      P.y += V.y * dt;

      const targetTheta = Math.atan2(P.x, Ay - P.y) - Math.max(-0.4, Math.min(0.4, V.x * 0.0004));
      thetaV += ((targetTheta - theta) * 160 - thetaV * 12) * dt;
      theta += thetaV * dt;

      // Spring mechanics for smooth 3D flip rotation
      const fk = 65, fc = 12;
      flipV += ((flipTarget - flip) * fk - flipV * fc) * dt;
      flip += flipV * dt;

      tiltX += (tiltTargetX - tiltX) * Math.min(1, dt * 7);
      tiltY += (tiltTargetY - tiltY) * Math.min(1, dt * 7);
    }

    // Toggle Flip ONLY on Click: 1st click -> Back (PI), 2nd click -> Front (0)
    const triggerFlip = () => {
      const now = performance.now();
      if (now - lastFlipTime < 320) return;
      lastFlipTime = now;

      isBack = !isBack;
      flipTarget = isBack ? Math.PI : 0;
      setIsFlipped(isBack);

      if (!isDragging) {
        V.x += (isBack ? 1 : -1) * 35;
      }
    };
    flipTriggerRef.current = triggerFlip;

    // --- ANIMATION FRAME ---
    let animId: number;
    let lastTime = performance.now();
    let accumulator = 0;
    let activeColor = accentRef.current;

    function animate() {
      animId = requestAnimationFrame(animate);

      if (accentRef.current !== activeColor) {
        activeColor = accentRef.current;
        renderStrapTexture(activeColor);
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      accumulator += dt;

      while (accumulator >= STEP) {
        updatePhysics(STEP);
        accumulator -= STEP;
      }

      updateStrapGeometry();

      const shadowH = CH / 2 + CLIP;
      shadowMesh.position.set(
        P.x + Math.sin(theta) * shadowH + 12,
        P.y - Math.cos(theta) * shadowH - 30,
        -5
      );
      shadowMesh.rotation.z = theta;
      shadowMesh.scale.set(CW * 1.8 * Math.max(0.3, Math.abs(Math.cos(flip))), CH * 1.5, 1);

      if (domCard && domSpin) {
        // Integer pixel-snapping to prevent text antialiasing blur in Chrome
        const screenX = Math.round(P.x);
        const screenY = Math.round(H / 2 - P.y);
        domCard.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) rotate(${(-theta).toFixed(4)}rad)`;
        domSpin.style.transform = `rotateX(${(-tiltX).toFixed(4)}rad) rotateY(${(flip + tiltY).toFixed(4)}rad)`;
      }

      if (renderer) renderer.render(scene, camera);
    }
    animate();

    // --- POINTER / DRAG HANDLERS ---
    function getCanvasCoords(e: MouseEvent | TouchEvent) {
      const r = canvas!.getBoundingClientRect();
      const clientX = "touches" in e && e.touches.length > 0 ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = "touches" in e && e.touches.length > 0 ? e.touches[0].clientY : (e as MouseEvent).clientY;
      return {
        x: clientX - r.left - W / 2,
        y: H / 2 - (clientY - r.top),
      };
    }

    function isPointOnBadge(pt: { x: number; y: number }) {
      const dx = pt.x - P.x, dy = pt.y - P.y;
      const c = Math.cos(-theta), s = Math.sin(-theta);
      const lx = dx * c - dy * s;
      const ly = dx * s + dy * c;
      return Math.abs(lx) < CW / 2 && ly < 0 && ly > -(CLIP + CH);
    }

    function onPointerDown(e: MouseEvent | TouchEvent) {
      if ("button" in e && e.button !== 0) return; // Prevent right-click or middle-click drag
      const pt = getCanvasCoords(e);
      if (isPointOnBadge(pt)) {
        isDragging = true;
        startX = pt.x;
        startY = pt.y;
        startTime = performance.now();
        dragOffset.x = P.x - pt.x;
        dragOffset.y = P.y - pt.y;
        dragTarget.x = P.x;
        dragTarget.y = P.y;
        if (e.cancelable) e.preventDefault(); // Prevent native browser image ghost dragging
      }
    }

    function onContextMenu(e: MouseEvent) {
      const pt = getCanvasCoords(e);
      if (isPointOnBadge(pt)) {
        e.preventDefault(); // Prevent right-click context menu (Save image as, Copy, etc.)
      }
    }

    function onNativeDragStart(e: DragEvent) {
      const pt = getCanvasCoords(e);
      if (isPointOnBadge(pt)) {
        e.preventDefault(); // Completely stop HTML5 native dragging
      }
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      const pt = getCanvasCoords(e);
      if (isDragging) {
        dragTarget.x = pt.x + dragOffset.x;
        dragTarget.y = pt.y + dragOffset.y;
        if (e.cancelable && "touches" in e) e.preventDefault();
      } else {
        const dx = pt.x - P.x;
        const dy = pt.y - (P.y - CH / 2);
        tiltTargetY = Math.max(-0.25, Math.min(0.25, (dx / CW) * 0.35));
        tiltTargetX = Math.max(-0.2, Math.min(0.2, (-dy / CH) * 0.3));
      }
    }

    function onPointerUp() {
      if (isDragging) {
        const dist = Math.hypot(dragTarget.x - (startX + dragOffset.x), dragTarget.y - (startY + dragOffset.y));
        const elapsed = performance.now() - startTime;

        // Quick click without dragging: FLIP face
        if (dist < 10 && elapsed < 320) {
          triggerFlip();
        } else {
          // Drag and drop: DO NOT FLIP!
          // Badge swings back to its rest position with momentum:
          const tossVx = (dragTarget.x - (startX + dragOffset.x)) * 1.5;
          V.x += Math.max(-420, Math.min(420, tossVx));
        }
        isDragging = false;
      }
      tiltTargetX = 0;
      tiltTargetY = 0;
    }

    const domCardClick = () => {
      // Handled cleanly in onPointerUp
    };
    domSpin.addEventListener("click", domCardClick);
    domSpin.addEventListener("contextmenu", onContextMenu);

    window.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("contextmenu", onContextMenu);
    window.addEventListener("dragstart", onNativeDragStart);

    window.addEventListener("touchstart", onPointerDown, { passive: false });
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);

    // Resize handler
    const onResize = () => {
      if (!container || !renderer) return;
      W = container.clientWidth || window.innerWidth;
      H = container.clientHeight || window.innerHeight;

      camera.left = -W / 2;
      camera.right = W / 2;
      camera.top = H / 2;
      camera.bottom = -H / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);

      CW = Math.min(Math.round(W * 0.72), 304, Math.round(H * 0.42));
      CW = Math.max(260, CW);
      CH = Math.min(Math.round(CW * 1.54), Math.round(H * 0.64));
      CH = Math.max(420, CH);
      CLIP = CW * 0.09;
      if (domCard) {
        domCard.style.setProperty("--cw", `${CW}px`);
        domCard.style.setProperty("--ch", `${CH}px`);
      }
      Ay = H / 2 + 10;
      targetClipScreenY = Math.max(70, Math.min(120, H * 0.12));
      restY = H / 2 - targetClipScreenY;
      L = Ay - restY;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("contextmenu", onContextMenu);
      window.removeEventListener("dragstart", onNativeDragStart);
      window.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", onResize);
      domSpin.removeEventListener("click", domCardClick);
      domSpin.removeEventListener("contextmenu", onContextMenu);

      strapGeo.dispose();
      strapMat.dispose();
      if (strapTexture) strapTexture.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <section
      id="badge-hero"
      ref={containerRef}
      style={{ "--accent": accentColor } as React.CSSProperties}
      className="relative w-full h-screen min-h-[640px] overflow-hidden flex flex-col items-center justify-between py-6 px-4 select-none bg-[#0B0C12] text-[#F3F5FC]"
    >
          {/* Background Hero Titles (Quiet architectural backdrop) */}
          <div className="relative z-0 text-center mt-3 sm:mt-5 pointer-events-none select-none" aria-hidden="true">
            <div className="font-serif font-semibold text-3xl sm:text-6xl md:text-7xl uppercase tracking-wider text-white/[0.08]">
              NEHAL CHAUHAN
            </div>
            <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-neutral-400/80 mt-2 font-medium">
              Software Engineer • Android &amp; Full-Stack
            </p>
          </div>

          {/* WebGL Canvas for lanyard ribbon simulation */}
          <canvas
            ref={canvasRef}
            id="badge-canvas"
            className="absolute inset-0 w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing z-1"
          />

          {/* 3D DOM Badge projected on top - Centered by default on frame 0 */}
          <div
            ref={cardRef}
            className="corp-card-root absolute left-1/2 top-0 z-2 w-0 h-0 pointer-events-none [perspective:1400px] will-change-transform"
            style={{ transform: "translate3d(0px, 90px, 0)" }}
          >
            {/* Real Metal Lanyard Clip */}
            <div className="absolute -left-[18px] -top-[24px] w-[36px] h-[52px] rounded-xl z-5 bg-gradient-to-b from-[#565C70] via-[#2A2E3D] to-[#12141C] border border-white/20 shadow-[0_6px_16px_rgba(0,0,0,0.6)] after:content-[''] after:absolute after:left-1/2 after:top-[16px] after:w-[12px] after:h-[18px] after:-translate-x-1/2 after:bg-[#07090E] after:rounded-md after:border after:border-white/15" />

            {/* Spin container that applies 3D rotation */}
            <div
              ref={spinRef}
              className="corp-spin absolute -left-[calc(var(--cw,300px)/2)] top-[24px] w-[var(--cw,300px)] h-[var(--ch,450px)] [transform-style:preserve-3d] will-change-transform pointer-events-auto cursor-pointer"
            >
              {/* =========================================================
              REAL CORPORATE OFFICE ID CARD: FRONT FACE
             ========================================================= */}
              <div className="corp-face corp-front absolute inset-0 rounded-[22px] bg-[#12141D] border border-white/15 px-3.5 pt-2.5 pb-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(0deg)_translateZ(0)] flex flex-col justify-between overflow-hidden antialiased [text-rendering:optimizeLegibility]">

                {/* Top Lanyard Slot Punch Hole (Real physical badge sleeve feature) */}
                <div className="w-8 h-1 rounded-full bg-[#08090E] border border-white/15 mx-auto mb-1 shrink-0" />

                {/* Top Header Strip */}
                <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-1.5 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <span className="font-sans text-[10px] font-bold tracking-[0.16em] text-white uppercase">
                      STAFF PASS
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-semibold text-slate-300">
                    #NC-2026
                  </span>
                </div>

                {/* Middle Section: Clean Corporate Photo + Name */}
                <div className="relative z-10 flex flex-col items-center mt-1 shrink-0">
                  {/* Photo Frame (Apple/Google style rounded square) - Protected from dragging & saving */}
                  <div
                    className="relative p-1 rounded-xl bg-gradient-to-b from-white/20 via-white/5 to-white/10 shadow-md select-none"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <div className="relative w-[86px] h-[86px] rounded-lg overflow-hidden bg-[#181B26] border border-white/10 select-none">
                      <Image
                        src="/nehal-chauhan.jpg"
                        alt="Nehal Chauhan"
                        fill
                        sizes="140px"
                        priority
                        draggable={false}
                        onDragStart={(e) => e.preventDefault()}
                        onContextMenu={(e) => e.preventDefault()}
                        className="object-cover object-center pointer-events-none select-none [-webkit-user-drag:none] [user-drag:none]"
                      />
                    </div>
                  </div>

                  {/* Name & Title */}
                  <div className="text-center mt-1.5 w-full">
                    <h2 className="font-sans font-extrabold text-[17px] leading-tight tracking-tight text-white">
                      Nehal Chauhan
                    </h2>
                    <div className="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-[var(--accent)]/15 border border-[var(--accent)]/30">
                      <span className="font-sans font-bold text-[10px] text-[var(--accent)] tracking-wider uppercase">
                        Software Engineer
                      </span>
                    </div>
                    <p className="font-sans text-[10px] font-medium text-slate-300 mt-0.5">
                      Mobile &amp; Web Development
                    </p>
                  </div>
                </div>

                {/* Clean Employee Details Grid (Plain, friendly language - NO jargon) */}
                <div className="relative z-10 bg-[#171A26] border border-white/10 rounded-xl px-2.5 py-1.5 my-1 grid grid-cols-2 gap-x-2 gap-y-1 text-left shrink-0">
                  <div>
                    <span className="block font-sans text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                      Department
                    </span>
                    <span className="font-sans text-[11px] font-bold text-white">
                      Engineering
                    </span>
                  </div>
                  <div>
                    <span className="block font-sans text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                      Status
                    </span>
                    {/* Solid green indicator dot - NO pulse animation */}
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="font-sans text-[11px] font-bold text-emerald-300">
                        Active Member
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="block font-sans text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                      Location
                    </span>
                    <span className="font-sans text-[11px] font-bold text-white">
                      Gujarat, India
                    </span>
                  </div>
                  <div>
                    <span className="block font-sans text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                      Role Type
                    </span>
                    <span className="font-sans text-[11px] font-bold text-white">
                      Full-Time &amp; Remote
                    </span>
                  </div>
                </div>

                {/* Bottom Scannable Barcode & Card Notice (Safely buffered above bottom border) */}
                <div className="relative z-10 border-t border-white/10 pt-1.5 pb-0.5 flex flex-col items-center gap-1 shrink-0">
                  {/* Minimalist Corporate Barcode */}
                  <div className="w-[82%] h-4 bg-[repeating-linear-gradient(90deg,#ffffff_0_2px,transparent_2px_4px,#ffffff_4px_5px,transparent_5px_8px,#ffffff_8px_11px,transparent_11px_12px,#ffffff_12px_15px,transparent_15px_17px,#ffffff_17px_20px,transparent_20px_23px)] opacity-75" />
                  <span className="font-sans text-[8.5px] text-slate-400 uppercase tracking-wider">              </span>
                </div>
              </div>

              {/* =========================================================
              REAL CORPORATE OFFICE ID CARD: BACK FACE
             ========================================================= */}
              <div className="corp-face corp-back absolute inset-0 rounded-[22px] bg-[#12141D] border border-white/15 px-3.5 pt-2.5 pb-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.2)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)_translateZ(0)] flex flex-col justify-between overflow-hidden antialiased [text-rendering:optimizeLegibility]">

                {/* Real Top Magnetic Stripe */}
                <div className="-mx-3.5 -mt-2.5 h-7 bg-[#1B1E2B] border-b border-white/15 flex items-center justify-between px-3 shrink-0">
                  <span className="font-mono text-[8.5px] tracking-widest text-slate-400 uppercase">
                    MAGNETIC ACCESS STRIPE
                  </span>
                  <span className="font-mono text-[8.5px] text-slate-400">
                    DO NOT BEND
                  </span>
                </div>

                {/* About Nehal in Clear, Friendly Language */}
                <div className="relative z-10 mt-1.5 shrink-0 text-left">
                  <span className="font-sans text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                    About Nehal
                  </span>
                  <p className="font-sans text-[11px] text-slate-200 leading-snug mt-0.5 font-medium">
                    Passionate software engineer building fast, responsive mobile apps and modern web platforms that feel effortless to use.
                  </p>
                </div>

                {/* What I Do - User-Friendly Categories (NO technical jargon) */}
                <div className="relative z-10 flex flex-col gap-1.5 my-auto">
                  <div className="px-2.5 py-1.5 rounded-lg bg-[#181B28] border border-white/8 text-left">
                    <b className="block font-sans text-[11px] text-white font-bold leading-tight">Android Mobile Apps</b>
                    <p className="font-sans text-[10px] text-slate-300 leading-tight mt-0.5">
                      Developing smooth, responsive apps for phones and tablets.
                    </p>
                  </div>

                  <div className="px-2.5 py-1.5 rounded-lg bg-[#181B28] border border-white/8 text-left">
                    <b className="block font-sans text-[11px] text-white font-bold leading-tight">Modern Web Applications</b>
                    <p className="font-sans text-[10px] text-slate-300 leading-tight mt-0.5">
                      Building clean, interactive websites and online services.
                    </p>
                  </div>

                  <div className="px-2.5 py-1.5 rounded-lg bg-[#181B28] border border-white/8 text-left">
                    <b className="block font-sans text-[11px] text-white font-bold leading-tight">Fast &amp; Reliable Systems</b>
                    <p className="font-sans text-[10px] text-slate-300 leading-tight mt-0.5">
                      Ensuring smooth performance, secure data, and fast loading.
                    </p>
                  </div>

                  <div className="px-2.5 py-1.5 rounded-lg bg-[#181B28] border border-white/8 text-left">
                    <b className="block font-sans text-[11px] text-white font-bold leading-tight">High-Reach Creative Projects</b>
                    <p className="font-sans text-[10px] text-slate-300 leading-tight mt-0.5">
                      Creator of digital camera filters experienced by over 915 million people.
                    </p>
                  </div>
                </div>

                {/* Card Notice & Contact Footer (Safely buffered above bottom border) */}
                <div className="relative z-10 border-t border-white/10 pt-1.5 pb-0.5 text-center shrink-0">
                  <p className="font-sans text-[9.5px] text-slate-300">
                    If found, please return to: <span className="text-white font-semibold">cnehal194@gmail.com</span>
                  </p>
                  <span className="block font-sans text-[8.5px] text-slate-400 mt-0.5">
                    Gujarat, India • Available for Roles Worldwide
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Theme Swatches - Elevated Above Bottom Left Corner */}
          <div className="absolute bottom-10 left-6 sm:bottom-12 sm:left-8 z-30 flex items-center gap-2 bg-[#12141F]/85 p-2 rounded-full border border-white/15 backdrop-blur-md shadow-2xl">
            {[
              { color: "#e11d48", label: "Crimson" },
              { color: "#6366f1", label: "Indigo" },
              { color: "#0ea5e9", label: "Cyan" },
              { color: "#10b981", label: "Emerald" },
            ].map((s) => (
              <button
                key={s.color}
                onClick={() => setAccentColor(s.color)}
                aria-label={s.label}
                className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${accentColor === s.color ? "scale-125 ring-2 ring-white" : "hover:scale-110 opacity-70"
                  }`}
                style={{ backgroundColor: s.color }}
              />
            ))}
          </div>
        </section>
        );
}
