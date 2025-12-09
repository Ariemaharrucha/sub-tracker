// components/dashboard/SubscriptionListContainer.tsx
import { listSubscription } from "@/lib/action/listSubscription";
import SubscriptionListWrapper from "./subscription-list-wrapper";

export default async function SubscriptionListContainer({ userId }: { userId: string }) {
  const subscriptions = await listSubscription(userId);

  return <SubscriptionListWrapper userId={userId} subscriptions={subscriptions} />;
}