"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type MagneticButtonVariant = "default" | "accent" | "ghost";

const shineSweep = cn(
  "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-accent-secondary/35 before:to-transparent before:transition-transform before:duration-700 before:ease-out motion-safe:hover:before:translate-x-full"
);

/* Dark matte car paint — shine sweep matches "Me contacter" */
const matteSolidShell = cn("magnetic-matte-paint", shineSweep);

const ghostShell = cn(
  "border border-accent/22 bg-accent/[0.08] text-foreground",
  "hover:border-accent-secondary/45 hover:bg-accent/[0.14]",
  shineSweep
);

const variantClass: Record<MagneticButtonVariant, string> = {
  accent: matteSolidShell,
  ghost: ghostShell,
  default: matteSolidShell,
};

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  as?: "button" | "a";
  href?: string;
  type?: "button" | "submit" | "reset";
  "aria-label"?: string;
  onClick?: () => void;
  variant?: MagneticButtonVariant;
}

export default function MagneticButton({
  children,
  className,
  as = "button",
  href,
  "aria-label": ariaLabel,
  onClick,
  type = "button",
  variant = "default",
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const shell = cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-2xl text-center",
    "shadow-none backdrop-blur-none",
    "outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/35",
    variantClass[variant],
    className
  );

  const inner = "relative z-[1] inline-flex items-center justify-center gap-2";

  const motionProps =
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
        };

  if (as === "a") {
    return (
      <motion.a
        href={href}
        className={shell}
        onClick={onClick}
        aria-label={ariaLabel}
        {...motionProps}
      >
        <span className={inner}>{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={shell}
      onClick={onClick}
      aria-label={ariaLabel}
      {...motionProps}
    >
      <span className={inner}>{children}</span>
    </motion.button>
  );
}
