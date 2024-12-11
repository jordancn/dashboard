/*
  Warnings:

  - You are about to drop the `Reading` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Weight` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wholesale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wholesale" DROP CONSTRAINT "Wholesale_propertyId_fkey";

-- DropTable
DROP TABLE "Reading";

-- DropTable
DROP TABLE "Weight";

-- DropTable
DROP TABLE "Wholesale";

-- CreateTable
CREATE TABLE "PropertyExpectedExpense" (
    "id" TEXT NOT NULL,
    "starting" TIMESTAMP(3),
    "ending" TIMESTAMP(3),
    "propertyId" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "PropertyExpectedExpense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PropertyExpectedExpense" ADD CONSTRAINT "PropertyExpectedExpense_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyExpectedExpense" ADD CONSTRAINT "PropertyExpectedExpense_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
