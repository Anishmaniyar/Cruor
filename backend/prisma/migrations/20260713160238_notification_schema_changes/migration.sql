/*
  Warnings:

  - Added the required column `priority` to the `notifications` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `notifications` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'PROCESSING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('APPOINTMENT_BOOKED', 'APPOINTMENT_CANCELLED', 'APPOINTMENT_REMINDER', 'CAMPAIGN_REGISTERED', 'CAMPAIGN_REMINDER', 'DONATION_COMPLETED', 'CERTIFICATE_READY', 'ELIGIBLE_AGAIN', 'ACHIEVEMENT_UNLOCKED', 'EMERGENCY_REQUEST', 'BLOOD_REQUEST_APPROVED', 'BLOOD_REQUEST_REJECTED', 'TRANSFER_DISPATCHED', 'TRANSFER_RECEIVED', 'TRANSFER_COMPLETED', 'SYSTEM');

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "priority" "NotificationPriority" NOT NULL,
ADD COLUMN     "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
DROP COLUMN "type",
ADD COLUMN     "type" "NotificationType" NOT NULL,
ALTER COLUMN "isRead" SET DEFAULT false;
