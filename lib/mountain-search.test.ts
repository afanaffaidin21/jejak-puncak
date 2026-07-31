import assert from "node:assert/strict";
import test from "node:test";

import { parseMountainSearchParams } from "./mountain-search.ts";

test("parseMountainSearchParams parses multi-value public filters", () => {
  const params = new URLSearchParams({
    beginner: "true",
    camping: "true",
    difficulty: "easy,moderate",
    duration: "1,3",
    elevation: "under-2500,over-3000",
    island: "Jawa,Nusa Tenggara",
    province: "Jawa Barat,Jawa Timur",
    search: "  Rinjani  ",
    sort: "elevation-desc",
    sunrise: "4",
  });

  assert.deepEqual(parseMountainSearchParams(params), {
    campingAvailable: true,
    difficulties: ["easy", "moderate"],
    elevationBands: ["under-2500", "over-3000"],
    islands: ["Jawa", "Nusa Tenggara"],
    maxDurationDays: 3,
    minBeginnerScore: 70,
    page: 1,
    pageSize: 8,
    provinces: ["Jawa Barat", "Jawa Timur"],
    search: "  Rinjani  ",
    sort: "elevation-desc",
    sunriseMinimum: 4,
  });
});

test("parseMountainSearchParams ignores unsupported values", () => {
  const params = new URLSearchParams({
    difficulty: "impossible",
    elevation: "very-high",
    island: "Atlantis",
    page: "-3",
    province: "Tidak Ada",
    sort: "random",
  });

  assert.deepEqual(parseMountainSearchParams(params), {
    campingAvailable: undefined,
    difficulties: [],
    elevationBands: [],
    islands: [],
    maxDurationDays: undefined,
    minBeginnerScore: undefined,
    page: 1,
    pageSize: 8,
    provinces: [],
    search: undefined,
    sort: "popular",
    sunriseMinimum: undefined,
  });
});
