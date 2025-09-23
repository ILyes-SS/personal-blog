import { getCategorytitle } from "@/utils/getCategory";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { PostProps } from "@/utils/types";

const PostCard = async ({
  title,
  categoryId,
  content,
  cover,
  slug,
  createdAt,
}: PostProps) => {
  const category: string = await getCategorytitle(categoryId);
  return (
    <Link href={"/" + slug} prefetch className="block">
      <div className="relative">
        <Image
          src={cover ?? "/placeholder-small.png"}
          alt={title}
          width={300}
          height={200}
        />
        <Badge variant={"secondary"} className="absolute top-2 left-2">
          {category}
        </Badge>
      </div>
      <h2 className="my-1 text-xl font-semibold max-[400px]:text-[17px]">
        {title}
      </h2>
      <p className="overflow-hidden text-nowrap text-ellipsis">{content}</p>
      <p>{createdAt.toLocaleDateString()}</p>
    </Link>
  );
};

export default PostCard;
