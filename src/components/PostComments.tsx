"use client";
import AddComment from "./AddComment";
import { Separator } from "./ui/separator";
import CommentsList from "./CommentsList";
import { useCommentContext } from "@/providers/CommentProvider";

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
const PostComments = () => {
  const { optimisticCommentCount } = useCommentContext();
  return (
    <div>
      <Separator className="my-6" />
      <h1 className="mb-2 text-2xl font-semibold">
        Top Comments ({optimisticCommentCount})
      </h1>
      <AddComment replyToId={undefined} />
      <CommentsList />
    </div>
  );
};

export default PostComments;
