import { z } from "zod";

export const accessTokenSchema = z.object({ access_token: z.string() });

export const userDataSchema = z.object({
  // should be a literal type
  role: z.optional(z.string()),
  paypalUrl: z.optional(z.string()),
  name: z.string(),
  id: z.string(),
});

export const leaderSchema = z.object({
  userId: z.string(),
  name: z.string(),
});
