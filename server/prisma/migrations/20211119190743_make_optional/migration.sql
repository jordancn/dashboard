/*
  Warnings:

  - You are about to drop the column `type` on the `Property` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Property" DROP COLUMN "type",
ALTER COLUMN "acquired" DROP NOT NULL,
ALTER COLUMN "dispositoned" DROP NOT NULL;
