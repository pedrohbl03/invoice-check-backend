/*
  Warnings:

  - You are about to drop the `Interaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EnumInteractionRole" AS ENUM ('USER', 'ASSISTANT');

-- DropForeignKey
ALTER TABLE "public"."Interaction" DROP CONSTRAINT "Interaction_invoiceId_fkey";

-- DropTable
DROP TABLE "public"."Interaction";

-- DropEnum
DROP TYPE "public"."EnumInteractionType";

-- CreateTable
CREATE TABLE "ChatInteraction" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "role" "EnumInteractionRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatInteraction_chatId_key" ON "ChatInteraction"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "Chat_invoiceId_key" ON "Chat"("invoiceId");

-- AddForeignKey
ALTER TABLE "ChatInteraction" ADD CONSTRAINT "ChatInteraction_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
