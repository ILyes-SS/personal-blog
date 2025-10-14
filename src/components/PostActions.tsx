"use client";
import { likePost } from "@/actions/posts";
import { Heart, Link, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
type PostActionProp =
  | ({
      users: {
        name: string | null;
        id: string;
        email: string;
        location: string | null;
        education: string | null;
        isAuthor: boolean;
        createdAt: Date;
      }[];
      comments: {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
        replyToId: string | null;
      }[];
    } & {
      id: string;
      createdAt: Date;
      title: string;
      slug: string;
      content: string;
      cover: string | null;
      authorId: string;
      categoryId: string;
      updatedAt: Date;
    })
  | null;
const PostActions = ({
  post,
  userId,
  alreadyLiked,
}: {
  post: PostActionProp;
  userId: string;
  alreadyLiked: boolean;
}) => {
  const path = usePathname();
  const [isPending, startTransition] = useTransition();
  //   const [isLiked, setIsLiked] = useState(alreadyLiked);
  const [optimisticLiked, setOptimisticLiked] = useOptimistic(
    alreadyLiked,
    (currentLiked, optimisticLiked: boolean) => optimisticLiked,
  );

  const [optimisticLikeCount, setOptimisticLikeCount] = useOptimistic(
    post?.users.length,
    (currentCount, optimisticChange: number) =>
      currentCount! + optimisticChange,
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.origin + path);
      toast.success("link copied to clipboard");
    } catch (err) {
      toast.error("failed to copy!");
      console.error("Failed to copy!", err);
    }
  };
  function handleLikePost() {
    const wasLiked = alreadyLiked;
    const likeChange = wasLiked ? -1 : 1;

    startTransition(async () => {
      setOptimisticLiked(!wasLiked);
      setOptimisticLikeCount(likeChange);
      const p = await likePost(userId, post?.id as string, alreadyLiked);
      if (p) toast.success("toggled post successfully");
      else {
        toast.error("failed to toggle post");
      }
    });
  }
  const scrollToTarget = () => {
    document.getElementById("comment-section")?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <div className="max-sm:fixed max-sm:right-0 max-sm:bottom-0 max-sm:left-0 max-sm:flex max-sm:justify-between max-sm:border-t max-sm:bg-white max-sm:p-3 max-sm:shadow-md sm:max-w-[80px] sm:px-4 sm:py-6">
      <div className="flex w-full items-center justify-around gap-4 sm:flex-col sm:gap-6">
        <div className="flex flex-col items-center gap-2">
          <Heart
            className="h-6 w-6 cursor-pointer transition-colors hover:text-red-500"
            stroke={optimisticLiked ? "red" : "currentColor"}
            fill={optimisticLiked ? "red" : "transparent"}
            onClick={isPending ? undefined : handleLikePost}
          />
          <p className="text-sm font-medium">{optimisticLikeCount}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <MessageCircleMore
            className="h-6 w-6 cursor-pointer transition-colors hover:text-blue-500"
            onClick={scrollToTarget}
          />
          <p className="text-sm font-medium">{post?.comments.length}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Link
            className="h-6 w-6 cursor-pointer transition-colors hover:text-green-500"
            onClick={handleCopy}
          />
          <p className="text-sm font-medium">Share</p>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
