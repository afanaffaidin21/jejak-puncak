import { NextResponse } from "next/server";

import { consumeRateLimit, getRequestRateLimitKey } from "@/lib/rate-limit";
import {
  createCompareSummary,
  isFinderAiConfigured,
} from "@/services/finder-explanation";
import { getMountainsBySlugs } from "@/services/mountains";
import type { CompareMountain, CompareSummaryResponse } from "@/types/compare";

const AI_RATE_LIMIT = 5;
const AI_RATE_LIMIT_WINDOW_MS = 60_000;

function toCompareMountain(mountain: Awaited<ReturnType<typeof getMountainsBySlugs>>[number]): CompareMountain {
  return {
    id: mountain.id,
    slug: mountain.slug,
    name: mountain.name,
    province: mountain.province,
    island: mountain.island,
    elevation: mountain.elevation,
    difficulty: mountain.difficulty,
    beginnerScore: mountain.beginnerScore,
    durationDays: mountain.durationDays,
    campingAvailable: mountain.campingAvailable,
    waterSource: mountain.waterSource,
    bestSeason: mountain.bestSeason,
    popularityScore: mountain.popularityScore,
    sunriseRating: mountain.sunriseRating,
    heroImage: mountain.heroImage,
    latitude: mountain.latitude,
    longitude: mountain.longitude,
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = (await request.json()) as unknown;
  } catch {
    return NextResponse.json({ error: "Request harus berupa JSON yang valid." }, { status: 400 });
  }

  const rawSlugs = body && typeof body === "object" && !Array.isArray(body)
    ? (body as Record<string, unknown>).slugs
    : null;
  const slugs = Array.isArray(rawSlugs)
    ? [...new Set(rawSlugs.filter((slug): slug is string => typeof slug === "string").map((slug) => slug.trim()))].filter(Boolean).slice(0, 3)
    : [];

  if (slugs.length < 2) {
    return NextResponse.json({ error: "Pilih 2–3 gunung untuk membuat ringkasan." }, { status: 400 });
  }

  try {
    const mountains = await getMountainsBySlugs(slugs);
    if (mountains.length !== slugs.length) {
      return NextResponse.json({ error: "Sebagian gunung tidak ditemukan." }, { status: 404 });
    }

    const rateLimit = consumeRateLimit(`compare-ai:${getRequestRateLimitKey(request)}`, {
      limit: AI_RATE_LIMIT,
      windowMs: AI_RATE_LIMIT_WINDOW_MS,
    });
    const configured = isFinderAiConfigured();
    const summary = rateLimit.allowed && configured
      ? await createCompareSummary(mountains.map(toCompareMountain))
      : null;
    const responseBody: CompareSummaryResponse = {
      summary,
      aiStatus: summary ? "ready" : configured && rateLimit.allowed ? "fallback" : "unavailable",
    };
    const response = NextResponse.json(responseBody);
    response.headers.set("X-RateLimit-Limit", String(rateLimit.limit));
    response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
    response.headers.set("X-RateLimit-Reset", String(rateLimit.resetAt));
    return response;
  } catch {
    return NextResponse.json({ error: "Ringkasan perbandingan belum dapat diproses." }, { status: 503 });
  }
}

