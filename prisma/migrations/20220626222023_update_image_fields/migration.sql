/*
  Warnings:

  - You are about to drop the column `cover_image` on the `BlogEntry` table. All the data in the column will be lost.
  - You are about to drop the column `short_description` on the `BlogEntry` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `BlogImage` table. All the data in the column will be lost.
  - Added the required column `coverImageUrl` to the `BlogEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shortDescription` to the `BlogEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `BlogImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogEntry" DROP COLUMN "cover_image",
DROP COLUMN "short_description",
ADD COLUMN     "coverImageUrl" VARCHAR(255) NOT NULL,
ADD COLUMN     "shortDescription" VARCHAR(512) NOT NULL;

-- AlterTable
ALTER TABLE "BlogImage" DROP COLUMN "image",
ADD COLUMN     "imageUrl" VARCHAR(255) NOT NULL;
