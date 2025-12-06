// components/dashboard/SubscriptionListContainer.tsx
import { listSubscription } from "@/lib/action/listSubscription";
import SubscriptionListWrapper from "./SubscriptionListWrapper";

export default async function SubscriptionListContainer({ userId }: { userId: string }) {
  const subscriptions = await listSubscription(userId);

  return <SubscriptionListWrapper userId={userId} subscriptions={subscriptions} />;
}