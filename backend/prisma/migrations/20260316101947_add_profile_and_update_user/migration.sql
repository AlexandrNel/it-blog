/*
  Warnings:

  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pending_email]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PostVote" DROP CONSTRAINT "PostVote_post_id_fkey";

-- DropForeignKey
ALTER TABLE "PostVote" DROP CONSTRAINT "PostVote_user_id_fkey";

-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "contacts" JSONB,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "is_public" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
DROP COLUMN "name",
ADD COLUMN     "is_blocked" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "pending_email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_pending_email_key" ON "users"("pending_email");

-- AddForeignKey
ALTER TABLE "PostVote" ADD CONSTRAINT "PostVote_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostVote" ADD CONSTRAINT "PostVote_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
