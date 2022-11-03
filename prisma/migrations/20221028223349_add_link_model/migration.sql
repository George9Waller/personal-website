-- AlterEnum
ALTER TYPE "AssetType" ADD VALUE 'link';

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_assetId_key" ON "Link"("assetId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
