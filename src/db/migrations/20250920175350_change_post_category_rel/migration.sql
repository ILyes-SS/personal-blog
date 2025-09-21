/*
  Warnings:

  - You are about to drop the `_CategoryToPost` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_CategoryToPost" DROP CONSTRAINT "_CategoryToPost_B_fkey";

-- AlterTable
ALTER TABLE "public"."Post" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."_CategoryToPost";

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
