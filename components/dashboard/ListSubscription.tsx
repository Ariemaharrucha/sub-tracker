import SubscriptionListWrapper from "./SubscriptionListWrapper";
import { listSubscription } from "@/lib/action/listSubscription";

export default async function ListSubscription({ userId }: { userId: string }) {
  const subscriptions = await listSubscription(userId);

  return (
    <SubscriptionListWrapper subscriptions={subscriptions} />
  );
}
