'use server'

import prisma from "@/lib/prisma"

export async function listSubscription(userId: string) {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId,
    },
  })

  return subscriptions
}