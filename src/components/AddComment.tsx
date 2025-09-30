"use client";
import React, { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { addComment } from "@/actions/posts";
import { toast } from "sonner";
import { useCommentContext } from "@/providers/CommentProvider";

const AddComment = ({ replyToId }: { replyToId: string | undefined }) => {
  const { post, user, setOptimisicComments, setOptimisicCommentCount } =
    useCommentContext();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState("");

  function handleAddComment(formData: FormData) {
    startTransition(async () => {
      setOptimisicCommentCount();
      if (!replyToId)
        setOptimisicComments({
          id: "snoivsofvisnlkdnbsu",
          createdAt: new Date(Date.now()),
          content: content,
          authorId: user?.id as string,
          postId: post?.id,
        });
      // else {
      //   setOptimisicComments({
      //     id: "snoivsofvisnlkdnbsu",
      //     createdAt: new Date(Date.now()),
      //     content: content,
      //     authorId: user?.id as string,
      //     postId: post?.id,
      //     replyToId: replyToId,
      //   });
      // }
      const c = await addComment(
        content,
        user?.id as string,
        post?.id as string,
        replyToId,
      );
      if (c) toast.success("comment added successfully");
      else toast.error("failed to add comment");
    });
  }
  return (
    <div>
      <form action={handleAddComment}>
        <textarea
          cols={20}
          className="w-full rounded border px-3 py-2"
          rows={3}
          name="add-comments"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="add-comments"
        />
        <Button disabled={!Boolean(content) || isPending}>Submit</Button>
      </form>
    </div>
  );
};

export default AddComment;
