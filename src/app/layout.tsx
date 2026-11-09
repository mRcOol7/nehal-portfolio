import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nehalchauhan.site"),
  title: "Nehal Chauhan — Software Engineer · Native Android & Full-Stack Web",
  description:
    "Personal developer portfolio of Nehal Chauhan. Specializing in Native Android (Java), modern React/Next.js platforms, distributed caching, and high-performance web experiences.",
  keywords: [
    "Nehal Chauhan",
    "Software Engineer",
    "Native Android Developer",
    "Full-Stack Web Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Nehal Chauhan" }],
  creator: "Nehal Chauhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nehalchauhan.site",
    siteName: "Nehal Chauhan Portfolio",
    title: "Nehal Chauhan — Software Engineer · Native Android & Full-Stack Web",
    description:
      "Personal developer portfolio of Nehal Chauhan. Specializing in Native Android (Java), modern React/Next.js platforms, distributed caching, and high-performance web experiences.",
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
        className="bg-[#FAFAFC] dark:bg-[#0C0C10] text-[#1E1E28] dark:text-[#E8E8EE] min-h-screen font-sans selection:bg-[#E11D48]/20 selection:text-[#E11D48] transition-colors duration-200 antialiased"
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
