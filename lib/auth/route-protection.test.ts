import assert from "node:assert/strict";
import test from "node:test";

import { getRequestedPath, isProtectedRoute } from "./route-protection.ts";

test("protects Passport and Profile routes only", () => {
  assert.equal(isProtectedRoute("/passport"), true);
  assert.equal(isProtectedRoute("/passport/history"), true);
  assert.equal(isProtectedRoute("/profile"), true);
  assert.equal(isProtectedRoute("/profile/settings"), true);
  assert.equal(isProtectedRoute("/profile-preview"), false);
  assert.equal(isProtectedRoute("/explore"), false);
});

test("preserves path and query for the post-login return URL", () => {
  assert.equal(
    getRequestedPath("/passport", "?tab=wishlist"),
    "/passport?tab=wishlist",
  );
});
