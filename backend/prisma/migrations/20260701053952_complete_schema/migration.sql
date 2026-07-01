/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "dateOfBirth" DATE NOT NULL,
    "gender" VARCHAR(20),
    "bloodGroup" VARCHAR(10),
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "phoneNo" VARCHAR(20) NOT NULL,
    "address" TEXT,
    "isVerified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "appointmentDate" DATE NOT NULL,
    "appointmentTime" TIME NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "campName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "campaignDate" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "targetDonors" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "campaign_registrations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "campaign_id" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "registeredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "campaign_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donations" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "appointment_id" TEXT,
    "campaign_registration_id" TEXT,
    "donationDate" DATE NOT NULL,
    "bloodGroup" VARCHAR(10) NOT NULL,
    "volume" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "hospital_id" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "isRead" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_units" (
    "id" TEXT NOT NULL,
    "donation_id" TEXT NOT NULL,
    "donor_id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "bloodGroup" VARCHAR(10) NOT NULL,
    "componentType" VARCHAR(30) NOT NULL,
    "collectionDate" DATE NOT NULL,
    "expirationDate" DATE NOT NULL,
    "volume" INTEGER NOT NULL,
    "storageLocation" TEXT NOT NULL,
    "currentStatus" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood_units_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_tracking_events" (
    "id" TEXT NOT NULL,
    "blood_unit_id" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "notes" TEXT NOT NULL,
    "performedBy" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood_tracking_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_logs" (
    "id" TEXT NOT NULL,
    "blood_unit_id" TEXT NOT NULL,
    "verifiedBy" TEXT NOT NULL,
    "previousStatus" VARCHAR(30) NOT NULL,
    "newStatus" VARCHAR(30) NOT NULL,
    "notes" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_requests" (
    "id" TEXT NOT NULL,
    "requesting_hospital_id" TEXT NOT NULL,
    "bloodGroup" VARCHAR(10) NOT NULL,
    "unitsRequired" INTEGER NOT NULL,
    "priority" VARCHAR(20) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blood_transfers" (
    "id" TEXT NOT NULL,
    "request_id" TEXT NOT NULL,
    "source_hospital_id" TEXT NOT NULL,
    "destination_hospital_id" TEXT NOT NULL,
    "unitsTransferred" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "transferDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blood_transfers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phoneNo_key" ON "users"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "hospitals_email_key" ON "hospitals"("email");

-- CreateIndex
CREATE INDEX "appointments_user_id_idx" ON "appointments"("user_id");

-- CreateIndex
CREATE INDEX "appointments_hospital_id_idx" ON "appointments"("hospital_id");

-- CreateIndex
CREATE INDEX "campaigns_hospital_id_idx" ON "campaigns"("hospital_id");

-- CreateIndex
CREATE INDEX "campaign_registrations_user_id_idx" ON "campaign_registrations"("user_id");

-- CreateIndex
CREATE INDEX "campaign_registrations_campaign_id_idx" ON "campaign_registrations"("campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "campaign_registrations_user_id_campaign_id_key" ON "campaign_registrations"("user_id", "campaign_id");

-- CreateIndex
CREATE UNIQUE INDEX "donations_appointment_id_key" ON "donations"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "donations_campaign_registration_id_key" ON "donations"("campaign_registration_id");

-- CreateIndex
CREATE INDEX "donations_user_id_idx" ON "donations"("user_id");

-- CreateIndex
CREATE INDEX "donations_hospital_id_idx" ON "donations"("hospital_id");

-- CreateIndex
CREATE INDEX "notifications_user_id_idx" ON "notifications"("user_id");

-- CreateIndex
CREATE INDEX "notifications_hospital_id_idx" ON "notifications"("hospital_id");

-- CreateIndex
CREATE INDEX "blood_units_donation_id_idx" ON "blood_units"("donation_id");

-- CreateIndex
CREATE INDEX "blood_units_donor_id_idx" ON "blood_units"("donor_id");

-- CreateIndex
CREATE INDEX "blood_units_hospital_id_idx" ON "blood_units"("hospital_id");

-- CreateIndex
CREATE INDEX "blood_tracking_events_blood_unit_id_idx" ON "blood_tracking_events"("blood_unit_id");

-- CreateIndex
CREATE INDEX "verification_logs_blood_unit_id_idx" ON "verification_logs"("blood_unit_id");

-- CreateIndex
CREATE INDEX "blood_requests_requesting_hospital_id_idx" ON "blood_requests"("requesting_hospital_id");

-- CreateIndex
CREATE INDEX "blood_transfers_request_id_idx" ON "blood_transfers"("request_id");

-- CreateIndex
CREATE INDEX "blood_transfers_source_hospital_id_idx" ON "blood_transfers"("source_hospital_id");

-- CreateIndex
CREATE INDEX "blood_transfers_destination_hospital_id_idx" ON "blood_transfers"("destination_hospital_id");

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaigns" ADD CONSTRAINT "campaigns_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_registrations" ADD CONSTRAINT "campaign_registrations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "campaign_registrations" ADD CONSTRAINT "campaign_registrations_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_campaign_registration_id_fkey" FOREIGN KEY ("campaign_registration_id") REFERENCES "campaign_registrations"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_units" ADD CONSTRAINT "blood_units_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_units" ADD CONSTRAINT "blood_units_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_units" ADD CONSTRAINT "blood_units_donation_id_fkey" FOREIGN KEY ("donation_id") REFERENCES "donations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_tracking_events" ADD CONSTRAINT "blood_tracking_events_blood_unit_id_fkey" FOREIGN KEY ("blood_unit_id") REFERENCES "blood_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verification_logs" ADD CONSTRAINT "verification_logs_blood_unit_id_fkey" FOREIGN KEY ("blood_unit_id") REFERENCES "blood_units"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_requests" ADD CONSTRAINT "blood_requests_requesting_hospital_id_fkey" FOREIGN KEY ("requesting_hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_transfers" ADD CONSTRAINT "blood_transfers_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "blood_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_transfers" ADD CONSTRAINT "blood_transfers_source_hospital_id_fkey" FOREIGN KEY ("source_hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blood_transfers" ADD CONSTRAINT "blood_transfers_destination_hospital_id_fkey" FOREIGN KEY ("destination_hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
