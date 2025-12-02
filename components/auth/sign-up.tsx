"use client";

import { signIn, signUp } from "@/lib/auth/auth.client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-full max-w-md px-4">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Sign Up
        </h1>
        <form
          className="space-y-4 shadow-md p-4 rounded-md"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            const email = formData.get("email") as string;

            await signUp.email(
              {
                email: email,
                password: formData.get("password") as string,
                name: formData.get("name") as string,
              },
              {
                onRequest: () => {
                  console.log("Signing up...");
                },
                onSuccess: () => {
                  setLoading(false);
                  router.push(
                    `/verify-email?email=${encodeURIComponent(email)}`
                  );
                },
                onError: (ctx) => {
                  setLoading(false);
                  if (ctx.error.status === 403) {
                    toast.warning("Please verify your email address");
                  }
                  toast.error("Error signing up", {
                    description: ctx.error.message,
                  });
                },
              }
            );
          }}
        >
          {/* Input Nama */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name
            </label>
            <Input type="text" name="name" placeholder="Name" required />
          </div>

          {/* Input Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input type="email" name="email" placeholder="Email" required />
          </div>

          {/* Input Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <EyeIcon size={20} />
                  )}
                </button>
              </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>

          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-500"></div>
            <span className="px-3 text-sm text-gray-600">OR</span>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>

          <Button type="button" variant="outline" className="w-full cursor-pointer" 
            onClick={async () => {
              const data = await signIn.social({
                provider: "google",
                callbackURL: '/dashboard'
              });
          }}>
            Sign Up with Google
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-bold hover:underline text-blue-500"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
