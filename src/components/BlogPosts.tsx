import { Post } from "@prisma/client";
import React from "react";
import SearchBar from "./SearchBar";
import CategoriesFilter from "./CategoriesFilter";
import { prisma } from "@/db/prisma";
import FilteredPosts from "./FilteredPosts";

const BlogPosts = async ({ posts }: { posts: Post[] }) => {
  const categories = await prisma.category.findMany({});
  return (
    <div className="px-4">
      <h1 className="mb-2 text-3xl font-semibold">Blog Posts</h1>
      <SearchBar />
      <CategoriesFilter categories={categories} />
      <FilteredPosts categories={categories} posts={posts} />
    </div>
  );
};

export default BlogPosts;
