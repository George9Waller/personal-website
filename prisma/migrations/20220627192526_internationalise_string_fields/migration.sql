/*
  Warnings:

  - You are about to drop the column `coverImageUrl` on the `BlogEntry` table. All the data in the column will be lost.
  - The `category` column on the `BlogEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `title` on the `BlogEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `content` on the `BlogEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `shortDescription` on the `BlogEntry` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `altText` to the `BlogImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `BlogImage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `BlogImage` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `title` on the `BlogImage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BlogEntry" DROP COLUMN "coverImageUrl",
DROP COLUMN "title",
ADD COLUMN     "title" JSONB NOT NULL,
DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL,
DROP COLUMN "category",
ADD COLUMN     "category" TEXT[],
DROP COLUMN "shortDescription",
ADD COLUMN     "shortDescription" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "BlogImage" ADD COLUMN     "altText" JSONB NOT NULL,
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "isCover" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "width" INTEGER NOT NULL,
DROP COLUMN "title",
ADD COLUMN     "title" JSONB NOT NULL;
