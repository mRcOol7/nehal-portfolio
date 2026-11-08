"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sun, Moon, Sunrise, Sunset, ArrowUp } from "lucide-react";
import BenchoMagnetic from "./BenchoMagnetic";

type TimeOfDay = "night" | "dusk" | "day" | "dawn";

interface TimePreset {
  skyTop: number;
  skyBottom: number;
  lightColor: number;
  lightIntensity: number;
  ambientColor: number;
  ambientIntensity: number;
  glassColor: number;
  grassColorTip: number;
  grassColorBase: number;
  fireflyColor: number;
  fogColor: number;
}

const PRESETS: Record<TimeOfDay, TimePreset> = {
  night: {
    skyTop: 0x050c1e,
    skyBottom: 0x0a224a,
    lightColor: 0x60a5fa,
    lightIntensity: 1.8,
    ambientColor: 0x1e293b,
    ambientIntensity: 0.9,
    glassColor: 0x93c5fd,
    grassColorTip: 0x22c55e,
    grassColorBase: 0x064e3b,
    fireflyColor: 0xfffbeb,
    fogColor: 0x081735,
  },
  dusk: {
    skyTop: 0x1e1035,
    skyBottom: 0x4c1d4f,
    lightColor: 0xf43f5e,
    lightIntensity: 2.2,
    ambientColor: 0x3b1238,
    ambientIntensity: 1.0,
    glassColor: 0xfda4af,
    grassColorTip: 0x34d399,
    grassColorBase: 0x064e3b,
    fireflyColor: 0xfecdd3,
    fogColor: 0x241030,
  },
  dawn: {
    skyTop: 0x0c2340,
    skyBottom: 0x1e3a5f,
    lightColor: 0x38bdf8,
    lightIntensity: 2.0,
    ambientColor: 0x1e293b,
    ambientIntensity: 1.0,
    glassColor: 0xbae6fd,
    grassColorTip: 0x4ade80,
    grassColorBase: 0x065f46,
    fireflyColor: 0xe0f2fe,
    fogColor: 0x112845,
  },
  day: {
    skyTop: 0x1d4ed8,
    skyBottom: 0x60a5fa,
    lightColor: 0xffffff,
    lightIntensity: 2.6,
    ambientColor: 0x93c5fd,
    ambientIntensity: 1.2,
    glassColor: 0xffffff,
    grassColorTip: 0x4ade80,
    grassColorBase: 0x15803d,
    fireflyColor: 0xfffbeb,
    fogColor: 0x3b82f6,
  },
};

/**
 * Generates continuous 3D CatmullRom spline control points spelling cursive "Nehal"
 */
function createNehalPath(): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [
    // --- N ---
    new THREE.Vector3(-6.2, -0.6, 0.0),
    new THREE.Vector3(-5.8, 1.3, 0.1),
    new THREE.Vector3(-5.2, 1.4, 0.15),
    new THREE.Vector3(-4.8, -0.7, 0.0),
    new THREE.Vector3(-4.4, 1.1, 0.1),
    new THREE.Vector3(-3.8, 1.15, 0.12),
    new THREE.Vector3(-3.4, -0.6, 0.0),
    new THREE.Vector3(-3.1, -0.4, 0.05),

    // --- e ---
    new THREE.Vector3(-2.8, -0.1, 0.08),
    new THREE.Vector3(-2.4, 0.5, 0.12),
    new THREE.Vector3(-2.0, 0.45, 0.1),
    new THREE.Vector3(-2.1, -0.1, 0.05),
    new THREE.Vector3(-2.5, -0.5, 0.0),
    new THREE.Vector3(-1.9, -0.4, 0.08),

    // --- h ---
    new THREE.Vector3(-1.5, 0.2, 0.15),
    new THREE.Vector3(-1.1, 1.6, 0.25),
    new THREE.Vector3(-0.7, 1.65, 0.22),
    new THREE.Vector3(-0.9, -0.7, 0.0),
    new THREE.Vector3(-0.8, 0.1, 0.1),
    new THREE.Vector3(-0.4, 0.45, 0.15),
    new THREE.Vector3(-0.1, 0.35, 0.12),
    new THREE.Vector3(0.1, -0.6, 0.0),
    new THREE.Vector3(0.4, -0.4, 0.08),

    // --- a ---
    new THREE.Vector3(0.8, 0.2, 0.12),
    new THREE.Vector3(1.2, 0.45, 0.14),
    new THREE.Vector3(1.6, 0.3, 0.1),
    new THREE.Vector3(1.5, -0.5, 0.0),
    new THREE.Vector3(1.0, -0.55, 0.02),
    new THREE.Vector3(0.7, -0.1, 0.08),
    new THREE.Vector3(1.1, 0.4, 0.12),
    new THREE.Vector3(1.6, -0.6, 0.0),
    new THREE.Vector3(1.9, -0.3, 0.1),

    // --- l ---
    new THREE.Vector3(2.3, 0.5, 0.2),
    new THREE.Vector3(2.8, 1.75, 0.3),
    new THREE.Vector3(3.3, 1.8, 0.28),
    new THREE.Vector3(3.0, 0.2, 0.12),
    new THREE.Vector3(3.2, -0.7, 0.0),
    new THREE.Vector3(3.8, -0.65, 0.1),

    // --- Elegant underline flourish ---
    new THREE.Vector3(4.5, -0.75, 0.15),
    new THREE.Vector3(2.5, -0.9, 0.08),
    new THREE.Vector3(0.0, -0.95, 0.05),
    new THREE.Vector3(-3.0, -0.9, 0.02),
    new THREE.Vector3(-5.0, -0.85, 0.0),
  ];

  return new THREE.CatmullRomCurve3(points, false, "centripetal", 0.5);
}

/**
 * AirIncFooter
 * Reverse-engineered from the award-winning air.inc 3D footer.
 * Features:
 * - 3D rolling lush grassy hill with thousands of wind-animated swaying grass blades
 * - Cute whimsical 3D spotted mushrooms
 * - Floating fireflies & fairy dust rising into the night sky
 * - 3D Translucent Glass Neon Cursive "Nehal" floating with liquid refraction & gleams
 * - Dynamic Time-of-Day Mode Toggle (Night 🌙, Dusk 🌇, Day ☀️, Dawn 🌅)
 * - Interactive mouse parallax, wind ripple, and smooth WebGL cleanup
 * - Zero sound, touch-safe, pauses offscreen via IntersectionObserver
 */
export default function AirIncFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [timeMode, setTimeMode] = useState<TimeOfDay>("night");
  const [isHovered, setIsHovered] = useState(false);

  // Keep ref for animation loop
  const timeModeRef = useRef<TimeOfDay>("night");
  timeModeRef.current = timeMode;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(PRESETS[timeModeRef.current].fogColor, 0.045);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.6, 9.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(
      PRESETS[timeModeRef.current].ambientColor,
      PRESETS[timeModeRef.current].ambientIntensity
    );
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(
      PRESETS[timeModeRef.current].lightColor,
      PRESETS[timeModeRef.current].lightIntensity
    );
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x38bdf8, 1.2, 15);
    fillLight.position.set(-5, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xe11d48, 1.5, 12);
    rimLight.position.set(0, -1, 3);
    scene.add(rimLight);

    // --- 1. Rolling Grassy Ground Hill ---
    const groundGeo = new THREE.PlaneGeometry(32, 20, 48, 32);
    // Deform into rolling gentle hill
    const posAttr = groundGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);
      // Create soft hill crest
      const z =
        Math.sin(x * 0.25) * 0.45 +
        Math.cos(y * 0.3) * 0.3 -
        Math.pow(x * 0.08, 2) * 0.2;
      posAttr.setZ(i, z);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x064e3b,
      roughness: 0.9,
      metalness: 0.05,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2.3;
    ground.position.set(0, -2.4, -1);
    scene.add(ground);

    // --- 2. Lush Instanced Grass Blades ---
    const bladeCount = prefersReducedMotion ? 1200 : 3200;
    // Single tapered blade of grass (simple triangular strip)
    const bladeGeo = new THREE.PlaneGeometry(0.06, 0.42, 1, 3);
    bladeGeo.translate(0, 0.21, 0); // anchor at base

    const grassMat = new THREE.MeshStandardMaterial({
      color: PRESETS[timeModeRef.current].grassColorTip,
      roughness: 0.65,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });

    const grassInstanced = new THREE.InstancedMesh(
      bladeGeo,
      grassMat,
      bladeCount
    );
    const dummy = new THREE.Object3D();
    const bladeData: { basePos: THREE.Vector3; rotY: number; speed: number }[] =
      [];

    for (let i = 0; i < bladeCount; i++) {
      const gx = (Math.random() - 0.5) * 20;
      const gz = Math.random() * 8 - 3;
      const gy = -1.9 + Math.sin(gx * 0.25) * 0.3 - (gz + 2) * 0.22;

      dummy.position.set(gx, gy, gz);
      dummy.rotation.y = Math.random() * Math.PI * 2;
      dummy.rotation.x = (Math.random() - 0.5) * 0.25;
      dummy.rotation.z = (Math.random() - 0.5) * 0.2;
      const scale = 0.75 + Math.random() * 0.6;
      dummy.scale.set(scale, scale * (0.8 + Math.random() * 0.5), scale);
      dummy.updateMatrix();

      grassInstanced.setMatrixAt(i, dummy.matrix);
      bladeData.push({
        basePos: dummy.position.clone(),
        rotY: dummy.rotation.y,
        speed: 1.2 + Math.random() * 1.5,
      });
    }
    grassInstanced.instanceMatrix.needsUpdate = true;
    scene.add(grassInstanced);

    // --- 3. Whimsical 3D Mushrooms (As in Air.inc) ---
    const mushroomGroup = new THREE.Group();
    const mushroomPositions = [
      { x: -3.8, y: -1.7, z: 1.2, scale: 0.35, rot: 0.2 },
      { x: -4.3, y: -1.8, z: 0.8, scale: 0.24, rot: -0.3 },
      { x: 3.6, y: -1.65, z: 1.0, scale: 0.38, rot: -0.15 },
      { x: 4.1, y: -1.75, z: 0.6, scale: 0.25, rot: 0.3 },
      { x: 2.2, y: -1.9, z: 2.1, scale: 0.28, rot: 0.1 },
      { x: -1.9, y: -1.95, z: 2.0, scale: 0.3, rot: -0.2 },
    ];

    const capGeo = new THREE.SphereGeometry(0.45, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const capMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // vibrant red
      roughness: 0.3,
      metalness: 0.05,
    });
    const stemGeo = new THREE.CylinderGeometry(0.1, 0.14, 0.5, 12);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0xffedd5, // cream
      roughness: 0.6,
    });

    mushroomPositions.forEach((m) => {
      const singleMushroom = new THREE.Group();
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.y = 0.45;
      cap.scale.set(1, 0.85, 1);
      singleMushroom.add(cap);

      // Add cute dots on mushroom cap
      const dotGeo = new THREE.SphereGeometry(0.06, 8, 8);
      const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      for (let j = 0; j < 5; j++) {
        const dot = new THREE.Mesh(dotGeo, dotMat);
        const theta = (j / 5) * Math.PI * 2;
        dot.position.set(
          Math.cos(theta) * 0.3,
          0.55 + (j % 2) * 0.1,
          Math.sin(theta) * 0.3
        );
        singleMushroom.add(dot);
      }

      const stem = new THREE.Mesh(stemGeo, stemMat);
      stem.position.y = 0.25;
      singleMushroom.add(stem);

      singleMushroom.position.set(m.x, m.y, m.z);
      singleMushroom.rotation.z = m.rot;
      singleMushroom.scale.setScalar(m.scale);
      mushroomGroup.add(singleMushroom);
    });
    scene.add(mushroomGroup);

    // --- 4. 3D Floating Cursive Glass Neon "Nehal" Tube ---
    const nehalCurve = createNehalPath();
    const tubeGeo = new THREE.TubeGeometry(nehalCurve, 320, 0.18, 16, false);

    // Outer Liquid Glass Sheath
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: PRESETS[timeModeRef.current].glassColor,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.88,
      thickness: 1.4,
      ior: 1.48,
      specularIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.95,
    });
    const nehalMesh = new THREE.Mesh(tubeGeo, glassMat);
    nehalMesh.position.set(0, 0.5, 0.5);
    scene.add(nehalMesh);

    // Inner Glowing Core Wire
    const coreGeo = new THREE.TubeGeometry(nehalCurve, 320, 0.055, 8, false);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.copy(nehalMesh.position);
    scene.add(coreMesh);

    // --- 5. Floating Fireflies & Fairy Dust ---
    const fireflyCount = 55;
    const fireflyGeo = new THREE.BufferGeometry();
    const fireflyPositions = new Float32Array(fireflyCount * 3);
    const fireflyVelocities: { x: number; y: number; z: number; phase: number }[] =
      [];

    for (let i = 0; i < fireflyCount; i++) {
      fireflyPositions[i * 3] = (Math.random() - 0.5) * 16;
      fireflyPositions[i * 3 + 1] = -1.8 + Math.random() * 4.5;
      fireflyPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;

      fireflyVelocities.push({
        x: (Math.random() - 0.5) * 0.006,
        y: 0.005 + Math.random() * 0.008,
        z: (Math.random() - 0.5) * 0.005,
        phase: Math.random() * Math.PI * 2,
      });
    }
    fireflyGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(fireflyPositions, 3)
    );

    const fireflyMat = new THREE.PointsMaterial({
      color: PRESETS[timeModeRef.current].fireflyColor,
      size: 0.15,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const fireflies = new THREE.Points(fireflyGeo, fireflyMat);
    scene.add(fireflies);

    // --- Interactive Mouse Tracking & Parallax ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 2;
      targetMouseY = -y * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // --- Pause Rendering When Offscreen ---
    let isVisible = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // --- Animation Loop ---
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Smooth time-of-day atmospheric transitions
      const targetPreset = PRESETS[timeModeRef.current];
      ambientLight.color.lerp(new THREE.Color(targetPreset.ambientColor), 0.05);
      ambientLight.intensity += (targetPreset.ambientIntensity - ambientLight.intensity) * 0.05;
      keyLight.color.lerp(new THREE.Color(targetPreset.lightColor), 0.05);
      keyLight.intensity += (targetPreset.lightIntensity - keyLight.intensity) * 0.05;
      if (scene.fog) {
        (scene.fog as THREE.FogExp2).color.lerp(new THREE.Color(targetPreset.fogColor), 0.05);
      }
      glassMat.color.lerp(new THREE.Color(targetPreset.glassColor), 0.05);
      grassMat.color.lerp(new THREE.Color(targetPreset.grassColorTip), 0.05);
      groundMat.color.lerp(new THREE.Color(targetPreset.grassColorBase), 0.05);
      fireflyMat.color.lerp(new THREE.Color(targetPreset.fireflyColor), 0.05);

      // Camera parallax
      camera.position.x = currentMouseX * 1.2;
      camera.position.y = 0.6 + currentMouseY * 0.6;
      camera.lookAt(0, 0.2, 0);

      // Floating bobbing motion for Nehal Glass Tube
      if (!prefersReducedMotion) {
        const bob = Math.sin(elapsed * 1.4) * 0.1;
        const tilt = Math.cos(elapsed * 1.0) * 0.02;
        nehalMesh.position.y = 0.5 + bob;
        nehalMesh.rotation.z = tilt;
        nehalMesh.rotation.y = currentMouseX * 0.15;
        coreMesh.position.copy(nehalMesh.position);
        coreMesh.rotation.copy(nehalMesh.rotation);
      }

      // Wind animation for grass blades
      if (!prefersReducedMotion && (elapsed * 60) % 2 < 1) {
        for (let i = 0; i < bladeCount; i += 3) {
          const b = bladeData[i];
          const wind = Math.sin(elapsed * b.speed + b.basePos.x * 0.6) * 0.18;
          dummy.position.copy(b.basePos);
          dummy.rotation.y = b.rotY;
          dummy.rotation.z = wind + currentMouseX * 0.08;
          dummy.rotation.x = Math.abs(wind) * 0.25;
          dummy.updateMatrix();
          grassInstanced.setMatrixAt(i, dummy.matrix);
        }
        grassInstanced.instanceMatrix.needsUpdate = true;
      }

      // Floating fireflies
      const pos = fireflyGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < fireflyCount; i++) {
        const vel = fireflyVelocities[i];
        pos[i * 3] += vel.x + Math.sin(elapsed * 1.5 + vel.phase) * 0.005;
        pos[i * 3 + 1] += vel.y;
        pos[i * 3 + 2] += vel.z;

        // Reset if drifted too high
        if (pos[i * 3 + 1] > 3.8) {
          pos[i * 3 + 1] = -1.8;
          pos[i * 3] = (Math.random() - 0.5) * 16;
        }
      }
      fireflyGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      groundGeo.dispose();
      groundMat.dispose();
      bladeGeo.dispose();
      grassMat.dispose();
      grassInstanced.dispose();
      capGeo.dispose();
      capMat.dispose();
      stemGeo.dispose();
      stemMat.dispose();
      tubeGeo.dispose();
      glassMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      fireflyGeo.dispose();
      fireflyMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[400px] xs:h-[460px] sm:h-[540px] md:h-[620px] lg:h-[700px] rounded-3xl overflow-hidden select-none my-8 border border-neutral-200/60 dark:border-neutral-800/80 shadow-2xl transition-all duration-700"
      style={{
        background: `radial-gradient(circle at 50% 20%, ${
          timeMode === "night"
            ? "#0f2347 0%, #060e20 80%"
            : timeMode === "dusk"
            ? "#3d1338 0%, #15061e 80%"
            : timeMode === "dawn"
            ? "#1a3a60 0%, #0c1a2f 80%"
            : "#3b82f6 0%, #1e3a8a 80%"
        })`,
      }}
    >
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Floating Time-of-Day Control Pill (As featured on air.inc on the right) */}
      <div className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-1.5 p-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-lg text-white">
        <button
          onClick={() => setTimeMode("dawn")}
          title="Dawn (Morning Mist)"
          aria-label="Set Dawn Mode"
          className={`p-2 rounded-full transition-all ${
            timeMode === "dawn"
              ? "bg-white/25 text-sky-300 scale-110 shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sunrise className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTimeMode("day")}
          title="Daytime (Bright Sun)"
          aria-label="Set Daytime Mode"
          className={`p-2 rounded-full transition-all ${
            timeMode === "day"
              ? "bg-white/25 text-amber-300 scale-110 shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTimeMode("dusk")}
          title="Dusk (Twilight Sunset)"
          aria-label="Set Dusk Mode"
          className={`p-2 rounded-full transition-all ${
            timeMode === "dusk"
              ? "bg-white/25 text-rose-300 scale-110 shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Sunset className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTimeMode("night")}
          title="Night (Midnight Stars & Fireflies)"
          aria-label="Set Night Mode"
          className={`p-2 rounded-full transition-all ${
            timeMode === "night"
              ? "bg-white/25 text-indigo-300 scale-110 shadow-xs"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
        >
          <Moon className="w-4 h-4" />
        </button>
      </div>

      {/* Atmospheric Vignette Overlays */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

      {/* Air.inc Signature Floating Badge Overlay */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20 flex items-center gap-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-black/30 backdrop-blur-md border border-white/15 text-white text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Interactive 3D Meadow · Move Cursor to Explore</span>
        </div>
      </div>

      {/* Bottom Floating Social Hub (As seen in air.inc) */}
      <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-8 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-white">
        <div className="text-xs font-mono text-white/70">
          <span>Nehal Chauhan © 2026 · Gujarat, India</span>
        </div>

        {/* Authentic Social Links Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <BenchoMagnetic strength={0.25}>
            <a
              href="https://github.com/mRcOol7"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-sm flex items-center justify-center"
              title="GitHub: github.com/mRcOol7"
              aria-label="GitHub Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </BenchoMagnetic>

          <BenchoMagnetic strength={0.25}>
            <a
              href="https://www.linkedin.com/in/nehal-chauhan19"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white transition-all shadow-sm flex items-center justify-center"
              title="LinkedIn: linkedin.com/in/nehal-chauhan19"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </BenchoMagnetic>

          <BenchoMagnetic strength={0.25}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-xs font-medium text-white transition-all shadow-sm group"
              title="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </BenchoMagnetic>
        </div>
      </div>
    </div>
  );
}
