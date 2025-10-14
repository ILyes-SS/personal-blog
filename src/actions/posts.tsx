"use server";

import { prisma } from "@/db/prisma";
import { createClient, getUser } from "@/lib/supabase/server";
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
    return post;
  } catch (error) {
    return null;
  } finally {
    redirect("/my-posts");
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
    let newComment;
    if (replyToId) {
      newComment = await prisma.comment.create({
        data: {
          content: content,
          post: { connect: { id: postId } },
          author: { connect: { id: userId } },
          replyTo: { connect: { id: replyToId } },
        },
      });
    } else {
      newComment = await prisma.comment.create({
        data: {
          content: content,
          post: { connect: { id: postId } },
          author: { connect: { id: userId } },
        },
      });
    }

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

export async function getLikedPosts() {
  const authUserEmail = (await getUser())?.email;
  const user = await prisma.user.findUnique({
    where: { email: authUserEmail },
    select: { likedPosts: true },
  });
  return user?.likedPosts;
}

export async function uploadCover(file: File | undefined, slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.storage
    .from("covers")
    .upload(slug + "-" + file?.name + ".png", file!, { upsert: true });
  console.log("data", data);
  if (error) {
    console.error(error);
    return undefined;
  }
  const {
    data: { publicUrl },
  } = supabase.storage
    .from("covers")
    .getPublicUrl(slug + "-" + file?.name + ".png");
  console.log(publicUrl);
  return publicUrl!;
}
