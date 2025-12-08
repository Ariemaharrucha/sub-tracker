'use client'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Bell, ChevronDown, Circle, User } from "lucide-react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth/auth.client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-2xl">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl"
          >
            <Circle className="h-8 w-8 fill-amber-500 text-amber-950" />
            <span>SubTracker.io</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size={"lg"}
                className="flex items-center gap-2 pl-3 pr-4 cursor-pointer rounded-full shadow-md"
              >
                <User className="h-4 w-4 text-amber-600" />
                <span className="font-semibold text-md text-amber-600">Profile</span>
                <span className="text-xs font-normal text-amber-800">
                  (Logout)
                </span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">
              {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4 text-amber-600" />
                <span className="font-semibold text-md text-amber-600">Profile</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
              >
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
