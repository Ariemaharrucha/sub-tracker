import { z } from "zod";

export const subscriptionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  startDate: z.date({ error: "Start date is required" }),
  frequency: z.enum(["MONTHLY", "YEARLY"]),
  isTrial: z.boolean(),
  trialDays: z.number().optional(),
});

export type SubscriptionSchema = z.infer<typeof subscriptionSchema>;
