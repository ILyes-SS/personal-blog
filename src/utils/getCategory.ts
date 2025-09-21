import { prisma } from "@/db/prisma";

export async function getCategorytitle(categoryId: string): Promise<string> {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { title: true },
  });
  return category?.title ?? "";
}
