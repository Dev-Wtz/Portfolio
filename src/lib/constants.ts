export type ProjectSlug = "luminary" | "vertex" | "nebula" | "horizon";

export type ServiceKey =
  | "web"
  | "ui"
  | "creative"
  | "perf"
  | "aiAutomation"
  | "customSoftware";

export const SERVICE_ORDER: ServiceKey[] = [
  "web",
  "ui",
  "creative",
  "perf",
  "aiAutomation",
  "customSoftware",
];

export const SERVICE_ICONS = [
  "Code2",
  "Palette",
  "Sparkles",
  "Zap",
  "Bot",
  "Layers",
] as const;

export type ServiceIconName = (typeof SERVICE_ICONS)[number];

export interface ProjectMeta {
  slug: ProjectSlug;
  image: string;
  color: string;
  year: string;
}

export const PROJECT_META: ProjectMeta[] = [
  {
    slug: "luminary",
    image: "/projects/luminary.jpg",
    color: "#3d6a50",
    year: "2026",
  },
  {
    slug: "vertex",
    image: "/projects/vertex.jpg",
    color: "#0a2e1c",
    year: "2025",
  },
  {
    slug: "nebula",
    image: "/projects/nebula.jpg",
    color: "#2dd884",
    year: "2025",
  },
  {
    slug: "horizon",
    image: "/projects/horizon.jpg",
    color: "#4a7c5e",
    year: "2024",
  },
];
