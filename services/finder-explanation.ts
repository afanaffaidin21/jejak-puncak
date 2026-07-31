import type {
  FinderAiExplanation,
  FinderAnswers,
  FinderRecommendation,
} from "@/types/finder";

export const FINDER_AI_SYSTEM_PROMPT =
  "Anda adalah asisten Jejak Puncak. Jelaskan hasil rekomendasi berdasarkan data yang diberikan. Jangan mengubah skor, jangan menambahkan fakta baru, dan jangan memberikan jaminan keselamatan.";

const OUTPUT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    summary: { type: "string" },
    mainReasons: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      maxItems: 4,
    },
    tradeOffs: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      maxItems: 4,
    },
    cta: { type: "string" },
  },
  required: ["summary", "mainReasons", "tradeOffs", "cta"],
} as const;

type AiProviderConfig =
  | { provider: "openai"; apiKey: string; model: string }
  | { provider: "anthropic"; apiKey: string; model: string };

type ExplanationOptions = {
  config?: AiProviderConfig | null;
  fetcher?: typeof fetch;
};

function getProviderConfig(): AiProviderConfig | null {
  const provider = process.env.AI_PROVIDER?.toLowerCase();

  if (
    provider === "openai" &&
    process.env.OPENAI_API_KEY &&
    process.env.OPENAI_MODEL
  ) {
    return {
      provider,
      apiKey: process.env.OPENAI_API_KEY,
      model: process.env.OPENAI_MODEL,
    };
  }

  if (
    provider === "anthropic" &&
    process.env.ANTHROPIC_API_KEY &&
    process.env.ANTHROPIC_MODEL
  ) {
    return {
      provider,
      apiKey: process.env.ANTHROPIC_API_KEY,
      model: process.env.ANTHROPIC_MODEL,
    };
  }

  return null;
}

export function isFinderAiConfigured() {
  return getProviderConfig() !== null;
}

function buildPrompt(
  answers: FinderAnswers,
  recommendations: readonly FinderRecommendation[],
) {
  const structuredInput = {
    answers,
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
        budgetCategory: recommendation.mountain.budgetCategory,
        bestSeason: recommendation.mountain.bestSeason,
        sunriseRating: recommendation.mountain.sunriseRating,
        campingAvailable: recommendation.mountain.campingAvailable,
        waterSource: recommendation.mountain.waterSource,
      },
      matchedAttributes: recommendation.matchedAttributes,
      mismatchedAttributes: recommendation.mismatchedAttributes,
      deterministicReasons: recommendation.reasons,
      deterministicTradeOffs: recommendation.tradeOffs,
    })),
  };

  return [
    "Tulis penjelasan rekomendasi dalam Bahasa Indonesia yang ramah, informatif, tenang, dan profesional.",
    "Pertahankan urutan, rank, dan skor persis seperti input. AI hanya menjelaskan rekomendasi peringkat pertama dan tidak melakukan scoring atau ranking ulang.",
    "Gunakan hanya fakta di JSON. Jangan mengarang kondisi jalur, cuaca, biaya nominal, izin, akses, kesehatan, atau keselamatan.",
    "Sertakan ringkasan, alasan utama, sedikitnya satu trade-off, dan CTA untuk membuka detail gunung peringkat pertama.",
    'Keluarkan hanya JSON valid dengan bentuk: {"summary": string, "mainReasons": string[], "tradeOffs": string[], "cta": string}.',
    `INPUT_JSON:\n${JSON.stringify(structuredInput)}`,
  ].join("\n\n");
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isNonEmptyStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.length > 0 && value.every(isNonEmptyString)
  );
}

export function parseFinderAiExplanation(
  value: unknown,
): FinderAiExplanation | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const explanation = value as Record<string, unknown>;

  if (
    !isNonEmptyString(explanation.summary) ||
    !isNonEmptyStringArray(explanation.mainReasons) ||
    !isNonEmptyStringArray(explanation.tradeOffs) ||
    !isNonEmptyString(explanation.cta)
  ) {
    return null;
  }

  return {
    summary: explanation.summary.trim(),
    mainReasons: explanation.mainReasons.map((item) => item.trim()),
    tradeOffs: explanation.tradeOffs.map((item) => item.trim()),
    cta: explanation.cta.trim(),
  };
}

function parseJsonText(text: string) {
  const normalized = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

  try {
    return JSON.parse(normalized) as unknown;
  } catch {
    return null;
  }
}

function getOpenAiText(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const response = value as Record<string, unknown>;

  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  if (!Array.isArray(response.output)) return null;

  for (const item of response.output) {
    if (!item || typeof item !== "object") continue;
    const content = (item as Record<string, unknown>).content;
    if (!Array.isArray(content)) continue;

    for (const block of content) {
      if (!block || typeof block !== "object") continue;
      const text = (block as Record<string, unknown>).text;
      if (typeof text === "string") return text;
    }
  }

  return null;
}

function getAnthropicText(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const content = (value as Record<string, unknown>).content;
  if (!Array.isArray(content)) return null;

  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const candidate = block as Record<string, unknown>;
    if (candidate.type === "text" && typeof candidate.text === "string") {
      return candidate.text;
    }
  }

  return null;
}

async function requestOpenAi(
  config: Extract<AiProviderConfig, { provider: "openai" }>,
  prompt: string,
  fetcher: typeof fetch,
) {
  const response = await fetcher("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      instructions: FINDER_AI_SYSTEM_PROMPT,
      input: prompt,
      max_output_tokens: 600,
      text: {
        format: {
          type: "json_schema",
          name: "finder_recommendation_explanation",
          strict: true,
          schema: OUTPUT_SCHEMA,
        },
      },
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) return null;
  return getOpenAiText((await response.json()) as unknown);
}

async function requestAnthropic(
  config: Extract<AiProviderConfig, { provider: "anthropic" }>,
  prompt: string,
  fetcher: typeof fetch,
) {
  const response = await fetcher("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 600,
      system: FINDER_AI_SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) return null;
  return getAnthropicText((await response.json()) as unknown);
}

export async function createFinderExplanation(
  answers: FinderAnswers,
  recommendations: readonly FinderRecommendation[],
  options: ExplanationOptions = {},
): Promise<FinderAiExplanation | null> {
  const config =
    options.config === undefined ? getProviderConfig() : options.config;

  if (!config || !recommendations.length) return null;

  const prompt = buildPrompt(answers, recommendations);
  const fetcher = options.fetcher ?? fetch;

  try {
    const text =
      config.provider === "openai"
        ? await requestOpenAi(config, prompt, fetcher)
        : await requestAnthropic(config, prompt, fetcher);

    return text ? parseFinderAiExplanation(parseJsonText(text)) : null;
  } catch {
    return null;
  }
}
