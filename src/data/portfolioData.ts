export interface Project {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  metrics?: string;
  links: {
    demo?: string;
    github?: string;
  };
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  summary?: string;
  contributions: string[];
  technologies: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  grade: string;
}

export interface AchievementItem {
  title: string;
  metric: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Nehal Mukeshbhai Chauhan",
    displayName: "Nehal Chauhan",
    tagline:
      "Software Engineer specializing in Native Android (Java) and Full-Stack Web Development (React.js, Next.js, TypeScript, Node.js). Creator of a viral Snapchat AR Lens reaching 915M+ global impressions.",
    summary:
      "Software Engineer specializing in Native Android (Java) and Full-Stack Web Development (React.js, Next.js, TypeScript, Node.js). Creator of a viral Snapchat AR Lens reaching 915M+ global impressions, delivering low-latency distributed caching (Redis, TiDB), secure REST APIs, and automated/manual QA test suites.",
    location: "Gujarat, India",
    phone: "+91-9913161524",
    email: "cnehal194@gmail.com",
    resumeUrl: "/Nehal_Chauhan_Resume.pdf",
    roles: [
      "Software Engineer",
      "Android Developer",
      "Full-Stack Web Developer",
      "React & Next.js Engineer",
    ],
    socials: [
      {
        name: "GitHub",
        url: "https://github.com/mRcOol7",
        username: "github.com/mRcOol7",
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nehal-chauhan19",
        username: "linkedin.com/in/nehal-chauhan19",
      },
      {
        name: "Email",
        url: "mailto:cnehal194@gmail.com",
        username: "cnehal194@gmail.com",
      },
      {
        name: "Live Portfolio",
        url: "https://nehalchauhanportfolio.vercel.app/",
        username: "nehalchauhanportfolio.vercel.app",
      },
    ],
  },

  skills: {
    languages: ["Java", "JavaScript (ES6+)", "TypeScript", "SQL", "HTML5", "CSS3", "Python"],
    frameworks: [
      "Android SDK",
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "TanStack Router",
      "Tailwind CSS",
      "Three.js",
    ],
    databasesAndCloud: [
      "Redis",
      "TiDB",
      "MongoDB",
      "MySQL",
      "Firebase",
      "Vercel Serverless",
      "Vite",
      "Git",
      "GitHub",
      "Android Studio",
    ],
    coreCompetencies: [
      "RESTful APIs",
      "OAuth 2.0",
      "JWT Auth",
      "Postman",
      "Manual & API QA Testing",
      "UI/UX Performance",
      "SEO",
    ],
  },

  experience: [
    {
      id: "encoraa-android",
      role: "Jr. Android Developer",
      company: "Encoraa ESG",
      location: "Gujarat, India",
      period: "June 2025 — Present",
      isCurrent: true,
      contributions: [
        "Engineered native Android features using Java, Android Studio, and modular MVVM architecture, improving UI responsiveness and runtime stability across 10+ target screen densities.",
        "Diagnosed and resolved critical threading, memory leak, and lifecycle bottlenecks, accelerating cold-app startup performance and maintaining consistent 60 FPS user interaction.",
      ],
      technologies: ["Java", "Android Studio", "Android SDK", "MVVM", "Threading & Memory Profiling"],
    },
    {
      id: "encoraa-intern",
      role: "Academic Trainee Engineer — Internship",
      company: "Encoraa ESG",
      location: "Gujarat, India",
      period: "November 2024 — May 2025",
      isCurrent: false,
      contributions: [
        "Developed full-stack web applications using React, Next.js, Node.js, and Express; integrated Redis caching layers to optimize query execution and decrease database load by 40%.",
        "Designed and executed structured manual QA test suites, API validation via Postman, and cross-browser regression testing, resolving 50+ critical edge-case bugs prior to production releases.",
      ],
      technologies: ["React", "Next.js", "Node.js", "Express.js", "Redis", "Postman", "QA Testing"],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "mukesh-ladies-tailor",
      title: "Mukesh Ladies Tailor",
      category: "Production Web App",
      tagline: "Commercial production tailoring platform with 60 FPS smooth scrolling, 3D physics, and serverless telemetry.",
      description:
        "Architected a commercial tailoring platform featuring 60 FPS smooth scrolling, interactive 3D physics, and cursor-reactive SVG motion graphics, achieving a 98+ Google Lighthouse performance rating. Built a serverless telemetry pipeline with IP geolocation, bot-filtering heuristics, and real-time mobile push notifications via ntfy webhooks for zero-delay customer lead capture.",
      stack: ["React.js", "TypeScript", "Vite", "TanStack Router", "Tailwind CSS", "Serverless", "Technical SEO"],
      highlights: [
        "Architected a commercial tailoring platform featuring 60 FPS smooth scrolling, interactive 3D physics, and cursor-reactive SVG motion graphics, achieving a 98+ Google Lighthouse performance rating.",
        "Built a serverless telemetry pipeline with IP geolocation, bot-filtering heuristics, and real-time mobile push notifications via ntfy webhooks for zero-delay customer lead capture.",
      ],
      metrics: "98+ Lighthouse · 60 FPS Scrolling",
      links: {
        demo: "https://www.mukeshladiestailor.shop/",
        github: "https://github.com/mRcOol7",
      },
    },
    {
      id: "social-auth-platform",
      title: "Secure Social Authentication Platform",
      category: "Full-Stack Web App",
      tagline: "Multi-provider OAuth 2.0 authentication engine with NextAuth, RBAC, Redis caching, and TiDB storage.",
      description:
        "Built a secure multi-provider OAuth 2.0 engine (Google, Facebook, Twitter) with NextAuth and RBAC, securing session persistence with Redis caching and sub-200ms end-to-end API response latency. Implemented distributed user storage on TiDB and optimized JWT verification, preventing token replay vulnerabilities.",
      stack: ["Next.js", "TypeScript", "NextAuth", "TiDB", "Redis", "Tailwind CSS"],
      highlights: [
        "Built a secure multi-provider OAuth 2.0 engine (Google, Facebook, Twitter) with NextAuth and RBAC, securing session persistence with Redis caching and sub-200ms end-to-end API response latency.",
        "Implemented distributed user storage on TiDB and optimized JWT verification, preventing token replay vulnerabilities.",
      ],
      metrics: "Sub-200ms latency · OAuth 2.0 & RBAC",
      links: {
        github: "https://github.com/mRcOol7",
      },
    },
    {
      id: "cloud-invoice-system",
      title: "Cloud Invoice Management System",
      category: "Full-Stack Web App",
      tagline: "Automated billing platform with JWT authentication, Cloudinary pipelines, and client-side vector PDF generation.",
      description:
        "Developed an automated billing platform with JWT authentication, Cloudinary asset pipelines, dynamic client-side vector PDF generation, and a rich-text editor dashboard that reduced invoice creation turnaround time by 60%.",
      stack: ["React.js", "Node.js", "Express.js", "JWT", "Cloudinary", "TiDB"],
      highlights: [
        "Developed an automated billing platform with JWT authentication, Cloudinary asset pipelines, dynamic client-side vector PDF generation, and a rich-text editor dashboard.",
        "Reduced invoice creation turnaround time by 60% with streamlined client-side vector PDF rendering.",
      ],
      metrics: "60% faster turnaround · Vector PDF engine",
      links: {
        github: "https://github.com/mRcOol7",
      },
    },
    {
      id: "3d-portfolio-sandbox",
      title: "3D Interactive Portfolio Sandbox",
      category: "Personal Project",
      tagline: "WebGL portfolio sandbox featuring Three.js, Google Model-Viewer AR projection, and 60 FPS particle shaders.",
      description:
        "Built a responsive WebGL portfolio with Three.js and Google Model-Viewer featuring AR spatial projection, real-time camera orbit controls, and 60 FPS interactive particle shaders.",
      stack: ["HTML5", "CSS3", "JavaScript", "Three.js", "Model-Viewer", "WebGL"],
      highlights: [
        "Built a responsive WebGL portfolio with Three.js and Google Model-Viewer featuring AR spatial projection.",
        "Real-time camera orbit controls and 60 FPS interactive particle shaders.",
      ],
      metrics: "AR spatial projection · 60 FPS WebGL",
      links: {
        demo: "https://nehalchauhanportfolio.vercel.app/",
        github: "https://github.com/mRcOol7",
      },
    },
  ] as Project[],

  achievements: [
    {
      title: "Viral Snapchat AR Lens",
      metric: "915.22M+ Impressions",
      description:
        "Built and launched a viral Snapchat AR Lens capturing over 915.22 Million+ global impressions, optimizing real-time facial tracking shaders and asset render performance.",
    },
    {
      title: "Open-Source UI Components",
      metric: "50K+ Community Views",
      description:
        "Authored and open-sourced modular CSS/HTML components on UIverse.io, achieving 50K+ community views and peer developer bookmarks.",
    },
  ] as AchievementItem[],

  education: [
    {
      institution: "Parul University",
      degree: "B.Tech. in Computer Science and Engineering",
      period: "2022 — 2025",
      grade: "CGPA: 7.40 / 10.0",
    },
    {
      institution: "Shree K.J. Polytechnic, Bharuch",
      degree: "Diploma in Computer Engineering",
      period: "2019 — 2022",
      grade: "CGPA: 7.84 / 10.0",
    },
  ] as EducationItem[],

  certifications: [
    "Accenture Nordics (Dev Simulation)",
    "AWS Educate (Cloud 101)",
    "Python Essentials 1 (Cisco)",
    "Introduction to Cybersecurity (Cisco)",
  ],
};
