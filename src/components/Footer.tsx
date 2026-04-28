"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sun, Moon } from "lucide-react";
import { showcaseItems } from "@/data/mockData";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <footer className="relative z-10 border-t border-white/8 mt-16">
      <div className="container mx-auto px-4 md:px-8 py-12 md:py-16">

        {/* Main footer grid — 4 columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">

          {/* 1. Logo / Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/logo.webp" alt="Mintada Logo" width={36} height={36} className="rounded-md" />
              <span className="font-display font-bold text-lg tracking-tight text-white">
                MINTADA<span className="text-primary"> .</span>
              </span>
            </Link>
            <p className="font-body text-sm text-white/50 leading-relaxed max-w-[180px]">
              UX/UI &amp; Product Designer based in Bangkok, Thailand.
            </p>
          </div>

          {/* 2. My Design / Showcase links */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">My Design</p>
            <ul className="flex flex-col gap-3">
              {showcaseItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/showcase/${item.id}`}
                    className="group flex items-center gap-1 font-body text-sm text-white/60 hover:text-white transition-colors duration-300"
                  >
                    {item.title}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">Contact</p>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/mintada-phuangminthada-975226304/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 font-body text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  LinkedIn
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 font-body text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  Resume
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>
              </li>
              <li>
                <a
                  href="mailto:mintada.phuangminthada@gmail.com"
                  className="group flex items-center gap-1 font-body text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  Mail
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Copyright + Theme toggle */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4 md:items-end">
            {/* Theme toggle */}
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/8">
              <button
                onClick={toggleTheme}
                className={`p-1 rounded-full transition-all duration-300 ${isDark ? "text-white/30" : "text-primary bg-primary/10"}`}
                aria-label="Light mode"
              >
                <Sun className="h-3.5 w-3.5" />
              </button>
              <div className="w-px h-3 bg-white/10" />
              <button
                onClick={toggleTheme}
                className={`p-1 rounded-full transition-all duration-300 ${isDark ? "text-primary bg-primary/10" : "text-white/30"}`}
                aria-label="Dark mode"
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
            </div>

            <p className="font-mono text-[10px] text-white/30 md:text-right leading-relaxed">
              © {new Date().getFullYear()} Mintada Phuangminthada.<br />
              All Rights Reserved.
            </p>
            <p className="font-mono text-[10px] text-white/20 md:text-right">
              Built with Next.js &amp; Three.js
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
