import { z } from "zod";

export const accessTokenSchema = z.object({ access_token: z.string() });

export const userDataSchema = z.object({
  name: z.string(),
  id: z.string(),
  role: z.optional(z.literal("leader").or(z.literal("follower"))),
});
