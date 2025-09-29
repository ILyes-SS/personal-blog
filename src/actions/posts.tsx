"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deletePost(slug: string) {
  try {
    const post = await prisma.post.delete({ where: { slug: slug } });
    revalidatePath("/my-posts");
    return post;
  } catch (error) {
    return null;
  }
}

export async function createPost(
  title: string,
  category: string,
  content: string,
  cover: string | null,
  slug: string,
  authorId: string,
) {
  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        cover,
        slug,
        category: { connect: { title: category } },
        author: { connect: { id: authorId } },
      },
    });
    revalidatePath("/create-posts");
    return post;
  } catch (error) {
    return null;
  }
}

export async function editPost(
  title: string,
  category: string,
  content: string,
  cover: string | null,
  slug: string,
  postId: string,
) {
  try {
    const post = await prisma.post.update({
      data: {
        title,
        content,
        cover,
        slug,
        category: { connect: { title: category } },
      },
      where: {
        id: postId,
      },
    });

    return post;
  } catch (error) {
    return null;
  } finally {
    redirect("/my-posts");
  }
}

export async function likePost(
  userId: string,
  postId: string,
  alreadyLiked: boolean,
) {
  const postSlug = await prisma.post.findUnique({
    where: { id: postId },
    select: { slug: true },
  });
  let post;
  try {
    if (alreadyLiked) {
      post = await prisma.user.update({
        where: { id: userId },
        data: {
          likedPosts: {
            disconnect: { id: postId },
          },
        },
      });
      return post;
    } else {
      post = await prisma.user.update({
        where: { id: userId },
        data: {
          likedPosts: {
            connect: { id: postId },
          },
        },
      });
      return post;
    }
  } catch (error) {
    return null;
  } finally {
    revalidatePath("/" + postSlug?.slug);
  }
}
export async function addComment(
  content: string,
  userId: string,
  postId: string,
  replyToId: string | undefined,
) {
  const postSlug = await prisma.post.findUnique({
    where: { id: postId },
    select: { slug: true },
  });
  let post;
  try {
    let obj = replyToId
      ? {
          data: {
            content: content,
            post: { connect: { id: postId } },
            author: { connect: { id: userId } },
            replyTo: { connect: { id: replyToId } },
          },
        }
      : {
          data: {
            content: content,
            post: { connect: { id: postId } },
            author: { connect: { id: userId } },
          },
        };
    const newComment = await prisma.comment.create(obj);

    return newComment;
  } catch (error) {
    return null;
  } finally {
    revalidatePath("/" + postSlug?.slug);
  }
}

export const getAuthor = async (authorId: string) => {
  try {
    const a = await prisma.user.findUnique({
      where: { id: authorId },
    });
    return a;
  } catch (error) {
    console.log("get author ", error);
  }
};
export const getReplies = async (commentId: string) => {
  try {
    const r = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { replies: true },
    });
    return r;
  } catch (error) {
    console.log("get replies failed ", error);
  }
};
