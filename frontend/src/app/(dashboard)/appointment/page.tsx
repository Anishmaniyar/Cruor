"use client";

import { useState, useEffect } from "react";
import StatusCard from "@/components/shared/StatusCard";
import JourneyTimeline from "@/components/shared/JourneyTimeline";
import BrowseSection from "@/components/shared/BrowseSection";
import HospitalCard from "@/components/appointments/HospitalCard";
import { getMyAppointments } from "@/services/appointment.services";
import { format } from "date-fns";

type AppointmentStatus = "NONE" | "BOOKED" | "COMPLETED";

interface AppointmentData {
  id: string;
  userId: string;
  hospitalId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: string;
  hospital?: {
    id: string;
    name: string;
  };
}

const APPOINTMENT_JOURNEY_STAGES = [
  "Booked",
  "Confirmed",
  "Visited Hospital",
  "Blood Collected",
  "Completed",
];

const SAMPLE_HOSPITALS = [
  {
    id: "28d9e852-eb26-43e4-b7ed-94b7610cf933",
    name: "Hospital 1",
    location: "Pune",
    rating: 4.8,
    workingHours: "8 AM - 5 PM",
    donationType: "Whole Blood",
    availableSlots: 18,
  },
];

const HOSPITAL_FILTERS = [
  { label: "Open Today", active: false },
  { label: "Nearby", active: false },
  { label: "Government", active: false },
  { label: "Private", active: false },
  { label: "Whole Blood", active: false },
];

function getJourneyStage(status: string): string {
  switch (status) {
    case "BOOKED":
      return "Booked";
    case "CONFIRMED":
      return "Confirmed";
    case "COMPLETED":
      return "Completed";
    default:
      return "Booked";
  }
}

export default function AppointmentsPage() {
  const [appointmentStatus, setAppointmentStatus] = useState<AppointmentStatus>("NONE");
  const [latestAppointment, setLatestAppointment] = useState<AppointmentData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch appointments on mount
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await getMyAppointments();
        const appointments: AppointmentData[] = response.data?.appointments ?? [];

        if (appointments.length > 0) {
          // Find the most recent active appointment (BOOKED or CONFIRMED)
          const activeAppt = appointments.find(
            (a) => a.status === "BOOKED" || a.status === "CONFIRMED",
          );

          if (activeAppt) {
            setLatestAppointment(activeAppt);
            setAppointmentStatus("BOOKED");
          } else {
            // Check if there's a completed one
            const completedAppt = appointments.find(
              (a) => a.status === "COMPLETED",
            );
            if (completedAppt) {
              setLatestAppointment(completedAppt);
              setAppointmentStatus("COMPLETED");
            }
          }
        }
      } catch {
        // No appointments or not logged in — stay in NONE state
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const isActive = appointmentStatus === "BOOKED";

  const filteredHospitals = SAMPLE_HOSPITALS.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const status: "NONE" | "ACTIVE" | "COMPLETED" =
    appointmentStatus === "NONE" ? "NONE" : appointmentStatus === "COMPLETED" ? "COMPLETED" : "ACTIVE";

  // Format appointment data for StatusCard
  const formatAppointmentData = (appt: AppointmentData) => {
    const dateStr = appt.appointmentDate
      ? format(new Date(appt.appointmentDate), "EEE, dd MMM yyyy")
      : "";
    const timeStr = appt.appointmentTime
      ? format(new Date(appt.appointmentTime), "hh:mm a")
      : "";

    const statusBadgeVariant =
      appt.status === "COMPLETED"
        ? "success"
        : appt.status === "CONFIRMED"
          ? "success"
          : "secondary";

    return {
      title: appt.hospital?.name ?? "Hospital",
      subtitle: appt.status === "COMPLETED" ? "Donation completed" : "Awaiting confirmation",
      date: `${dateStr} • ${timeStr}`,
      id: appt.id.slice(0, 12).toUpperCase(),
      badges: [
        { label: appt.status, variant: statusBadgeVariant },
      ],
    };
  };

  if (loading) {
    return (
      <main className="min-h-screen space-y-8 p-6 lg:p-8">
        <div className="flex items-center justify-center py-20">
          <p className="text-text-secondary">Loading your appointments...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      {/* Status Card — shows real appointment if one exists */}
      <StatusCard
        type="appointment"
        status={status}
        data={
          latestAppointment ? formatAppointmentData(latestAppointment) : undefined
        }
      />

      {/* Journey — only for BOOKED or COMPLETED */}
      {appointmentStatus !== "NONE" && latestAppointment && (
        <JourneyTimeline
          stages={APPOINTMENT_JOURNEY_STAGES}
          activeStage={getJourneyStage(latestAppointment.status)}
          title="Appointment Journey"
        />
      )}

      {/* Browse Hospitals — hidden when there's an active appointment */}
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
