"use client";

import { signIn } from "@/lib/auth/auth.client";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      {/* Login Card */}
      <div className="w-full max-w-md bg-amber-50 rounded-3xl shadow-xl p-8 border border-amber-100">
        <h1 className="mb-6 text-center text-3xl font-semibold text-slate-800">
          Sign In
        </h1>

        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer rounded-full bg-white border-slate-400 shadow-sm hover:bg-amber-100 transition"
          size="lg"
          onClick={async () => {
            await signIn.social({
              provider: "google",
              callbackURL: "/dashboard",
            });
          }}
        >
          <img
            src="https://cdn.shadcnstudio.com/ss-assets/brand-logo/google-icon.png?width=20&height=20&format=auto"
            alt="Google Icon"
            className="size-5"
          />
          <span className="flex flex-1 justify-center text-slate-800 font-medium">
            Continue with Google
          </span>
        </Button>
      </div>
    </div>
  );
}
