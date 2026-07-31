import assert from "node:assert/strict";
import test from "node:test";

import { scoreFinderRecommendations } from "./finder-scoring.ts";
import type { FinderAnswers } from "../types/finder.ts";
import type { Mountain } from "../types/mountain.ts";

const BASE_ANSWERS: FinderAnswers = {
  experience: "beginner",
  fitness: "low",
  availableTime: "1-day",
  preferredRegion: "jawa",
  goal: "first-summit",
  budget: "low",
};

function mountainFixture(
  overrides: Partial<Mountain> & Pick<Mountain, "id" | "name" | "slug">,
): Mountain {
  const { id, name, slug, ...optionalOverrides } = overrides;

  return {
    id,
    slug,
    name,
    province: "Jawa Tengah",
    island: "Jawa",
    elevation: 2_500,
    latitude: -7,
    longitude: 110,
    summary: "Ringkasan fixture.",
    description: "Deskripsi fixture.",
    difficulty: "easy",
    beginnerScore: 85,
    durationDays: 1,
    budgetCategory: "low",
    bestSeason: "April–Oktober",
    sunriseRating: 4,
    campingAvailable: false,
    waterSource: true,
    popularityScore: 70,
    heroImage: "/images/mountains/placeholder-mountain.svg",
    status: "published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    routes: [
      {
        id: `${id}-route`,
        mountainId: id,
        name: "Rute fixture",
        startingPoint: "Basecamp",
        distanceKm: 8,
        elevationGain: 650,
        estimatedHours: 6,
        difficulty: "easy",
        facilities: "Pos registrasi",
        description: "Rute fixture.",
      },
    ],
    ...optionalOverrides,
  };
}

test("beginner profile ranks the accessible first summit first", () => {
  const accessible = mountainFixture({
    id: "accessible",
    name: "Gunung Aksesibel",
    slug: "gunung-aksesibel",
    beginnerScore: 95,
    sunriseRating: 3,
  });
  const scenic = mountainFixture({
    id: "scenic",
    name: "Gunung Fajar",
    slug: "gunung-fajar",
    beginnerScore: 70,
    difficulty: "moderate",
    sunriseRating: 5,
  });

  const results = scoreFinderRecommendations(BASE_ANSWERS, [
    scenic,
    accessible,
  ]);

  assert.equal(results[0]?.mountain.id, "accessible");
  assert.ok((results[0]?.score ?? 0) > (results[1]?.score ?? 0));
  assert.ok(results[0]?.reasons.length);
  assert.ok(results[0]?.tradeOffs.length);
});

test("sunrise profile in Bali and Nusa Tenggara ranks the strongest sunrise", () => {
  const batur = mountainFixture({
    id: "batur",
    name: "Gunung Batur",
    slug: "gunung-batur",
    island: "Bali",
    province: "Bali",
    sunriseRating: 5,
    budgetCategory: "medium",
  });
  const tambora = mountainFixture({
    id: "tambora",
    name: "Gunung Tambora",
    slug: "gunung-tambora",
    island: "Nusa Tenggara",
    province: "Nusa Tenggara Barat",
    difficulty: "moderate",
    beginnerScore: 65,
    durationDays: 2,
    sunriseRating: 3,
    budgetCategory: "medium",
  });
  const answers: FinderAnswers = {
    experience: "intermediate",
    fitness: "moderate",
    availableTime: "2-days",
    preferredRegion: "bali-nusa-tenggara",
    goal: "sunrise",
    budget: "medium",
  };

  const results = scoreFinderRecommendations(answers, [tambora, batur]);

  assert.equal(results[0]?.mountain.id, "batur");
  assert.equal(results.length, 2);
});

test("advanced challenge profile favors a hard multi-day mountain", () => {
  const hardMountain = mountainFixture({
    id: "hard",
    name: "Gunung Sulit",
    slug: "gunung-sulit",
    island: "Sumatra",
    difficulty: "hard",
    beginnerScore: 35,
    durationDays: 3,
    budgetCategory: "high",
    routes: [
      {
        ...mountainFixture({ id: "route-base", name: "Base", slug: "base" })
          .routes[0],
        id: "hard-route",
        mountainId: "hard",
        elevationGain: 2_000,
        difficulty: "hard",
      },
    ],
  });
  const easyMountain = mountainFixture({
    id: "easy",
    name: "Gunung Mudah",
    slug: "gunung-mudah",
    beginnerScore: 95,
  });
  const answers: FinderAnswers = {
    experience: "advanced",
    fitness: "high",
    availableTime: "3-plus-days",
    preferredRegion: "anywhere",
    goal: "challenge",
    budget: "flexible",
  };

  const results = scoreFinderRecommendations(answers, [
    easyMountain,
    hardMountain,
  ]);

  assert.equal(results[0]?.mountain.id, "hard");
});

test("hard filters remove incompatible and incomplete candidates", () => {
  const tooLong = mountainFixture({
    id: "too-long",
    name: "Gunung Lama",
    slug: "gunung-lama",
    durationDays: 2,
  });
  const tooDifficult = mountainFixture({
    id: "too-hard",
    name: "Gunung Ekstrem",
    slug: "gunung-ekstrem",
    difficulty: "extreme",
  });
  const wrongRegion = mountainFixture({
    id: "wrong-region",
    name: "Gunung Sumatra",
    slug: "gunung-sumatra",
    island: "Sumatra",
  });
  const missingRoute = mountainFixture({
    id: "missing-route",
    name: "Gunung Tanpa Rute",
    slug: "gunung-tanpa-rute",
    routes: [],
  });

  assert.deepEqual(
    scoreFinderRecommendations(BASE_ANSWERS, [
      tooLong,
      tooDifficult,
      wrongRegion,
      missingRoute,
    ]),
    [],
  );
});

const INVALID_SCORING_FIELDS = [
  { field: "sunriseRating", value: null },
  { field: "sunriseRating", value: undefined },
  { field: "popularityScore", value: null },
  { field: "popularityScore", value: undefined },
  { field: "campingAvailable", value: null },
  { field: "campingAvailable", value: undefined },
  { field: "waterSource", value: null },
  { field: "waterSource", value: undefined },
] as const;

for (const { field, value } of INVALID_SCORING_FIELDS) {
  test(`rejects a mountain with invalid ${field}=${String(value)}`, () => {
    const mountain = mountainFixture({
      id: `invalid-${field}-${String(value)}`,
      name: `Gunung Invalid ${field}`,
      slug: `gunung-invalid-${field}-${String(value)}`,
      [field]: value,
    } as unknown as Partial<Mountain> & Pick<Mountain, "id" | "name" | "slug">);

    const results = scoreFinderRecommendations(BASE_ANSWERS, [mountain]);

    assert.equal(results.length, 0);
    assert.equal(
      results.some((recommendation) => Number.isNaN(recommendation.score)),
      false,
    );
  });
}

test("ranking is stable for identical scores and input changes", () => {
  const alpha = mountainFixture({
    id: "alpha",
    name: "Gunung Alpha",
    slug: "gunung-alpha",
  });
  const beta = mountainFixture({
    id: "beta",
    name: "Gunung Beta",
    slug: "gunung-beta",
  });

  const first = scoreFinderRecommendations(BASE_ANSWERS, [beta, alpha]);
  const second = scoreFinderRecommendations(BASE_ANSWERS, [alpha, beta]);

  assert.deepEqual(
    first.map((result) => result.mountain.id),
    ["alpha", "beta"],
  );
  assert.deepEqual(
    second.map((result) => result.mountain.id),
    ["alpha", "beta"],
  );
});
