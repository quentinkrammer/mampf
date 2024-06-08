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

export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  details: z.string(),
  price: z.optional(z.number()),
  payed: z.optional(z.boolean()),
  username: z.optional(z.string())
})
export type Order = z.infer<typeof orderSchema>

export const postOrderSchema = z.object({
  details: z.string(),
  price: z.optional(z.number()),
})