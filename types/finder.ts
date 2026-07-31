import type { Mountain } from "./mountain";

export type FinderExperience = "beginner" | "intermediate" | "advanced";
export type FinderFitness = "low" | "moderate" | "high";
export type FinderAvailableTime = "1-day" | "2-days" | "3-plus-days";
export type FinderRegion =
  | "jawa"
  | "sumatera"
  | "bali-nusa-tenggara"
  | "kalimantan"
  | "sulawesi"
  | "anywhere";
export type FinderGoal =
  "sunrise" | "first-summit" | "challenge" | "photography" | "nature";
export type FinderBudget = "low" | "medium" | "flexible";

export type FinderAnswers = {
  experience: FinderExperience;
  fitness: FinderFitness;
  availableTime: FinderAvailableTime;
  preferredRegion: FinderRegion;
  goal: FinderGoal;
  budget: FinderBudget;
};

export type FinderScoreDimension =
  | "beginnerSuitability"
  | "durationCompatibility"
  | "fitnessCompatibility"
  | "regionPreference"
  | "goalCompatibility"
  | "budgetCompatibility";

export type FinderScoreBreakdown = Record<FinderScoreDimension, number>;

export type FinderRecommendation = {
  mountain: Mountain;
  score: number;
  breakdown: FinderScoreBreakdown;
  matchedAttributes: string[];
  mismatchedAttributes: string[];
  tradeOffs: string[];
  reasons: string[];
};

export type FinderAiExplanation = {
  summary: string;
  mainReasons: string[];
  tradeOffs: string[];
  cta: string;
};

export type FinderAiStatus =
  "available" | "not_configured" | "rate_limited" | "unavailable";

export type FinderResultPayload = {
  recommendations: FinderRecommendation[];
  explanation: FinderAiExplanation | null;
  aiStatus: FinderAiStatus;
  saved: boolean;
};
