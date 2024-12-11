/*
  Warnings:

  - A unique constraint covering the columns `[institutionId,name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Institution` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[externalId]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[address,city,state,zip]` on the table `Property` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `startingBalance` to the `Mortgage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mortgage" ADD COLUMN     "startingBalance" DECIMAL(65,30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Account_institutionId_name_key" ON "Account"("institutionId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_name_key" ON "Institution"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Property_externalId_key" ON "Property"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "Property_address_city_state_zip_key" ON "Property"("address", "city", "state", "zip");
