import SubscriptionListWrapper from "@/components/dashboard/SubscriptionListWrapper";
import Navbar from "@/components/dashboard/Navbar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import SubscriptionOverview from "@/components/dashboard/SubscriptionOverview";
import { listSubscription } from "@/lib/action/listSubscription";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id as string;
  const subscriptions = await listSubscription(userId);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="h-screen min-w-6xl px-6 pb-6 bg-white dark:bg-black">
        <Navbar />

        <SubscriptionOverview userId={userId}/>

        <div className="border border-black mt-8"></div>

        <SubscriptionListWrapper userId={userId} subscriptions={subscriptions} />
      </main>
    </div>
  );
}
