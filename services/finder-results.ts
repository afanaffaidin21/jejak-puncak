import { createClient } from "@/lib/supabase/server";
import type { FinderAnswers, FinderRecommendation } from "@/types/finder";

function buildRecommendationSnapshot(
  recommendations: readonly FinderRecommendation[],
) {
  return {
    recommendations: recommendations.map((recommendation, index) => ({
      rank: index + 1,
      score: recommendation.score,
      mountain: {
        id: recommendation.mountain.id,
        slug: recommendation.mountain.slug,
        name: recommendation.mountain.name,
        province: recommendation.mountain.province,
        island: recommendation.mountain.island,
        elevation: recommendation.mountain.elevation,
        difficulty: recommendation.mountain.difficulty,
        durationDays: recommendation.mountain.durationDays,
      },
      breakdown: recommendation.breakdown,
      matchedAttributes: recommendation.matchedAttributes,
      mismatchedAttributes: recommendation.mismatchedAttributes,
      reasons: recommendation.reasons,
      tradeOffs: recommendation.tradeOffs,
    })),
  };
}

export async function saveFinderResult(
  answers: FinderAnswers,
  recommendations: readonly FinderRecommendation[],
) {
  const topRecommendation = recommendations[0];
  if (!topRecommendation) return false;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase.from("finder_results").insert({
      user_id: user?.id ?? null,
      answers,
      top_recommendation: topRecommendation.mountain.id,
      recommendation_payload: buildRecommendationSnapshot(recommendations),
    });

    return !error;
  } catch {
    return false;
  }
}
