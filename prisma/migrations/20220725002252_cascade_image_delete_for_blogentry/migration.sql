-- DropForeignKey
ALTER TABLE "BlogImage" DROP CONSTRAINT "BlogImage_blogEntryId_fkey";

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogEntryId_fkey" FOREIGN KEY ("blogEntryId") REFERENCES "BlogEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
