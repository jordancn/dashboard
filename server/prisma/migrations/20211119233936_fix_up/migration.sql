/*
  Warnings:

  - You are about to drop the column `dispositoned` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "dispositoned",
ADD COLUMN     "dispositioned" TIMESTAMP(3);
