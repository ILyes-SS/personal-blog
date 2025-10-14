import BlogPosts from "@/components/BlogPosts";
import { Button } from "@/components/ui/button";
import { prisma } from "@/db/prisma";
import { getUser } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";

const page = async () => {
  const authUserEmail = (await getUser())?.email;
  const author = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  const myPosts = await prisma.post.findMany({
    where: { authorId: author?.id },
  });
  return (
    <main className="flex flex-col">
      <Button className="mx-auto mb-5 w-sm max-w-full self-center" asChild>
        <Link href={"/create-post"}>New Post +</Link>
      </Button>
      <BlogPosts editable={true} posts={myPosts} />
    </main>
  );
};

export default page;
