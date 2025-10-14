/*
  Warnings:

  - The `invoiceStatus` column on the `Invoice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `AuthTokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `consigneeName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipperName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EnumTokenType" AS ENUM ('ACCESS', 'REFRESH');

-- DropForeignKey
ALTER TABLE "public"."AuthTokens" DROP CONSTRAINT "AuthTokens_userId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "consigneeName" TEXT NOT NULL,
ADD COLUMN     "shipperName" TEXT NOT NULL,
DROP COLUMN "invoiceStatus",
ADD COLUMN     "invoiceStatus" "EnumInvoiceStatus" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "public"."AuthTokens";

-- CreateTable
CREATE TABLE "UserTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "EnumTokenType" NOT NULL DEFAULT 'ACCESS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserTokens" ADD CONSTRAINT "UserTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
