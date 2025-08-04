-- CreateTable
CREATE TABLE "public"."chatbot" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "dataFile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatbot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."chatbot" ADD CONSTRAINT "chatbot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
