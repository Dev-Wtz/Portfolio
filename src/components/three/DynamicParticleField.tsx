"use client";

import dynamic from "next/dynamic";

const ParticleField = dynamic(
  () => import("@/components/three/ParticleField"),
  { ssr: false }
);

export default function DynamicParticleField() {
  return <ParticleField />;
}
