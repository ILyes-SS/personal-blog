"use client";
import React, { useEffect, useMemo, useState, useTransition } from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/utils/types";
import { Category } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { deletePost, getLikedPosts } from "@/actions/posts";
import {
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { toast } from "sonner";

const FilteredPosts = ({
  posts,
  categories,
  editable,
}: {
  posts: PostProps[];
  categories: Category[];
  editable: boolean;
}) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "all";
  const search = searchParams.get("search")?.trim() ?? "";

  const [isPending, startTransition] = useTransition();
  const [likedPosts, setLikedPosts] = useState<PostProps[] | null>(null);

  useEffect(() => {
    if (category === "liked") {
      getLikedPosts().then((posts) => {
        setLikedPosts(posts || []);
      });
    }
  }, [category]);

  const filteredPosts = useMemo(() => {
    const categoryId = categories.find(
      (ctg) => ctg.title == String(category),
    )?.id;
    let categoryPosts = posts.filter(
      (post) => post.categoryId == categoryId || category == "all",
    );
    if (searchParams.get("category") == "liked") {
      categoryPosts = likedPosts!;
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
        categoryPosts?.find((s) => s.slug == post.slug),
    );
    return filtered;
  }, [posts, categories, category, search, likedPosts]);

  function handleDeletePost(slug: string) {
    startTransition(async () => {
      const p = await deletePost(slug);
      if (p) toast.success("post deleted successfully");
      else toast.error("failed to delete post");
    });
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.slug} className="flex flex-col">
            <PostCard categories={categories} {...post} />
            {editable && (
              <div className="mt-2 flex justify-center gap-2 p-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="sm:max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this post?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
                      <AlertDialogCancel className="w-full sm:w-auto">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isPending}
                        onClick={() => handleDeletePost(post.slug)}
                        className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant={"ghost"} size="sm" asChild className="">
                  <Link href={"/edit-post/" + post.slug}>
                    <Edit2 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="col-span-full py-12 text-center">
          <p className="text-lg text-gray-500">
            No posts found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default FilteredPosts;
