/*
  Warnings:

  - The `likes` column on the `Blog` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "author" TEXT,
DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER;
