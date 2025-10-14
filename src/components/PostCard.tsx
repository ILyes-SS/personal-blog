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
    <Link href={"/" + slug} prefetch className="group block h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={cover || "/placeholder-small.png"}
            alt={title}
            fill
            className="object-center transition-transform duration-200 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <Badge
            variant={"secondary"}
            className="absolute top-2 left-2 text-xs"
          >
            {category}
          </Badge>
        </div>
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          <h2 className="mb-2 line-clamp-2 text-lg font-semibold transition-colors group-hover:text-blue-600 sm:text-xl">
            {title}
          </h2>
          <p className="mt-auto text-xs text-gray-500">
            {createdAt.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
