/* eslint-disable @next/next/no-img-element */
"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const HomePage = () => {
  const { data: session } = useSession();

  console.log(session, "sessionInfo");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to Our Website</h1>
      {!session ? (
        <Link href="/api/auth/signin">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Sign In with Google
          </button>
        </Link>
      ) : (
        <div className="flex items-center">
          <img
            src={session.user?.image || ""}
            alt="User Image"
            className="w-12 h-12 rounded-full mr-4"
          />
          <span className="mr-4">{session.user?.email}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
