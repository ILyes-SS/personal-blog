"use client";
import Comment from "./Comment";
import { useCommentContext } from "@/providers/CommentProvider";

const CommentsList = () => {
  const { optimisticComments } = useCommentContext();
  return (
    <div>
      {optimisticComments!.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default CommentsList;
