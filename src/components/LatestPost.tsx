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
    <div className="mb-8 sm:mb-12">
      <h1 className="mb-4 text-center text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
        Latest Post
      </h1>
      <div className="mx-auto max-w-4xl">
        <Link href={"/" + slug} prefetch className="group block">
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl">
            <div className="relative aspect-video overflow-hidden sm:aspect-[16/9]">
              <Image
                src={cover || "/placeholder.png"}
                alt={title}
                fill
                className="object-center transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
              />
              <Badge className="absolute top-3 left-3 text-xs sm:text-sm">
                {category}
              </Badge>
            </div>
            <div className="p-4 sm:p-6">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs text-gray-500 sm:text-sm">
                  {createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <h2 className="mb-3 text-xl leading-tight font-bold transition-colors group-hover:text-blue-600 sm:text-2xl lg:text-3xl">
                {title}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LatestPost;
