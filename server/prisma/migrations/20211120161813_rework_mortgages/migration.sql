/*
  Warnings:

  - You are about to drop the column `mortgageLenderId` on the `Mortgage` table. All the data in the column will be lost.
  - You are about to drop the `MortgageBalance` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MortgageLender` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyExpectedExpense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PropertyValue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `accountId` to the `Mortgage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment` to the `Mortgage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "AccountType" ADD VALUE 'Mortgage';

-- DropForeignKey
ALTER TABLE "Mortgage" DROP CONSTRAINT "Mortgage_mortgageLenderId_fkey";

-- DropForeignKey
ALTER TABLE "MortgageBalance" DROP CONSTRAINT "MortgageBalance_mortgageId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyExpectedExpense" DROP CONSTRAINT "PropertyExpectedExpense_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyExpectedExpense" DROP CONSTRAINT "PropertyExpectedExpense_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "PropertyValue" DROP CONSTRAINT "PropertyValue_propertyId_fkey";

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "externalId" TEXT,
ALTER COLUMN "startingAt" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Mortgage" DROP COLUMN "mortgageLenderId",
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "payment" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Property" ALTER COLUMN "acquired" SET DATA TYPE DATE,
ALTER COLUMN "dispositioned" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "date" SET DATA TYPE DATE;

-- DropTable
DROP TABLE "MortgageBalance";

-- DropTable
DROP TABLE "MortgageLender";

-- DropTable
DROP TABLE "PropertyExpectedExpense";

-- DropTable
DROP TABLE "PropertyValue";

-- CreateTable
CREATE TABLE "Value" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "propertyId" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mortgage" ADD CONSTRAINT "Mortgage_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
