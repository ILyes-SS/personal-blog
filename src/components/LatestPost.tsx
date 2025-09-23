import Image from "next/image";
import React from "react";
import { Badge } from "./ui/badge";
import { getCategorytitle } from "@/utils/getCategory";
import Link from "next/link";
import { PostProps } from "@/utils/types";

const LatestPost = async ({
  title,
  categoryId,
  content,
  cover,
  slug,
  createdAt,
}: PostProps) => {
  const category: string = await getCategorytitle(categoryId);
  return (
    <Link href={"/" + slug} prefetch className="block px-4">
      <h1 className="mb-2 text-3xl font-semibold">Latest Post</h1>
      <Image
        src={cover ?? "/placeholder.png"}
        alt={title}
        width={900}
        height={300}
      />
      <Badge className="mt-1">{category}</Badge>
      <p>{createdAt.toLocaleDateString()}</p>
      <h2 className="my-1 text-2xl font-semibold max-[400px]:text-xl">
        {title}
      </h2>
      <p className="overflow-hidden text-nowrap text-ellipsis">{content}</p>
    </Link>
  );
};

export default LatestPost;
