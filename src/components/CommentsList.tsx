"use client";
import React, { useOptimistic } from "react";
import Comment from "./Comment";
type t =
  | {
      id: string;
      createdAt: Date;
      content: string;
      authorId: string;
      postId: string;
      replyToId: string | null;
    }[]
  | undefined;
const CommentsList = ({ comments }: { comments: t }) => {
  return (
    <div>
      {comments!.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default CommentsList;
