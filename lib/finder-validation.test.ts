import assert from "node:assert/strict";
import test from "node:test";

import { parseFinderAnswers } from "./finder-validation.ts";

test("parses a complete Finder answer set", () => {
  const answers = parseFinderAnswers({
    experience: "beginner",
    fitness: "moderate",
    availableTime: "2-days",
    preferredRegion: "jawa",
    goal: "first-summit",
    budget: "medium",
  });

  assert.deepEqual(answers, {
    experience: "beginner",
    fitness: "moderate",
    availableTime: "2-days",
    preferredRegion: "jawa",
    goal: "first-summit",
    budget: "medium",
  });
});

test("rejects incomplete or unknown Finder answers", () => {
  assert.equal(parseFinderAnswers({ experience: "beginner" }), null);
  assert.equal(
    parseFinderAnswers({
      experience: "expert",
      fitness: "moderate",
      availableTime: "2-days",
      preferredRegion: "jawa",
      goal: "first-summit",
      budget: "medium",
    }),
    null,
  );
});
