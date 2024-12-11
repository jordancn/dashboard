/*
  Warnings:

  - A unique constraint covering the columns `[entityId,address,city,state,zip]` on the table `Property` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Property_address_city_state_zip_key";

-- CreateIndex
CREATE UNIQUE INDEX "Property_entityId_address_city_state_zip_key" ON "Property"("entityId", "address", "city", "state", "zip");
