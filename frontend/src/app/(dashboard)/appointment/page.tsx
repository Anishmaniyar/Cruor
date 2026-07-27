"use client";

import AppointmentOverview from "@/components/appointments/AppointmentOverview";
import AppointmentJourney from "@/components/appointments/AppoinmentJourney";
import BrowseHospitals from "@/components/appointments/BrowseHospitals";

export default function AppointmentsPage() {
  const appointmentStatus = "NONE";
  // "NONE" | "BOOKED" | "COMPLETED"

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      <AppointmentOverview />

      {appointmentStatus !== "NONE" && (
        <AppointmentJourney />
      )}

      <BrowseHospitals />
    </main>
  );
}
