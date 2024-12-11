/*
  Warnings:

  - You are about to drop the `CategoryMapping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoryMapping" DROP CONSTRAINT "CategoryMapping_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryMapping" DROP CONSTRAINT "CategoryMapping_vendorId_fkey";

-- DropTable
DROP TABLE "CategoryMapping";
