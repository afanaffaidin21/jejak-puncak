import assert from "node:assert/strict";
import test from "node:test";

import { cn } from "./utils.ts";

test("cn merges conditional values and resolves Tailwind conflicts", () => {
  assert.equal(cn("px-2", false && "hidden", "px-4"), "px-4");
});
