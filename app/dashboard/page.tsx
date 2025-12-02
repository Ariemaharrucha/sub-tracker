"use client";

import LogOut from "@/components/auth/log-out";
import { authClient } from "@/lib/auth/auth.client";

export default function DashboardPage() {
  const { data: session, isPending, error } = authClient.useSession();

  if (isPending) {
    return <div>Loading session...</div>;
  }

  if (error || !session) {
    return <div>Not authenticated</div>;
  }

  console.log("Dashboard session:", session);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="space-y-4 text-center">
        <h1>Dashboard</h1>
        <p>Welcome back, {session.user.name}</p>
        <p>Email: {session.user.email}</p>
        <div>
          <LogOut/>
        </div>
      </div>
    </div>
  );
}
