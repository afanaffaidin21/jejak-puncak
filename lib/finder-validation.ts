import type {
  FinderAnswers,
  FinderAvailableTime,
  FinderBudget,
  FinderExperience,
  FinderFitness,
  FinderGoal,
  FinderRegion,
} from "@/types/finder";

export const FINDER_EXPERIENCES = [
  "beginner",
  "intermediate",
  "advanced",
] as const satisfies readonly FinderExperience[];
export const FINDER_FITNESS_LEVELS = [
  "low",
  "moderate",
  "high",
] as const satisfies readonly FinderFitness[];
export const FINDER_AVAILABLE_TIMES = [
  "1-day",
  "2-days",
  "3-plus-days",
] as const satisfies readonly FinderAvailableTime[];
export const FINDER_REGIONS = [
  "jawa",
  "sumatera",
  "bali-nusa-tenggara",
  "kalimantan",
  "sulawesi",
  "anywhere",
] as const satisfies readonly FinderRegion[];
export const FINDER_GOALS = [
  "sunrise",
  "first-summit",
  "challenge",
  "photography",
  "nature",
] as const satisfies readonly FinderGoal[];
export const FINDER_BUDGETS = [
  "low",
  "medium",
  "flexible",
] as const satisfies readonly FinderBudget[];

function isOneOf<T extends string>(
  value: unknown,
  options: readonly T[],
): value is T {
  return typeof value === "string" && options.includes(value as T);
}

export function parseFinderAnswers(value: unknown): FinderAnswers | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const answers = value as Record<string, unknown>;

  if (
    !isOneOf(answers.experience, FINDER_EXPERIENCES) ||
    !isOneOf(answers.fitness, FINDER_FITNESS_LEVELS) ||
    !isOneOf(answers.availableTime, FINDER_AVAILABLE_TIMES) ||
    !isOneOf(answers.preferredRegion, FINDER_REGIONS) ||
    !isOneOf(answers.goal, FINDER_GOALS) ||
    !isOneOf(answers.budget, FINDER_BUDGETS)
  ) {
    return null;
  }

  return {
    experience: answers.experience,
    fitness: answers.fitness,
    availableTime: answers.availableTime,
    preferredRegion: answers.preferredRegion,
    goal: answers.goal,
    budget: answers.budget,
  };
}
