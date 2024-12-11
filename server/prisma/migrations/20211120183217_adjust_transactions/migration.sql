/*
  Warnings:

  - You are about to drop the column `digest` on the `Transaction` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[accountId,date,description,amount,availableBalance]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "digest";

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_accountId_date_description_amount_availableBala_key" ON "Transaction"("accountId", "date", "description", "amount", "availableBalance");
