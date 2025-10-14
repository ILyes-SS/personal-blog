import { getUser } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LogoutButton } from "./logout-button";
import { prisma } from "@/db/prisma";

const NavBar = async () => {
  const user = await getUser();
  const isAuthor = (
    await prisma.user.findUnique({
      where: { email: user?.email },
    })
  )?.isAuthor;

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white/80 p-3 backdrop-blur-sm sm:justify-around sm:p-4">
      <div className="flex items-center justify-between space-x-4 sm:space-x-6">
        <Link href="/" className="text-lg font-semibold">
          Home
        </Link>
        {isAuthor && (
          <Link
            href="/my-posts"
            className="ml-5 text-sm transition-colors hover:text-gray-600 sm:text-base"
          >
            my Posts
          </Link>
        )}
      </div>
      <div className="flex items-center">
        {user ? (
          <LogoutButton />
        ) : (
          <Button asChild variant={"outline"} size="sm" className="text-sm">
            <Link href="/auth/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
