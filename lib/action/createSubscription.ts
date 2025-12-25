'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { AddSubscriptionSchema } from "@/lib/validation/addSubscriptionSchema"

function getNextBillingDate(date: Date, frequency: string) {
  const d = new Date(date)
  if (frequency === "MONTHLY") d.setMonth(d.getMonth() + 1)
  if (frequency === "YEARLY") d.setFullYear(d.getFullYear() + 1)
  return d
}

export async function createSubscription(values: AddSubscriptionSchema, userId: string) {
  const { name, price, startDate, frequency, isTrial, trialDays } = values

  const parsedDate = new Date(startDate)

  let trialEndDate: Date | null = null
  let nextPaymentDate: Date | null = null

  const status = isTrial ? "TRIAL" : "ACTIVE"

  if (isTrial && trialDays) {
    trialEndDate = new Date(parsedDate)
    trialEndDate.setDate(trialEndDate.getDate() + trialDays)
    nextPaymentDate = getNextBillingDate(trialEndDate, frequency)
  } else {
    nextPaymentDate = getNextBillingDate(parsedDate, frequency)
  }

  try {
    await prisma.subscription.create({
    data: {
      userId,
      name,
      price,
      startDate: parsedDate,
      frequency,
      isTrial,
      trialDays: trialDays ?? null,
      trialEndDate,
      status,
      nextPaymentDate
    },
  })

  revalidatePath("/dashboard")
  return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to create subscription" }
  }
}
