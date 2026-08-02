import assert from "node:assert/strict";
import test from "node:test";

import { buttonVariants } from "../components/ui/button-variants.ts";
import { cn } from "./utils.ts";

test("cn merges conditional values and resolves Tailwind conflicts", () => {
  assert.equal(cn("px-2", false && "hidden", "px-4"), "px-4");
});

test("primary button variants keep their foreground color with text sizing", () => {
  const classes = cn(buttonVariants({ size: "lg" }));

  assert.match(classes, /text-button-primary-foreground/);
  assert.match(classes, /text-body/);
});
