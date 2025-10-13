-- CreateEnum
CREATE TYPE "EnumRole" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "EnumRole" NOT NULL DEFAULT 'USER';
