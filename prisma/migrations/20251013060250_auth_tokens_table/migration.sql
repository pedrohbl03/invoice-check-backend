/*
  Warnings:

  - You are about to drop the column `authToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authToken",
DROP COLUMN "refreshToken";

-- CreateTable
CREATE TABLE "AuthTokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "authToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AuthTokens_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AuthTokens" ADD CONSTRAINT "AuthTokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
