"use server";

import prisma from "@/lib/prisma";

export type ClosestSubscriptionResult = {
  id: string;
  name: string;
  price: number;
  nextPaymentDate: Date;
  daysUntil: number; // negatif = overdue
};

const getTotalSubscriptionsPrice = async (userId: string) => {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId,
      price: {
        gte: 0,
      },
    },
    select: {
      price: true,
      status: true,
    },
  });

  if (subscriptions.length === 0) return 0;

  const filteredSubscriptions = subscriptions.filter(
    (subscription) => subscription.status === "ACTIVE"
  );
  const total = filteredSubscriptions.reduce(
    (total, subscription) => total + subscription.price,
    0
  );
  const formatIDR = (v: number) =>
    v.toLocaleString("id-ID", { style: "currency", currency: "IDR" });

  return formatIDR(total);
};

const getClosestSubscription = async (userId: string) => {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId,
      status: "ACTIVE",
    },
    select: {
      id: true,
      name: true,
      nextPaymentDate: true,
      price: true,
    },
  });

  if (subscriptions.length === 0) return null;

  const today = new Date();

  const sorted = subscriptions
    .map((sub) => {
      const nextDate = new Date(sub.nextPaymentDate!);

      // hitung jarak hari
      const diff = Math.ceil(
        (nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      return { ...sub, diff };
    })
    // hanya yang jatuh tempo setelah hari ini
    .filter((sub) => sub.diff >= 0)
    .sort((a, b) => a.diff - b.diff);

  return sorted[0] || null;
};

const getActiveSubscriptionsCount = async (userId: string) => {
  const subscriptions = await prisma.subscription.findMany({
    where: {
      userId,
      status: "ACTIVE",
    },
  });

  if (subscriptions.length === 0) return 0;
  return subscriptions.length;
};

export { getTotalSubscriptionsPrice, getActiveSubscriptionsCount, getClosestSubscription };
