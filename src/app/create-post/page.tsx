import CreateForm from "@/components/CreateForm";
import { prisma } from "@/db/prisma";
import { getUser } from "@/lib/supabase/server";

const page = async () => {
  const authUserEmail = (await getUser())?.email;
  const author = await prisma.user.findUnique({
    where: { email: authUserEmail },
  });
  const categories = await prisma.category.findMany({});

  return <CreateForm categories={categories} author={author} />;
};

export default page;
