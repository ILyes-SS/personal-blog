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
  const user = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  const post = await prisma.post.findUnique({
    where: { slug: postSlug },
    include: { category: true, author: true },
  });
  const postAction = await prisma.post.findUnique({
    where: { slug: postSlug },
    include: { users: true, comments: true },
  });
  const userWithLikes = await prisma.user.findUnique({
    where: { id: user?.id },
    select: {
      likedPosts: {
        where: { id: post?.id },
        select: { id: true },
      },
    },
  });

  const alreadyLiked = userWithLikes?.likedPosts.length! > 0;
  return (
    <div className="flex">
      <PostActions
        post={postAction}
        alreadyLiked={alreadyLiked}
        userId={user?.id as string}
      />
      <div className="flex max-md:flex-col">
        <div>
          <Post post={post} />
          <PostComments post={postAction} user={user} />
        </div>
        <PostAuthor author={post?.author!} />
      </div>
    </div>
  );
};

export default page;
