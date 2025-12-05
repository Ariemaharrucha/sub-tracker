import AddSubscriptionDialog from "@/components/dashboard/AddSubscriptionDialog";
import ListSubscirption from "@/components/dashboard/ListSubscription";
import Navbar from "@/components/dashboard/Navbar";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import SubscriptionOverview from "@/components/dashboard/SubscriptionOverview";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id as string;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="h-screen min-w-6xl px-6 pb-6 bg-white dark:bg-black">
        <Navbar />

        <SubscriptionOverview userId={userId}/>

        <div className="border border-black mt-8"></div>

        <div className="mt-6 flex justify-between items-center">
          <div>
            <AddSubscriptionDialog userId={userId} />
          </div>
        </div>

        <ListSubscirption userId={userId} />
      </main>
    </div>
  );
}
