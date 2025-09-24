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
  const search = searchParams.get("search")?.trim() ?? "";

  const filteredPosts = useMemo(() => {
    const categoryId = categories.find(
      (ctg) => ctg.title == String(category),
    )?.id;
    const categoryPosts = posts.filter(
      (post) => post.categoryId == categoryId || category == "all",
    );
    if (searchParams.get("category") == "liked") {
    }
    const fuse = new Fuse(posts, {
      keys: ["title", "content"],
      threshold: 0.2,
    });
    const searchResults = search
      ? fuse.search((search as string) || "")
      : posts;
    const searchPosts = search
      ? searchResults.map((result: any) => result.item)
      : posts;
    const filtered = posts.filter(
      (post) =>
        searchPosts.find((s) => s.slug == post.slug) &&
        categoryPosts.find((s) => s.slug == post.slug),
    );
    return filtered;
  }, [posts, categories, category, search]);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <PostCard key={post.slug} categories={categories} {...post} />
        ))
      ) : (
        <div className="col-span-full py-8 text-center">
          <p>No posts found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default FilteredPosts;
