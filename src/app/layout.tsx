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
  title: "Nehal Chauhan — Frontend Developer & Creative Technologist",
  description:
    "Personal portfolio of Nehal Chauhan. I design and build products that feel effortless to use and enjoyable to interact with. Specializing in frontend architecture, React Native, and creative web technologies.",
  keywords: [
    "Nehal Chauhan",
    "Frontend Developer",
    "React Native Developer",
    "Creative Technologist",
    "Portfolio",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Nehal Chauhan" }],
  creator: "Nehal Chauhan",
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
