/*
  Warnings:

  - A unique constraint covering the columns `[institutionId,entityId,name]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Account_institutionId_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "Account_institutionId_entityId_name_key" ON "Account"("institutionId", "entityId", "name");
