"use server";

import { prisma } from "@/db/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(slug: string) {
  try {
    const post = await prisma.post.delete({ where: { slug: slug } });
    revalidatePath("/my-posts");
    return post;
  } catch (error) {
    return null;
  }
}
