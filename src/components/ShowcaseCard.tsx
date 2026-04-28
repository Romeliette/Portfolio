"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ShowcaseCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  role?: string;
  duration?: string;
  index?: number;
}

export default function ShowcaseCard({ id, title, category, description, image, role, duration, index = 0 }: ShowcaseCardProps) {
  return (
    <Link href={`/showcase/${id}`} className="group block">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center py-12 md:py-16 border-t border-white/8 hover:border-primary/30 transition-all duration-500">

        {/* Left: Text content */}
        <div className="flex flex-col gap-6">
          {/* Index + Category row */}
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-mono text-white/25 tabular-nums">
              {String(index + 1).padStart(2, "0")} /
            </span>
            <span className="text-[11px] uppercase tracking-[0.2em] text-primary/80 font-medium">
              {category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight group-hover:text-primary transition-colors duration-500">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-white/70 leading-relaxed max-w-xs">
            {description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {role && (
              <span className="text-[11px] uppercase tracking-wider border border-white/10 text-white/70 rounded-full px-3 py-1 group-hover:border-primary/30 group-hover:text-primary/70 transition-all duration-500">
                {role}
              </span>
            )}
            {duration && (
              <span className="text-[11px] uppercase tracking-wider border border-white/10 text-white/70 rounded-full px-3 py-1 group-hover:border-primary/30 group-hover:text-primary/70 transition-all duration-500">
                {duration}
              </span>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-white/60 group-hover:text-white transition-colors duration-300">
              View Case Study
            </span>
            <ArrowRight className="h-4 w-4 text-white/40 -translate-x-1 group-hover:translate-x-1 group-hover:text-primary transition-all duration-300" />
          </div>
        </div>

        {/* Right: Image */}
        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-white/5 border border-white/5 group-hover:border-primary/20 transition-all duration-500">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Accent line on hover */}
        <div className="absolute left-0 top-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-700 ease-out" />
      </div>
    </Link>
  );
}
