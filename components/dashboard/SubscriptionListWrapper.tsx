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
    <>
    <div className="mt-6 flex justify-between items-center">
      <div className="w-full max-w-xs">
        <div className="relative">
          <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
            <SearchIcon className="size-4" />
            <span className="sr-only">Search</span>
          </div>
          <Input
            type="search"
            placeholder="Cari langganan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-9"
          />
        </div>
      </div>
      <div>
        <AddSubscriptionDialog userId={userId} />
      </div>
    </div>
    <ListSubscriptionClient subscriptions={filtered} />
    </>
  );
}