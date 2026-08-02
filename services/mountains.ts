import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type {
  Mountain,
  MountainDifficulty,
  MountainFilters,
  MountainListResult,
  MountainRoute,
  MountainSort,
} from "@/types/mountain";
import type { MapMountain } from "@/types/map";

type MountainRouteRow = {
  id: string;
  mountain_id: string;
  name: string;
  starting_point: string;
  distance_km: number | string;
  elevation_gain: number;
  estimated_hours: number | string;
  difficulty: MountainDifficulty;
  facilities: string;
  description: string;
};

type MountainRow = {
  id: string;
  slug: string;
  name: string;
  province: string;
  island: string;
  elevation: number;
  latitude: number | string;
  longitude: number | string;
  summary: string;
  description: string;
  difficulty: MountainDifficulty;
  beginner_score: number;
  duration_days: number | string;
  budget_category: string;
  best_season: string;
  sunrise_rating: number;
  camping_available: boolean;
  water_source: boolean;
  popularity_score: number;
  hero_image: string;
  photo_credit_author?: string | null;
  photo_credit_url?: string | null;
  photo_license?: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  gallery_images?: Array<{
    src: string;
    alt: string;
    caption: string;
    credit_author?: string;
    credit_url?: string;
    license?: string;
    license_url?: string;
  }> | null;
  mountain_routes?: MountainRouteRow[] | null;
};

const MOUNTAIN_COLUMNS = `*`;

const MOUNTAIN_WITH_ROUTES_COLUMNS = `
  *,
  mountain_routes (*)
`;

const DEFAULT_PAGE_SIZE = 12;
const MAX_PAGE_SIZE = 48;

function toMountainRoute(row: MountainRouteRow): MountainRoute {
  return {
    id: row.id,
    mountainId: row.mountain_id,
    name: row.name,
    startingPoint: row.starting_point,
    distanceKm: Number(row.distance_km),
    elevationGain: row.elevation_gain,
    estimatedHours: Number(row.estimated_hours),
    difficulty: row.difficulty,
    facilities: row.facilities,
    description: row.description,
  };
}

function toMountain(row: MountainRow): Mountain {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    province: row.province,
    island: row.island,
    elevation: row.elevation,
    latitude: Number(row.latitude),
    longitude: Number(row.longitude),
    summary: row.summary,
    description: row.description,
    difficulty: row.difficulty,
    beginnerScore: row.beginner_score,
    durationDays: Number(row.duration_days),
    budgetCategory: row.budget_category,
    bestSeason: row.best_season,
    sunriseRating: row.sunrise_rating,
    campingAvailable: row.camping_available,
    waterSource: row.water_source,
    popularityScore: row.popularity_score,
    heroImage: row.hero_image,
    photoCreditAuthor: row.photo_credit_author,
    photoCreditUrl: row.photo_credit_url,
    photoLicense: row.photo_license,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    galleryImages: row.gallery_images ?? [],
    routes: (row.mountain_routes ?? []).map(toMountainRoute),
  };
}

function escapeLikePattern(value: string) {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("%", "\\%")
    .replaceAll("_", "\\_");
}

export async function getAllMountains(
  filters: MountainFilters = {},
): Promise<MountainListResult> {
  const supabase = await createClient();
  const page = Math.max(1, Math.floor(filters.page ?? 1));
  const pageSize = Math.min(
    MAX_PAGE_SIZE,
    Math.max(1, Math.floor(filters.pageSize ?? DEFAULT_PAGE_SIZE)),
  );
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("mountains")
    .select(MOUNTAIN_COLUMNS, { count: "exact" })
    .eq("status", "published");

  const search = filters.search?.trim();

  if (search) {
    query = query.ilike("name", `%${escapeLikePattern(search)}%`);
  }

  if (filters.provinces?.length) {
    query = query.in("province", filters.provinces);
  }

  if (filters.islands?.length) {
    query = query.in("island", filters.islands);
  }

  if (filters.difficulties?.length) {
    query = query.in("difficulty", filters.difficulties);
  }

  if (filters.maxDurationDays !== undefined) {
    query = query.lte("duration_days", filters.maxDurationDays);
  }

  if (filters.elevationBands?.length) {
    const elevationPredicates = filters.elevationBands.flatMap((band) => {
      switch (band) {
        case "under-2500":
          return ["elevation.lt.2500"];
        case "2500-3000":
          return ["and(elevation.gte.2500,elevation.lt.3000)"];
        case "over-3000":
          return ["elevation.gte.3000"];
        default:
          return [];
      }
    });

    if (elevationPredicates.length < 3) {
      query = query.or(elevationPredicates.join(","));
    }
  }

  if (filters.minElevation !== undefined) {
    query = query.gte("elevation", filters.minElevation);
  }

  if (filters.maxElevation !== undefined) {
    query = query.lte("elevation", filters.maxElevation);
  }

  if (filters.minBeginnerScore !== undefined) {
    query = query.gte("beginner_score", filters.minBeginnerScore);
  }

  if (filters.campingAvailable !== undefined) {
    query = query.eq("camping_available", filters.campingAvailable);
  }

  if (filters.sunriseMinimum !== undefined) {
    query = query.gte("sunrise_rating", filters.sunriseMinimum);
  }

  const sort: MountainSort = filters.sort ?? "popular";

  switch (sort) {
    case "name-asc":
      query = query.order("name", { ascending: true });
      break;
    case "elevation-asc":
      query = query.order("elevation", { ascending: true });
      break;
    case "elevation-desc":
      query = query.order("elevation", { ascending: false });
      break;
    case "duration-asc":
      query = query.order("duration_days", { ascending: true });
      break;
    case "beginner-desc":
      query = query.order("beginner_score", { ascending: false });
      break;
    case "popular":
    default:
      query = query.order("popularity_score", { ascending: false });
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    throw new Error(`Gagal memuat data gunung: ${error.message}`);
  }

  const mountains = ((data ?? []) as MountainRow[]).map(toMountain);
  const total = count ?? mountains.length;

  return {
    mountains,
    count: total,
    page,
    pageSize,
    hasMore: to + 1 < total,
  };
}

export const getMountainBySlug = cache(
  async (slug: string): Promise<Mountain | null> => {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("mountains")
      .select(MOUNTAIN_WITH_ROUTES_COLUMNS)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) {
      throw new Error(`Gagal memuat detail gunung: ${error.message}`);
    }

    return data ? toMountain(data as MountainRow) : null;
  },
);

export const getPopularMountains = cache(
  async (limit = 6): Promise<Mountain[]> => {
    const result = await getAllMountains({
      pageSize: Math.min(Math.max(1, limit), MAX_PAGE_SIZE),
      sort: "popular",
    });

    return result.mountains;
  },
);

export const getMapMountains = cache(async (): Promise<MapMountain[]> => {
  const result = await getAllMountains({
    pageSize: MAX_PAGE_SIZE,
    sort: "name-asc",
  });
  return result.mountains
    .filter(
      (mountain) =>
        Number.isFinite(mountain.latitude) &&
        Number.isFinite(mountain.longitude),
    )
    .map(
      ({
        id,
        slug,
        name,
        province,
        island,
        latitude,
        longitude,
        elevation,
        difficulty,
        durationDays,
        beginnerScore,
        heroImage,
        summary,
      }) => ({
        id,
        slug,
        name,
        province,
        island,
        latitude,
        longitude,
        elevation,
        difficulty,
        durationDays,
        beginnerScore,
        heroImage,
        summary,
      }),
    );
});

export async function getFinderMountains(): Promise<Mountain[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("mountains")
    .select(MOUNTAIN_WITH_ROUTES_COLUMNS)
    .eq("status", "published")
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Gagal memuat kandidat Finder: ${error.message}`);
  }

  return ((data ?? []) as MountainRow[]).map(toMountain);
}

/** Fetch published mountains in the same order as the requested slugs. */
export const getMountainsBySlugs = cache(
  async (slugs: string[]): Promise<Mountain[]> => {
    const normalizedSlugs = [
      ...new Set(slugs.map((slug) => slug.trim())),
    ].filter(Boolean);

    if (!normalizedSlugs.length) {
      return [];
    }

    const supabase = await createClient();
    const { data, error } = await supabase
      .from("mountains")
      .select(MOUNTAIN_COLUMNS)
      .eq("status", "published")
      .in("slug", normalizedSlugs);

    if (error) {
      throw new Error(
        `Gagal memuat gunung untuk perbandingan: ${error.message}`,
      );
    }

    const bySlug = new Map(
      ((data ?? []) as MountainRow[]).map((row) => [row.slug, toMountain(row)]),
    );

    return normalizedSlugs.flatMap((slug) => {
      const mountain = bySlug.get(slug);
      return mountain ? [mountain] : [];
    });
  },
);

export const getSimilarMountains = cache(
  async (
    mountainId: string,
    island: string,
    difficulty: MountainDifficulty,
    limit = 4,
  ): Promise<Mountain[]> => {
    const supabase = await createClient();
    const safeLimit = Math.min(Math.max(1, limit), 8);

    const [sameIslandResult, sameDifficultyResult] = await Promise.all([
      supabase
        .from("mountains")
        .select(MOUNTAIN_COLUMNS)
        .eq("status", "published")
        .eq("island", island)
        .neq("id", mountainId)
        .order("popularity_score", { ascending: false })
        .limit(safeLimit),
      supabase
        .from("mountains")
        .select(MOUNTAIN_COLUMNS)
        .eq("status", "published")
        .eq("difficulty", difficulty)
        .neq("id", mountainId)
        .order("popularity_score", { ascending: false })
        .limit(safeLimit),
    ]);

    const error = sameIslandResult.error ?? sameDifficultyResult.error;

    if (error) {
      throw new Error(`Gagal memuat gunung serupa: ${error.message}`);
    }

    const uniqueRows = new Map<string, MountainRow>();

    for (const row of [
      ...(sameIslandResult.data ?? []),
      ...(sameDifficultyResult.data ?? []),
    ] as MountainRow[]) {
      uniqueRows.set(row.id, row);
    }

    return [...uniqueRows.values()].slice(0, safeLimit).map(toMountain);
  },
);
