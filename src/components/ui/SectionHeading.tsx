"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  /** Sets `id` on the H2 for `aria-labelledby` on the parent section. */
  titleId?: string;
}

export default function SectionHeading({
  label,
  title,
  description,
  className,
  align = "center",
  titleId,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      className={cn(
        "mb-8 md:mb-14",
        align === "center" && "text-center",
        className
      )}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-2 inline-block font-mono text-xs uppercase tracking-widest text-accent sm:mb-4 sm:text-sm"
      >
        {label}
      </motion.p>
      <motion.h2
        id={titleId}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="font-serif text-2xl font-semibold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:mt-6 sm:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
