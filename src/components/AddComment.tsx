"use client";
import React, { useState, useTransition } from "react";
import { Prop } from "./PostComments";
import { Button } from "./ui/button";
import { addComment } from "@/actions/posts";
import { User } from "@prisma/client";
import { toast } from "sonner";
import { randomUUID } from "crypto";

const AddComment = ({
  post,
  user,
  setOptimisicCommentCount,
  setOptimisicComments,
}: {
  post: Prop;
  user: User | null;
  setOptimisicCommentCount: (action: number) => void;
  setOptimisicComments: (action: {
    id: string;
    createdAt: Date;
    content: string;
    authorId: string;
    postId: string;
    replyToId: string | null;
  }) => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState("");

  function handleAddComment(formData: FormData) {
    startTransition(async () => {
      setOptimisicCommentCount(1);
      setOptimisicComments({
        id: randomUUID(),
        createdAt: new Date(),
        content: content,
        authorId: user?.id as string,
        postId: post?.id,
      });
      const c = await addComment(
        content,
        user?.id as string,
        post?.id as string,
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
