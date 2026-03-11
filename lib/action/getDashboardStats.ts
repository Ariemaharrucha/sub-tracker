"use server";

import prisma from "@/lib/prisma";

export type DashboardStats = {
  totalMonthlyPrice: string;
  closestSubscription: {
    id: string;
    name: string;
    nextPaymentDate: Date;
    diff: number;
  } | null;
  activeCount: number;
};

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [totalResult, subscriptions, activeCount] = await Promise.all([
    prisma.subscription.aggregate({
      where: { userId, status: "ACTIVE" },
      _sum: { price: true },
    }),
    prisma.subscription.findMany({
      where: { userId, status: "ACTIVE" },
      select: { id: true, name: true, nextPaymentDate: true },
      orderBy: { nextPaymentDate: "asc" },
    }),
    prisma.subscription.count({
      where: { userId, status: "ACTIVE" },
    }),
  ]);

  const totalMonthlyPrice = (totalResult._sum.price || 0).toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  const today = new Date();
  const closestSubscription = subscriptions
    .map((sub) => {
      const nextDate = new Date(sub.nextPaymentDate);
      const diff = Math.ceil(
        (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );
      return { ...sub, diff };
    })
    .filter((sub) => sub.diff >= 0)[0] || null;

  return {
    totalMonthlyPrice,
    closestSubscription,
    activeCount,
  };
}
