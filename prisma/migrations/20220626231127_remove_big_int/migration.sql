/*
  Warnings:

  - The primary key for the `BlogEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `BlogEntry` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - The primary key for the `BlogImage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `BlogImage` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `blogEntryId` on the `BlogImage` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- DropForeignKey
ALTER TABLE "BlogImage" DROP CONSTRAINT "BlogImage_blogEntryId_fkey";

-- AlterTable
ALTER TABLE "BlogEntry" DROP CONSTRAINT "BlogEntry_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ADD CONSTRAINT "BlogEntry_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "BlogImage" DROP CONSTRAINT "BlogImage_pkey",
ALTER COLUMN "id" SET DATA TYPE INTEGER,
ALTER COLUMN "blogEntryId" SET DATA TYPE INTEGER,
ADD CONSTRAINT "BlogImage_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogEntryId_fkey" FOREIGN KEY ("blogEntryId") REFERENCES "BlogEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
