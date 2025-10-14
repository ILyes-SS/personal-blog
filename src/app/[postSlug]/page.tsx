import Post from "@/components/Post";
import PostActions from "@/components/PostActions";
import PostAuthor from "@/components/PostAuthor";
import PostComments from "@/components/PostComments";
import { prisma } from "@/db/prisma";
import { getUser } from "@/lib/supabase/server";
import CommentProvider from "@/providers/CommentProvider";
import React from "react";

const page = async ({ params }: { params: Promise<{ postSlug: string }> }) => {
  const { postSlug } = await params;
  const authUserEmail = (await getUser())?.email;
  const user = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  //try to reduce the fetching below
  const post = await prisma.post.findUnique({
    where: { slug: postSlug },
    include: { category: true, author: true },
  });
  const postAction = await prisma.post.findUnique({
    where: { slug: postSlug },
    include: {
      users: true,
      comments: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
          replies: true,
        },
      },
    },
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
    <div className="flex w-full">
      <PostActions
        post={postAction}
        alreadyLiked={alreadyLiked}
        userId={user?.id as string}
      />
      <div className="flex flex-1 justify-evenly max-md:flex-col">
        <div className="">
          <Post post={post} />
          <CommentProvider post={postAction} user={user}>
            <PostComments />
          </CommentProvider>
        </div>
        <PostAuthor author={post?.author!} />
      </div>
    </div>
  );
};

export default page;
