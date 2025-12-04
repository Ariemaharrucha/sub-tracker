'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createSubscription(formData: FormData, userId: string) {
  const name = formData.get("name") as string
  const priceInput = formData.get("price") as string
  const startDateInput = formData.get("startDate") as string
  const frequency = formData.get("frequency") as string

  if (!name || !priceInput || !startDateInput || !frequency) {
    return { error: "Missing required fields." }
  }

  const isTrial = formData.get("isTrial") === "on"
  const trialDays = isTrial ? parseInt(formData.get("trialDays") as string) : null

  const price = parseInt(priceInput)
  const startDate = new Date(startDateInput)

  let trialEndDate = null
  let nextPaymentDate = null

  const status = isTrial ? "TRIAL" : "ACTIVE"

  if (isTrial && trialDays) {
    trialEndDate = new Date(startDate)
    trialEndDate.setDate(trialEndDate.getDate() + trialDays)

    nextPaymentDate = getNextBillingDate(trialEndDate, frequency)
  } else {
    nextPaymentDate = getNextBillingDate(startDate, frequency)
  }

  await prisma.subscription.create({
    data: {
      userId,
      name,
      price,
      startDate,
      frequency,

      isTrial,
      trialDays,
      trialEndDate,
      status,

      nextPaymentDate,
    },
  })

  revalidatePath("/dashboard")
  return { success: true }
}

function getNextBillingDate(date: Date, frequency: string) {
  const d = new Date(date)
  if (frequency === "MONTHLY") d.setMonth(d.getMonth() + 1)
  if (frequency === "YEARLY") d.setFullYear(d.getFullYear() + 1)
  return d
}
