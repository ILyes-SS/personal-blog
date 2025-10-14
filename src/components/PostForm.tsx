"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category, Post, User } from "@prisma/client";
import { createPost, editPost, uploadCover } from "@/actions/posts";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";

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
  const [content, setContent] = useState(edit ? post!.content : "");
  const [isPending, startTransition] = useTransition();
  const fileInput = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(edit ? post!.cover : null);
  const onSubmitCreate: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      const cover = await uploadCover(fileInput.current?.files?.[0], data.slug);
      if (!cover) {
        toast.error("failed to upload cover");
        return;
      }
      const post = await createPost(
        data.title,
        data.category,
        content,
        cover,
        data.slug,
        author!.id,
      );
      if (post) toast.success("post created successfully");
      else toast.error("failed to create post");
    });
  };

  const onSubmitEdit: SubmitHandler<Inputs> = (data) => {
    startTransition(async () => {
      let cover = post!.cover; // Keep existing cover by default

      // Only upload new cover if a file is selected
      if (fileInput.current?.files?.[0]) {
        const newCover = await uploadCover(
          fileInput.current?.files?.[0],
          data.slug,
        );
        if (!newCover) {
          toast.error("failed to upload cover");
          return;
        }
        cover = newCover;
      }

      const p = await editPost(
        data.title,
        data.category,
        content,
        cover,
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
      className="mx-auto mt-4 max-w-2xl space-y-4 p-4 sm:mt-8 sm:space-y-6 sm:p-6"
    >
      <div>
        <label htmlFor="title" className="mb-2 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-base"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-sm text-red-500">This field is required</span>
        )}
      </div>
      {/* <div>
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
      </div> */}
      {/* add a field to upload the cover image */}
      <div>
        <label htmlFor="cover" className="mb-2 block text-sm font-medium">
          Cover Image {edit && "(leave empty to keep current image)"}
        </label>
        <Input
          id="cover"
          type="file"
          accept="image/*"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-base"
          onChange={(e) =>
            setPreview(URL.createObjectURL(e.target.files?.[0]!))
          }
          ref={fileInput}
        />
        {preview && (
          <div className="mt-3">
            <img
              src={preview || "/placeholder-small.png"}
              alt="cover"
              className="mx-auto w-full max-w-md rounded-lg border shadow-sm"
            />
          </div>
        )}
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block text-sm font-medium">
          Category
        </label>
        <select
          {...register("category")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-base"
        >
          {categories.map((category) => (
            <option key={category.title} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        {errors.category && (
          <span className="text-sm text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <label htmlFor="slug" className="mb-2 block text-sm font-medium">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-base"
          {...register("slug", { required: true })}
        />
        {errors.slug && (
          <span className="text-sm text-red-500">This field is required</span>
        )}
      </div>
      {/* <div>
        <label htmlFor="content" className="mb-2 block text-sm font-medium">
          Content
        </label>
        <textarea
          id="content"
          className="resize-vertical w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none sm:text-base"
          {...register("content", { required: true })}
          rows={8}
        />
        {errors.content && (
          <span className="text-sm text-red-500">This field is required</span>
        )}
      </div> */}
      <ReactQuill
        value={content}
        onChange={setContent}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ header: [1, 2, 3, false] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        }}
      />
      <Button
        type="submit"
        className="w-full cursor-pointer px-6 py-2 sm:w-auto"
      >
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
