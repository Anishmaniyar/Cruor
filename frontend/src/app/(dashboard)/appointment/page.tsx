"use client";

import AppointmentOverview from "@/components/appointments/AppointmentOverview";
import AppointmentJourney from "@/components/appointments/AppoinmentJourney";
import BrowseHospitals from "@/components/appointments/BrowseHospitals";

export default function AppointmentsPage() {
  // Temporary state until backend integration
  const appointmentStatus = "NONE";
  // "NONE" | "BOOKED" | "COMPLETED"

  return (
    <main className="space-y-8 p-6">
      {/* Appointment Overview */}
      <AppointmentOverview status={appointmentStatus} />

      {/* Show journey only if an appointment exists */}
      {appointmentStatus !== "NONE" && (
        <AppointmentJourney status={appointmentStatus} />
      )}

      {/* Browse Hospitals */}
      <BrowseHospitals hasActiveAppointment={appointmentStatus === "BOOKED"} />
    </main>
  );
}
