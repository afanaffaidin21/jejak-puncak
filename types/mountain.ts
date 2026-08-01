export const MOUNTAIN_DIFFICULTIES = [
  "easy",
  "moderate",
  "hard",
  "extreme",
] as const;

export type MountainDifficulty = (typeof MOUNTAIN_DIFFICULTIES)[number];

export type MountainRoute = {
  id: string;
  mountainId: string;
  name: string;
  startingPoint: string;
  distanceKm: number;
  elevationGain: number;
  estimatedHours: number;
  difficulty: MountainDifficulty;
  facilities: string;
  description: string;
};

export type Mountain = {
  id: string;
  slug: string;
  name: string;
  province: string;
  island: string;
  elevation: number;
  latitude: number;
  longitude: number;
  summary: string;
  description: string;
  difficulty: MountainDifficulty;
  beginnerScore: number;
  durationDays: number;
  budgetCategory: string;
  bestSeason: string;
  sunriseRating: number;
  campingAvailable: boolean;
  waterSource: boolean;
  popularityScore: number;
  heroImage: string;
  photoCreditAuthor?: string | null;
  photoCreditUrl?: string | null;
  photoLicense?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  routes: MountainRoute[];
};


export type MountainCardData = Pick<
  Mountain,
  | "difficulty"
  | "durationDays"
  | "elevation"
  | "heroImage"
  | "id"
  | "name"
  | "province"
  | "slug"
  | "summary"
>;

export type MountainSort =
  | "popular"
  | "name-asc"
  | "elevation-asc"
  | "elevation-desc"
  | "duration-asc"
  | "beginner-desc";

export type ElevationBand = "under-2500" | "2500-3000" | "over-3000";

export type MountainFilters = {
  search?: string;
  provinces?: string[];
  islands?: string[];
  difficulties?: MountainDifficulty[];
  maxDurationDays?: number;
  elevationBands?: ElevationBand[];
  minElevation?: number;
  maxElevation?: number;
  minBeginnerScore?: number;
  campingAvailable?: boolean;
  sunriseMinimum?: number;
  sort?: MountainSort;
  page?: number;
  pageSize?: number;
};

export type MountainListResult = {
  mountains: Mountain[];
  count: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};
