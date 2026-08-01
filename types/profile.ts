import type { FinderExperience, FinderGoal, FinderRegion } from "./finder";

export type MeasurementUnit = "imperial" | "metric";

export type ProfileData = {
  avatarUrl: string | null;
  bio: string;
  displayName: string;
  email: string;
  experienceLevel: FinderExperience | null;
  hikingGoals: FinderGoal[];
  id: string;
  measurementUnit: MeasurementUnit;
  preferredRegion: FinderRegion;
  provider: string;
};
