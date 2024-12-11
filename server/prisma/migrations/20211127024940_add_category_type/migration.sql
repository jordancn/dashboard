-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('Expense', 'Income');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "categoryType" "CategoryType" NOT NULL DEFAULT E'Expense';
