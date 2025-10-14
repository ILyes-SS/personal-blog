import { Post } from "@prisma/client";
import React from "react";
import SearchBar from "./SearchBar";
import CategoriesFilter from "./CategoriesFilter";
import { prisma } from "@/db/prisma";
import FilteredPosts from "./FilteredPosts";

const BlogPosts = async ({
  posts,
  editable,
}: {
  posts: Post[];
  editable: boolean;
}) => {
  const categories = await prisma.category.findMany({});
  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 text-center sm:mb-8">
        <h1 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
          Blog Posts
        </h1>
        <div className="mx-auto mb-4 max-w-md sm:mb-6">
          <SearchBar />
        </div>
        <div className="flex justify-center">
          <CategoriesFilter categories={categories} />
        </div>
      </div>
      <div className="px-2 sm:px-4">
        <FilteredPosts
          categories={categories}
          posts={posts}
          editable={editable}
        />
      </div>
    </div>
  );
};

export default BlogPosts;
