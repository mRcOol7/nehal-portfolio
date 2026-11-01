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
    scene.fog = new THREE.FogExp2(0x0c0c10, 0.032);

    let width = window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Cyan accent light
    const cyanLight = new THREE.PointLight(0x38bdf8, 3.5, 20);
    cyanLight.position.set(-6, 3, 4);
    scene.add(cyanLight);

    // Electric Indigo accent light
    const indigoLight = new THREE.PointLight(0x6366f1, 4.0, 25);
    indigoLight.position.set(6, -2, 5);
    scene.add(indigoLight);

    // Rose signature glow light
    const roseLight = new THREE.PointLight(0xe11d48, 3.0, 18);
    roseLight.position.set(0, -6, 3);
    scene.add(roseLight);

    // --- 3D Floating Spatial Mesh Group ---
    const spatialGroup = new THREE.Group();
    scene.add(spatialGroup);

    // Materials
    const chromeMat = new THREE.MeshPhysicalMaterial({
      color: 0x181822,
      metalness: 0.95,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });

    const cyanWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    const glowingTorusMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2,
    });

    const roseOrbMat = new THREE.MeshPhysicalMaterial({
      color: 0x881337,
      emissive: 0xe11d48,
      emissiveIntensity: 0.25,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
    });

    // Mesh 1: Primary Center Chrome Orb
    const mainSphereGeo = new THREE.SphereGeometry(1.4, 48, 48);
    const mainSphere = new THREE.Mesh(mainSphereGeo, chromeMat);
    mainSphere.position.set(2.4, 1.2, 0);
    spatialGroup.add(mainSphere);

    // Mesh 2: Surrounding Wireframe Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const icoMesh = new THREE.Mesh(icoGeo, wireframeMat);
    icoMesh.position.set(2.4, 1.2, 0);
    spatialGroup.add(icoMesh);

    // Mesh 3: Orbiting Torus Ring
    const torusGeo = new THREE.TorusGeometry(2.6, 0.08, 16, 80);
    const torusMesh = new THREE.Mesh(torusGeo, glowingTorusMat);
    torusMesh.position.set(2.4, 1.2, 0);
    torusMesh.rotation.x = Math.PI / 3;
    spatialGroup.add(torusMesh);

    // Mesh 4: Secondary Floating Accent Sphere (Left background)
    const secSphereGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const secSphere = new THREE.Mesh(secSphereGeo, roseOrbMat);
    secSphere.position.set(-3.2, -1.8, -1.5);
    spatialGroup.add(secSphere);

    // Mesh 5: Outer Octahedron Core (Cyan)
    const octaGeo = new THREE.OctahedronGeometry(1.2, 0);
    const octaMesh = new THREE.Mesh(octaGeo, cyanWireMat);
    octaMesh.position.set(-3.2, -1.8, -1.5);
    spatialGroup.add(octaMesh);

    // Mesh 6: Floating Mini Nano Spheres (Scatter details)
    const miniSphereGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const miniOrbs: THREE.Mesh[] = [];
    const orbOffsets = [
      { x: 3.8, y: -0.5, z: 1.2 },
      { x: 1.2, y: 2.8, z: -1.0 },
      { x: -2.0, y: 1.8, z: 0.5 },
      { x: -4.2, y: -0.2, z: -0.8 },
      { x: 0.5, y: -3.0, z: 1.0 },
    ];

    orbOffsets.forEach((pos) => {
      const orb = new THREE.Mesh(miniSphereGeo, chromeMat);
      orb.position.set(pos.x, pos.y, pos.z);
      spatialGroup.add(orb);
      miniOrbs.push(orb);
    });

    // Particle Dust Constellation (180 particles)
    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 14;

      // Color variation between cyan and indigo
      const isCyan = Math.random() > 0.5;
      particleColors[i * 3] = isCyan ? 0.22 : 0.39;
      particleColors[i * 3 + 1] = isCyan ? 0.74 : 0.40;
      particleColors[i * 3 + 2] = isCyan ? 0.97 : 0.95;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Scroll & Parallax Tracking ---
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
      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll lerp
      smoothScroll += (targetScroll - smoothScroll) * 0.07;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        // Continuous ambient rotation
        mainSphere.rotation.y += delta * 0.35;
        icoMesh.rotation.x += delta * 0.25;
        icoMesh.rotation.y += delta * 0.4;
        torusMesh.rotation.z += delta * 0.3;
        octaMesh.rotation.y -= delta * 0.35;
        particles.rotation.y = elapsedTime * 0.02;

        // Subtle floating bobbing on mini orbs
        miniOrbs.forEach((orb, idx) => {
          orb.position.y += Math.sin(elapsedTime * 1.5 + idx) * 0.002;
        });

        // --- Scroll Motion Dynamic Paths ---
        // 1. Group Rotation driven by scroll progress
        spatialGroup.rotation.y = smoothScroll * Math.PI * 1.8 + mouseX * 0.15;
        spatialGroup.rotation.x = Math.sin(smoothScroll * Math.PI) * 0.35 - mouseY * 0.12;

        // 2. Camera Spatial Motion along Z and Y
        // Start wide at Hero, dolly into perspective at Projects, pull back smoothly at Footer
        camera.position.z = 11 - Math.sin(smoothScroll * Math.PI) * 3.5;
        camera.position.y = -smoothScroll * 4.5 + mouseY * 0.3;
        camera.position.x = Math.cos(smoothScroll * Math.PI * 1.5) * 1.8 + mouseX * 0.4;

        // 3. Floating Group translation (Spatial choreography)
        // Orbit from right to left as user scrolls through sections
        const sweepX = THREE.MathUtils.lerp(1.8, -2.2, smoothScroll);
        const sweepY = THREE.MathUtils.lerp(0.8, -1.2, smoothScroll);
        spatialGroup.position.set(sweepX, sweepY, 0);

        // 4. Reactive light intensities
        cyanLight.intensity = 3.0 + Math.sin(smoothScroll * Math.PI * 2) * 1.5;
        indigoLight.intensity = 3.5 + Math.cos(smoothScroll * Math.PI * 2) * 1.5;
        roseLight.intensity = 2.0 + smoothScroll * 3.0; // Grows warmer near bottom / contact
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

    // --- Cleanup ---
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      mainSphereGeo.dispose();
      icoGeo.dispose();
      torusGeo.dispose();
      secSphereGeo.dispose();
      octaGeo.dispose();
      miniSphereGeo.dispose();
      particleGeo.dispose();

      chromeMat.dispose();
      wireframeMat.dispose();
      cyanWireMat.dispose();
      glowingTorusMat.dispose();
      roseOrbMat.dispose();
      particleMat.dispose();
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
