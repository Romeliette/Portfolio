"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Header() {
  const pathname = usePathname();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    // If we are already on the homepage, prevent default navigation and scroll smoothly
    if (pathname === "/") {
      e.preventDefault();
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
        // Optionally update the URL hash without jumping
        window.history.pushState(null, "", `#${targetId}`);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/60 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-display font-bold sm:inline-block tracking-tight text-xl">MINTADA<span className="text-primary"> . </span></span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link
            href="/about"
            className="text-md font-medium text-muted-foreground transition-colors hover:text-white"
          >
            About
          </Link>
          <Link
            href="/#showcase"
            onClick={(e) => handleScroll(e, "showcase")}
            className="text-md font-medium text-muted-foreground transition-colors hover:text-white"
          >
            My Design
          </Link>
          {/* <Link
            href="/#work"
            onClick={(e) => handleScroll(e, "work")}
            className="text-md font-medium text-muted-foreground transition-colors hover:text-black"
          >
            All Work
          </Link> */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md font-medium text-muted-foreground transition-colors hover:text-white"
          >
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
