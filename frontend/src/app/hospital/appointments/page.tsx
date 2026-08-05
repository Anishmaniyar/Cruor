"use client";

import { useEffect, useMemo, useState } from "react";
import { isToday, isTomorrow, startOfDay } from "date-fns";
import AppointmentHeader from "@/components/hospital/appointments/AppointmentHeader";
import AppointmentFilters from "@/components/hospital/appointments/AppointmentFilters";
import AppointmentTable from "@/components/hospital/appointments/AppointmentTable";
import EmptyAppointments from "@/components/hospital/appointments/EmptyAppointments";
import type { Appointment } from "@/components/hospital/appointments/AppointmentTable";
import { Button } from "@/components/ui/button";

import { getHospitalAppointments } from "@/services/appointment.services";
import {
  displayStatus,
  formatAppointmentDate,
  formatAppointmentTime,
  parseAppointmentDate,
  TERMINAL_STATUSES,
  type AppointmentBackend,
} from "@/lib/appointment-utils";
import { getErrorMessage } from "@/lib/error";

function mapToTableRow(a: AppointmentBackend): Appointment {
  return {
    id: a.id,
    donorName: a.user?.name ?? "Unknown donor",
    bloodGroup: a.user?.bloodGroup ?? "—",
    date: formatAppointmentDate(a.appointmentDate),
    time: formatAppointmentTime(a.appointmentTime),
    status: displayStatus(a.status),
  };
}

const DISPLAY_STATUS_FILTERS = [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "no-show",
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<AppointmentBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await getHospitalAppointments();
      setAppointments(response.data ?? []);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load appointments"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getHospitalAppointments()
      .then((response) => {
        if (!cancelled) setAppointments(response.data ?? []);
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load appointments"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRows = useMemo(() => {
    let filtered = appointments;

    if (activeFilter !== "all") {
      if (DISPLAY_STATUS_FILTERS.includes(activeFilter)) {
        const target =
          activeFilter === "no-show"
            ? "No Show"
            : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);

        filtered = filtered.filter((a) => displayStatus(a.status) === target);
      } else if (activeFilter === "today") {
        filtered = filtered.filter((a) => isToday(parseAppointmentDate(a.appointmentDate)));
      } else if (activeFilter === "tomorrow") {
        filtered = filtered.filter((a) => isTomorrow(parseAppointmentDate(a.appointmentDate)));
      } else if (activeFilter === "upcoming") {
        filtered = filtered.filter(
          (a) =>
            !TERMINAL_STATUSES.includes(a.status) &&
            parseAppointmentDate(a.appointmentDate) >= startOfDay(new Date()),
        );
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          (a.user?.name ?? "").toLowerCase().includes(query) ||
          (a.user?.bloodGroup ?? "").toLowerCase().includes(query),
      );
    }

    return filtered.map(mapToTableRow);
  }, [appointments, activeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-text-secondary">Loading appointments...</p>
      </div>
    );
  }

  if (error && appointments.length === 0) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <AppointmentHeader />
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">{error}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={fetchAppointments}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <AppointmentHeader />

      <AppointmentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredRows.length > 0 ? (
        <AppointmentTable appointments={filteredRows} />
      ) : (
        <EmptyAppointments />
      )}
    </div>
  );
}
