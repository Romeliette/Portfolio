"use client";

import { showcaseItems, allWorkItems } from "@/data/mockData";
import ShowcaseCard from "@/components/ShowcaseCard";
import WorkGridItem from "@/components/WorkGridItem";
import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import ParticleRing from "@/components/ParticleSphere";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Home() {
  const { scrollY } = useScroll();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [showAllExplorations, setShowAllExplorations] = useState(false);

  // Sort allWorkItems by year descending
  const sortedWorkItems = [...allWorkItems].sort((a, b) => Number(b.year) - Number(a.year));
  const years = [...new Set(sortedWorkItems.map(i => i.year))];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 100) {
      setShowScrollIndicator(false);
    } else if (latest < previous) {
      setShowScrollIndicator(true);
    }
  });

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-hidden relative min-h-screen">

      {/* 1. Hero Section */}
      <section id="about" className="pt-6 md:pt-8 pb-20 relative z-10 flex items-center min-h-[90vh]">
        <ParticleRing />

        <div className="container mx-auto px-4 md:px-6 flex justify-center">
          <div className="flex flex-col items-center text-center gap-10 md:gap-12 max-w-4xl">

            <motion.div
              className="space-y-4 flex flex-col items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Role label — Space Mono */}
              <motion.p
                variants={itemVariants}
                className="text-sm text-muted-foreground font-mono tracking-[0.25em] uppercase mb-2"
              >
                UX/UI &amp; Product Designer
              </motion.p>

              {/* Name — Playfair Display */}
              <motion.h1
                variants={itemVariants}
                className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-8xl"
              >
              <span className="hero-name bg-gradient-to-r from-primary via-[#00E5FF] to-white bg-clip-text text-transparent">
                  Mintada Phuangminthada
                </span>
              </motion.h1>
            </motion.div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={
            showScrollIndicator
              ? { opacity: 0.6, y: [0, 8, 0] }
              : { opacity: 0, y: 10 }
          }
          transition={
            showScrollIndicator
              ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.3, ease: "easeOut" }
          }
          style={{ pointerEvents: showScrollIndicator ? "auto" : "none" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>

        {/* Designer Quote */}
        <motion.div
          className="absolute bottom-8 right-8 hidden md:block text-right px-8 md:px-24"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.5, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground italic">
            &ldquo;Good design is obvious.<br/>Great design is transparent.&rdquo;
          </p>
          <p className="font-mono text-[9px] uppercase tracking-widest text-white/60 mt-1">— Joe Sparano</p>
        </motion.div>
      </section>

      {/* 2. Showcase Section */}
      <section id="showcase" className="relative py-16">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              {/* Section label — Space Mono */}
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-3">Selected Work</p>
              {/* Section heading — Playfair */}
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">My Design</h2>
              <p className="mt-3 font-body text-sm uppercase tracking-widest text-muted-foreground">Detailed case studies of my recent projects.</p>
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {showcaseItems.map((item, i) => (
              <motion.div key={item.id} variants={itemVariants}>
                <ShowcaseCard {...item} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. All My Work Section */}
      <section id="work">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-3">Explorations</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Other Work</h2>
              <p className="mt-3 font-body text-sm uppercase tracking-widest text-muted-foreground">A collection of concepts, side projects, and experiments.</p>
            </div>
            <p className="font-mono text-[11px] text-white/30 tabular-nums">{sortedWorkItems.length} projects</p>
          </motion.div>

          {/* Grouped by year */}
          <div className="flex flex-col gap-16">
            {years.map((year) => {
              const items = sortedWorkItems.filter(i => i.year === year);
              return (
                <div key={year}>
                  {/* Year divider */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-xs text-primary tracking-widest">{year}</span>
                    <div className="flex-1 h-px bg-white/8" />
                    <span className="font-mono text-[10px] text-white/25">{items.length} project{items.length !== 1 ? "s" : ""}</span>
                  </div>
                  <motion.div
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    {items.map((item, index) => (
                      <motion.div key={index} variants={itemVariants}>
                        <WorkGridItem {...item} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
