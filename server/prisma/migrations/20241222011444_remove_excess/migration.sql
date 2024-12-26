/*
  Warnings:

  - The values [Retirement,Credit,Mortgage] on the enum `AccountType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `propertyId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Mortgage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Property` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Value` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AccountType_new" AS ENUM ('Checking', 'Savings');
ALTER TABLE "Account" ALTER COLUMN "accountType" TYPE "AccountType_new" USING ("accountType"::text::"AccountType_new");
ALTER TYPE "AccountType" RENAME TO "AccountType_old";
ALTER TYPE "AccountType_new" RENAME TO "AccountType";
DROP TYPE "AccountType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Mortgage" DROP CONSTRAINT "Mortgage_accountId_fkey";

-- DropForeignKey
ALTER TABLE "Mortgage" DROP CONSTRAINT "Mortgage_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "Property_entityId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_propertyId_fkey";

-- DropForeignKey
ALTER TABLE "Value" DROP CONSTRAINT "Value_propertyId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "propertyId";

-- DropTable
DROP TABLE "Mortgage";

-- DropTable
DROP TABLE "Property";

-- DropTable
DROP TABLE "Value";

-- DropEnum
DROP TYPE "PropertyPurpose";

-- DropEnum
DROP TYPE "PropertyType";
