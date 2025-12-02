"use client";

import { authClient } from "@/lib/auth/auth.client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();
  return (
    <Button
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        })
      }
    >
      Log Out
    </Button>
  );
}
