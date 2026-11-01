# Design System Specification — Nehal Chauhan Portfolio

This document defines the visual design system, token architecture, typography hierarchy, motion guidelines, and component specifications for the portfolio.

---

## 1. Visual Identity & Brand Philosophy

- **Aesthetic**: Premium dark editorial mixed with cinematic creative technology.
- **Tone**: Sophisticated, minimalist, high-craft, confident without being noisy.
- **Core Principles**:
  - Purposeful Motion: Animations highlight hierarchy and delight without impeding usability.
  - Generous Negative Space: Let typography and interactive 3D elements breathe.
  - High Contrast & Readability: Text is crisp and legible over deep graphite surfaces.
  - Zero Clutter: Strictly avoid excessive glassmorphism, rainbow gradients, and generic SaaS card patterns.

---

## 2. Color Palette & Tokens

### Base & Surfaces
| Token Name | Hex / Value | Usage |
|---|---|---|
| `bg-primary` | `#09090D` | Deep graphite root background |
| `surface-elevated` | `#12121A` | Cards, modals, floating panels |
| `surface-hover` | `#1A1A26` | Hover states on interactive cards |
| `surface-glass` | `rgba(18, 18, 26, 0.75)` | Sticky nav with subtle backdrop blur (`12px`) |
| `border-subtle` | `rgba(255, 255, 255, 0.08)` | Standard card, divider, and container borders |
| `border-hover` | `rgba(105, 101, 245, 0.40)` | Active or hover state border glow |

### Typography & Foreground
| Token Name | Hex / Value | Usage |
|---|---|---|
| `text-primary` | `#F5F5F7` | Headings, hero display text, primary labels |
| `text-secondary` | `#A1A1B2` | Body paragraphs, descriptions, dates |
| `text-muted` | `#66667A` | Metadata, tags, footnotes, captions |

### Accent Colors
| Token Name | Hex / Value | Usage |
|---|---|---|
| `accent-indigo` | `#6965F5` | Primary CTA buttons, key highlights, active indicators |
| `accent-cyan` | `#36C9E8` | Secondary highlights, tech tags, 3D refraction sheen |
| `accent-plum` | `#3E0132` | Subtle ambient background radial gradients (sparingly) |

---

## 3. Typography System

- **Display Headings**: `Space Grotesk` or `Outfit` (sans-serif, geometric, futuristic character)
- **Body & Editorial**: `Inter` or `Plus Jakarta Sans` (ultra-clean, highly readable)
- **Code & Tech Specs**: `JetBrains Mono` (monospace)

### Hierarchy
- **Hero Title**: `clamp(2.75rem, 8vw, 6rem)` — Bold 700 / ExtraBold 800, tracking tight (`-0.03em`)
- **Section Heading**: `clamp(2rem, 4vw, 3.25rem)` — SemiBold 600, tracking (`-0.02em`)
- **Card Heading**: `1.375rem – 1.75rem` — Medium 500 / SemiBold 600
- **Body Large**: `1.125rem` (18px) — Line height 1.6
- **Body Regular**: `1rem` (16px) — Line height 1.65
- **Small / Tags**: `0.8125rem` (13px) — Monospace / Medium 500, tracking wide (`+0.05em`)

---

## 4. Spacing, Grid & Layout

- **Base Unit**: 4px / 8px scale.
- **Max Width**:
  - Full container: `max-w-7xl` (`1280px`) with fluid horizontal padding (`px-6 sm:px-8 lg:px-12`).
  - Editorial text block: `max-w-2xl` (`672px`).
- **Section Spacing**: `py-24 sm:py-32` (`96px – 128px`) to ensure distinct visual milestones.
- **Border Radii**: Restrained modern curvature:
  - Cards: `rounded-2xl` (`16px`)
  - Buttons / Badges: `rounded-full` (`9999px`) or `rounded-xl` (`12px`)

---

## 5. 3D & Motion Direction

1. **Hero 3D Canvas**:
   - Single optimized React Three Fiber scene with dynamic imports and SSR disabled.
   - Abstract iridescent glass/chrome sculpture with kinetic particle constellation.
   - Smooth pointer parallax on desktop; static/lightweight visual representation on mobile.
   - Cap `dpr={[1, 1.5]}` to prevent GPU thermal throttling.
   - Pause rendering when out of viewport.
2. **Animation Libraries**:
   - **GSAP + ScrollTrigger**: For pinned section transitions and scroll choreography.
   - **Framer Motion**: For component entry reveals, button physics, modal mounts, and hover transitions.
   - *Rule*: Never mix GSAP and Framer Motion on the same DOM element.
3. **Accessibility**:
   - Respect `prefers-reduced-motion: reduce`. Automatically disable 3D rotation loops and smooth scroll when requested.

---

## 6. Component Specs

1. **Header / Navbar**:
   - Monogram logo (`NC`), navigation anchor links, availability status badge, and "Get in touch" CTA button.
   - Glassmorphic backdrop with blur, sticky/fixed with hide-on-scroll-down behavior.
2. **Hero Section**:
   - Immediate HTML rendering for instant First Contentful Paint.
   - Status pill: *"Available for select opportunities"*.
   - Giant typographic statement: `NEHAL CHAUHAN`.
   - Role badge: `Frontend Developer · React Native Developer · Creative Technologist`.
   - Interactive 3D art piece on desktop, responsive layout for mobile.
3. **Selected Work (Projects)**:
   - Modular, typed data schema (`data/projects.ts`).
   - Project cards featuring high-res imagery/canvas preview, tech pills, problem/solution narrative, role, and action links.
4. **About Narrative**:
   - Split layout: Personal philosophy, design-engineering crossover, and key stats/metrics.
5. **Skills & Toolkit Matrix**:
   - Categorized by: Frontend, Mobile (React Native), Backend/API, Creative Tech (Three.js/GSAP), Dev Tools.
   - Clean interactive chips with visual mastery cues.
6. **Experience Timeline**:
   - Clean vertical timeline with milestone nodes, organization, position, time span, and measurable impact highlights.
7. **Creative Lab**:
   - Interactive mini-experiments showcasing shader effects, micro-interactions, or algorithmic visualizers.
8. **Contact Section & Dynamic Footer**:
   - Magnetic email copy button, social links (GitHub, LinkedIn, X, etc.), contact form/mail trigger, copyright with dynamic year.
