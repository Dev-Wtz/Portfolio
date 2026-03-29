"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { clientToLightUv, elementCenterToLightUv } from "@/lib/lightUv";

export interface HoverTarget {
  x: number;
  y: number;
  strength: number;
}

export interface LightInteractionContextValue {
  pointerRef: React.MutableRefObject<{ x: number; y: number }>;
  pulseRef: React.MutableRefObject<number>;
  rippleRef: React.MutableRefObject<{ x: number; y: number }>;
  hoverTargetRef: React.MutableRefObject<HoverTarget>;
  setHoverFromElement: (el: HTMLElement, strength?: number) => void;
  clearHover: () => void;
}

const LightInteractionContext = createContext<LightInteractionContextValue | null>(
  null
);

export function LightInteractionProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pointerRef = useRef({ x: 0.5, y: 0.5 });
  const pulseRef = useRef(0);
  const rippleRef = useRef({ x: 0.5, y: 0.5 });
  const hoverTargetRef = useRef<HoverTarget>({ x: 0.5, y: 0.5, strength: 0 });

  const setHoverFromElement = useCallback(
    (el: HTMLElement, strength = 1) => {
      const c = elementCenterToLightUv(el);
      hoverTargetRef.current = { x: c.x, y: c.y, strength };
    },
    []
  );

  const clearHover = useCallback(() => {
    hoverTargetRef.current = {
      ...hoverTargetRef.current,
      strength: 0,
    };
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointerRef.current = clientToLightUv(e.clientX, e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const value = useMemo(
    () => ({
      pointerRef,
      pulseRef,
      rippleRef,
      hoverTargetRef,
      setHoverFromElement,
      clearHover,
    }),
    [setHoverFromElement, clearHover]
  );

  return (
    <LightInteractionContext.Provider value={value}>
      {children}
    </LightInteractionContext.Provider>
  );
}

export function useLightInteraction(): LightInteractionContextValue {
  const ctx = useContext(LightInteractionContext);
  if (!ctx) {
    throw new Error(
      "useLightInteraction must be used within LightInteractionProvider"
    );
  }
  return ctx;
}

/** Safe for optional usage (e.g. Storybook); returns null outside provider. */
export function useLightInteractionOptional(): LightInteractionContextValue | null {
  return useContext(LightInteractionContext);
}
