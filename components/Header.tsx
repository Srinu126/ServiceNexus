"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { NavigationMenuDemo } from "./navigationdemo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center space-x-4 ml-4">
        <div className="text-2xl font-bold text-blue-600">ServiceNexus</div>
        <nav className="hidden md:flex space-x-6">
          <NavigationMenuDemo />
        </nav>
      </div>
      <div className="flex items-center space-x-4 mr-4">
        {!session ? (
          <Button onClick={() => signIn("google")} variant="default">
            Sign In
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={session.user?.image || "/default-avatar.png"}
                  alt="User Avatar"
                  className="rounded-full cursor-pointer"
                  width={40}
                  height={40}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  View Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </header>
  );
}
