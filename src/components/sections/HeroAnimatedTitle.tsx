"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";

const TYPE_MS = 52;
const ERASE_MS = 14;
const PAUSE_AFTER_TYPING = 720;
const PAUSE_AFTER_ERASE = 170;
const PAUSE_BEFORE_TAGLINE_MS = 420;

const CHAR_SHINE_EASE: [number, number, number, number] = [
  0.25, 0.46, 0.45, 0.94,
];

/** H1 — léger halo clair en tête de lettre + ombres de lisibilité. */
const H1_LEGIBILITY_SHADOW =
  "[text-shadow:0_-1px_6px_rgba(255,255,255,0.1),0_1px_2px_rgba(0,0,0,0.72),0_0_10px_rgba(0,0,0,0.38),0_2px_14px_rgba(0,0,0,0.28)]";

const TAGLINE_SHINE_INITIAL =
  "brightness(1.65) drop-shadow(0 0 16px rgba(45,216,132,0.95)) drop-shadow(0 0 7px rgba(45,216,132,0.72))";

/** Après la frappe : reste un peu plus lumineux + halo vert discret. */
const TAGLINE_SHINE_SETTLED =
  "brightness(1.1) drop-shadow(0 0 14px rgba(45,216,132,0.26)) drop-shadow(0 0 6px rgba(45,216,132,0.17))";

const H1_SHINE_INITIAL =
  "brightness(1.52) drop-shadow(0 0 14px rgba(210,225,216,0.62)) drop-shadow(0 0 6px rgba(196,208,201,0.48))";

const H1_SHINE_SETTLED =
  "brightness(1.08) drop-shadow(0 0 12px rgba(220,232,226,0.22)) drop-shadow(0 0 5px rgba(255,255,255,0.12))";

interface GradientTypingCharProps {
  char: string;
  motionSafe: boolean;
  tone?: "foreground" | "accent";
}

function GradientTypingChar({
  char,
  motionSafe,
  tone = "accent",
}: GradientTypingCharProps) {
  const glyph = char === " " ? "\u00A0" : char;
  const isForeground = tone === "foreground";
  const staticClass = isForeground
    ? cn(
        "inline-block text-foreground",
        "hero-letter-outline",
        H1_LEGIBILITY_SHADOW
      )
    : cn("gradient-text inline-block", "hero-letter-outline");

  if (!isForeground) {
    if (!motionSafe) {
      return (
        <span className={cn(staticClass, "hero-letters-shine-rest-accent")}>
          {glyph}
        </span>
      );
    }
    return (
      <motion.span
        className={staticClass}
        initial={{ filter: TAGLINE_SHINE_INITIAL }}
        animate={{ filter: TAGLINE_SHINE_SETTLED }}
        transition={{ duration: 0.72, ease: CHAR_SHINE_EASE }}
      >
        {glyph}
      </motion.span>
    );
  }

  if (!motionSafe) {
    return (
      <span className={cn(staticClass, "hero-letters-shine-rest-foreground")}>
        {glyph}
      </span>
    );
  }

  return (
    <motion.span
      className={staticClass}
      initial={{ filter: H1_SHINE_INITIAL }}
      animate={{ filter: H1_SHINE_SETTLED }}
      transition={{ duration: 0.72, ease: CHAR_SHINE_EASE }}
    >
      {glyph}
    </motion.span>
  );
}

export default function HeroAnimatedTitle() {
  const reduceMotion = useReducedMotion();
  const intro1 = siteCopy.hero.intro1;
  const intro2 = siteCopy.hero.intro2;
  const roleLead = siteCopy.hero.roleLead;
  const roleTitleHighlight = siteCopy.hero.roleTitleHighlight;

  const fullTagline = useMemo(
    () => `${roleLead} ${roleTitleHighlight}`,
    [roleLead, roleTitleHighlight]
  );

  const [display, setDisplay] = useState("");
  const [caretVisible, setCaretVisible] = useState(true);
  const [showTagline, setShowTagline] = useState(false);
  const [taglineDisplay, setTaglineDisplay] = useState("");
  const [taglineCaretVisible, setTaglineCaretVisible] = useState(false);

  useEffect(() => {
    if (reduceMotion === true) {
      const t = window.setTimeout(() => {
        setDisplay(intro2);
        setCaretVisible(false);
        setShowTagline(true);
        setTaglineDisplay(fullTagline);
        setTaglineCaretVisible(false);
      }, 0);
      return () => window.clearTimeout(t);
    }

    let cancelled = false;

    const timerId = window.setTimeout(() => {
      setCaretVisible(true);
      setShowTagline(false);
      setTaglineDisplay("");
      setTaglineCaretVisible(false);

      const run = async () => {
        setDisplay("");
        for (let i = 0; i < intro1.length; i++) {
          if (cancelled) return;
          await new Promise<void>((r) => setTimeout(r, TYPE_MS));
          if (cancelled) return;
          setDisplay(intro1.slice(0, i + 1));
        }

        await new Promise<void>((r) => setTimeout(r, PAUSE_AFTER_TYPING));
        if (cancelled) return;

        let cur: string = intro1;
        while (cur.length > 0) {
          if (cancelled) return;
          await new Promise<void>((r) => setTimeout(r, ERASE_MS));
          if (cancelled) return;
          cur = cur.slice(0, -1);
          setDisplay(cur);
        }

        await new Promise<void>((r) => setTimeout(r, PAUSE_AFTER_ERASE));
        if (cancelled) return;

        setDisplay("");
        for (let i = 0; i < intro2.length; i++) {
          if (cancelled) return;
          await new Promise<void>((r) => setTimeout(r, TYPE_MS));
          if (cancelled) return;
          setDisplay(intro2.slice(0, i + 1));
        }

        await new Promise<void>((r) => setTimeout(r, PAUSE_BEFORE_TAGLINE_MS));
        if (cancelled) return;

        setCaretVisible(false);
        setShowTagline(true);
        setTaglineCaretVisible(true);
        setTaglineDisplay("");

        for (let i = 0; i < fullTagline.length; i++) {
          if (cancelled) return;
          await new Promise<void>((r) => setTimeout(r, TYPE_MS));
          if (cancelled) return;
          setTaglineDisplay(fullTagline.slice(0, i + 1));
        }

        setTaglineCaretVisible(false);
      };

      void run();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [reduceMotion, intro1, intro2, fullTagline]);

  const headingChars = useMemo(() => Array.from(display), [display]);
  const taglineChars = useMemo(
    () => Array.from(taglineDisplay),
    [taglineDisplay]
  );
  const shineMotionSafe = reduceMotion !== true;

  return (
    <div className="flex w-full flex-col items-center gap-1 text-center sm:gap-1.5">
      <h1
        className="relative mx-auto w-full max-w-5xl px-0 text-center font-serif text-[clamp(1.55rem,11.25vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.02em] sm:px-2 sm:text-6xl sm:leading-tight sm:tracking-tight md:text-7xl lg:text-8xl"
        aria-live="polite"
      >
        <span className="inline-block w-full max-w-full break-words [overflow-wrap:anywhere] max-sm:whitespace-nowrap max-sm:break-normal">
          {headingChars.map((char, i) => (
            <GradientTypingChar
              key={i}
              char={char}
              motionSafe={shineMotionSafe}
              tone="foreground"
            />
          ))}
          {caretVisible ? (
            <span
              className="ml-0.5 inline-block w-[0.08em] min-w-[2px] animate-pulse align-baseline font-sans font-light text-foreground/80"
              aria-hidden="true"
            >
              |
            </span>
          ) : null}
        </span>
      </h1>

      {showTagline ? (
        <p
          className="w-[85%] max-w-3xl text-base font-medium leading-snug sm:w-full sm:text-xl md:text-2xl lg:text-3xl"
          aria-live="polite"
        >
          {taglineChars.map((char, i) => (
            <GradientTypingChar
              key={i}
              char={char}
              motionSafe={shineMotionSafe}
            />
          ))}
          {taglineCaretVisible ? (
            <span
              className="ml-0.5 inline-block w-[0.06em] min-w-[2px] animate-pulse align-baseline font-sans text-base font-light text-foreground/80 sm:text-xl md:text-2xl lg:text-3xl"
              aria-hidden="true"
            >
              |
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  );
}
