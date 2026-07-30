-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "available_for" "Role"[] DEFAULT ARRAY['USER']::"Role"[];

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "available_for" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
ADD COLUMN     "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
