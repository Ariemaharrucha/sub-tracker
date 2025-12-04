"use client";

import AddSubscriptionDialog from "@/components/dashboard/AddSubscriptionDialog";
import ListSubscirption from "@/components/dashboard/ListSubscirption";
import Navbar from "@/components/dashboard/Navbar";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth/auth.client";
import { SearchIcon } from "lucide-react";

export default function DashboardPage() {
  const { data: session, isPending, error } = authClient.useSession();
  const userId = session?.user.id as string

  if (isPending) {
    return <div>Loading session...</div>;
  }

  if (error || !session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-sans dark:bg-black">
      <main className="h-screen min-w-4xl px-6 pb-6 bg-white dark:bg-black">
        <Navbar />

        <div className="mt-8">
          <h2>Halo, User! 👋</h2>
          <p>Hemat pangkal kaya, jangan lupa cancel trial!</p>
          <div className="grid grid-cols-5 mt-10 gap-3">
            <div className="col-span-2 p-4 rounded-md border">
              <h3>TOTAL PENGELUARAN</h3>
              <p className="mt-5">
                Rp 450.000 <span>/ Bulan</span>
              </p>
            </div>
            <div className="col-span-2 p-4 rounded-md border">
              <h3>TAGIHAN TERDEKAT</h3>
              <p className="mt-5">
                <span>🗓️</span> 05 Des (Besok) <span>Netflix</span>
              </p>
            </div>
            <div className="col-span-1 p-4 rounded-md border">
              <h3>AKTIF</h3>
              <p className="mt-5">
                {" "}
                4 <span>Apps</span>
              </p>
            </div>
          </div>
        </div>

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

        <ListSubscirption />
      </main>
    </div>
  );
}
