"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteCopy } from "@/lib/site-copy";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#hero", label: siteCopy.nav.home },
  { href: "#services", label: siteCopy.nav.services },
  { href: "#work", label: siteCopy.nav.work },
  { href: "#contact", label: siteCopy.nav.contact },
] as const;

/** Matches :root --background #050505; alpha lerps with scroll for the nav shell. */
const NAV_BG_RGB = { r: 5, g: 5, b: 5 } as const;
const SCROLL_RANGE_PX = 140;

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollBlend, setScrollBlend] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const interactionProps = useMemo(
    () =>
      prefersReducedMotion === true
        ? {}
        : {
            whileHover: { scale: 1.035, y: -2 },
            whileTap: { scale: 0.97 },
            transition: {
              type: "spring" as const,
              stiffness: 420,
              damping: 26,
            },
          },
    [prefersReducedMotion]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileOpen(false);
      const target = document.querySelector(href);
      target?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const readScroll = () => {
      const y =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop;
      const p = Math.min(1, Math.max(0, y / SCROLL_RANGE_PX));
      setScrollBlend(p);
    };

    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });
    return () => window.removeEventListener("scroll", readScroll);
  }, []);

  const shellStyle = useMemo(() => {
    const { r, g, b } = NAV_BG_RGB;
    const bgA = 0.16 + scrollBlend * 0.52;
    const borderA = 0.05 + scrollBlend * 0.14;
    const shadowA = 0.18 + scrollBlend * 0.28;
    const blurPx = 12 + scrollBlend * 14;
    return {
      backgroundColor: `rgba(${r}, ${g}, ${b}, ${bgA})`,
      borderColor: `rgba(255, 255, 255, ${borderA})`,
      boxShadow: `0 8px 32px rgba(0, 0, 0, ${shadowA})`,
      backdropFilter: `blur(${blurPx}px)`,
      WebkitBackdropFilter: `blur(${blurPx}px)`,
    } satisfies React.CSSProperties;
  }, [scrollBlend]);

  return (
    <>
      <header className="fixed top-4 left-1/2 z-50 w-max max-w-[calc(100vw-1rem)] -translate-x-1/2 px-2 md:px-4">
        <nav
          className={cn(
            "flex items-center gap-2 rounded-full border px-2 py-1.5 md:gap-3 md:px-3 md:py-2"
          )}
          style={shellStyle}
          aria-label={siteCopy.nav.ariaMain}
        >
          <motion.a
            href="#hero"
            className={cn(
              "inline-flex items-center justify-center rounded-full px-3 py-1.5 font-serif text-xl font-bold tracking-tight",
              "outline-none [-webkit-tap-highlight-color:transparent]",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-full"
            )}
            aria-label={siteCopy.nav.ariaHome}
            onClick={(e) => handleNavClick(e, "#hero")}
            {...interactionProps}
          >
            <span className="gradient-text">{siteCopy.nav.brand}</span>
          </motion.a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-muted",
                    "transition-colors duration-200 hover:text-foreground",
                    "outline-none [-webkit-tap-highlight-color:transparent]",
                    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:rounded-full"
                  )}
                  {...interactionProps}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>

          <motion.button
            type="button"
            className={cn(
              "relative z-50 inline-flex items-center justify-center rounded-xl p-2 text-muted md:hidden",
              "transition-colors duration-200 hover:text-foreground",
              "outline-none [-webkit-tap-highlight-color:transparent]",
              "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={
              isMobileOpen
                ? siteCopy.nav.ariaCloseMenu
                : siteCopy.nav.ariaOpenMenu
            }
            aria-expanded={isMobileOpen}
            {...interactionProps}
          >
            {isMobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </motion.button>
        </nav>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm md:hidden",
          "transition-opacity duration-300 ease-out motion-reduce:transition-none",
          !isMobileOpen && "pointer-events-none invisible opacity-0",
          isMobileOpen && "opacity-100"
        )}
        aria-hidden={!isMobileOpen}
      >
        <nav aria-label={siteCopy.nav.ariaMobile}>
          <ul className="flex flex-col items-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-2xl px-6 py-2.5 font-serif text-2xl font-semibold text-foreground sm:text-3xl",
                    "transition-colors duration-200 hover:text-accent",
                    "outline-none [-webkit-tap-highlight-color:transparent]",
                    "focus-visible:ring-2 focus-visible:ring-accent focus-visible:rounded-2xl"
                  )}
                  {...interactionProps}
                >
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
