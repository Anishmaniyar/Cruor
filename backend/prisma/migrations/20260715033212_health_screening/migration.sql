-- CreateTable
CREATE TABLE "HealthScreening" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "appointment_id" TEXT,
    "hasFever" BOOLEAN NOT NULL,
    "takingMedication" BOOLEAN NOT NULL,
    "recentTatto" BOOLEAN NOT NULL,
    "tattooDate" TIMESTAMP(3),
    "recentSurgery" BOOLEAN NOT NULL,
    "surgeryDate" DATE,
    "pregnant" BOOLEAN NOT NULL,
    "weight" INTEGER NOT NULL,
    "travelHistory" BOOLEAN NOT NULL,
    "eligible" BOOLEAN NOT NULL,
    "screenedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HealthScreening_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HealthScreening" ADD CONSTRAINT "HealthScreening_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HealthScreening" ADD CONSTRAINT "HealthScreening_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
