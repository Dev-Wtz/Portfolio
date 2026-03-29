"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/utils";

/** Fixed nav + marge — aligne le titre de section sous la pill. */
const ANCHOR_OFFSET_PX = -92;

const LUXURY_EASE = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return;
    }

    const instance = new Lenis({
      autoRaf: true,
      /** Plus haut = moins de « traîne » visuelle, scroll qui colle mieux au geste. */
      lerp: 0.092,
      duration: 1.18,
      easing: LUXURY_EASE,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      touchMultiplier: 1.06,
      wheelMultiplier: 1,
      touchInertiaExponent: 1.48,
      stopInertiaOnNavigate: true,
    });

    queueMicrotask(() => {
      setLenis(instance);
    });

    const onAnchorClickCapture = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const el = event.target;
      if (!(el instanceof Element)) return;
      const link = el.closest("a[href]");
      if (!link || !(link instanceof HTMLAnchorElement)) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;
      if (!url.hash || url.hash === "#") return;

      event.preventDefault();
      window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);

      instance.scrollTo(url.hash, {
        offset: ANCHOR_OFFSET_PX,
        duration: 1.12,
        easing: LUXURY_EASE,
      });
    };

    document.addEventListener("click", onAnchorClickCapture, true);

    return () => {
      document.removeEventListener("click", onAnchorClickCapture, true);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
