"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { siteCopy } from "@/lib/site-copy";

const TYPE_MS = 52;
const ERASE_MS = 14;
const PAUSE_AFTER_TYPING = 720;
const PAUSE_AFTER_ERASE = 170;
const PAUSE_BEFORE_TAGLINE_MS = 420;

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
  const taglinePrefixLen = roleLead.length + 1;

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
        setTaglineCaretVisible(true);
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

        setTaglineCaretVisible(true);
      };

      void run();
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timerId);
    };
  }, [reduceMotion, intro1, intro2, fullTagline]);

  const taglinePlain = taglineDisplay.slice(
    0,
    Math.min(taglineDisplay.length, taglinePrefixLen)
  );
  const taglineGreen = taglineDisplay.slice(taglinePrefixLen);

  return (
    <div className="flex w-full flex-col items-center gap-1 text-center sm:gap-1.5">
      <h1
        className="relative mx-auto w-full max-w-5xl px-2 text-center font-serif text-4xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        aria-live="polite"
      >
        <span className="inline-block max-w-full break-words [overflow-wrap:anywhere]">
          {display}
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
          className="max-w-3xl text-lg font-medium leading-snug sm:text-xl md:text-2xl lg:text-3xl"
          aria-live="polite"
        >
          <span className="text-foreground/90">{taglinePlain}</span>
          <span className="gradient-text">{taglineGreen}</span>
          {taglineCaretVisible ? (
            <span
              className="ml-0.5 inline-block w-[0.06em] min-w-[2px] animate-pulse align-baseline font-sans text-lg font-light text-foreground/80 sm:text-xl md:text-2xl lg:text-3xl"
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
