# PRD: Tangible Real-World 3D Objects Spatial Scroll Canvas

## 1. Problem & Creative Direction
Abstract floating spheres, toruses, and wireframe icosahedrons feel like generic "AI slop" templates with no human warmth or tangible personality. 
Inspired by award-winning portfolios like Aarya Shah (`aarya.wtf`) and Bruno Simon, this feature replaces generic 3D primitives with authentic, real-world physical objects associated with developer craft, physical media, and creative technology:
1. **Retro Audio Cassette Tape**: Transparent tinted casing, realistic dual spool hubs, wound magnetic tape, and adhesive paper label ("NEHAL // VOL. 1").
2. **Vintage 3.5" Floppy Diskette**: Matte plastic chassis, sliding aluminum shutter, write-protect switch, and project label ("DEV_CORE_2026.DSK").
3. **Artisan Mechanical Keyboard Switch & Keycap**: Translucent switch housing, red cross-stem, and DSA-profile PBT keycap with code glyph.
4. **Physical Polaroid / Photo Print**: Thick textured white paper border, glossy photographic image, and handwritten signature caption.
5. **Matte Ceramic Coffee Mug**: Minimalist developer coffee cup with dark roast surface and clean handle.

## 2. Functional & Visual Requirements
- **Procedural PBR Modeling**: Built with optimized Three.js geometries and high-res 2D Canvas dynamic textures (no bulky 20MB GLTF downloads, 0 network lag, instant load).
- **Physical Materials**:
  - Glossy transparent polycarbonate for cassette body.
  - Brushed aluminum metalness for floppy shutter and spool pins.
  - Matte PBT plastic for keycap.
  - Paper card stock for Polaroid.
  - Matte ceramic glaze for coffee mug.
- **Scroll-Driven Spatial Motion**:
  - As user scrolls, objects float and gently rotate in 3D perspective, showcasing their authentic physical details.
  - Subtle pointer parallax tracks mouse on desktop with realistic physics inertia.
- **Accessibility & Performance**:
  - Respects `prefers-reduced-motion` (locks motion to static layout).
  - WebGL context fallback.
  - Capped pixel ratio at 1.75.
  - Full disposal on unmount.

## 3. Ralph User Stories
- **US-001**: Build procedural 3D model for Retro Audio Cassette Tape with dynamic label canvas and dual spools.
- **US-002**: Build procedural 3D model for 3.5" Floppy Diskette and Mechanical Keyboard Keycap.
- **US-003**: Build procedural 3D model for Polaroid Photo Card and Ceramic Coffee Mug.
- **US-004**: Integrate all real-world objects into `SpatialScrollCanvas.tsx`, orchestrating their scroll trajectory and pointer parallax.
