import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { showcaseItems } from "@/data/mockData";

interface PageProps {
  params: Promise<{ id: string }>;
}

const sectionMeta = [
  { key: "overview",       label: "01 — Overview",        accent: false },
  { key: "problem",        label: "02 — Problem",         accent: true  },
  { key: "research",       label: "03 — Research",        accent: false },
  { key: "designProcess",  label: "04 — Design Process",  accent: false },
  { key: "solution",       label: "05 — Solution",        accent: true  },
  { key: "outcome",        label: "06 — Outcome",         accent: false },
] as const;

export default async function ShowcaseDetail({ params }: PageProps) {
  const resolvedParams = await params;
  const item = showcaseItems.find((i) => i.id === resolvedParams.id);

  if (!item) {
    notFound();
  }

  const images = (item as typeof item & { images?: string[] }).images ?? [];
  return (
    <article className="min-h-screen text-white">

      {/* Hero */}
      <div className="relative w-full aspect-[21/9] overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* Back link */}
        <Link
          href="/#showcase"
          className="absolute top-8 left-8 inline-flex items-center text-sm font-medium text-white/60 hover:text-white transition-colors z-10"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to My Design
        </Link>

        {/* Hero text overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-8 md:px-16 pb-12">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary font-medium mb-3 block">
            {item.category}
          </span>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            {item.title}
          </h1>
          <p className="font-body text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-white/8 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 md:px-16 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Role</p>
            <p className="text-sm font-medium text-white">{item.role}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Duration</p>
            <p className="text-sm font-medium text-white">{item.duration}</p>
          </div>
          <div className="col-span-2">
            <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Tools</p>
            <div className="flex flex-wrap gap-2">
              {item.tools?.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] text-white/60 border border-white/10 rounded-full px-2.5 py-0.5"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Storytelling Sections */}
      <div className="max-w-6xl mx-auto px-8 md:px-16 py-16 md:py-24 space-y-0">
        {sectionMeta.map(({ key, label, accent }) => {
          const content = item[key as keyof typeof item] as string | undefined;
          if (!content) return null;

          return (
            <div
              key={key}
              className={`group grid md:grid-cols-[240px_1fr] gap-8 md:gap-16 py-12 border-t border-white/8 ${accent ? "md:bg-transparent" : ""}`}
            >
              {/* Section label */}
              <div className="pt-1">
                <span className={`font-mono text-[11px] uppercase tracking-[0.18em] ${accent ? "text-primary" : "text-white/30"}`}>
                  {label}
                </span>
              </div>

              {/* Section content */}
              <p className={`font-body text-base md:text-lg leading-relaxed ${accent ? "text-white/95" : "text-white/75"}`}>
                {content}
              </p>
            </div>
          );
        })}
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div className="max-w-6xl mx-auto px-8 md:px-16 pb-16 md:pb-24">
          <div className="border-t border-white/8 pt-12 mb-10">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">Gallery</span>
          </div>

          {/* Responsive masonry-style grid */}
          <div className={`grid gap-4 ${
            images.length >= 6
              ? "grid-cols-2 md:grid-cols-3"
              : images.length >= 4
              ? "grid-cols-2"
              : "grid-cols-1 md:grid-cols-2"
          }`}>
            {images.map((src, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-xl border border-white/5 bg-white/3 ${
                  // Make the first image span 2 columns when ≥ 6 images
                  i === 0 && images.length >= 6 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className="aspect-[16/10] relative">
                  <Image
                    src={src}
                    alt={`${item.title} — screen ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Slide number */}
                <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/40 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom nav */}
      <div className="border-t border-white/8 max-w-6xl mx-auto px-8 md:px-16 py-12">
        <Link
          href="/#showcase"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all projects
        </Link>
      </div>
    </article>
  );
}
