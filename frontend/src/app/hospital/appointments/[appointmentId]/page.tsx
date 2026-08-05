"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import AppointmentDetails from "@/components/hospital/appointments/AppointmentDetails";
import DonorInformation from "@/components/hospital/appointments/DonorInformation";
import AppointmentTimeline from "@/components/hospital/appointments/AppointmentTimeline";
import AppointmentActions from "@/components/hospital/appointments/AppointmentActions";
import type { AppointmentStatus } from "@/components/hospital/appointments/AppointmentStatusBadge";
import { Button } from "@/components/ui/button";

import {
  getHospitalAppointmentById,
  confirmAppointment,
  markNoShowAppointment,
  completeAppointment,
} from "@/services/appointment.services";
import {
  displayStatus,
  formatAppointmentDate,
  formatAppointmentTime,
  type AppointmentBackend,
} from "@/lib/appointment-utils";
import { getErrorMessage } from "@/lib/error";

function formatBookedOn(value: string): string {
  const date = new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function AppointmentDetailsPage() {
  const params = useParams();
  const appointmentId = params.appointmentId as string;

  const [appointment, setAppointment] = useState<AppointmentBackend | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppointment = useCallback(async () => {
    const response = await getHospitalAppointmentById(appointmentId);
    setAppointment(response.data.appointment);
    setError(null);
  }, [appointmentId]);

  useEffect(() => {
    let cancelled = false;

    getHospitalAppointmentById(appointmentId)
      .then((response) => {
        if (!cancelled) {
          setAppointment(response.data.appointment);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load appointment"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [appointmentId]);

  const handleRetry = () => {
    setLoading(true);
    loadAppointment()
      .catch((e) => setError(getErrorMessage(e, "Failed to load appointment")))
      .finally(() => setLoading(false));
  };

  const updateStatus = (newStatus: AppointmentBackend["status"]) => {
    setAppointment((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  const handleConfirm = async () => {
    try {
      await confirmAppointment(appointmentId);
      updateStatus("CONFIRMED");
      toast.success("Appointment confirmed successfully");
    } catch (e) {
      toast.error(getErrorMessage(e, "Failed to confirm appointment"));
    }
  };

  const handleComplete = async () => {
    try {
      await completeAppointment(appointmentId);
      updateStatus("COMPLETED");
      toast.success("Appointment completed successfully");
    } catch (e) {
      toast.error(getErrorMessage(e, "Failed to complete appointment"));
    }
  };

  const handleNoShow = async () => {
    try {
      await markNoShowAppointment(appointmentId);
      updateStatus("NO_SHOW");
      toast.success("Appointment marked as no show");
    } catch (e) {
      toast.error(getErrorMessage(e, "Failed to mark appointment as no show"));
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <Link href="/hospital/appointments" className="link-action">
          <ArrowLeft size={14} />
          Back to Appointments
        </Link>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">
            {error ?? "Appointment not found."}
          </p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const statusDisplay: AppointmentStatus = displayStatus(appointment.status);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Back Navigation */}
      <Link href="/hospital/appointments" className="link-action">
        <ArrowLeft size={14} />
        Back to Appointments
      </Link>

      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="page-title">Appointment Details</h1>
        <p className="page-description">
          View donor information and manage appointment status.
        </p>
      </header>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <AppointmentDetails
            appointment={{
              id: appointment.id,
              date: formatAppointmentDate(appointment.appointmentDate),
              time: formatAppointmentTime(appointment.appointmentTime),
              status: statusDisplay,
              bookedOn: formatBookedOn(appointment.createdAt),
              hospitalName: appointment.hospital?.name,
            }}
          />
          <DonorInformation
            donor={{
              fullName: appointment.user?.name ?? "Unknown donor",
              bloodGroup: appointment.user?.bloodGroup,
              phone: appointment.user?.phoneNo,
              id: appointment.user?.id,
            }}
          />
          <AppointmentActions
            status={statusDisplay}
            onConfirm={handleConfirm}
            onComplete={handleComplete}
            onNoShow={handleNoShow}
          />
        </div>

        {/* Right Column */}
        <div>
          <AppointmentTimeline status={statusDisplay} />
        </div>
      </div>
    </div>
  );
}
