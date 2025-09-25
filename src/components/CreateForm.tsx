"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category, User } from "@prisma/client";
import { createPost } from "@/actions/posts";
import { useTransition } from "react";
import { toast } from "sonner";

type Inputs = {
  title: string;
  content: string;
  slug: string;
  category: string;
  cover: string;
};
const CreateForm = ({
  categories,
  author,
}: {
  categories: Category[];
  author: User | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isPending, startTransition] = useTransition();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            <option value={category.title}>{category.title}</option>
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
      <button
        type="submit"
        className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
};

export default CreateForm;
