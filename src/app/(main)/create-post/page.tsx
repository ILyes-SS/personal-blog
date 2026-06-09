import PostForm from "@/components/PostForm";
import { prisma } from "@/db/prisma";
import { getUser } from "@/lib/supabase/server";

const page = async () => {
  const authUserEmail = (await getUser())?.email;
  const author = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  const categories = await prisma.category.findMany({});

  return (
    <PostForm
      categories={categories}
      post={null}
      author={author}
      edit={false}
    />
  );
};

export default page;
