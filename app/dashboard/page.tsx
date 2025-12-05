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
      <main className="h-screen min-w-4xl px-6 pb-6 bg-white dark:bg-black">
        <Navbar />

        <SubscriptionOverview userId={userId}/>

        <div className="border border-black mt-8"></div>

        <div className="mt-6 flex justify-between items-center">
          <div className="w-full max-w-xs space-y-2">
            <div className="relative">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <SearchIcon className="size-4" />
                <span className="sr-only">Search</span>
              </div>
              <Input
                type="search"
                placeholder="Cari langanan"
                className="peer px-9 "
              />
            </div>
          </div>
          <div>
            <AddSubscriptionDialog userId={userId} />
          </div>
        </div>

        <ListSubscirption userId={userId} />
      </main>
    </div>
  );
}
