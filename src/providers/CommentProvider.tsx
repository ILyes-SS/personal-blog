"use client";
import { Prop } from "@/components/PostComments";
import { User } from "@prisma/client";
import React, { createContext, useContext, useOptimistic } from "react";

type CommentProviderContextType = {
  post: Prop;
  user: User | null;
  optimisticCommentCount: number;
  optimisticComments: CommentWithAuthorNreplies[];
  setOptimisicComments: (comment: CommentWithAuthorNreplies) => void;
  setOptimisicCommentCount: () => void;
};

type CommentProviderProps = {
  children: React.ReactNode;
  post: Prop;
  user: User | null;
};

export type CommentWithAuthorNreplies = {
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
};

const CommentProviderContext = createContext<
  CommentProviderContextType | undefined
>(undefined);

const CommentProvider = ({ children, post, user }: CommentProviderProps) => {
  const [optimisticCommentCount, setOptimisicCommentCount] = useOptimistic(
    post?.comments?.length || 0,
    (state, incrementValue: number) => state + incrementValue,
  );

  const [optimisticComments, setOptimisicComments] = useOptimistic(
    post?.comments || [],
    (state, newComment: CommentWithAuthorNreplies) => [...state, newComment],
  );

  const value: CommentProviderContextType = {
    post,
    user,
    optimisticCommentCount,
    optimisticComments,
    setOptimisicComments,
    setOptimisicCommentCount: () => setOptimisicCommentCount(1),
  };

  return (
    <CommentProviderContext.Provider value={value}>
      {children}
    </CommentProviderContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentProviderContext);
  if (context === undefined) {
    throw new Error("useCommentContext must be used within a CommentProvider");
  }
  return context;
};

export default CommentProvider;
