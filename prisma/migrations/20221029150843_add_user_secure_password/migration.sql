-- AlterTable
ALTER TABLE "User" ADD COLUMN     "secureInfoPasswordHash" TEXT,
ADD COLUMN     "secureInfoPasswordSalt" TEXT;
