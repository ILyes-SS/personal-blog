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
    <nav className="flex items-center justify-around p-4 max-[400px]:text-sm">
      <Link href="/">Home</Link>
      {isAuthor && <Link href="/my-posts">My Posts</Link>}
      {user ? (
        <LogoutButton />
      ) : (
        <Button asChild variant={"outline"}>
          <Link href="/auth/login">Login</Link>
        </Button>
      )}
    </nav>
  );
};

export default NavBar;
