import Image from "next/image";
type PostProp =
  | ({
      author: {
        name: string | null;
        id: string;
        email: string;
        location: string | null;
        education: string | null;
        isAuthor: boolean;
        createdAt: Date;
      };
      category: {
        id: string;
        createdAt: Date;
        title: string;
        updatedAt: Date;
      };
    } & {
      id: string;
      createdAt: Date;
      title: string;
      slug: string;
      content: string;
      cover: string | null;
      authorId: string;
      categoryId: string;
      updatedAt: Date;
    })
  | null;

const Post = ({ post }: { post: PostProp }) => {
  return (
    <article className="flex flex-col gap-4 sm:gap-6">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg sm:aspect-[16/9]">
        <Image
          src={post?.cover! || "/placeholder-small.png"}
          fill
          className="object-center"
          alt={post?.title + " cover image"}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      <div className="flex items-center gap-3">
        <Image
          src={"/author.png"}
          height={40}
          width={40}
          alt={"author profile picture's placeholder"}
          className="flex-shrink-0 rounded-full"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-gray-600">{post?.author.email}</p>
          <p className="text-xs text-gray-500 sm:text-sm">
            {post?.createdAt &&
              new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </div>
      </div>
      <header>
        <h1 className="text-2xl leading-tight font-bold sm:text-3xl lg:text-4xl">
          {post?.title}
        </h1>
        <div className="mt-2">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-800">
            #{post?.category.title}
          </span>
        </div>
      </header>
      <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
        <p className="leading-relaxed whitespace-pre-wrap">{post?.content}</p>
      </div>
    </article>
  );
};

export default Post;
