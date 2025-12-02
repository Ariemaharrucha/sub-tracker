"use client";

import { signIn } from "@/lib/auth/auth.client";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md px-4 ">
        <h1 className="mb-6 text-center text-2xl font-semibold text-slate-900">
          Sign In
        </h1>
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer border-slate-500 rounded-full"
          size={"lg"}
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
          <span className="flex flex-1 justify-center">
            Continue with Google
          </span>
        </Button>
      </div>
    </div>
  );
}
