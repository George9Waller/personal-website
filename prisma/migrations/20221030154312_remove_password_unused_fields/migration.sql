/*
  Warnings:

  - You are about to drop the column `passwordSalt` on the `Password` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Password` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Password" DROP COLUMN "passwordSalt",
DROP COLUMN "tags";
