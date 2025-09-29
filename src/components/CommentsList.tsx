"use client";
import Comment from "./Comment";
import { useCommentContext } from "@/providers/CommentProvider";

const CommentsList = () => {
  const { optimisticComments } = useCommentContext();
  const noReplyComments = optimisticComments.filter(
    //these are comments that do not reply to other comments
    (comment) => !comment.replyToId,
  );
  return (
    <div>
      {noReplyComments!.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export default CommentsList;
