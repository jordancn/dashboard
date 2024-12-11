-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_vendorId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "vendorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
