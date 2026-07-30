/*
  Warnings:

  - You are about to drop the column `avatar` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "preview_image_url" SET DEFAULT '';

-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "avatar",
DROP COLUMN "first_name",
DROP COLUMN "last_name";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "display_name" TEXT NOT NULL DEFAULT '';
