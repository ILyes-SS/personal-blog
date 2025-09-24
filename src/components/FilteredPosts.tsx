"use client";
import React, { useMemo } from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/utils/types";
import { Category } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";

const FilteredPosts = ({
  posts,
  categories,
}: {
  posts: PostProps[];
  categories: Category[];
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("search");

  // const fuse = new Fuse(posts, {
  //   keys: ["title"],
  // });
  // fuse.search((search as string) || "");

  console.log("SearchParams", category);
  const filteredPosts = useMemo(() => {
    const categoryId = categories.find(
      (ctg) => ctg.title == String(category),
    )?.id;
    let final = posts.filter(
      (post) => post.categoryId == categoryId || category == "all",
    );
    if (searchParams.get("category") == "liked") {
    }
    return final;
  }, [searchParams]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {filteredPosts.map((post) => {
        return <PostCard key={post.slug} categories={categories} {...post} />;
      })}
    </div>
  );
};

export default FilteredPosts;
