-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_propertyId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "propertyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;
