"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteSubscription(id: string) {
  const sub = await prisma.subscription.findUnique({ where: { id } });
  if (!sub) throw new Error("Subscription not found");

  await prisma.subscription.delete({ where: { id } });

  revalidatePath("/dashboard");
}
