import assert from "node:assert/strict";
import test from "node:test";

import { consumeRateLimit } from "./rate-limit.ts";

test("limits a key within one fixed window and resets afterwards", () => {
  const key = "finder-test-key";
  const first = consumeRateLimit(key, { limit: 2, windowMs: 1_000, now: 0 });
  const second = consumeRateLimit(key, { limit: 2, windowMs: 1_000, now: 1 });
  const denied = consumeRateLimit(key, { limit: 2, windowMs: 1_000, now: 2 });
  const reset = consumeRateLimit(key, {
    limit: 2,
    windowMs: 1_000,
    now: 1_000,
  });

  assert.equal(first.allowed, true);
  assert.equal(second.remaining, 0);
  assert.equal(denied.allowed, false);
  assert.equal(reset.allowed, true);
  assert.equal(reset.remaining, 1);
});
