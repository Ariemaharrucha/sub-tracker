"use client";

import { signIn } from "@/lib/auth/auth.client";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="p-4 absolute top-4 right-4">
      </div>
      <div className="w-full max-w-md px-4 ">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Sign In
        </h1>
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer"
          onClick={async () => {
            await signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            });
          }}
        >
          Continue with Google
        </Button>
      </div>
    </div>
  );
}
