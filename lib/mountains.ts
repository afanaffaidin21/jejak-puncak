import type {
  Mountain,
  MountainCardData,
  MountainDifficulty,
} from "@/types/mountain";

export const DIFFICULTY_LABELS: Record<MountainDifficulty, string> = {
  easy: "Mudah",
  moderate: "Menengah",
  hard: "Sulit",
  extreme: "Ekstrem",
};

export const BUDGET_LABELS: Record<string, string> = {
  low: "Hemat",
  medium: "Menengah",
  high: "Lebih tinggi",
};

export function formatDuration(days: number) {
  if (days <= 1) {
    return "1 hari";
  }

  return `${new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 1,
  }).format(days)} hari`;
}

export function toMountainCardData(mountain: Mountain): MountainCardData {
  return {
    difficulty: mountain.difficulty,
    durationDays: mountain.durationDays,
    elevation: mountain.elevation,
    heroImage: mountain.heroImage,
    id: mountain.id,
    name: mountain.name,
    province: mountain.province,
    slug: mountain.slug,
    summary: mountain.summary,
  };
}
