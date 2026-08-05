"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import StatusCard from "@/components/shared/StatusCard";
import JourneyTimeline from "@/components/shared/JourneyTimeline";
import BrowseSection from "@/components/shared/BrowseSection";
import HospitalCard from "@/components/appointments/HospitalCard";
import { getMyAppointments, cancelAppointment } from "@/services/appointment.services";
import { getHospitals, type Hospital } from "@/services/hospital.services";
import {
  formatAppointmentDate,
  formatAppointmentTime,
  type AppointmentBackend,
} from "@/lib/appointment-utils";
import { getErrorMessage } from "@/lib/error";

type AppointmentStatus = "NONE" | "BOOKED" | "COMPLETED";

const APPOINTMENT_JOURNEY_STAGES = [
  "Booked",
  "Confirmed",
  "Visited Hospital",
  "Blood Collected",
  "Completed",
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
  const [latestAppointment, setLatestAppointment] = useState<AppointmentBackend | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchAppointments = useCallback(async () => {
    try {
      const response = await getMyAppointments();
      const appointments: AppointmentBackend[] = response.data.appointments ?? [];

      // Find the most recent active appointment (BOOKED or CONFIRMED)
      const activeAppt = appointments.find(
        (a) => a.status === "BOOKED" || a.status === "CONFIRMED",
      );

      if (activeAppt) {
        setLatestAppointment(activeAppt);
        setAppointmentStatus("BOOKED");
      } else {
        // Fall back to the most recent completed appointment
        const completedAppt = appointments.find((a) => a.status === "COMPLETED");
        if (completedAppt) {
          setLatestAppointment(completedAppt);
          setAppointmentStatus("COMPLETED");
        } else {
          setLatestAppointment(null);
          setAppointmentStatus("NONE");
        }
      }
    } catch {
      // No appointments or not logged in — stay in NONE state
      setLatestAppointment(null);
      setAppointmentStatus("NONE");
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getMyAppointments(), getHospitals()])
      .then(([apptResponse, hospitalsResponse]) => {
        if (cancelled) return;

        setHospitals(hospitalsResponse.data.hospitals ?? []);

        const appointments: AppointmentBackend[] =
          apptResponse.data.appointments ?? [];

        const activeAppt = appointments.find(
          (a) => a.status === "BOOKED" || a.status === "CONFIRMED",
        );

        if (activeAppt) {
          setLatestAppointment(activeAppt);
          setAppointmentStatus("BOOKED");
        } else {
          const completedAppt = appointments.find((a) => a.status === "COMPLETED");
          if (completedAppt) {
            setLatestAppointment(completedAppt);
            setAppointmentStatus("COMPLETED");
          } else {
            setLatestAppointment(null);
            setAppointmentStatus("NONE");
          }
        }
      })
      .catch(() => {
        if (cancelled) return;
        setHospitals([]);
        setLatestAppointment(null);
        setAppointmentStatus("NONE");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isActive = appointmentStatus === "BOOKED";

  const filteredHospitals = hospitals.filter(
    (h) =>
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (h.address ?? "").toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const status: "NONE" | "ACTIVE" | "COMPLETED" =
    appointmentStatus === "NONE"
      ? "NONE"
      : appointmentStatus === "COMPLETED"
        ? "COMPLETED"
        : "ACTIVE";

  const handleCancel = async () => {
    if (!latestAppointment) return;

    if (!window.confirm("Are you sure you want to cancel this appointment?")) {
      return;
    }

    try {
      setCancelling(true);
      await cancelAppointment(latestAppointment.id);
      toast.success("Appointment cancelled successfully");
      await fetchAppointments();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to cancel appointment"));
    } finally {
      setCancelling(false);
    }
  };

  // Format appointment data for StatusCard
  const formatAppointmentData = (appt: AppointmentBackend) => ({
    title: appt.hospital?.name ?? "Hospital",
    subtitle: appt.status === "COMPLETED" ? "Donation completed" : "Awaiting confirmation",
    date: `${formatAppointmentDate(appt.appointmentDate)} • ${formatAppointmentTime(appt.appointmentTime)}`,
    id: appt.id.slice(0, 12).toUpperCase(),
    badges: [
      {
        label: appt.status,
        variant: appt.status === "COMPLETED" || appt.status === "CONFIRMED"
          ? "success" as const
          : "secondary" as const,
      },
    ],
    onCancel: isActive && !cancelling ? handleCancel : undefined,
  });

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
        data={latestAppointment ? formatAppointmentData(latestAppointment) : undefined}
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
        emptyMessage="No hospitals found"
        emptyDescription="Try adjusting your search."
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
