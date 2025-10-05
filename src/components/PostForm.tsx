"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category, Post, User } from "@prisma/client";
import { createPost, editPost } from "@/actions/posts";
import { useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Inputs = {
  title: string;
  content: string;
  slug: string;
  category: string;
  cover: string | null;
};
const PostForm = ({
  categories,
  author,
  post,
  edit,
}: {
  categories: Category[];
  author: User | null;
  post: Post | null;
  edit: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>(
    edit
      ? {
          defaultValues: {
            title: post!.title,
            content: post!.content,
            slug: post!.slug,
            category:
              categories.find((category) => category.id == post?.categoryId)
                ?.title ?? "",
            cover: post!.cover,
          },
        }
      : undefined,
  );
  const [isPending, startTransition] = useTransition();
  const onSubmitCreate: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const post = await createPost(
        data.title,
        data.category,
        data.content,
        data.cover,
        data.slug,
        author!.id,
      );
      if (post) toast.success("post created successfully");
      else toast.error("failed to create post");
    });
  };

  const onSubmitEdit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const p = await editPost(
        data.title,
        data.category,
        data.content,
        data.cover,
        data.slug,
        post!.id,
      );
      if (p) toast.success("post edited successfully");
      else toast.error("failed to edit post");
    });
  };

  return (
    <form
      onSubmit={handleSubmit(edit ? onSubmitEdit : onSubmitCreate)}
      className="mx-auto mt-8 max-w-xl space-y-4"
    >
      <div>
        <label htmlFor="title" className="mb-1 block font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full rounded border px-3 py-2"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="cover" className="mb-1 block font-medium">
          Cover Image URL
        </label>
        <input
          id="cover"
          type="text"
          className="w-full rounded border px-3 py-2"
          {...register("cover", { required: true })}
        />
        {errors.cover && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="category" className="mb-1 block font-medium">
          Category
        </label>
        <select {...register("category")}>
          {categories.map((category) => (
            <option key={category.title} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        {errors.category && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="slug" className="mb-1 block font-medium">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          className="w-full rounded border px-3 py-2"
          {...register("slug", { required: true })}
        />
        {errors.slug && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="content" className="mb-1 block font-medium">
          Content
        </label>
        <textarea
          id="content"
          className="w-full rounded border px-3 py-2"
          {...register("content", { required: true })}
          rows={6}
        />
      </div>
      {errors.content && <span>This field is required</span>}
      <Button type="submit" className="cursor-pointer">
        {isPending
          ? edit
            ? "Editing..."
            : "Creating..."
          : edit
            ? "Edit Post"
            : "Create Post"}
      </Button>
    </form>
  );
};

export default PostForm;
