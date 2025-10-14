/*
  Warnings:

  - Changed the type of `interactionType` on the `Interaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EnumInteractionType" AS ENUM ('USER', 'ASSISTANT');

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "interactionType",
ADD COLUMN     "interactionType" "EnumInteractionType" NOT NULL;
