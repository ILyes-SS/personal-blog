"use client";
import { likePost } from "@/actions/posts";
import { Heart, Link, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useState, useTransition } from "react";
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
  const [isLiked, setIsLiked] = useState(alreadyLiked);

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
    startTransition(async () => {
      setIsLiked((prev) => !prev);
      const p = await likePost(userId, post?.id as string, alreadyLiked);
      if (p) toast.success("toggled post successfully");
      else {
        toast.error("failed to toggle post");
        setIsLiked((prev) => !prev);
      }
    });
  }
  return (
    <div>
      <div>
        <Heart
          className="cursor-pointer"
          stroke={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : undefined}
          onClick={handleLikePost}
        />{" "}
        <p> {post?.users.length} </p>
      </div>
      <div>
        <MessageCircleMore /> {post?.comments.length}
      </div>
      <div>
        <Link className="cursor-pointer" onClick={handleCopy} />
      </div>
    </div>
  );
};

export default PostActions;
