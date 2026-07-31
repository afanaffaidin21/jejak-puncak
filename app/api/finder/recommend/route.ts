import { NextResponse } from "next/server";

import { parseFinderAnswers } from "@/lib/finder-validation";
import { consumeRateLimit, getRequestRateLimitKey } from "@/lib/rate-limit";
import {
  createFinderExplanation,
  isFinderAiConfigured,
} from "@/services/finder-explanation";
import { saveFinderResult } from "@/services/finder-results";
import { scoreFinderRecommendations } from "@/services/finder-scoring";
import { getFinderMountains } from "@/services/mountains";
import type { FinderAiStatus } from "@/types/finder";

const AI_RATE_LIMIT = 5;
const AI_RATE_LIMIT_WINDOW_MS = 60_000;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = (await request.json()) as unknown;
  } catch {
    return NextResponse.json(
      { error: "Request harus berupa JSON yang valid." },
      { status: 400 },
    );
  }

  const answers = parseFinderAnswers(body);

  if (!answers) {
    return NextResponse.json(
      { error: "Jawaban Finder belum lengkap atau tidak valid." },
      { status: 400 },
    );
  }

  try {
    const mountains = await getFinderMountains();
    const recommendations = scoreFinderRecommendations(
      answers,
      mountains,
    ).slice(0, 3);

    if (!recommendations.length) {
      return NextResponse.json({
        recommendations,
        explanation: null,
        aiStatus: "unavailable" satisfies FinderAiStatus,
        saved: false,
      });
    }

    const rateLimit = consumeRateLimit(getRequestRateLimitKey(request), {
      limit: AI_RATE_LIMIT,
      windowMs: AI_RATE_LIMIT_WINDOW_MS,
    });
    const aiConfigured = isFinderAiConfigured();
    let aiStatus: FinderAiStatus = !rateLimit.allowed
      ? "rate_limited"
      : aiConfigured
        ? "unavailable"
        : "not_configured";
    const explanation = rateLimit.allowed
      ? await createFinderExplanation(answers, recommendations)
      : null;

    if (explanation) aiStatus = "available";

    const saved = await saveFinderResult(answers, recommendations);

    const response = NextResponse.json({
      recommendations,
      explanation,
      aiStatus,
      saved,
    });

    response.headers.set("X-RateLimit-Limit", String(rateLimit.limit));
    response.headers.set("X-RateLimit-Remaining", String(rateLimit.remaining));
    response.headers.set("X-RateLimit-Reset", String(rateLimit.resetAt));

    return response;
  } catch {
    return NextResponse.json(
      { error: "Rekomendasi belum dapat diproses. Silakan coba lagi." },
      { status: 503 },
    );
  }
}
