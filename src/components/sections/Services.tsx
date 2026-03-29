"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Bot, Code2, Layers, Palette, Sparkles, Zap } from "lucide-react";
import {
  SERVICE_ORDER,
  SERVICE_ICONS,
  type ServiceIconName,
} from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";
import SectionFibers from "@/components/layout/SectionFibers";

/** Mobile horizontal scroll — cartes services plus compactes que la grille projets. */
const MOBILE_CARD_W = "w-[min(76vw,15.5rem)]";
const MOBILE_CARD_H = "h-[17.75rem]";

const ICON_MAP_MOBILE: Record<ServiceIconName, ReactNode> = {
  Code2: <Code2 className="h-4 w-4" />,
  Palette: <Palette className="h-4 w-4" />,
  Sparkles: <Sparkles className="h-4 w-4" />,
  Zap: <Zap className="h-4 w-4" />,
  Bot: <Bot className="h-4 w-4" />,
  Layers: <Layers className="h-4 w-4" />,
};

const ICON_MAP: Record<ServiceIconName, ReactNode> = {
  Code2: <Code2 className="h-5 w-5 sm:h-6 sm:w-6" />,
  Palette: <Palette className="h-5 w-5 sm:h-6 sm:w-6" />,
  Sparkles: <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />,
  Zap: <Zap className="h-5 w-5 sm:h-6 sm:w-6" />,
  Bot: <Bot className="h-5 w-5 sm:h-6 sm:w-6" />,
  Layers: <Layers className="h-5 w-5 sm:h-6 sm:w-6" />,
};

interface ServiceCardMobileProps {
  iconName: ServiceIconName;
  title: string;
  description: string;
}

function ServiceCardMobile({
  iconName,
  title,
  description,
}: ServiceCardMobileProps) {
  return (
    <article
      className={cn(
        "flex shrink-0 snap-center flex-col overflow-hidden rounded-lg border border-card-border bg-card p-3",
        MOBILE_CARD_W,
        MOBILE_CARD_H,
        "transition-all duration-500",
        "active:border-accent/20"
      )}
    >
      <div className="mb-2 inline-flex shrink-0 items-center justify-center self-start rounded-md bg-accent/10 p-2 text-accent">
        {ICON_MAP_MOBILE[iconName]}
      </div>
      <h3 className="mb-1 line-clamp-2 shrink-0 font-serif text-sm font-semibold leading-snug">
        {title}
      </h3>
      <p className="min-h-0 flex-1 text-[0.8125rem] leading-relaxed text-muted line-clamp-[8]">
        {description}
      </p>
    </article>
  );
}

interface ServiceCardDesktopProps {
  iconName: ServiceIconName;
  title: string;
  description: string;
  index: number;
}

function ServiceCardDesktop({
  iconName,
  title,
  description,
  index,
}: ServiceCardDesktopProps) {
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
          "group relative overflow-hidden rounded-2xl border border-card-border bg-card p-6 md:p-8",
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
          <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-accent/10 p-2.5 text-accent">
            {ICON_MAP[iconName]}
          </div>
          <h3 className="mb-2 font-serif text-lg font-semibold md:text-xl">
            {title}
          </h3>
          <p className="text-sm leading-relaxed text-muted md:text-[0.9375rem]">
            {description}
          </p>
        </div>
      </article>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden py-12 sm:py-20 md:py-28"
      aria-labelledby="heading-services"
    >
      <SectionFibers preset="services" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          titleId="heading-services"
          label={siteCopy.services.label}
          title={siteCopy.services.title}
          description={siteCopy.services.description}
        />
      </div>

      {/* Mobile: horizontal scroll */}
      <div
        className="flex gap-2.5 overflow-x-auto scroll-smooth px-4 pb-4 snap-x snap-mandatory sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="list"
      >
        {SERVICE_ORDER.map((serviceKey, i) => {
          const block = siteCopy.services[serviceKey];
          return (
            <ServiceCardMobile
              key={serviceKey}
              iconName={SERVICE_ICONS[i]}
              title={block.title}
              description={block.description}
            />
          );
        })}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>

      {/* Desktop: grid */}
      <div className="mx-auto hidden max-w-6xl px-6 sm:block">
        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {SERVICE_ORDER.map((serviceKey, i) => {
            const block = siteCopy.services[serviceKey];
            return (
              <ServiceCardDesktop
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
