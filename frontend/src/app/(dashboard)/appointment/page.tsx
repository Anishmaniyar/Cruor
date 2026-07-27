"use client";

import { useState } from "react";
import StatusCard from "@/components/shared/StatusCard";
import JourneyTimeline from "@/components/shared/JourneyTimeline";
import BrowseSection from "@/components/shared/BrowseSection";
import HospitalCard from "@/components/appointments/HospitalCard";

type AppointmentStatus = "NONE" | "BOOKED" | "COMPLETED";

const APPOINTMENT_JOURNEY_STAGES = [
  "Booked",
  "Confirmed",
  "Visited Hospital",
  "Blood Collected",
  "Completed",
];

const SAMPLE_HOSPITALS = [
  {
    id: "ruby-hall",
    name: "Ruby Hall Clinic",
    location: "Shivajinagar, Pune",
    rating: 4.8,
    workingHours: "8 AM - 5 PM",
    donationType: "Whole Blood",
    availableSlots: 18,
  },
  {
    id: "sassoon",
    name: "Sassoon General Hospital",
    location: "Pune",
    rating: 4.6,
    workingHours: "9 AM - 4 PM",
    donationType: "Whole Blood",
    availableSlots: 12,
  },
];

const HOSPITAL_FILTERS = [
  { label: "Open Today", active: false },
  { label: "Nearby", active: false },
  { label: "Government", active: false },
  { label: "Private", active: false },
  { label: "Whole Blood", active: false },
];

export default function AppointmentsPage() {
  const [appointmentStatus] = useState<AppointmentStatus>("NONE");
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = appointmentStatus === "BOOKED";

  const filteredHospitals = SAMPLE_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const status: "NONE" | "ACTIVE" | "COMPLETED" =
    appointmentStatus === "NONE" ? "NONE" : appointmentStatus === "COMPLETED" ? "COMPLETED" : "ACTIVE";

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      {/* Status Card — adapts based on state */}
      <StatusCard
        type="appointment"
        status={status}
        data={
          appointmentStatus === "NONE"
            ? undefined
            : {
                title: "Express Clinic",
                subtitle: "Confirmation email sent",
                location: "KPHB, Phase - II, Kukatpally, Hyderabad",
                date: "Sat, 10 Aug 2026 • 06:00 AM",
                bookedFor: "Anish Maniyar",
                id: "EKAPT12121212",
                badges: [
                  { label: "O+", variant: "secondary" },
                  { label: "Active", variant: "success" },
                ],
              }
        }
      />

      {/* Journey — only for BOOKED or COMPLETED */}
      {appointmentStatus !== "NONE" && (
        <JourneyTimeline
          stages={APPOINTMENT_JOURNEY_STAGES}
          activeStage={appointmentStatus === "COMPLETED" ? "Completed" : "Confirmed"}
          title="Appointment Journey"
        />
      )}

      {/* Browse Hospitals */}
      <BrowseSection
        title="Browse Hospitals"
        description="Find nearby verified hospitals and schedule your next donation."
        searchPlaceholder="Search hospitals by name or location..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={HOSPITAL_FILTERS}
        emptyMessage="No hospitals found"
        emptyDescription="Try adjusting your search or filters."
        disabled={isActive}
        disabledMessage="You already have an active appointment. Complete or cancel your current appointment before booking another one."
        isEmpty={!isActive && filteredHospitals.length === 0}
      >
        {filteredHospitals.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </BrowseSection>
    </main>
  );
}
