import {
  MOUNTAIN_DIFFICULTIES,
  type ElevationBand,
  type MountainDifficulty,
  type MountainFilters,
  type MountainSort,
} from "@/types/mountain";

export type ExploreSearchParams = Record<string, string | string[] | undefined>;

export const EXPLORE_PROVINCES = [
  "Bali",
  "Jambi",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Nusa Tenggara Barat",
  "Nusa Tenggara Timur",
] as const;

export const EXPLORE_ISLANDS = [
  "Bali",
  "Jawa",
  "Nusa Tenggara",
  "Sumatra",
] as const;

export const ELEVATION_BANDS = [
  "under-2500",
  "2500-3000",
  "over-3000",
] as const satisfies readonly ElevationBand[];

export const MOUNTAIN_SORTS = [
  "popular",
  "name-asc",
  "elevation-asc",
  "elevation-desc",
  "duration-asc",
  "beginner-desc",
] as const satisfies readonly MountainSort[];

function rawValues(input: ExploreSearchParams | URLSearchParams, key: string) {
  if (input instanceof URLSearchParams) {
    return input.getAll(key);
  }

  const value = input[key];
  return Array.isArray(value) ? value : value ? [value] : [];
}

function firstValue(input: ExploreSearchParams | URLSearchParams, key: string) {
  return rawValues(input, key)[0];
}

function commaValues(
  input: ExploreSearchParams | URLSearchParams,
  key: string,
) {
  return rawValues(input, key)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

function matchingValues<const Value extends string>(
  values: string[],
  allowed: readonly Value[],
) {
  const allowedValues = new Set<string>(allowed);
  return [...new Set(values)].filter((value): value is Value =>
    allowedValues.has(value),
  );
}

function positiveNumber(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

export function parseMountainSearchParams(
  input: ExploreSearchParams | URLSearchParams,
): MountainFilters {
  const difficulties = matchingValues(
    commaValues(input, "difficulty"),
    MOUNTAIN_DIFFICULTIES,
  ) as MountainDifficulty[];
  const durationValues = commaValues(input, "duration")
    .map(Number)
    .filter((value) => Number.isFinite(value) && value > 0);
  const requestedSort = firstValue(input, "sort");
  const sort = MOUNTAIN_SORTS.includes(requestedSort as MountainSort)
    ? (requestedSort as MountainSort)
    : "popular";

  return {
    search: firstValue(input, "search")?.slice(0, 80),
    provinces: matchingValues(
      commaValues(input, "province"),
      EXPLORE_PROVINCES,
    ),
    islands: matchingValues(commaValues(input, "island"), EXPLORE_ISLANDS),
    difficulties,
    maxDurationDays: durationValues.length
      ? Math.max(...durationValues)
      : undefined,
    elevationBands: matchingValues(
      commaValues(input, "elevation"),
      ELEVATION_BANDS,
    ),
    minBeginnerScore:
      firstValue(input, "beginner") === "true"
        ? 70
        : positiveNumber(firstValue(input, "beginner")),
    campingAvailable:
      firstValue(input, "camping") === "true" ? true : undefined,
    sunriseMinimum:
      firstValue(input, "sunrise") === "true"
        ? 4
        : positiveNumber(firstValue(input, "sunrise")),
    sort,
    page: positiveNumber(firstValue(input, "page")) ?? 1,
    pageSize: 8,
  };
}
