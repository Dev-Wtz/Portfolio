"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  splitBy?: "word" | "char";
  once?: boolean;
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: EASE,
    },
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: EASE,
    },
  }),
};

export default function AnimatedText({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
  splitBy = "word",
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  const units = splitBy === "char" ? text.split("") : text.split(" ");
  const variants = splitBy === "char" ? charVariants : wordVariants;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement & HTMLSpanElement>}
      className={cn("flex flex-wrap", className)}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span
          key={`${unit}-${i}`}
          custom={i + delay}
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="inline-block"
        >
          {unit}
          {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </Tag>
  );
}
