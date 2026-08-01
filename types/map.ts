import type { MountainDifficulty } from "@/types/mountain";

export type MapMountain = {
  id: string;
  slug: string;
  name: string;
  province: string;
  island: string;
  latitude: number;
  longitude: number;
  elevation: number;
  difficulty: MountainDifficulty;
  durationDays: number;
  beginnerScore: number;
  heroImage: string;
  summary: string;
};

