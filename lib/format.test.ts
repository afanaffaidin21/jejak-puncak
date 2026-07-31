import assert from "node:assert/strict";
import test from "node:test";

import { formatDate, formatNumber } from "./format.ts";

test("formatNumber uses Indonesian separators", () => {
  assert.equal(formatNumber(12_500), "12.500");
  assert.equal(formatNumber(0.625, { style: "percent" }), "63%");
});

test("formatNumber returns a consistent fallback for invalid values", () => {
  assert.equal(formatNumber(null), "—");
  assert.equal(formatNumber(Number.NaN), "—");
});

test("formatDate uses the Indonesian locale and time zone", () => {
  assert.equal(formatDate("2026-07-30T18:00:00.000Z"), "31 Jul 2026");
});

test("formatDate supports options and invalid-value fallbacks", () => {
  assert.equal(
    formatDate("2026-07-30T18:00:00.000Z", {
      month: "long",
      year: "numeric",
    }),
    "Juli 2026",
  );
  assert.equal(formatDate("not-a-date"), "—");
});
