"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function markAsPaid(formData: FormData) {
  const id = formData.get("id") as string;

  const sub = await prisma.subscription.findUnique({ where: { id } });

  if (!sub) throw new Error("Subscription not found");

  const next = calculateNextPaymentDate(sub.nextPaymentDate, sub.frequency);

  await prisma.subscription.update({
    where: { id },
    data: { nextPaymentDate: next, status: "ACTIVE" },
  });

  revalidatePath("/dashboard");
}

function calculateNextPaymentDate(date: Date, frequency: string) {
  const d = new Date(date)
  if (frequency === "MONTHLY") d.setMonth(d.getMonth() + 1)
  if (frequency === "YEARLY") d.setFullYear(d.getFullYear() + 1)
  return d
}
