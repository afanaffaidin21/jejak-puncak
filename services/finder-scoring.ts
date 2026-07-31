import type {
  FinderAnswers,
  FinderAvailableTime,
  FinderBudget,
  FinderExperience,
  FinderFitness,
  FinderGoal,
  FinderRecommendation,
  FinderRegion,
  FinderScoreBreakdown,
  FinderScoreDimension,
} from "../types/finder";
import type { Mountain, MountainDifficulty } from "../types/mountain";

export const FINDER_SCORE_WEIGHTS = {
  beginnerSuitability: 0.3,
  durationCompatibility: 0.2,
  fitnessCompatibility: 0.15,
  regionPreference: 0.15,
  goalCompatibility: 0.15,
  budgetCompatibility: 0.05,
} as const satisfies Record<FinderScoreDimension, number>;

const EXPERIENCE_DIFFICULTY_SCORE: Record<
  FinderExperience,
  Record<MountainDifficulty, number>
> = {
  beginner: { easy: 1, moderate: 0.7, hard: 0.25, extreme: 0 },
  intermediate: { easy: 0.75, moderate: 1, hard: 0.75, extreme: 0.25 },
  advanced: { easy: 0.65, moderate: 0.8, hard: 1, extreme: 0.9 },
};

const MAX_DIFFICULTY_BY_EXPERIENCE: Record<
  FinderExperience,
  readonly MountainDifficulty[]
> = {
  beginner: ["easy", "moderate"],
  intermediate: ["easy", "moderate", "hard"],
  advanced: ["easy", "moderate", "hard", "extreme"],
};

const FITNESS_CAPACITY: Record<
  FinderFitness,
  { elevationGain: number; durationDays: number }
> = {
  low: { elevationGain: 800, durationDays: 1 },
  moderate: { elevationGain: 1_400, durationDays: 2 },
  high: { elevationGain: 2_200, durationDays: 3 },
};

const REGION_ISLANDS: Exclude<FinderRegion, "anywhere"> extends infer _Region
  ? Record<Exclude<FinderRegion, "anywhere">, readonly string[]>
  : never = {
  jawa: ["Jawa"],
  sumatera: ["Sumatra", "Sumatera"],
  "bali-nusa-tenggara": ["Bali", "Nusa Tenggara"],
  kalimantan: ["Kalimantan"],
  sulawesi: ["Sulawesi"],
};

const BUDGET_SCORE: Record<FinderBudget, Record<string, number>> = {
  low: { low: 1, medium: 0.5, high: 0 },
  medium: { low: 0.9, medium: 1, high: 0.5 },
  flexible: { low: 1, medium: 1, high: 1 },
};

const GOAL_LABELS: Record<FinderGoal, string> = {
  sunrise: "pemandangan matahari terbit",
  "first-summit": "pendakian puncak pertama",
  challenge: "tantangan medan",
  photography: "peluang fotografi lanskap",
  nature: "pengalaman dekat dengan alam",
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));

function getAvailableDays(availableTime: FinderAvailableTime) {
  switch (availableTime) {
    case "1-day":
      return 1;
    case "2-days":
      return 2;
    case "3-plus-days":
      return Number.POSITIVE_INFINITY;
  }
}

function getElevationGain(mountain: Mountain) {
  const gains = mountain.routes
    .map((route) => route.elevationGain)
    .filter((gain) => Number.isFinite(gain) && gain >= 0);

  return gains.length ? Math.min(...gains) : null;
}

function matchesRegion(mountain: Mountain, region: FinderRegion) {
  if (region === "anywhere") {
    return true;
  }

  return REGION_ISLANDS[region].includes(mountain.island);
}

function hasRequiredData(mountain: Mountain) {
  return Boolean(
    mountain.id &&
    mountain.slug &&
    mountain.name &&
    mountain.island &&
    Number.isFinite(mountain.beginnerScore) &&
    mountain.beginnerScore >= 0 &&
    Number.isFinite(mountain.durationDays) &&
    mountain.durationDays > 0 &&
    mountain.budgetCategory &&
    getElevationGain(mountain) !== null,
  );
}

function passesHardFilters(mountain: Mountain, answers: FinderAnswers) {
  if (!hasRequiredData(mountain)) {
    return false;
  }

  if (
    !MAX_DIFFICULTY_BY_EXPERIENCE[answers.experience].includes(
      mountain.difficulty,
    )
  ) {
    return false;
  }

  const availableDays = getAvailableDays(answers.availableTime);

  if (mountain.durationDays > availableDays) {
    return false;
  }

  return matchesRegion(mountain, answers.preferredRegion);
}

function scoreBeginnerSuitability(
  mountain: Mountain,
  experience: FinderExperience,
) {
  const editorialScore = clamp(mountain.beginnerScore / 100);
  const difficultyScore =
    EXPERIENCE_DIFFICULTY_SCORE[experience][mountain.difficulty];

  return editorialScore * 0.4 + difficultyScore * 0.6;
}

function scoreDuration(
  durationDays: number,
  availableTime: FinderAvailableTime,
) {
  if (availableTime === "3-plus-days") {
    if (durationDays >= 3) return 1;
    if (durationDays >= 2) return 0.85;
    return 0.7;
  }

  const availableDays = getAvailableDays(availableTime);
  const unusedDays = availableDays - durationDays;

  if (unusedDays <= 0.25) return 1;
  if (unusedDays <= 1) return 0.85;
  return 0.7;
}

function scoreFitness(mountain: Mountain, fitness: FinderFitness) {
  const elevationGain = getElevationGain(mountain) ?? 0;
  const capacity = FITNESS_CAPACITY[fitness];
  const gainOverage = Math.max(0, elevationGain - capacity.elevationGain);
  const durationOverage = Math.max(
    0,
    mountain.durationDays - capacity.durationDays,
  );
  const gainScore = clamp(1 - gainOverage / capacity.elevationGain);
  const durationScore = clamp(1 - durationOverage / capacity.durationDays);

  return gainScore * 0.75 + durationScore * 0.25;
}

function scoreGoal(mountain: Mountain, goal: FinderGoal) {
  switch (goal) {
    case "sunrise":
      return clamp(mountain.sunriseRating / 5);
    case "first-summit":
      return clamp(mountain.beginnerScore / 100);
    case "challenge":
      return {
        easy: 0.35,
        moderate: 0.65,
        hard: 1,
        extreme: 0.95,
      }[mountain.difficulty];
    case "photography":
      return (
        clamp(mountain.sunriseRating / 5) * 0.7 +
        clamp(mountain.popularityScore / 100) * 0.3
      );
    case "nature":
      return (
        Number(mountain.campingAvailable) * 0.6 +
        Number(mountain.waterSource) * 0.4
      );
  }
}

function scoreBudget(mountain: Mountain, budget: FinderBudget) {
  return BUDGET_SCORE[budget][mountain.budgetCategory] ?? 0;
}

function buildNarrative(
  mountain: Mountain,
  answers: FinderAnswers,
  breakdown: FinderScoreBreakdown,
) {
  const elevationGain = getElevationGain(mountain) ?? 0;
  const matchedAttributes: string[] = [];
  const mismatchedAttributes: string[] = [];
  const tradeOffs: string[] = [];
  const reasons: string[] = [];

  if (breakdown.beginnerSuitability >= 0.75) {
    matchedAttributes.push("tingkat pengalaman");
    reasons.push(
      `Kesulitan ${mountain.difficulty} dan skor pemula ${mountain.beginnerScore}/100 selaras dengan pengalamanmu.`,
    );
  } else {
    mismatchedAttributes.push("tingkat pengalaman");
    tradeOffs.push(
      `Kecocokan pengalaman tidak maksimal karena tingkat kesulitannya ${mountain.difficulty}.`,
    );
  }

  if (breakdown.durationCompatibility >= 0.85) {
    matchedAttributes.push("waktu tersedia");
    reasons.push(
      `Estimasi ${mountain.durationDays} hari sesuai dengan waktu yang tersedia.`,
    );
  } else {
    mismatchedAttributes.push("waktu tersedia");
    tradeOffs.push(
      `Durasi ${mountain.durationDays} hari lebih singkat dari waktu yang kamu siapkan.`,
    );
  }

  if (breakdown.fitnessCompatibility >= 0.75) {
    matchedAttributes.push("tingkat kebugaran");
    reasons.push(
      `Kenaikan elevasi rute terendah sekitar ${elevationGain} meter masih sesuai dengan profil kebugaranmu.`,
    );
  } else {
    mismatchedAttributes.push("tingkat kebugaran");
    tradeOffs.push(
      `Kenaikan elevasi sekitar ${elevationGain} meter membutuhkan persiapan fisik tambahan.`,
    );
  }

  if (answers.preferredRegion !== "anywhere") {
    matchedAttributes.push("wilayah pilihan");
    reasons.push(`${mountain.name} berada di wilayah pilihanmu.`);
  }

  if (breakdown.goalCompatibility >= 0.7) {
    matchedAttributes.push("tujuan pendakian");
    reasons.push(
      `Atribut gunung mendukung tujuan ${GOAL_LABELS[answers.goal]}.`,
    );
  } else {
    mismatchedAttributes.push("tujuan pendakian");
    tradeOffs.push(
      `Gunung ini tidak paling kuat untuk tujuan ${GOAL_LABELS[answers.goal]}.`,
    );
  }

  if (breakdown.budgetCompatibility >= 0.75) {
    matchedAttributes.push("anggaran");
  } else {
    mismatchedAttributes.push("anggaran");
    tradeOffs.push(
      `Kategori anggaran ${mountain.budgetCategory} perlu dipertimbangkan kembali.`,
    );
  }

  if (!tradeOffs.length) {
    tradeOffs.push(
      "Data ini adalah kecocokan perencanaan awal; kondisi jalur dan ketentuan resmi tetap perlu diperiksa.",
    );
  }

  return { matchedAttributes, mismatchedAttributes, tradeOffs, reasons };
}

function scoreMountain(
  mountain: Mountain,
  answers: FinderAnswers,
): FinderRecommendation {
  const breakdown: FinderScoreBreakdown = {
    beginnerSuitability: scoreBeginnerSuitability(mountain, answers.experience),
    durationCompatibility: scoreDuration(
      mountain.durationDays,
      answers.availableTime,
    ),
    fitnessCompatibility: scoreFitness(mountain, answers.fitness),
    regionPreference: 1,
    goalCompatibility: scoreGoal(mountain, answers.goal),
    budgetCompatibility: scoreBudget(mountain, answers.budget),
  };
  const weightedTotal = (
    Object.keys(FINDER_SCORE_WEIGHTS) as FinderScoreDimension[]
  ).reduce(
    (total, dimension) =>
      total + breakdown[dimension] * FINDER_SCORE_WEIGHTS[dimension],
    0,
  );

  return {
    mountain,
    score: Math.round(weightedTotal * 100),
    breakdown,
    ...buildNarrative(mountain, answers, breakdown),
  };
}

/**
 * Deterministic Finder formula:
 * 1. Remove candidates that exceed the user's time, experience ceiling,
 *    mandatory region, or lack essential route/scoring data.
 * 2. Normalize every remaining dimension to 0..1:
 *    - beginner suitability = 60% experience/difficulty fit + 40% editorial
 *      beginner score;
 *    - duration rewards the closest trip length that does not exceed the
 *      available time;
 *    - fitness = 75% elevation-gain capacity + 25% multi-day capacity;
 *    - region is a neutral full score after the mandatory-region filter;
 *    - goal uses only database attributes (sunrise, beginner score,
 *      difficulty, popularity, camping, and water source);
 *    - budget uses an explicit low/medium/flexible compatibility matrix.
 * 3. Apply the PRD weights (30/20/15/15/15/5), convert to 0..100, then
 *    sort by score, name, and id for stable results.
 */
export function scoreFinderRecommendations(
  answers: FinderAnswers,
  mountains: readonly Mountain[],
) {
  return mountains
    .filter((mountain) => passesHardFilters(mountain, answers))
    .map((mountain) => scoreMountain(mountain, answers))
    .sort(
      (left, right) =>
        right.score - left.score ||
        left.mountain.name.localeCompare(right.mountain.name, "id-ID") ||
        left.mountain.id.localeCompare(right.mountain.id),
    );
}
