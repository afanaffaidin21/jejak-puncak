import assert from "node:assert/strict";
import test from "node:test";

import {
  createCompareSummary,
  createFinderExplanation,
  FINDER_AI_SYSTEM_PROMPT,
  parseCompareSummary,
  parseFinderAiExplanation,
} from "./finder-explanation.ts";
import type { CompareMountain } from "../types/compare.ts";
import type { FinderAnswers, FinderRecommendation } from "../types/finder.ts";

const answers: FinderAnswers = {
  experience: "beginner",
  fitness: "moderate",
  availableTime: "2-days",
  preferredRegion: "jawa",
  goal: "sunrise",
  budget: "medium",
};

const recommendation = {
  mountain: {
    id: "mountain-1",
    slug: "gunung-tes",
    name: "Gunung Tes",
    province: "Jawa Tengah",
    island: "Jawa",
    elevation: 2_500,
    latitude: -7,
    longitude: 110,
    summary: "Ringkasan",
    description: "Deskripsi",
    difficulty: "moderate",
    beginnerScore: 80,
    durationDays: 2,
    budgetCategory: "medium",
    bestSeason: "April–Oktober",
    sunriseRating: 5,
    campingAvailable: true,
    waterSource: true,
    popularityScore: 75,
    heroImage: "/mountain.jpg",
    status: "published",
    createdAt: "2026-01-01T00:00:00.000Z",
    updatedAt: "2026-01-01T00:00:00.000Z",
    routes: [],
  },
  score: 88,
  breakdown: {
    beginnerSuitability: 0.8,
    durationCompatibility: 1,
    fitnessCompatibility: 0.9,
    regionPreference: 1,
    goalCompatibility: 1,
    budgetCompatibility: 1,
  },
  matchedAttributes: ["waktu tersedia"],
  mismatchedAttributes: [],
  tradeOffs: ["Tetap periksa informasi resmi."],
  reasons: ["Durasi sesuai."],
} satisfies FinderRecommendation;

test("uses the exact Finder system prompt", () => {
  assert.equal(
    FINDER_AI_SYSTEM_PROMPT,
    "Anda adalah asisten Jejak Puncak. Jelaskan hasil rekomendasi berdasarkan data yang diberikan. Jangan mengubah skor, jangan menambahkan fakta baru, dan jangan memberikan jaminan keselamatan.",
  );
});

test("returns null when no AI provider is configured", async () => {
  const result = await createFinderExplanation(answers, [recommendation], {
    config: null,
  });

  assert.equal(result, null);
});

test("validates a complete structured explanation", () => {
  assert.deepEqual(
    parseFinderAiExplanation({
      summary: "Gunung Tes paling sesuai dengan jawabanmu.",
      mainReasons: ["Durasi sesuai."],
      tradeOffs: ["Tetap periksa informasi resmi."],
      cta: "Lihat detail Gunung Tes.",
    }),
    {
      summary: "Gunung Tes paling sesuai dengan jawabanmu.",
      mainReasons: ["Durasi sesuai."],
      tradeOffs: ["Tetap periksa informasi resmi."],
      cta: "Lihat detail Gunung Tes.",
    },
  );
  assert.equal(
    parseFinderAiExplanation({
      summary: "Tidak lengkap",
      mainReasons: [],
      tradeOffs: [],
      cta: "Lihat detail.",
    }),
    null,
  );
});

test("sends structured scoring to OpenAI and parses the response", async () => {
  let requestBody = "";
  const fetcher: typeof fetch = async (_input, init) => {
    requestBody = String(init?.body);
    return new Response(
      JSON.stringify({
        output_text: JSON.stringify({
          summary: "Gunung Tes cocok dengan jawabanmu.",
          mainReasons: ["Durasi sesuai."],
          tradeOffs: ["Tetap periksa informasi resmi."],
          cta: "Lihat detail Gunung Tes.",
        }),
      }),
      { status: 200 },
    );
  };

  const result = await createFinderExplanation(answers, [recommendation], {
    config: { provider: "openai", apiKey: "test-key", model: "test-model" },
    fetcher,
  });

  const body = JSON.parse(requestBody) as {
    instructions: string;
    input: string;
    text: { format: { type: string } };
  };
  assert.equal(body.instructions, FINDER_AI_SYSTEM_PROMPT);
  assert.match(body.input, /\"rank\":1/);
  assert.match(body.input, /\"score\":88/);
  assert.equal(body.text.format.type, "json_schema");
  assert.equal(result?.tradeOffs.length, 1);
});

test("returns null instead of blocking when the provider fails", async () => {
  const result = await createFinderExplanation(answers, [recommendation], {
    config: {
      provider: "anthropic",
      apiKey: "test-key",
      model: "test-model",
    },
    fetcher: async () => {
      throw new Error("network unavailable");
    },
  });

  assert.equal(result, null);
});

test("supports the Anthropic Messages response shape", async () => {
  let requestBody = "";
  const result = await createFinderExplanation(answers, [recommendation], {
    config: {
      provider: "anthropic",
      apiKey: "test-key",
      model: "test-model",
    },
    fetcher: async (_input, init) => {
      requestBody = String(init?.body);
      return new Response(
        JSON.stringify({
          content: [
            {
              type: "text",
              text: JSON.stringify({
                summary: "Gunung Tes cocok dengan jawabanmu.",
                mainReasons: ["Durasi sesuai."],
                tradeOffs: ["Tetap periksa informasi resmi."],
                cta: "Lihat detail Gunung Tes.",
              }),
            },
          ],
        }),
        { status: 200 },
      );
    },
  });

  const body = JSON.parse(requestBody) as {
    system: string;
    messages: { role: string; content: string }[];
  };
  assert.equal(body.system, FINDER_AI_SYSTEM_PROMPT);
  assert.equal(body.messages[0]?.role, "user");
  assert.equal(result?.summary, "Gunung Tes cocok dengan jawabanmu.");
});

const compareMountains: CompareMountain[] = [
  {
    id: "m1",
    slug: "tes-satu",
    name: "Gunung Satu",
    province: "Jawa Tengah",
    island: "Jawa",
    elevation: 2500,
    difficulty: "moderate",
    beginnerScore: 80,
    durationDays: 2,
    campingAvailable: true,
    waterSource: true,
    bestSeason: "April–Oktober",
    popularityScore: 75,
    sunriseRating: 5,
    heroImage: "/one.jpg",
    latitude: -7,
    longitude: 110,
  },
  {
    id: "m2",
    slug: "tes-dua",
    name: "Gunung Dua",
    province: "Jawa Barat",
    island: "Jawa",
    elevation: 3000,
    difficulty: "hard",
    beginnerScore: 60,
    durationDays: 3,
    campingAvailable: true,
    waterSource: false,
    bestSeason: "Mei–September",
    popularityScore: 82,
    sunriseRating: 4,
    heroImage: "/two.jpg",
    latitude: -6,
    longitude: 107,
  },
];

test("validates a neutral structured comparison summary", () => {
  const result = parseCompareSummary({
    summary: "Keduanya menawarkan pengalaman berbeda.",
    differences: ["Gunung Dua lebih tinggi."],
    strengths: compareMountains.map((mountain) => ({
      mountainId: mountain.id,
      mountainName: mountain.name,
      advantages: ["Data tersedia."],
    })),
    tradeOffs: compareMountains.map((mountain) => ({
      mountainId: mountain.id,
      mountainName: mountain.name,
      tradeoffs: ["Perlu menyesuaikan rencana."],
    })),
    cta: "Lihat detail sebelum memutuskan.",
  });
  assert.equal(result?.strengths.length, 2);
  assert.equal(parseCompareSummary({ summary: "Tidak lengkap" }), null);
});

test("sends comparison data without applying a new ranking", async () => {
  let requestBody = "";
  const result = await createCompareSummary(compareMountains, {
    config: { provider: "openai", apiKey: "test-key", model: "test-model" },
    fetcher: async (_input, init) => {
      requestBody = String(init?.body);
      return new Response(
        JSON.stringify({
          output_text: JSON.stringify({
            summary: "Dua pilihan dengan trade-off berbeda.",
            differences: ["Elevasi dan durasinya berbeda."],
            strengths: compareMountains.map((mountain) => ({
              mountainId: mountain.id,
              mountainName: mountain.name,
              advantages: ["Fakta tersedia."],
            })),
            tradeOffs: compareMountains.map((mountain) => ({
              mountainId: mountain.id,
              mountainName: mountain.name,
              tradeoffs: ["Sesuaikan kesiapan."],
            })),
            cta: "Buka detail gunung.",
          }),
        }),
        { status: 200 },
      );
    },
  });
  const body = JSON.parse(requestBody) as { input: string };
  assert.match(body.input, /"id":"m1"/);
  assert.doesNotMatch(body.input, /"rank":/);
  assert.equal(result?.differences.length, 1);
});
