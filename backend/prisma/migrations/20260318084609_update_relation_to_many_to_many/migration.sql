-- DropForeignKey
ALTER TABLE "tags" DROP CONSTRAINT "tags_category_id_fkey";

-- CreateTable
CREATE TABLE "_CategoryToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CategoryToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToTag_B_index" ON "_CategoryToTag"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToTag" ADD CONSTRAINT "_CategoryToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToTag" ADD CONSTRAINT "_CategoryToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
