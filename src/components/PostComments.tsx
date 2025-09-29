"use client";
import React, { useOptimistic } from "react";
import AddComment from "./AddComment";
import { Comment, User } from "@prisma/client";
import { Separator } from "./ui/separator";
import CommentsList from "./CommentsList";

export type Prop =
  | ({
      comments: {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
        replyToId: string | null;
      }[];
      users: {
        name: string | null;
        id: string;
        createdAt: Date;
        email: string;
        location: string | null;
        education: string | null;
        isAuthor: boolean;
      }[];
    } & {
      id: string;
      title: string;
      createdAt: Date;
      updatedAt: Date;
      slug: string;
      content: string;
      cover: string | null;
      authorId: string;
      categoryId: string;
    })
  | null;
const PostComments = ({ post, user }: { post: Prop; user: User | null }) => {
  const [optimisicCommentCount, setOptimisicCommentCount] = useOptimistic(
    post?.comments.length as number,
    (currentCount: number, optimisicCommentCount: number) =>
      currentCount + optimisicCommentCount,
  );
  const [optimisicComments, setOptimisicComments] = useOptimistic(
    post?.comments!,
    (
      currentCount: Comment[],
      optimisicComments: {
        id: string;
        createdAt: Date;
        content: string;
        authorId: string;
        postId: string;
        replyToId: string | null;
      },
    ) => [...currentCount, optimisicComments],
  );
  return (
    <div>
      <Separator className="my-6" />
      <h1 className="mb-2 text-2xl font-semibold">
        Top Comments ({optimisicCommentCount})
      </h1>
      <AddComment
        post={post}
        user={user}
        setOptimisicCommentCount={setOptimisicCommentCount}
        setOptimisicComments={setOptimisicComments}
      />
      <CommentsList comments={optimisicComments} />
    </div>
  );
};

export default PostComments;
