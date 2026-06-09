import PostForm from "@/components/PostForm";
import { prisma } from "@/db/prisma";
import { getUser } from "@/lib/supabase/server";

const page = async ({ params }: { params: Promise<{ postSlug: string }> }) => {
  const { postSlug } = await params;
  const authUserEmail = (await getUser())?.email;
  const author = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  const categories = await prisma.category.findMany({});
  const post = await prisma.post.findUnique({
    where: { slug: postSlug },
  })


  return <PostForm categories={categories} post={post} author={author} edit={true} />;
};

export default page;
