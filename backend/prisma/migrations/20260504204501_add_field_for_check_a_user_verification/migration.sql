-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "preview_image_url" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_verified_at" TIMESTAMP(3);
