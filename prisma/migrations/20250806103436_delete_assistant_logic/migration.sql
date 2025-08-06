/*
  Warnings:

  - You are about to drop the column `assistantId` on the `chatbot` table. All the data in the column will be lost.
  - You are about to drop the column `purpose` on the `chatbot` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."chatbot" DROP COLUMN "assistantId",
DROP COLUMN "purpose";
