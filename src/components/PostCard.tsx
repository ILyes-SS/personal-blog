"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { PostProps } from "@/utils/types";
import { Category } from "@prisma/client";

const PostCard = ({
  title,
  categoryId,
  content,
  cover,
  slug,
  createdAt,
  categories,
}: PostProps & { categories: Category[] }) => {
  const category: string = categories.find(
    (ctg) => ctg.id == categoryId,
  )?.title!;
  return (
    <Link href={"/" + slug} prefetch className="block">
      <div className="relative">
        <Image
          src={cover || "/placeholder-small.png"}
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
      <p>
        {createdAt.getFullYear() +
          "/" +
          createdAt.getMonth() +
          "/" +
          createdAt.getDate()}
      </p>
    </Link>
  );
};

export default PostCard;
