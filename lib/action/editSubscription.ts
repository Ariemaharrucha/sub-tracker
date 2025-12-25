'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { SubscriptionSchema } from "@/lib/validation/SubscriptionSchema"

function getNextBillingDate(date: Date, frequency: string) {
  const d = new Date(date)
  if (frequency === "MONTHLY") d.setMonth(d.getMonth() + 1)
  if (frequency === "YEARLY") d.setFullYear(d.getFullYear() + 1)
  return d
}

export const editSubscription = async (values: SubscriptionSchema, id: string) => {
  const { name, price, startDate, frequency, isTrial, trialDays } = values

  const parsedDate = new Date(startDate)
  let trialEndDate: Date | null = null
  let nextPaymentDate: Date | null = null

  // Logika status dan tanggal (mirip create, tapi hati-hati mengubah status jika sudah berjalan)
  // Di sini kita asumsikan edit mereset kalkulasi tanggal berdasarkan input baru
  const status = isTrial ? "TRIAL" : "ACTIVE"

  if (isTrial && trialDays) {
    trialEndDate = new Date(parsedDate)
    trialEndDate.setDate(trialEndDate.getDate() + trialDays)
    nextPaymentDate = getNextBillingDate(trialEndDate, frequency)
  } else {
    nextPaymentDate = getNextBillingDate(parsedDate, frequency)
  }

  try {
    await prisma.subscription.update({
      where: { id },
      data: {
        name,
        price,
        startDate: parsedDate,
        frequency,
        isTrial,
        trialDays: trialDays ?? null,
        trialEndDate,
        status, // Update status, atau hapus baris ini jika status tidak boleh berubah otomatis saat edit
        nextPaymentDate
      },
    })

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to update subscription" }
  }
}