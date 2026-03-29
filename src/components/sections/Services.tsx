"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Code2, Palette, Sparkles, Zap } from "lucide-react";
import {
  SERVICE_ORDER,
  SERVICE_ICONS,
  type ServiceIconName,
} from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";
import SectionFibers from "@/components/layout/SectionFibers";

const ICON_MAP: Record<ServiceIconName, ReactNode> = {
  Code2: <Code2 className="h-6 w-6" />,
  Palette: <Palette className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Zap: <Zap className="h-6 w-6" />,
};

interface ServiceCardProps {
  iconName: ServiceIconName;
  title: string;
  description: string;
  index: number;
}

function ServiceCard({
  iconName,
  title,
  description,
  index,
}: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y }}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <article
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-card-border bg-card p-8 md:p-10",
          "transition-all duration-500",
          "hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(45,216,132,0.09), transparent 40%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-accent/10 p-3 text-accent">
            {ICON_MAP[iconName]}
          </div>
          <h3 className="mb-3 font-serif text-xl font-semibold md:text-2xl">
            {title}
          </h3>
          <p className="text-muted leading-relaxed">{description}</p>
        </div>
      </article>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative py-32 px-6 md:py-40 overflow-hidden"
      aria-labelledby="heading-services"
    >
      <SectionFibers preset="services" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          titleId="heading-services"
          label={siteCopy.services.label}
          title={siteCopy.services.title}
          description={siteCopy.services.description}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {SERVICE_ORDER.map((serviceKey, i) => {
            const block = siteCopy.services[serviceKey];
            return (
              <ServiceCard
                key={serviceKey}
                iconName={SERVICE_ICONS[i]}
                title={block.title}
                description={block.description}
                index={i}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
