"use server";

import { prisma } from "@/db/prisma";

export async function handleSignUpPrisma(email: string, name: string, location: string, education: string, isAdmin: boolean) {
  const user = await prisma.user.update({
    where: { email },
    data: {
      email,
      name,
      location,
      education,
      isAuthor: isAdmin,
    },
  });
  if(user){
    return user
  }
  return null
}
