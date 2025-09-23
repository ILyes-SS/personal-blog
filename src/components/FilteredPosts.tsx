import React from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/utils/types";

const FilteredPosts = ({ posts }: { posts: PostProps[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {posts.map((post) => {
        return <PostCard key={post.slug} {...post} />;
      })}
    </div>
  );
};

export default FilteredPosts;
