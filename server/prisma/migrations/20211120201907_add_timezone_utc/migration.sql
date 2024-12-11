/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Balance` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Value` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "createdAt",
ADD COLUMN     "addedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "RefreshLog" ALTER COLUMN "refreshedAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "addedAt" SET DATA TYPE TIMESTAMPTZ;

-- AlterTable
ALTER TABLE "Value" DROP COLUMN "createdAt",
ADD COLUMN     "addedAt" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP;
