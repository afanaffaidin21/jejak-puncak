import { z } from "zod";

export const wishlistMutationSchema = z
  .object({
    mountainId: z.uuid(),
  })
  .strict();

export const mountainStatusMutationSchema = wishlistMutationSchema.extend({
  status: z.enum(["wishlist", "completed"]),
});
