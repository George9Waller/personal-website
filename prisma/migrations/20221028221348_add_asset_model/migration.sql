/*
  Warnings:

  - You are about to drop the column `accessed` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `created` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `updated` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Password` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assetId]` on the table `Password` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `assetId` to the `Password` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AssetType" AS ENUM ('password', 'card', 'contact', 'note', 'document');

-- CreateEnum
CREATE TYPE "CardType" AS ENUM ('AMEX', 'VISA', 'VISA_CREDIT', 'MASTERCARD', 'MASTERCARD_CREDIT', 'REWARDS', 'MEMBERSHIP');

-- DropForeignKey
ALTER TABLE "Password" DROP CONSTRAINT "Password_userId_fkey";

-- drop all passwords
DELETE FROM "Password";

-- AlterTable
ALTER TABLE "Password" DROP COLUMN "accessed",
DROP COLUMN "created",
DROP COLUMN "name",
DROP COLUMN "updated",
DROP COLUMN "userId",
ADD COLUMN     "assetId" TEXT NOT NULL,
ALTER COLUMN "additionalInfo" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Asset" (
    "id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated" TIMESTAMP(3) NOT NULL,
    "accessed" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "assetType" "AssetType" NOT NULL,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "type" "CardType" NOT NULL,
    "cardNumber" TEXT NOT NULL,
    "expieryDate" DATE,
    "validFrom" DATE,
    "sortCode" TEXT,
    "AccountNumber" TEXT,
    "secureCodeHash" TEXT,
    "secureCodeSalt" TEXT,
    "pinHash" TEXT,
    "pinSalt" TEXT,
    "additionalInfo" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "phoneNumbers" TEXT[],
    "emailAddresses" TEXT[],
    "birthday" TEXT,
    "addresses" TEXT[],
    "additionalInfo" TEXT,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Card_assetId_key" ON "Card"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_assetId_key" ON "Contact"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Note_assetId_key" ON "Note"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_assetId_key" ON "Document"("assetId");

-- CreateIndex
CREATE UNIQUE INDEX "Password_assetId_key" ON "Password"("assetId");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Password" ADD CONSTRAINT "Password_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
