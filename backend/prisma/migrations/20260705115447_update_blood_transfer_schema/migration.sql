/*
  Warnings:

  - You are about to drop the column `transferDate` on the `blood_transfers` table. All the data in the column will be lost.
  - Changed the type of `status` on the `blood_transfers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransferStatus" AS ENUM ('PENDING', 'DISPATCHED', 'RECEIVED', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "blood_transfers" DROP COLUMN "transferDate",
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "dispatchedAt" TIMESTAMP(3),
ADD COLUMN     "receivedAt" TIMESTAMP(3),
DROP COLUMN "status",
ADD COLUMN     "status" "TransferStatus" NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- CreateTable
CREATE TABLE "transfer_blood_units" (
    "id" TEXT NOT NULL,
    "transfer_id" TEXT NOT NULL,
    "blood_unit_id" TEXT NOT NULL,

    CONSTRAINT "transfer_blood_units_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transfer_blood_units_transfer_id_blood_unit_id_key" ON "transfer_blood_units"("transfer_id", "blood_unit_id");

-- AddForeignKey
ALTER TABLE "transfer_blood_units" ADD CONSTRAINT "transfer_blood_units_transfer_id_fkey" FOREIGN KEY ("transfer_id") REFERENCES "blood_transfers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_blood_units" ADD CONSTRAINT "transfer_blood_units_blood_unit_id_fkey" FOREIGN KEY ("blood_unit_id") REFERENCES "blood_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;
