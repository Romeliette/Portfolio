import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParallaxStars from "@/components/ParallaxStars";
import { ThemeProvider } from "@/context/ThemeContext";

// 1. Elegant serif for display headings
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// 2. Clean modern sans-serif for body & UI
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// 3. Monospace for labels, index numbers, categories
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mintada Design",
  description: "Minimalist portfolio of Mintada Phuangminthada, showcasing UX/UI and Product Design work.",
  icons: {
    icon: "/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${playfair.variable} ${jakarta.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col selection:bg-primary selection:text-primary-foreground relative text-foreground font-jakarta" suppressHydrationWarning>
        <ThemeProvider>
          <ParallaxStars />
          <Header />
          <main className="flex-1 relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
