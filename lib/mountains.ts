import type { MountainDifficulty } from "@/types/mountain";

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
