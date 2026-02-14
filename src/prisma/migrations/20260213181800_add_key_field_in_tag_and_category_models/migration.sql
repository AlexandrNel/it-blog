/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `key` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "key" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_key_key" ON "categories"("key");

-- CreateIndex
CREATE UNIQUE INDEX "tags_key_key" ON "tags"("key");
