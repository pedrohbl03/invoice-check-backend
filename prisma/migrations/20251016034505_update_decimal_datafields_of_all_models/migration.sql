/*
  Warnings:

  - You are about to alter the column `invoiceAmount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `invoiceDiscount` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `invoiceTax` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `itemPrice` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `itemTotal` on the `InvoiceItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "invoiceAmount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "invoiceDiscount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "invoiceTax" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "InvoiceItem" ALTER COLUMN "itemPrice" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "itemTotal" SET DATA TYPE DOUBLE PRECISION;
