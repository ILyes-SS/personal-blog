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
    <div className="flex flex-col gap-3">
      <Image
        src={post?.cover! || "/placeholder-small.png"}
        height={200}
        width={400}
        alt={post?.title + " cover image"}
      />
      <div className="flex items-center gap-2">
        <Image
          src={"/author.png"}
          height={50}
          width={50}
          alt={"author profile picture's placeholder"}
        />
        <div>
          <p className="text-sm text-gray-600">{post?.author.email}</p>
          <p className="text-sm text-gray-600">
            Posted on {post?.createdAt.toISOString()}
          </p>
        </div>
      </div>
      <h1 className="text-3xl font-semibold">{post?.title}</h1>
      <h3 className="text-lg font-semibold">#{post?.category.title}</h3>
      <p>{post?.content}</p>
    </div>
  );
};

export default Post;
