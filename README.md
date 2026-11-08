# Nehal Chauhan — Developer Portfolio & Creative Technologist Showcase

A high-performance personal developer portfolio and creative engineering showcase built with **Next.js 16 (Turbopack)**, **React 19**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP**, and **Three.js / React Three Fiber**.

---

## 🌟 Key Highlights & Architecture

### 1. 🪪 Interactive 3D ID Staff Pass Lanyard
- **Three.js & Rapier Physics**: Realistic real-time physics-based lanyard strap and staff badge with draggable spring tension, momentum dampening, and specular normal reflections.
- **Dynamic Orientation Tracking**: Mouse & gyroscope tilt reaction with zero layout shift.
- **Smart Visitor Routing**: Integrated First-Time Visitor controller allowing returning visitors to jump directly into the content while letting newcomers interact with the 3D pass.

### 2. 🏝️ Unified Dynamic Island Navigation HUD (Skiper UI)
- **Floating Island Dock**: Compact top pill navigation bar inspired by Skiper UI.
- **Scroll-Aware Ingress**: Automatically stays hidden on the 3D ID pass fold and smoothly slides into view when scrolling through content.
- **Fluid Spring Morphing**: Expands into an interactive developer command center with a live India Standard Time (IST) clock, direct email copier, and dark/light theme switch.

### 3. 🖥️ Interactive Device Plug-In Workstation
- **Scroll-Driven 3D Storytelling**: High-DPI canvas workstation rendering dynamic desktop screens and terminal runtimes as you scroll down the page.

### 4. 🧲 Gesture-Driven Micro-Interactions (Bencho.dev)
- **Magnetic Physics**: Cursor delta vector attraction (`stiffness: 220, damping: 18`) applied to hero CTAs and project cards with mobile touch detection fallback.
- **Sliding Segmented Control**: Tactile filter tabs with gliding background pill indicators for filtering projects by category in real time.
- **Strictly Zero Audio**: Fluid tactile feedback without audio synthesizer overhead.

### 5. 🌊 Cinematic Scroll Depth Tracker (Scrolltide.co)
- **Fluid Wave Groove**: Spring-damped tide progress groove tracking reading depth.
- **Waypoint Navigation**: Interactive milestone markers (`HOME`, `ABOUT`, `LAB`, `WORK`, `STACK`, `CAREER`, `CONTACT`) with `IntersectionObserver` waypoint detection.
- **Liquid Meniscus Glass Lens**: Specular chromatic refraction effect on collaboration cards.

### 6. ⚡ Dual-Track Kinetic Velocity Marquee
- **Animaster Infinite Marquee**: Seamless dual-track kinetic skills ribbon showcasing mobile runtimes (Android SDK, Java, XML, Gradle) and web ecosystems (Next.js, TypeScript, React 19, Tailwind, Redis, TiDB, Node.js).

### 7. 📱 Full-Screen Widescreen Responsive Layout
- Fluid max-width architecture (`max-w-[1440px] 2xl:max-w-[1600px]`) engineered to fill modern 1080p, 1440p, and 4K displays while reflowing into touch-friendly layouts on mobile and tablet screens.

---

## 🛠️ Technical Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **UI Library** | [React 19](https://react.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Motion & Gestures** | [Framer Motion](https://www.framer.com/motion/) & [GSAP ScrollTrigger](https://greensock.com/gsap/) |
| **3D & WebGL** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Deployment** | [Vercel Edge Network](https://vercel.com/) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.18+` or `20.x+`
- `npm` or `pnpm`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mRcOol7/nehal-portfolio.git
   cd nehal-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build & Typecheck

```bash
# Typecheck TypeScript
npx tsc --noEmit

# Build production bundle
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
├── public/                 # Static assets (3D GLTF models, photographs, spritesheets)
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, Google Fonts & theme providers
│   │   ├── page.tsx        # Main homepage assembly
│   │   └── globals.css     # Global styles & Tailwind CSS configuration
│   ├── components/         # Modular React components
│   │   ├── LanyardBadgeHero.tsx       # 3D interactive ID badge lanyard (Three.js/Rapier)
│   │   ├── SkiperDynamicIsland.tsx    # Floating dynamic island HUD & navigation dock
│   │   ├── HeroBanner.tsx             # Panoramic hero banner with live snowfall overlay
│   │   ├── InteractiveAvatar.tsx      # 9-directional cursor-tracking boop sprite avatar
│   │   ├── WhoIsNehal.tsx             # Interactive typographic karaoke scroll scrub & milestones
│   │   ├── DevicePlugScrollSection.tsx# Scroll-linked 3D workstation canvas
│   │   ├── ProjectsSection.tsx        # Project showcase with Bencho segmented filter
│   │   ├── BenchoMagnetic.tsx         # Gesture-driven magnetic cursor attraction
│   │   ├── BenchoSegmentedControl.tsx # Gliding pill segmented tabs
│   │   ├── ScrolltideTracker.tsx      # Vertical tide scroll waypoint tracker
│   │   ├── ScrolltideGlassLens.tsx    # Liquid meniscus chromatic light refraction
│   │   ├── TechStack.tsx              # Dual-track kinetic velocity marquee
│   │   ├── ExperienceSection.tsx      # Career timeline & technical contributions
│   │   ├── FreelancingCard.tsx        # Collaboration CTA with Vengeance glow
│   │   └── ContactFooter.tsx          # High-impact conversion hub & brand watermark
│   └── data/
│       └── portfolioData.ts           # Centralized typed data source
└── package.json
```

---

## 👨‍💻 Author & Connect

**Nehal Chauhan**  
*Full-Stack Web Developer & Native Android Engineer*  
📍 Gujarat, India

- **GitHub**: [@mRcOol7](https://github.com/mRcOol7)
- **LinkedIn**: [in/nehal-chauhan19](https://www.linkedin.com/in/nehal-chauhan19)
- **Email**: [nehalchauhan19@gmail.com](mailto:nehalchauhan19@gmail.com)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
