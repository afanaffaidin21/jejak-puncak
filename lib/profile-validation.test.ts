import assert from "node:assert/strict";
import test from "node:test";

import {
  personalInformationSchema,
  profilePreferencesSchema,
} from "./profile-validation.ts";

test("personal information trims valid values", () => {
  assert.deepEqual(
    personalInformationSchema.parse({
      bio: "  Suka jalur yang tenang.  ",
      displayName: "  Rani Puncak  ",
    }),
    { bio: "Suka jalur yang tenang.", displayName: "Rani Puncak" },
  );
});

test("personal information rejects invalid name and an oversized bio", () => {
  assert.equal(
    personalInformationSchema.safeParse({
      bio: "a".repeat(501),
      displayName: "R",
    }).success,
    false,
  );
});

test("profile preferences accept stable Finder identifiers", () => {
  assert.equal(
    profilePreferencesSchema.safeParse({
      experienceLevel: "intermediate",
      hikingGoals: ["sunrise", "photography"],
      measurementUnit: "metric",
      preferredRegion: "jawa",
    }).success,
    true,
  );
});

test("profile preferences reject more than three hiking goals", () => {
  assert.equal(
    profilePreferencesSchema.safeParse({
      experienceLevel: "beginner",
      hikingGoals: ["sunrise", "first-summit", "nature", "photography"],
      measurementUnit: "metric",
      preferredRegion: "anywhere",
    }).success,
    false,
  );
});
