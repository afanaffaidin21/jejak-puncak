import assert from "node:assert/strict";
import test from "node:test";

import {
  mountainStatusMutationSchema,
  wishlistMutationSchema,
} from "./validation.ts";

const mountainId = "11111111-1111-4111-8111-111111111111";

test("accepts a server-side wishlist mutation payload", () => {
  assert.deepEqual(wishlistMutationSchema.parse({ mountainId }), {
    mountainId,
  });
});

test("rejects client user IDs and invalid mountain statuses", () => {
  assert.equal(
    wishlistMutationSchema.safeParse({ mountainId, userId: "attacker" })
      .success,
    false,
  );
  assert.equal(
    mountainStatusMutationSchema.safeParse({
      mountainId,
      status: "planned",
    }).success,
    false,
  );
  assert.equal(
    mountainStatusMutationSchema.safeParse({
      mountainId,
      status: "completed",
      userId: "attacker",
    }).success,
    false,
  );
});

test("accepts the completed transition without a client user ID", () => {
  assert.deepEqual(
    mountainStatusMutationSchema.parse({
      mountainId,
      status: "completed",
    }),
    { mountainId, status: "completed" },
  );
});
