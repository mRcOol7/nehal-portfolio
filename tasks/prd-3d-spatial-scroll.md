# PRD: 3D Floating Spatial Scroll Canvas

## 1. Overview & Vision
A full-page, high-performance 3D Spatial Canvas that sits in the background of Nehal Chauhan's portfolio. As the user scrolls through the portfolio, a unified Three.js WebGL scene seamlessly animates camera angles, floating glassmorphic panels, metallic chrome orbs, holographic wireframes, and dynamic lighting. Inspired by award-winning creative developer sites like `aarya.wtf` and Apple keynotes, it elevates the portfolio with cinematic polish while maintaining 60 FPS performance and graceful non-WebGL fallbacks.

## 2. Core Functional Requirements
- **Fixed Full-Page 3D Canvas**: Mounts behind content (`pointer-events-none` for background ambient pass, with optional interactive hit testing on desktop).
- **Scroll-Driven Camera & Spatial Transforms**: 
  - Section 1 (Hero): Floating metallic orbs and subtle particle dust with mouse tilt.
  - Section 2 (About / WhoIsNehal): Floating chrome wireframe shapes converging into view.
  - Section 3 (Device / Projects): Camera swoops into perspective with illuminated accent rings and floating tech badges.
  - Section 4 (Contact / Footer): Atmospheric glow and orbital elements settling into a clean constellation.
- **Visual Design & Shading**:
  - Deep dark graphite palette (`#0C0C10`), electric indigo (`#6366F1`), cyan (`#38BDF8`), and rose accents (`#E11D48`).
  - Physically based metallic/roughness materials and emissive rim lighting.
- **Performance & Accessibility**:
  - `prefers-reduced-motion` check: disables scroll transforms and renders an elegant static constellation.
  - Device pixel ratio capped at 1.75 to prevent mobile GPU throttling.
  - Uses `requestAnimationFrame` with smooth lerp interpolation.
  - Clean resource disposal (`geometry.dispose()`, `material.dispose()`, `renderer.dispose()`) on component unmount.

## 3. User Stories (Sized for Ralph Execution)
1. **US-001**: Build `SpatialScrollCanvas.tsx` component with Three.js scene, camera, lights, and responsive resize handler.
2. **US-002**: Add 3D floating meshes (chrome spheres, icosahedron wireframes, glowing accent rings, glass particles) with smooth scroll interpolation (`scrollProgress`).
3. **US-003**: Integrate `SpatialScrollCanvas` into `src/app/page.tsx` and calibrate scroll milestones for Hero, WhoIsNehal, Projects, and Footer.
4. **US-004**: Add subtle pointer parallax on desktop + graceful non-WebGL fallback and reduced-motion compliance.
