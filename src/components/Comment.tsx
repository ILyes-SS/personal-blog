"use client";
import { getAuthor, getReplies } from "@/actions/posts";
import { cn } from "@/lib/utils";
import { Comment as CommentType, User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";
import AddComment from "./AddComment";

const Comment = ({ comment }: { comment: CommentType }) => {
  const [author, setAuthor] = useState<User>(); //comment author
  const [replies, setReplies] = useState<CommentType[]>();
  const [reply, setReply] = useState(false); //toggle form for replying

  useEffect(() => {
    (async () => {
      const a = await getAuthor(comment.authorId);
      const r = await getReplies(comment.id);
      setAuthor(a);
      setReplies(r?.replies);
    })();
  }, []);

  return (
    <div>
      <div
        className={cn(
          comment.replyToId && "ml-5",
          "my-3 rounded-md border-1 border-gray-400 p-4",
        )}
      >
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-semibold">
            {author?.name || author?.email}
          </h2>
          <p>
            {comment.createdAt.getMonth()}/{comment.createdAt.getFullYear()}
          </p>
        </div>
        <p> {comment.content} </p>
        <Button
          onClick={() => setReply((prev) => !prev)}
          variant={"ghost"}
          className="mt-2 cursor-pointer"
        >
          <MessageCircle className="rotate-y-180" /> reply
        </Button>
        {/* {reply && <AddComment         post={post}
        user={user}
        setOptimisicCommentCount={setOptimisicCommentCount}/>} */}
      </div>
      {replies &&
        replies?.map((reply) => <Comment key={reply.id} comment={reply} />)}
    </div>
  );
};

export default Comment;
