import BlogPosts from "@/components/BlogPosts";
import LatestPost from "@/components/LatestPost";
import { prisma } from "@/db/prisma";

export default async function Home() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  const latestPost = posts[0];
  return (
    <div>
      <LatestPost {...latestPost} />
      <BlogPosts editable={false} posts={posts.toSpliced(0, 1)} />
    </div>
  );
}
