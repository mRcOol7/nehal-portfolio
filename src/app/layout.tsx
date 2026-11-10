import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono, Alex_Brush } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  variable: "--font-alex-brush",
  display: "swap",
  weight: ["400"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const siteDescription =
  "Portfolio of Nehal Chauhan, Software Engineer specializing in Native Android (Java), modern React/Next.js platforms, and high-performance web systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nehalchauhan.site"),
  title: "Nehal Chauhan — Software Engineer · Native Android & Full-Stack Web",
  description: siteDescription,
  keywords: [
    "Nehal Chauhan",
    "Software Engineer",
    "Native Android Developer",
    "Full-Stack Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "Portfolio",
  ],
  authors: [{ name: "Nehal Chauhan" }],
  creator: "Nehal Chauhan",
  alternates: {
    canonical: "https://www.nehalchauhan.site",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nehalchauhan.site",
    siteName: "Nehal Chauhan Portfolio",
    title: "Nehal Chauhan — Software Engineer · Native Android & Full-Stack Web",
    description: siteDescription,
    images: [
      {
        url: "/nehal-avatar.jpg",
        width: 1200,
        height: 630,
        alt: "Nehal Chauhan — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nehal Chauhan — Software Engineer · Native Android & Full-Stack Web",
    description: siteDescription,
    creator: "@mRcOol7",
    images: ["/nehal-avatar.jpg"],
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/icon.png", sizes: "256x256", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.nehalchauhan.site/#person",
      name: "Nehal Mukeshbhai Chauhan",
      alternateName: "Nehal Chauhan",
      url: "https://www.nehalchauhan.site",
      image: "https://www.nehalchauhan.site/nehal-avatar.jpg",
      jobTitle: "Software Engineer",
      telephone: "+91-9913161524",
      email: "mailto:cnehal194@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gujarat",
        addressCountry: "IN",
      },
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "Parul University",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Encoraa ESG",
      },
      sameAs: [
        "https://www.linkedin.com/in/nehal-chauhan19",
        "https://github.com/mRcOol7",
      ],
      knowsAbout: [
        "Native Android",
        "Java",
        "React.js",
        "Next.js",
        "TypeScript",
        "Three.js",
        "Computer Vision",
        "OpenCV",
        "MediaPipe",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.nehalchauhan.site/#website",
      url: "https://www.nehalchauhan.site",
      name: "Nehal Chauhan — Software Engineer Portfolio",
      description: siteDescription,
      publisher: {
        "@id": "https://www.nehalchauhan.site/#person",
      },
    },
  ],
};

import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head suppressHydrationWarning>
        <meta name="page-type" content="software" />
        <meta name="site-kind" content="software" />
        <meta name="theme-color" content="#0C0C10" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#FAFAFC" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'light') {
                  document.documentElement.classList.remove('dark');
                } else {
                  document.documentElement.classList.add('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} ${alexBrush.variable} bg-[#FAFAFC] dark:bg-[#0C0C10] text-[#1E1E28] dark:text-[#E8E8EE] min-h-screen font-sans selection:bg-[#E11D48]/20 selection:text-[#E11D48] transition-colors duration-200 antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
