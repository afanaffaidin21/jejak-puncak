import assert from "node:assert/strict";
import test from "node:test";

import { calculatePassportStatistics } from "./passport-statistics.ts";
import type { PassportMountain } from "../types/passport.ts";

function mountain(overrides: Partial<PassportMountain> = {}): PassportMountain {
  return {
    beginnerScore: 80,
    completedAt: "2026-08-01T00:00:00.000Z",
    difficulty: "moderate",
    durationDays: 2,
    elevation: 3000,
    heroImage: "/mountain.jpg",
    id: "11111111-1111-4111-8111-111111111111",
    island: "Jawa",
    latitude: -7,
    longitude: 110,
    name: "Gunung Uji",
    province: "Jawa Tengah",
    savedAt: "2026-07-01T00:00:00.000Z",
    slug: "gunung-uji",
    summary: "Ringkasan gunung uji.",
    ...overrides,
  };
}

test("calculates Passport statistics from completed mountains only", () => {
  const completed = [
    mountain({ durationDays: 1.5, elevation: 2800 }),
    mountain({ durationDays: 3, elevation: 3726 }),
  ];
  const wishlist = [mountain({ completedAt: null })];

  assert.deepEqual(calculatePassportStatistics(completed, wishlist), {
    completedCount: 2,
    highestElevation: 3726,
    totalHikingDays: 4.5,
    wishlistCount: 1,
  });
});

test("returns zero-valued statistics for an empty Passport", () => {
  assert.deepEqual(calculatePassportStatistics([], []), {
    completedCount: 0,
    highestElevation: 0,
    totalHikingDays: 0,
    wishlistCount: 0,
  });
});
