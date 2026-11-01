"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SpatialScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // 1. Reduced motion check
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const prefersReducedMotion = mediaQuery.matches;

    // 2. WebGL support check
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
    if (!canvas) return;

    // --- Scene, Camera, & Renderer ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c10, 0.028);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // --- Studio Lighting Setup ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    // Rim point light - Cyan
    const cyanLight = new THREE.PointLight(0x38bdf8, 3.2, 22);
    cyanLight.position.set(-5, 4, 3);
    scene.add(cyanLight);

    // Rim point light - Electric Indigo
    const indigoLight = new THREE.PointLight(0x6366f1, 3.8, 24);
    indigoLight.position.set(6, -3, 4);
    scene.add(indigoLight);

    // Fill point light - Rose
    const roseLight = new THREE.PointLight(0xe11d48, 2.5, 18);
    roseLight.position.set(0, -6, 2);
    scene.add(roseLight);

    // --- Shared Geometries & Materials Tracking for Disposal ---
    const disposables: { dispose: () => void }[] = [];

    // Helper: Rounded rectangle on Canvas2D
    const drawRoundRect = (
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

    // ==========================================
    // 1. REAL OBJECT: RETRO AUDIO CASSETTE TAPE
    // ==========================================
    const createCassette = () => {
      const group = new THREE.Group();

      // 1A. Label Canvas Texture
      const lCanvas = document.createElement("canvas");
      lCanvas.width = 512;
      lCanvas.height = 320;
      const lCtx = lCanvas.getContext("2d");
      if (lCtx) {
        // Label paper background
        lCtx.fillStyle = "#F8F6F0";
        drawRoundRect(lCtx, 8, 8, 496, 304, 12);
        lCtx.fill();
        lCtx.strokeStyle = "#DDD8CE";
        lCtx.lineWidth = 3;
        lCtx.stroke();

        // Retro stripe header (Navy & Rose)
        lCtx.fillStyle = "#1E1B4B";
        lCtx.fillRect(16, 20, 480, 28);
        lCtx.fillStyle = "#E11D48";
        lCtx.fillRect(16, 48, 480, 6);

        lCtx.font = "bold 15px -apple-system, sans-serif";
        lCtx.fillStyle = "#FFFFFF";
        lCtx.fillText("NEHAL CHAUHAN • MIXTAPE VOL. 1", 26, 39);

        lCtx.font = "bold 13px -apple-system, monospace";
        lCtx.fillStyle = "#6366F1";
        lCtx.fillText("SIDE A // 90 MIN", 360, 39);

        // Tracklist ruled lines
        lCtx.font = "500 13px -apple-system, sans-serif";
        lCtx.fillStyle = "#334155";
        lCtx.fillText("1. Native Android & Kotlin", 30, 84);
        lCtx.fillText("2. React 19 & Next.js Systems", 30, 114);
        lCtx.fillText("3. Three.js & Creative WebGL", 30, 144);

        lCtx.fillStyle = "#E2E8F0";
        lCtx.fillRect(30, 94, 452, 1);
        lCtx.fillRect(30, 124, 452, 1);
        lCtx.fillRect(30, 154, 452, 1);

        // Center cutout window outline
        lCtx.strokeStyle = "#94A3B8";
        lCtx.lineWidth = 2;
        drawRoundRect(lCtx, 110, 175, 292, 120, 10);
        lCtx.stroke();
      }

      const labelTexture = new THREE.CanvasTexture(lCanvas);
      disposables.push(labelTexture);

      // Materials
      const clearShellMat = new THREE.MeshPhysicalMaterial({
        color: 0x1c1e28,
        metalness: 0.1,
        roughness: 0.18,
        transmission: 0.55,
        opacity: 0.88,
        transparent: true,
        clearcoat: 0.9,
      });
      disposables.push(clearShellMat);

      const labelMat = new THREE.MeshStandardMaterial({
        map: labelTexture,
        roughness: 0.8,
        metalness: 0.05,
      });
      disposables.push(labelMat);

      const whiteHubMat = new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.35,
        metalness: 0.1,
      });
      disposables.push(whiteHubMat);

      const brownTapeMat = new THREE.MeshStandardMaterial({
        color: 0x3d2011,
        roughness: 0.3,
        metalness: 0.4,
      });
      disposables.push(brownTapeMat);

      const screwMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.9,
        roughness: 0.2,
      });
      disposables.push(screwMat);

      // Cassette Outer Shell
      const shellGeo = new THREE.BoxGeometry(3.6, 2.3, 0.32);
      disposables.push(shellGeo);
      const shell = new THREE.Mesh(shellGeo, clearShellMat);
      group.add(shell);

      // Label Plate (Front)
      const labelGeo = new THREE.PlaneGeometry(3.3, 2.05);
      disposables.push(labelGeo);
      const labelMesh = new THREE.Mesh(labelGeo, labelMat);
      labelMesh.position.z = 0.165;
      group.add(labelMesh);

      // Dual Spool Hubs & Tape
      const hubGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.24, 24);
      const tapeRollGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.22, 24);
      disposables.push(hubGeo, tapeRollGeo);

      // Left Spool
      const leftRoll = new THREE.Mesh(tapeRollGeo, brownTapeMat);
      leftRoll.rotation.x = Math.PI / 2;
      leftRoll.position.set(-0.82, -0.08, 0);
      group.add(leftRoll);

      const leftHub = new THREE.Mesh(hubGeo, whiteHubMat);
      leftHub.rotation.x = Math.PI / 2;
      leftHub.position.set(-0.82, -0.08, 0.02);
      group.add(leftHub);

      // Right Spool
      const rightRoll = new THREE.Mesh(tapeRollGeo, brownTapeMat);
      rightRoll.rotation.x = Math.PI / 2;
      rightRoll.position.set(0.82, -0.08, 0);
      rightRoll.scale.set(0.65, 1, 0.65); // One spool has less tape rolled
      group.add(rightRoll);

      const rightHub = new THREE.Mesh(hubGeo, whiteHubMat);
      rightHub.rotation.x = Math.PI / 2;
      rightHub.position.set(0.82, -0.08, 0.02);
      group.add(rightHub);

      // Corner Metal Screws
      const screwGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.02, 12);
      disposables.push(screwGeo);
      const screwCoords = [
        [-1.6, 0.95],
        [1.6, 0.95],
        [-1.6, -0.95],
        [1.6, -0.95],
        [0, 0.95],
      ];
      screwCoords.forEach(([sx, sy]) => {
        const screw = new THREE.Mesh(screwGeo, screwMat);
        screw.rotation.x = Math.PI / 2;
        screw.position.set(sx, sy, 0.165);
        group.add(screw);
      });

      return { group, leftHub, rightHub };
    };

    // ==========================================
    // 2. REAL OBJECT: 3.5-INCH VINTAGE FLOPPY DISK
    // ==========================================
    const createFloppy = () => {
      const group = new THREE.Group();

      // Floppy label canvas
      const fCanvas = document.createElement("canvas");
      fCanvas.width = 384;
      fCanvas.height = 256;
      const fCtx = fCanvas.getContext("2d");
      if (fCtx) {
        // Label paper
        fCtx.fillStyle = "#FFFFFF";
        drawRoundRect(fCtx, 6, 6, 372, 244, 8);
        fCtx.fill();

        // Indigo bar at top
        fCtx.fillStyle = "#4338CA";
        fCtx.fillRect(10, 10, 364, 38);

        fCtx.font = "bold 17px -apple-system, monospace";
        fCtx.fillStyle = "#FFFFFF";
        fCtx.fillText("DEV_SOURCE_V2.DSK", 20, 35);

        fCtx.font = "bold 11px -apple-system, sans-serif";
        fCtx.fillStyle = "#64748B";
        fCtx.fillText("FORMAT: 1.44 MB • HIGH DENSITY", 20, 80);
        fCtx.fillText("AUTHOR: NEHAL CHAUHAN", 20, 110);
        fCtx.fillText("PORTFOLIO CORE ASSETS", 20, 140);

        // Write protect checkbox
        fCtx.strokeStyle = "#CBD5E1";
        fCtx.strokeRect(20, 170, 24, 24);
        fCtx.font = "bold 18px sans-serif";
        fCtx.fillStyle = "#E11D48";
        fCtx.fillText("✓", 24, 188);
        fCtx.font = "500 12px sans-serif";
        fCtx.fillStyle = "#334155";
        fCtx.fillText("WRITE PROTECTED", 54, 187);
      }

      const floppyLabelTexture = new THREE.CanvasTexture(fCanvas);
      disposables.push(floppyLabelTexture);

      const plasticMat = new THREE.MeshStandardMaterial({
        color: 0x111319,
        roughness: 0.65,
        metalness: 0.1,
      });
      disposables.push(plasticMat);

      const metalShutterMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.88,
        roughness: 0.22,
      });
      disposables.push(metalShutterMat);

      const fLabelMat = new THREE.MeshStandardMaterial({
        map: floppyLabelTexture,
        roughness: 0.8,
      });
      disposables.push(fLabelMat);

      // Floppy Main Chassis
      const floppyBodyGeo = new THREE.BoxGeometry(2.7, 2.7, 0.12);
      disposables.push(floppyBodyGeo);
      const floppyBody = new THREE.Mesh(floppyBodyGeo, plasticMat);
      group.add(floppyBody);

      // Sliding Metal Shutter (Top)
      const shutterGeo = new THREE.BoxGeometry(1.65, 0.95, 0.14);
      disposables.push(shutterGeo);
      const shutter = new THREE.Mesh(shutterGeo, metalShutterMat);
      shutter.position.set(0.15, 0.88, 0);
      group.add(shutter);

      // Adhesive Label
      const fLabelGeo = new THREE.PlaneGeometry(2.35, 1.45);
      disposables.push(fLabelGeo);
      const fLabelMesh = new THREE.Mesh(fLabelGeo, fLabelMat);
      fLabelMesh.position.set(0, -0.42, 0.065);
      group.add(fLabelMesh);

      // Center Metal Drive Hub (Back)
      const hubDiscGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.02, 24);
      disposables.push(hubDiscGeo);
      const hubDisc = new THREE.Mesh(hubDiscGeo, metalShutterMat);
      hubDisc.rotation.x = Math.PI / 2;
      hubDisc.position.set(0, 0, -0.065);
      group.add(hubDisc);

      return { group };
    };

    // ==========================================
    // 3. REAL OBJECT: ARTISAN MECHANICAL KEYCAP
    // ==========================================
    const createKeycap = () => {
      const group = new THREE.Group();

      const kCanvas = document.createElement("canvas");
      kCanvas.width = 256;
      kCanvas.height = 256;
      const kCtx = kCanvas.getContext("2d");
      if (kCtx) {
        kCtx.fillStyle = "#181824";
        kCtx.fillRect(0, 0, 256, 256);

        // Keycap border rim
        kCtx.strokeStyle = "#38BDF8";
        kCtx.lineWidth = 10;
        kCtx.strokeRect(15, 15, 226, 226);

        // Center code bracket icon
        kCtx.font = "bold 96px -apple-system, monospace";
        kCtx.fillStyle = "#38BDF8";
        kCtx.textAlign = "center";
        kCtx.textBaseline = "middle";
        kCtx.fillText("{ ; }", 128, 128);
      }

      const keycapTexture = new THREE.CanvasTexture(kCanvas);
      disposables.push(keycapTexture);

      const pbtKeycapMat = new THREE.MeshStandardMaterial({
        color: 0x181824,
        roughness: 0.45,
        metalness: 0.15,
      });
      disposables.push(pbtKeycapMat);

      const topGlyphMat = new THREE.MeshStandardMaterial({
        map: keycapTexture,
        roughness: 0.4,
        metalness: 0.1,
      });
      disposables.push(topGlyphMat);

      const frostedSwitchMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.75,
        opacity: 0.85,
        transparent: true,
        roughness: 0.25,
      });
      disposables.push(frostedSwitchMat);

      const redStemMat = new THREE.MeshStandardMaterial({
        color: 0xe11d48,
        roughness: 0.3,
        metalness: 0.1,
      });
      disposables.push(redStemMat);

      // Keycap Top Wedge
      const keycapGeo = new THREE.CylinderGeometry(0.85, 1.1, 0.75, 4);
      disposables.push(keycapGeo);
      const keycap = new THREE.Mesh(keycapGeo, pbtKeycapMat);
      keycap.rotation.y = Math.PI / 4;
      group.add(keycap);

      // Top Face Plate
      const topPlateGeo = new THREE.PlaneGeometry(1.0, 1.0);
      disposables.push(topPlateGeo);
      const topPlate = new THREE.Mesh(topPlateGeo, topGlyphMat);
      topPlate.rotation.x = -Math.PI / 2;
      topPlate.position.y = 0.38;
      group.add(topPlate);

      // Translucent Switch Housing Underneath
      const switchGeo = new THREE.BoxGeometry(1.25, 0.55, 1.25);
      disposables.push(switchGeo);
      const switchBox = new THREE.Mesh(switchGeo, frostedSwitchMat);
      switchBox.position.y = -0.55;
      group.add(switchBox);

      // Cherry MX Red Cross (+) Stem
      const stemHGeo = new THREE.BoxGeometry(0.42, 0.28, 0.12);
      const stemVGeo = new THREE.BoxGeometry(0.12, 0.28, 0.42);
      disposables.push(stemHGeo, stemVGeo);
      const stemH = new THREE.Mesh(stemHGeo, redStemMat);
      const stemV = new THREE.Mesh(stemVGeo, redStemMat);
      stemH.position.y = -0.25;
      stemV.position.y = -0.25;
      group.add(stemH, stemV);

      return { group };
    };

    // ==========================================
    // 4. REAL OBJECT: PHYSICAL POLAROID PHOTO
    // ==========================================
    const createPolaroid = () => {
      const group = new THREE.Group();

      const pCanvas = document.createElement("canvas");
      pCanvas.width = 512;
      pCanvas.height = 620;
      const pCtx = pCanvas.getContext("2d");
      if (pCtx) {
        // Polaroid card frame (Warm paper white)
        pCtx.fillStyle = "#F8F6F2";
        pCtx.fillRect(0, 0, 512, 620);

        // Photo cutout window
        const grad = pCtx.createLinearGradient(35, 35, 477, 477);
        grad.addColorStop(0, "#0F172A");
        grad.addColorStop(0.5, "#312E81");
        grad.addColorStop(1, "#0369A1");
        pCtx.fillStyle = grad;
        pCtx.fillRect(35, 35, 442, 442);

        // Stylized visual inside photo
        pCtx.strokeStyle = "rgba(255, 255, 255, 0.25)";
        pCtx.lineWidth = 2;
        pCtx.strokeRect(45, 45, 422, 422);

        pCtx.font = "bold 28px -apple-system, sans-serif";
        pCtx.fillStyle = "#FFFFFF";
        pCtx.textAlign = "center";
        pCtx.fillText("NEHAL CHAUHAN", 256, 230);

        pCtx.font = "500 16px -apple-system, monospace";
        pCtx.fillStyle = "#38BDF8";
        pCtx.fillText("< CREATIVE TECH & SYSTEMS />", 256, 270);

        // Handwritten caption in white bottom border
        pCtx.font = "italic 22px 'Brush Script MT', cursive, sans-serif";
        pCtx.fillStyle = "#1E293B";
        pCtx.fillText("Crafting thoughtful digital experiences • 2026", 256, 560);
      }

      const polaroidTexture = new THREE.CanvasTexture(pCanvas);
      disposables.push(polaroidTexture);

      const paperMat = new THREE.MeshStandardMaterial({
        map: polaroidTexture,
        roughness: 0.85,
        metalness: 0.05,
      });
      const paperBackMat = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        roughness: 0.9,
      });
      disposables.push(paperMat, paperBackMat);

      // Card Box (slight physical paper thickness)
      const cardGeo = new THREE.BoxGeometry(2.4, 2.9, 0.025);
      disposables.push(cardGeo);
      const card = new THREE.Mesh(cardGeo, paperMat);
      group.add(card);

      return { group };
    };

    // ==========================================
    // 5. REAL OBJECT: MATTE CERAMIC COFFEE MUG
    // ==========================================
    const createCoffeeMug = () => {
      const group = new THREE.Group();

      const ceramicMat = new THREE.MeshStandardMaterial({
        color: 0x14141d,
        roughness: 0.35,
        metalness: 0.15,
      });
      const coffeeMat = new THREE.MeshStandardMaterial({
        color: 0x24140e,
        roughness: 0.15,
        metalness: 0.2,
      });
      disposables.push(ceramicMat, coffeeMat);

      // Mug Cup Body
      const cupGeo = new THREE.CylinderGeometry(0.85, 0.75, 1.6, 32);
      disposables.push(cupGeo);
      const cup = new THREE.Mesh(cupGeo, ceramicMat);
      group.add(cup);

      // Dark Roast Coffee Liquid inside
      const coffeeGeo = new THREE.CircleGeometry(0.78, 32);
      disposables.push(coffeeGeo);
      const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
      coffee.rotation.x = -Math.PI / 2;
      coffee.position.y = 0.65;
      group.add(coffee);

      // Ceramic Side Handle
      const handleGeo = new THREE.TorusGeometry(0.5, 0.12, 16, 32, Math.PI);
      disposables.push(handleGeo);
      const handle = new THREE.Mesh(handleGeo, ceramicMat);
      handle.rotation.z = -Math.PI / 2;
      handle.position.set(0.95, 0, 0);
      group.add(handle);

      return { group };
    };

    // --- Instantiate Real-World Objects ---
    const cassette = createCassette();
    const floppy = createFloppy();
    const keycap = createKeycap();
    const polaroid = createPolaroid();
    const mug = createCoffeeMug();

    // Master container for scroll & parallax transformations
    const spatialMasterGroup = new THREE.Group();
    scene.add(spatialMasterGroup);

    spatialMasterGroup.add(cassette.group);
    spatialMasterGroup.add(floppy.group);
    spatialMasterGroup.add(keycap.group);
    spatialMasterGroup.add(polaroid.group);
    spatialMasterGroup.add(mug.group);

    // Initial scale and baseline positions in 3D scene space
    cassette.group.scale.set(0.9, 0.9, 0.9);
    floppy.group.scale.set(0.85, 0.85, 0.85);
    keycap.group.scale.set(0.95, 0.95, 0.95);
    polaroid.group.scale.set(0.9, 0.9, 0.9);
    mug.group.scale.set(0.8, 0.8, 0.8);

    // Subtle atmospheric dust particles (real air particles around desk objects)
    const dustCount = 120;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 24;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    disposables.push(dustGeo);

    const dustMat = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.5,
    });
    disposables.push(dustMat);
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);

    // --- Scroll & Pointer Tracking ---
    let targetScroll = 0;
    let smoothScroll = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        targetScroll = Math.min(1.0, Math.max(0, window.scrollY / docHeight));
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    handleScroll();

    // --- Animation Loop ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth scroll & mouse lerp
      smoothScroll += (targetScroll - smoothScroll) * 0.065;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Animate Cassette Tape Spools
      cassette.leftHub.rotation.z += delta * 1.8;
      cassette.rightHub.rotation.z += delta * 1.8;

      if (!prefersReducedMotion) {
        // Continuous organic floating bobbing for each real object
        const bob1 = Math.sin(time * 1.2) * 0.12;
        const bob2 = Math.cos(time * 1.4) * 0.12;
        const bob3 = Math.sin(time * 1.6 + 1) * 0.1;
        const bob4 = Math.cos(time * 1.1 + 2) * 0.14;
        const bob5 = Math.sin(time * 1.3 + 3) * 0.1;

        // Dust rotation
        dust.rotation.y = time * 0.015;

        // ====================================================
        // SCROLL-DRIVEN MOTION CHOREOGRAPHY FOR REAL OBJECTS
        // ====================================================

        // 1. Audio Cassette: In Hero (top right), rotates to show clear acrylic and label
        const cX = THREE.MathUtils.lerp(3.2, 4.4, smoothScroll);
        const cY = THREE.MathUtils.lerp(1.8, -3.2, smoothScroll) + bob1;
        const cZ = THREE.MathUtils.lerp(1.5, -2.5, smoothScroll);
        cassette.group.position.set(cX, cY, cZ);
        cassette.group.rotation.set(
          0.35 + smoothScroll * Math.PI * 0.8 + mouseY * 0.15,
          -0.45 + smoothScroll * Math.PI * 1.2 + mouseX * 0.2,
          0.15 + Math.sin(smoothScroll * Math.PI) * 0.3
        );

        // 2. Polaroid Photo: Floating on left side of Hero & WhoIsNehal
        const pX = THREE.MathUtils.lerp(-3.4, -4.2, smoothScroll);
        const pY = THREE.MathUtils.lerp(1.4, -2.0, smoothScroll) + bob2;
        const pZ = THREE.MathUtils.lerp(0.8, -1.8, smoothScroll);
        polaroid.group.position.set(pX, pY, pZ);
        polaroid.group.rotation.set(
          -0.2 + smoothScroll * 0.6 - mouseY * 0.1,
          0.4 - smoothScroll * Math.PI * 0.9 + mouseX * 0.18,
          -0.12 + Math.cos(smoothScroll * Math.PI) * 0.25
        );

        // 3. Vintage Floppy Disk: Transitions from lower background into focus near WhoIsNehal & Projects
        const fX = THREE.MathUtils.lerp(-3.8, -3.2, smoothScroll);
        const fY = THREE.MathUtils.lerp(-4.5, 0.4, smoothScroll) + bob3;
        const fZ = THREE.MathUtils.lerp(-3.0, 1.2, smoothScroll);
        floppy.group.position.set(fX, fY, fZ);
        floppy.group.rotation.set(
          0.25 + smoothScroll * Math.PI * 1.1 + mouseY * 0.12,
          -0.5 + smoothScroll * Math.PI * 1.4 + mouseX * 0.22,
          0.1
        );

        // 4. Artisan Mechanical Keycap: Floats in around Projects section
        const kX = THREE.MathUtils.lerp(4.0, 3.4, smoothScroll);
        const kY = THREE.MathUtils.lerp(-5.0, -0.6, smoothScroll) + bob4;
        const kZ = THREE.MathUtils.lerp(-4.0, 1.4, smoothScroll);
        keycap.group.position.set(kX, kY, kZ);
        keycap.group.rotation.set(
          0.4 + time * 0.25 + mouseY * 0.15,
          time * 0.35 + mouseX * 0.2,
          0.2
        );

        // 5. Ceramic Coffee Mug: Rises towards the bottom near Contact & Freelancing Card
        const mX = THREE.MathUtils.lerp(3.5, 2.8, smoothScroll);
        const mY = THREE.MathUtils.lerp(-7.0, -2.6, smoothScroll) + bob5;
        const mZ = THREE.MathUtils.lerp(-2.0, 1.5, smoothScroll);
        mug.group.position.set(mX, mY, mZ);
        mug.group.rotation.set(
          0.3 + mouseY * 0.1,
          -0.6 + smoothScroll * Math.PI * 0.7 + mouseX * 0.15,
          0.05
        );

        // Master Camera Dolly
        camera.position.z = 12 - Math.sin(smoothScroll * Math.PI) * 2.8;
        camera.position.y = -smoothScroll * 3.2 + mouseY * 0.25;
        camera.position.x = mouseX * 0.35;

        // Dynamic Studio Lighting Reaction
        cyanLight.intensity = 2.8 + Math.sin(smoothScroll * Math.PI * 2) * 1.2;
        indigoLight.intensity = 3.2 + Math.cos(smoothScroll * Math.PI * 2) * 1.4;
        roseLight.intensity = 1.8 + smoothScroll * 2.8;
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup & Disposal ---
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      disposables.forEach((item) => item.dispose());
    };
  }, []);

  if (!hasWebGL) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#0C0C10] via-[#12121A] to-[#0C0C10] opacity-80"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
