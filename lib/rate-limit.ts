type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitOptions = {
  limit: number;
  windowMs: number;
  now?: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

const buckets = new Map<string, RateLimitEntry>();

/**
 * Best-effort per-instance limiter. It protects the optional LLM call without
 * making deterministic Finder results depend on external infrastructure.
 */
export function consumeRateLimit(
  key: string,
  { limit, windowMs, now = Date.now() }: RateLimitOptions,
): RateLimitResult {
  const current = buckets.get(key);
  const entry =
    !current || current.resetAt <= now
      ? { count: 0, resetAt: now + windowMs }
      : current;

  if (entry.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  entry.count += 1;
  buckets.set(key, entry);

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}

export function getRequestRateLimitKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address =
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  return `finder-ai:${address}`;
}
