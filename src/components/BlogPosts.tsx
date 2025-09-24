import { Post } from "@prisma/client";
import React from "react";
import SearchBar from "./SearchBar";
import CategoriesFilter from "./CategoriesFilter";
import { prisma } from "@/db/prisma";
import Fuse from "fuse.js";
import FilteredPosts from "./FilteredPosts";

const BlogPosts = async ({
  posts,
  searchParams,
}: {
  posts: Post[];
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const categories = await prisma.category.findMany({});

  const category = Array.isArray(searchParams?.category)
    ? searchParams.category[0]
    : (searchParams?.category ?? "all");
  const categoryId = categories.find(
    (ctg) => ctg.title == String(category),
  )?.id;
  const search = searchParams?.search;

  const filteredPosts = posts.filter(
    (post) => post.categoryId == categoryId || category == "all",
  );
  const fuse = new Fuse(filteredPosts, {
    keys: ["title"],
  });
  fuse.search((search as string) || "");

  console.log("SearchParams", category);
  return (
    <div>
      <h1>Blog Posts</h1>
      <SearchBar />
      <CategoriesFilter categories={categories} />
      <FilteredPosts posts={filteredPosts} />
    </div>
  );
};

export default BlogPosts;
