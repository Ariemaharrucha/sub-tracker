"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import ListSubscriptionClient from "./ListSubscriptionClient";
import { SubscriptionType } from "@/lib/type/subscriptionType";
import { SearchIcon } from "lucide-react";
import AddSubscriptionDialog from "./AddSubscriptionDialog";

export default function SubscriptionListWrapper({ userId, subscriptions }: { userId: string, subscriptions: SubscriptionType[] }) {
  const [query, setQuery] = useState("");

  const filtered = subscriptions.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="mt-6 bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-2xl ml-2">Subscription List</h3>
      <div className="mt-6 flex justify-between items-center gap-8">
        <div className="w-full">
          <div className="relative">
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
              <SearchIcon className="size-4 text-amber-600" />
              <span className="sr-only">Search</span>
            </div>
            <Input
              type="search"
              placeholder="Search subscription..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-9 h-10 rounded-lg border-amber-600 bg-white text-amber-950 placeholder:text-amber-600 focus:border-amber-400 focus:bg-white transition-colors focus:ring-1 focus:ring-amber-400 focus:ring-offset-1 focus:ring-offset-amber-400 focus-visible:ring-1 focus-visible:ring-amber-400 focus-visible:ring-offset-1 focus-visible:ring-offset-amber-400 focus-visible:outline-none"
            />
          </div>
        </div>
        <div>
          <AddSubscriptionDialog userId={userId} />
        </div>
      </div>
      <ListSubscriptionClient subscriptions={filtered} />
    </div>
  );
}