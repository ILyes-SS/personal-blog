"use client";
import React, { useActionState, useMemo, useTransition } from "react";
import PostCard from "./PostCard";
import { PostProps } from "@/utils/types";
import { Category } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import Fuse from "fuse.js";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { deletePost } from "@/actions/posts";
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

  function handleDeletePost(slug: string) {
    startTransition(async () => {
      const p = await deletePost(slug);
      if (p) toast.success("post deleted successfully");
      else toast.error("failed to delete post");
    });
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.slug}>
            <PostCard categories={categories} {...post} />
            {editable && (
              <div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant={"ghost"}>
                      <Trash2 />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to delete this post?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your Post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        disabled={isPending}
                        onClick={() => handleDeletePost(post.slug)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant={"ghost"} asChild>
                  <Link href={"/edit-post/" + post.slug}>
                    <Edit2 />
                  </Link>
                </Button>
              </div>
            )}
          </div>
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
