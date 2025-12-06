import Navbar from "@/components/dashboard/Navbar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import SubscriptionOverview from "@/components/dashboard/SubscriptionOverview";
import { Suspense } from "react";
import SubscriptionOverviewSkeleton from "@/components/dashboard/SubscriptionOverviewSkeleton";
import SubscriptionListSkeleton from "@/components/dashboard/SubscriptionListSkeleton";
import SubscriptionListContainer from "@/components/dashboard/SubscriptionListContainer";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id as string;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="h-screen min-w-6xl px-6 pb-6 bg-white dark:bg-black">
        <Navbar />
        <Suspense fallback={<SubscriptionOverviewSkeleton />}>
          <SubscriptionOverview userId={userId}/>
        </Suspense>

        <div className="border border-black mt-8"></div>
        <Suspense fallback={<SubscriptionListSkeleton />}>
          <SubscriptionListContainer userId={userId} />
       </Suspense>
      </main>
    </div>
  );
}
