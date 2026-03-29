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
      className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 pb-10 pt-6 sm:min-h-screen sm:px-6 sm:pb-0 sm:pt-0"
    >
      <SectionFibers preset="hero" />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto w-full max-w-5xl text-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4 inline-flex max-w-[min(100%,22rem)] items-center gap-1.5 rounded-full border border-accent/35 bg-accent/15 px-3 py-1 text-xs leading-snug text-muted sm:mb-6 sm:max-w-none sm:gap-2 sm:px-4 sm:py-1.5 sm:text-sm"
        >
          <span
            className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-secondary/55 motion-reduce:animate-none" />
            <span
              className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-secondary shadow-[0_0_10px_rgba(45,216,132,0.95),0_0_22px_rgba(45,216,132,0.5),inset_0_1px_0_rgba(255,255,255,0.55)] ring-2 ring-accent-secondary/70 sm:h-3 sm:w-3"
            />
          </span>
          <span>{siteCopy.hero.badge}</span>
        </motion.div>

        <HeroAnimatedTitle />

        <div className="mt-3 sm:mt-4 md:mt-6">
          <p className="mx-auto w-[85%] max-w-2xl text-sm leading-relaxed text-muted sm:w-full sm:text-lg md:text-xl lg:text-2xl">
            {siteCopy.hero.subtitleBefore}
            <span className="gradient-text font-semibold">
              {siteCopy.hero.subtitleHighlight}
            </span>
            {siteCopy.hero.subtitleAfter}
          </p>
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-sm grid-cols-2 items-stretch justify-items-stretch gap-2 sm:mt-10 sm:flex sm:max-w-none sm:w-full sm:flex-row sm:flex-wrap sm:justify-center sm:gap-4">
          <MagneticButton
            as="a"
            href="#work"
            variant="accent"
            className="w-full min-h-[2.75rem] justify-center px-2 py-2.5 text-xs font-semibold sm:min-h-0 sm:w-auto sm:min-w-0 sm:px-10 sm:py-4 sm:text-base"
            aria-label={siteCopy.hero.ariaWork}
          >
            {siteCopy.hero.ctaWork}
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#contact"
            variant="ghost"
            className="w-full min-h-[2.75rem] justify-center px-2 py-2.5 text-xs font-medium sm:min-h-0 sm:w-auto sm:min-w-0 sm:px-10 sm:py-4 sm:text-base"
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
