import assert from "node:assert/strict";
import test from "node:test";

import { addAuthAnalyticsEvent, getSafeRedirectPath } from "./redirect.ts";

test("accepts local paths including query strings and hashes", () => {
  assert.equal(
    getSafeRedirectPath("/explore?island=Jawa#gunung-bromo"),
    "/explore?island=Jawa#gunung-bromo",
  );
});

test("rejects absolute and protocol-relative redirect targets", () => {
  assert.equal(getSafeRedirectPath("https://evil.example"), "/explore");
  assert.equal(getSafeRedirectPath("//evil.example/path"), "/explore");
});

test("uses the caller fallback for missing and invalid values", () => {
  assert.equal(getSafeRedirectPath(undefined, "/"), "/");
  assert.equal(getSafeRedirectPath("explore", "/"), "/");
});

test("adds a one-time auth event without dropping destination state", () => {
  assert.equal(
    addAuthAnalyticsEvent("/map?island=Jawa#list", "google_success"),
    "/map?island=Jawa&_auth_event=google_success#list",
  );
});
