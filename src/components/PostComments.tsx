"use client";
import Link from "next/link";
import AddComment from "./AddComment";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import CommentsList from "./CommentsList";
import { useCommentContext } from "@/providers/CommentProvider";

export type Prop =
  | ({
      comments: ({
        author: {
          name: string | null;
          id: string;
          createdAt: Date;
          email: string;
          location: string | null;
          education: string | null;
          isAuthor: boolean;
        } | null;
        replies:
          | {
              id: string;
              content: string;
              postId: string;
              replyToId: string | null;
              authorId: string;
              createdAt: Date;
            }[]
          | [];
      } & {
        id: string;
        content: string;
        postId: string;
        replyToId: string | null;
        authorId: string;
        createdAt: Date;
      })[];
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
const PostComments = () => {
  const { optimisticCommentCount, user } = useCommentContext();
  return (
    <div id="comment-section">
      <Separator className="my-6" />
      <h1 className="mb-2 text-2xl font-semibold">
        Top Comments ({optimisticCommentCount})
      </h1>
      {user ? (
        <AddComment replyToId={undefined} />
      ) : (
        <div className="flex flex-wrap items-center gap-3 rounded-md border border-gray-300 p-4">
          <p className="text-sm text-gray-600">
            Log in to join the conversation.
          </p>
          <Button asChild variant="outline" size="sm">
            <Link href="/auth/login">Log in</Link>
          </Button>
        </div>
      )}
      <CommentsList />
    </div>
  );
};

export default PostComments;
