-- CreateTable
CREATE TABLE "RefreshLog" (
    "id" TEXT NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institutionId" TEXT NOT NULL,

    CONSTRAINT "RefreshLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RefreshLog" ADD CONSTRAINT "RefreshLog_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
