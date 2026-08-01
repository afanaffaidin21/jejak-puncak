import type { Mountain, MountainDifficulty } from "@/types/mountain";

export type CompareMountain = Pick<
  Mountain,
  | "id"
  | "slug"
  | "name"
  | "province"
  | "island"
  | "elevation"
  | "difficulty"
  | "beginnerScore"
  | "durationDays"
  | "campingAvailable"
  | "waterSource"
  | "bestSeason"
  | "popularityScore"
  | "sunriseRating"
  | "heroImage"
  | "latitude"
  | "longitude"
>;

export type CompareSummary = {
  summary: string;
  differences: string[];
  strengths: Array<{
    mountainId: string;
    mountainName: string;
    advantages: string[];
  }>;
  tradeOffs: Array<{
    mountainId: string;
    mountainName: string;
    tradeoffs: string[];
  }>;
  cta: string;
};

export type CompareSummaryResponse = {
  summary: CompareSummary | null;
  aiStatus: "ready" | "fallback" | "unavailable";
};

export const DIFFICULTY_LABELS: Record<MountainDifficulty, string> = {
  easy: "Mudah",
  moderate: "Menengah",
  hard: "Sulit",
  extreme: "Ekstrem",
};
