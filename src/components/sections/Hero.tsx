"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import HeroAnimatedTitle from "@/components/sections/HeroAnimatedTitle";
import MagneticButton from "@/components/ui/MagneticButton";
import { siteCopy } from "@/lib/site-copy";
import { ArrowDown } from "lucide-react";
import SectionFibers from "@/components/layout/SectionFibers";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <SectionFibers preset="hero" />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/15 px-4 py-1.5 text-sm text-muted"
        >
          <span
            className="relative flex h-3 w-3 shrink-0"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary/55 motion-reduce:animate-none" />
            <span
              className="relative inline-flex h-3 w-3 rounded-full bg-accent-secondary shadow-[0_0_10px_rgba(45,216,132,0.95),0_0_22px_rgba(45,216,132,0.5),inset_0_1px_0_rgba(255,255,255,0.55)] ring-2 ring-accent-secondary/70"
            />
          </span>
          {siteCopy.hero.badge}
        </motion.div>

        <HeroAnimatedTitle />

        <div className="mt-4 md:mt-6">
          <p className="mx-auto max-w-2xl text-lg text-muted sm:text-xl md:text-2xl">
            {siteCopy.hero.subtitleBefore}
            <span className="gradient-text font-semibold">
              {siteCopy.hero.subtitleHighlight}
            </span>
            {siteCopy.hero.subtitleAfter}
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <MagneticButton
            as="a"
            href="#work"
            variant="accent"
            className="px-10 py-4 text-base font-semibold"
            aria-label={siteCopy.hero.ariaWork}
          >
            {siteCopy.hero.ctaWork}
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            variant="ghost"
            className="px-10 py-4 text-base font-medium"
            aria-label={siteCopy.hero.ariaContact}
          >
            {siteCopy.hero.ctaContact}
          </MagneticButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5 text-muted" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </section>
  );
}
