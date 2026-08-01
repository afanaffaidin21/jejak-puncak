import assert from "node:assert/strict";
import test from "node:test";

import { loginSchema, registerSchema } from "./validation.ts";

test("normalizes a valid login email", () => {
  const result = loginSchema.parse({
    email: "  HIKER@EXAMPLE.COM ",
    password: "rahasia123",
    remember: true,
  });

  assert.equal(result.email, "hiker@example.com");
});

test("rejects weak registration passwords", () => {
  const result = registerSchema.safeParse({
    displayName: "Afan",
    email: "afan@example.com",
    password: "abcdefgh",
    confirmPassword: "abcdefgh",
  });

  assert.equal(result.success, false);
});

test("rejects a mismatched password confirmation", () => {
  const result = registerSchema.safeParse({
    displayName: "Afan",
    email: "afan@example.com",
    password: "mendaki123",
    confirmPassword: "mendaki456",
  });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.deepEqual(result.error.issues[0]?.path, ["confirmPassword"]);
  }
});
