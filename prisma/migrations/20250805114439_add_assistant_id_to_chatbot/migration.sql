/*
  Warnings:

  - Added the required column `assistantId` to the `chatbot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `template` to the `chatbot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."chatbot" ADD COLUMN     "assistantId" TEXT NOT NULL,
ADD COLUMN     "template" TEXT NOT NULL;
