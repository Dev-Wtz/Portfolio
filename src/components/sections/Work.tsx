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

function ProjectCard({ project, index }: ProjectCardProps) {
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
          "group relative overflow-hidden rounded-2xl border border-card-border bg-card",
          "cursor-pointer transition-all duration-500",
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
            className="absolute bottom-0 left-0 h-0.5"
            style={{ background: project.color }}
            initial={{ width: "0%" }}
            animate={{ width: isHovered ? "100%" : "0%" }}
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
    <div ref={containerRef} className="mt-16 overflow-hidden">
      <motion.div style={{ x }} className="flex gap-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-4 text-6xl font-bold text-white/[0.02] md:text-8xl"
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
      className="relative py-32 px-6 md:py-40 overflow-hidden"
      aria-labelledby="heading-work"
    >
      <SectionFibers preset="work" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="heading-work"
          label={siteCopy.work.label}
          title={siteCopy.work.title}
          description={siteCopy.work.description}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <MagneticButton
            as="a"
            href="#contact"
            variant="default"
            className="px-10 py-4 text-sm font-semibold"
            aria-label={siteCopy.work.ariaCta}
          >
            {siteCopy.work.cta}
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </MagneticButton>
        </div>
      </div>

      <HorizontalScroll label={siteCopy.work.marquee} />
    </section>
  );
}
