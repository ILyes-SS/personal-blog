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
