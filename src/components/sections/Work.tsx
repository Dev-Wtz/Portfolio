"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PROJECT_META, type ProjectSlug } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";
import SectionFibers from "@/components/layout/SectionFibers";

/** Same footprint as service cards on mobile (horizontal scroll). */
const MOBILE_CARD_W = "w-[min(85vw,18.5rem)]";
const MOBILE_CARD_H = "h-[21.5rem]";

interface ProjectDisplay {
  slug: ProjectSlug;
  color: string;
  year: string;
  title: string;
  category: string;
  description: string;
}

interface ProjectCardProps {
  project: ProjectDisplay;
  index: number;
}

function ProjectCardMobile({ project, index }: ProjectCardProps) {
  return (
    <article
      className={cn(
        "flex shrink-0 snap-center flex-col overflow-hidden rounded-xl border border-card-border bg-surface-over-fibers",
        MOBILE_CARD_W,
        MOBILE_CARD_H
      )}
    >
      <div className="relative h-[9.25rem] shrink-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
          }}
        />
        <div className="absolute bottom-2 right-3 font-serif text-5xl font-bold leading-none opacity-5">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col p-3">
        <div className="mb-1.5 flex shrink-0 items-center justify-between gap-2">
          <span
            className="truncate rounded-full px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider"
            style={{
              color: project.color,
              background: `${project.color}15`,
            }}
          >
            {project.category}
          </span>
          <span className="shrink-0 text-[0.65rem] text-muted">{project.year}</span>
        </div>
        <h3 className="mb-1 line-clamp-2 shrink-0 font-serif text-base font-semibold leading-snug">
          {project.title}
        </h3>
        <p className="min-h-0 flex-1 text-xs leading-relaxed text-muted line-clamp-4">
          {project.description}
        </p>
      </div>
    </article>
  );
}

function ProjectCardDesktop({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-5%" });
  const [isHovered, setIsHovered] = useState(false);

  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={cn(isLarge ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1")}
    >
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-card-border bg-surface-over-fibers",
          "cursor-pointer transition-[border-color,box-shadow] duration-500",
          "hover:border-white/10 hover:shadow-2xl hover:shadow-black/20"
        )}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <div
          className={cn(
            "relative overflow-hidden",
            isLarge ? "aspect-[16/9]" : "aspect-[4/3]"
          )}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)`,
            }}
          />

          <div className="absolute bottom-4 right-6 font-serif text-8xl font-bold leading-none opacity-5 md:text-[10rem]">
            {String(index + 1).padStart(2, "0")}
          </div>

          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <motion.div
              initial={false}
              animate={{
                scale: isHovered ? 1 : 0.8,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <ArrowUpRight className="h-6 w-6" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-0 left-0 h-0.5 w-full origin-left transform-gpu"
            style={{ background: project.color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider"
              style={{
                color: project.color,
                background: `${project.color}15`,
              }}
            >
              {project.category}
            </span>
            <span className="text-xs text-muted">{project.year}</span>
          </div>

          <h3 className="mb-2 font-serif text-2xl font-semibold md:text-3xl">
            {project.title}
          </h3>

          <p className="text-sm leading-relaxed text-muted">
            {project.description}
          </p>
        </div>
      </article>
    </motion.div>
  );
}

function HorizontalScroll({ label }: { label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="mt-6 overflow-hidden sm:mt-10">
      <motion.div
        style={{ x }}
        className="flex gap-4 transform-gpu will-change-transform motion-reduce:will-change-auto"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-4 text-4xl font-bold text-white/[0.02] sm:text-6xl md:text-8xl"
          >
            <span className="font-serif whitespace-nowrap">{label}</span>
            <span className="text-accent/20" aria-hidden="true">
              &#x2022;
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function Work() {
  const projects: ProjectDisplay[] = PROJECT_META.map((meta) => {
    const p = siteCopy.work.projects[meta.slug];
    return {
      slug: meta.slug,
      color: meta.color,
      year: meta.year,
      title: p.title,
      category: p.category,
      description: p.description,
    };
  });

  return (
    <section
      id="work"
      className="relative overflow-hidden py-12 sm:py-20 md:py-28"
      aria-labelledby="heading-work"
    >
      <SectionFibers preset="work" />
      <div className="relative z-[3] mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          titleId="heading-work"
          label={siteCopy.work.label}
          title={siteCopy.work.title}
          description={siteCopy.work.description}
        />
      </div>

      {/* Mobile: horizontal scroll carousel */}
      <div
        data-lenis-prevent
        className="relative z-[3] flex gap-3 overflow-x-auto scroll-smooth px-4 pb-4 snap-x snap-mandatory sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {projects.map((project, i) => (
          <ProjectCardMobile key={project.slug} project={project} index={i} />
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>

      {/* Desktop: grid */}
      <div className="relative z-[3] mx-auto hidden max-w-6xl px-6 sm:block">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCardDesktop key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>

      <div className="relative z-[3] mt-6 px-4 text-center sm:mt-8 sm:px-6">
        <MagneticButton
          as="a"
          href="#contact"
          variant="default"
          className="px-8 py-3 text-xs font-semibold sm:px-10 sm:py-4 sm:text-sm"
          aria-label={siteCopy.work.ariaCta}
        >
          {siteCopy.work.cta}
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </MagneticButton>
      </div>

      <HorizontalScroll label={siteCopy.work.marquee} />
    </section>
  );
}
