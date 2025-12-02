"use client";

import { signIn } from "@/lib/auth/auth.client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import Link from "next/link";
import { EyeIcon, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="p-4 absolute top-4 right-4">
        <Button className="cursor-pointer" disabled>
          Sign-up
        </Button>
      </div>
      <div className="w-full max-w-md px-4 ">
        <h1 className="mb-6 text-center text-2xl font-bold text-slate-900">
          Sign In
        </h1>

        <form
          className="space-y-4 shadow-md p-4 rounded-md"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const formData = new FormData(e.currentTarget);
            await signIn.email(
              {
                email: formData.get("email") as string,
                password: formData.get("password") as string,
                callbackURL: "/dashboard",
              },
              {
                onRequest: () => {
                  console.log("Signing in...");
                },
                onSuccess: () => {
                  toast.success("User signed in successfully");
                  setLoading(false);
                },
                onError: (ctx) => {
                  toast.error("Error signing up", {
                    description: ctx.error.message,
                  });
                  setLoading(false);
                },
              }
            );
          }}
        >
          {/* Group Input */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input type="email" name="email" placeholder="Email" required />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <span className="text-xs cursor-pointer hover:underline text-blue-500">
                  Forget password?
                </span>
              </div>
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

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </div>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-500"></div>
            <span className="px-3 text-sm text-gray-600">OR</span>
            <div className="flex-1 border-t border-gray-500"></div>
          </div>
          {/* Google Button */}
          <Button type="button" variant="outline" className="w-full cursor-pointer" 
            onClick={async () => {
              const data = await signIn.social({
                provider: "google",
                callbackURL: '/dashboard'
              });
          }}>
            Sign In with Google
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-bold hover:underline text-blue-600"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
