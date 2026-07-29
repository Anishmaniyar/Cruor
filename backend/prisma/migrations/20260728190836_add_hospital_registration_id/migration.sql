/*
  Warnings:

  - You are about to drop the column `isVerified` on the `hospitals` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[registrationId]` on the table `hospitals` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `registrationId` to the `hospitals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hospitals" DROP COLUMN "isVerified",
ADD COLUMN     "registrationId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_registrationId_key" ON "hospitals"("registrationId");
