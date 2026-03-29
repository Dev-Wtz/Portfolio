"use client";

import { useMemo } from "react";

const VIEW_W = 1920;
const VIEW_H = 1080;
const STEP = 14;

interface FiberBundle {
  lineCount: number;
  centerY: number;
  spread: number;
  phase: number;
  ampBase: number;
  freqMul: number;
}

type FiberPreset = "hero" | "services" | "work" | "contact" | "footer";

const INTENSITY: Record<FiberPreset, number> = {
  hero: 1.12,
  services: 0.72,
  work: 0.72,
  contact: 0.72,
  footer: 0.68,
};

const PRESETS: Record<FiberPreset, FiberBundle[]> = {
  hero: [
    { lineCount: 60, centerY: 465, spread: 140, phase: 0, ampBase: 85, freqMul: 1.0 },
    { lineCount: 45, centerY: 525, spread: 110, phase: 1.3, ampBase: 100, freqMul: 0.7 },
    { lineCount: 32, centerY: 445, spread: 95, phase: 2.8, ampBase: 70, freqMul: 1.4 },
  ],
  services: [
    { lineCount: 50, centerY: 540, spread: 180, phase: 4.2, ampBase: 60, freqMul: 0.85 },
    { lineCount: 38, centerY: 280, spread: 90, phase: 5.8, ampBase: 120, freqMul: 1.15 },
    { lineCount: 28, centerY: 700, spread: 70, phase: 7.1, ampBase: 50, freqMul: 1.65 },
  ],
  work: [
    { lineCount: 55, centerY: 200, spread: 120, phase: 3.1, ampBase: 95, freqMul: 0.6 },
    { lineCount: 42, centerY: 580, spread: 150, phase: 1.8, ampBase: 75, freqMul: 1.25 },
    { lineCount: 30, centerY: 850, spread: 85, phase: 6.4, ampBase: 110, freqMul: 0.45 },
  ],
  contact: [
    { lineCount: 48, centerY: 480, spread: 200, phase: 8.2, ampBase: 55, freqMul: 1.1 },
    { lineCount: 35, centerY: 320, spread: 130, phase: 2.4, ampBase: 130, freqMul: 0.52 },
  ],
  footer: [
    { lineCount: 30, centerY: 540, spread: 160, phase: 5.5, ampBase: 45, freqMul: 1.8 },
    { lineCount: 22, centerY: 400, spread: 100, phase: 9.1, ampBase: 90, freqMul: 0.38 },
  ],
};

function buildFiberPaths(bundle: FiberBundle): string[] {
  const { lineCount, centerY, spread, phase, ampBase, freqMul } = bundle;
  const paths: string[] = [];

  for (let i = 0; i < lineCount; i++) {
    const t = lineCount > 1 ? i / (lineCount - 1) : 0.5;
    const yBase = centerY + (t - 0.5) * 2 * spread;

    const amp = ampBase + Math.sin(t * Math.PI * 3.2 + phase) * 25;
    const freq1 = (0.003 + t * 0.0012) * freqMul;
    const freq2 = freq1 * 0.48;
    const freq3 = freq1 * 1.75;
    const rowPhase = phase + t * 4.5;

    let d = "";
    let started = false;
    for (let x = -80; x <= VIEW_W + 80; x += STEP) {
      const y =
        yBase +
        Math.sin(x * freq1 + rowPhase) * amp +
        Math.sin(x * freq2 + rowPhase * 1.6) * (amp * 0.38) +
        Math.sin(x * freq3 + rowPhase * 0.7) * (amp * 0.18);
      d += started ? ` L ${x} ${y.toFixed(1)}` : `M ${x} ${y.toFixed(1)}`;
      started = true;
    }
    paths.push(d);
  }
  return paths;
}

interface SectionFibersProps {
  preset: FiberPreset;
}

export default function SectionFibers({ preset }: SectionFibersProps) {
  const fibers = useMemo(
    () => PRESETS[preset].map((b) => buildFiberPaths(b)),
    [preset]
  );

  const uid = preset;
  const k = INTENSITY[preset];

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-[2] h-full w-full"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="none"
      shapeRendering="optimizeSpeed"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`fv-${uid}`} cx="50%" cy="42%" r="88%">
          <stop offset="0%" stopColor="white" stopOpacity="0.92" />
          <stop offset="42%" stopColor="white" stopOpacity="0.62" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id={`fm-${uid}`}>
          <rect width="100%" height="100%" fill={`url(#fv-${uid})`} />
        </mask>
      </defs>

      {fibers.map((bundle, bi) => (
        <g
          key={`fb-${bi}`}
          mask={`url(#fm-${uid})`}
          style={{ opacity: (0.52 + (bi % 2) * 0.1) * k }}
        >
          {bundle.map((d, li) => (
            <path
              key={`f-${bi}-${li}`}
              d={d}
              fill="none"
              stroke={
                li % 3 === 0
                  ? "rgba(45,216,132,0.28)"
                  : li % 3 === 1
                    ? "rgba(100,220,160,0.26)"
                    : "rgba(55,200,130,0.22)"
              }
              strokeWidth={li % 5 === 0 ? 0.85 : 0.55}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </g>
      ))}

      {fibers.map((bundle, bi) => (
        <g
          key={`gl-${bi}`}
          mask={`url(#fm-${uid})`}
          className="mix-blend-screen"
          style={{ opacity: (0.4 + (bi % 3) * 0.08) * k }}
        >
          {bundle
            .filter((_, i) => i % 4 === 0)
            .map((d, i) => (
              <path
                key={`glow-${bi}-${i}`}
                d={d}
                fill="none"
                stroke={
                  i % 2 === 0
                    ? "rgba(120,255,200,0.48)"
                    : "rgba(45,216,132,0.38)"
                }
                strokeWidth={i % 3 === 0 ? 1.55 : 1.05}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
        </g>
      ))}

      <g
        mask={`url(#fm-${uid})`}
        className="mix-blend-screen"
        style={{ opacity: 0.34 * k }}
      >
        {fibers[0]
          .filter((_, i) => i % 9 === 0)
          .map((d, i) => (
            <path
              key={`core-${i}`}
              d={d}
              fill="none"
              stroke="rgba(180,255,220,0.52)"
              strokeWidth={2.1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
      </g>

    </svg>
  );
}
