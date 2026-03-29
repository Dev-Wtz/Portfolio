"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type MagneticButtonVariant = "default" | "accent" | "ghost";

const shineSweep = cn(
  "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-accent-secondary/35 before:to-transparent before:transition-transform before:duration-700 before:ease-out motion-safe:hover:before:translate-x-full"
);

/* Ghost CTA uses same surface as contact form / cards (see --surface-over-fibers). */
const matteSolidShell = cn("magnetic-matte-paint", shineSweep);

const ghostShell = cn(
  "border border-accent/22 bg-surface-over-fibers text-foreground",
  "hover:border-accent-secondary/45",
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
  disabled?: boolean;
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
  disabled = false,
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion();

  const shell = cn(
    "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-2xl text-center",
    "shadow-none backdrop-blur-none",
    "outline-none [-webkit-tap-highlight-color:transparent] touch-manipulation",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground/35",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55",
    /* Boutons pleins : −20 % mobile / −10 % PC (ghost : surface CSS uniquement) */
    variant !== "ghost" && "opacity-80 md:opacity-90",
    variantClass[variant],
    className
  );

  const inner = "relative z-[1] inline-flex items-center justify-center gap-2";

  const motionProps =
    disabled || prefersReducedMotion === true
      ? {}
      : {
          whileHover: { scale: 1.035, y: -2 },
          whileTap: { scale: 0.97 },
          transition: {
            type: "spring" as const,
            stiffness: 520,
            damping: 32,
          },
        };

  if (as === "a") {
    return (
      <motion.a
        href={href}
        className={shell}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
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
      disabled={disabled}
      {...motionProps}
    >
      <span className={inner}>{children}</span>
    </motion.button>
  );
}
