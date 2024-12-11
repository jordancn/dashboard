/*
  Warnings:

  - You are about to drop the column `amount` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `Budget` table. All the data in the column will be lost.
  - You are about to drop the column `startingAt` on the `Budget` table. All the data in the column will be lost.
  - Added the required column `vendorId` to the `CategoryMapping` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "amount",
DROP COLUMN "externalId",
DROP COLUMN "startingAt";

-- AlterTable
ALTER TABLE "CategoryMapping" ADD COLUMN     "vendorId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Vendor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetAmount" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "startingAt" DATE,
    "budgetId" TEXT NOT NULL,

    CONSTRAINT "BudgetAmount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CategoryMapping" ADD CONSTRAINT "CategoryMapping_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetAmount" ADD CONSTRAINT "BudgetAmount_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
