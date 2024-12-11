-- CreateTable
CREATE TABLE "Wholesale" (
    "id" TEXT NOT NULL,
    "closedAt" TIMESTAMP(3) NOT NULL,
    "propertyId" TEXT NOT NULL,
    "fee" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Wholesale_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wholesale" ADD CONSTRAINT "Wholesale_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
