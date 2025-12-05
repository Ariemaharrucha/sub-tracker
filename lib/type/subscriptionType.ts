export type SubscriptionType = {
  id: string;
  userId: string;
  name: string;
  price: number;
  startDate: Date;
  frequency: string;
  isTrial: boolean;
  trialDays: number | null;
  trialEndDate: Date | null;
  status: string;
  nextPaymentDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
