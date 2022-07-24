-- CreateTable
CREATE TABLE "BlogEntry" (
    "id" BIGSERIAL NOT NULL,
    "date" DATE NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "short_description" VARCHAR(512) NOT NULL,
    "cover_image" VARCHAR(100) NOT NULL,
    "content" TEXT NOT NULL,
    "draft" BOOLEAN NOT NULL,
    "category" VARCHAR(255) NOT NULL,

    CONSTRAINT "BlogEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BlogImage" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(50) NOT NULL,
    "image" VARCHAR(100) NOT NULL,
    "blogEntryId" BIGINT NOT NULL,

    CONSTRAINT "BlogImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BlogImage" ADD CONSTRAINT "BlogImage_blogEntryId_fkey" FOREIGN KEY ("blogEntryId") REFERENCES "BlogEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
