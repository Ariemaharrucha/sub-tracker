import Navbar from "@/components/dashboard/navbar";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import SubscriptionOverview from "@/components/dashboard/subscription-overview";
import { Suspense } from "react";
import SubscriptionOverviewSkeleton from "@/components/dashboard/subscription-overview-skeleton";
import SubscriptionListSkeleton from "@/components/dashboard/subscription-list-skeleton";
import SubscriptionListContainer from "@/components/dashboard/subscription-list-container";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id as string;

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-orange-50 via-amber-50 to-rose-50 py-4 ">
      <main className="md:h-screen md:w-6xl w-full md:px-6 px-4 md:pb-6 pb-4 md:pt-6 pt-4 bg-white shadow-2xl rounded-2xl overflow-y-auto">
        <Navbar />
        <Suspense fallback={<SubscriptionOverviewSkeleton />}>
          <SubscriptionOverview userId={userId}/>
        </Suspense>

        <Suspense fallback={<SubscriptionListSkeleton />}>
          <SubscriptionListContainer userId={userId} />
       </Suspense>
      </main>
    </div>
  );
}
