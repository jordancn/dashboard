/*
  Warnings:

  - You are about to drop the column `starting` on the `Budget` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Budget" DROP COLUMN "starting",
ADD COLUMN     "startingAt" TIMESTAMP(3);
