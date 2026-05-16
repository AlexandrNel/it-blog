/*
  Warnings:

  - Added the required column `preview_content` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "preview_content" TEXT NOT NULL,
ADD COLUMN     "preview_image_url" TEXT;
