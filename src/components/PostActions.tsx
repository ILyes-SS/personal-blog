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
    <div>
      <div>
        <Heart
          className="cursor-pointer"
          stroke={optimisticLiked ? "red" : "black"}
          fill={optimisticLiked ? "red" : "transparent"}
          onClick={isPending ? undefined : handleLikePost}
        />
        <p> {optimisticLikeCount} </p>
      </div>
      <div>
        <MessageCircleMore
          className="rotate-y-180 cursor-pointer"
          onClick={scrollToTarget}
        />{" "}
        {post?.comments.length}
      </div>
      <div>
        <Link className="cursor-pointer" onClick={handleCopy} />
      </div>
    </div>
  );
};

export default PostActions;
