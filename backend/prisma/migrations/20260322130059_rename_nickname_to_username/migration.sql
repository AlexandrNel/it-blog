/*
  Warnings:

  - You are about to drop the column `nickname` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_nickname_key";

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "avatar" SET DEFAULT '',
ALTER COLUMN "first_name" SET DEFAULT '',
ALTER COLUMN "last_name" SET DEFAULT '';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "nickname",
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
