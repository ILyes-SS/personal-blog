import Post from "@/components/Post";
import PostActions from "@/components/PostActions";
import PostAuthor from "@/components/PostAuthor";
import PostComments from "@/components/PostComments";
import { prisma } from "@/db/prisma";
import { getUser } from "@/lib/supabase/server";
import React from "react";

const page = async ({ params }: { params: Promise<{ postSlug: string }> }) => {
  const { postSlug } = await params;
  const authUserEmail = (await getUser())?.email;
  const author = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  const post = await prisma.post.findUnique({
    where: { slug: postSlug },
    include: { category: true, author: true },
  });
  return (
    <div className="flex">
      <PostActions />
      <div className="flex max-md:flex-col">
        <div>
          <Post post={post} />
          <PostComments />
        </div>
        <PostAuthor author={author!} />
      </div>
    </div>
  );
};

export default page;
