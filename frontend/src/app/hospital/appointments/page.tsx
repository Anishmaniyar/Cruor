"use client";

import { useState, useMemo } from "react";
import AppointmentHeader from "@/components/hospital/appointments/AppointmentHeader";
import AppointmentFilters from "@/components/hospital/appointments/AppointmentFilters";
import AppointmentTable from "@/components/hospital/appointments/AppointmentTable";
import EmptyAppointments from "@/components/hospital/appointments/EmptyAppointments";
import type { Appointment } from "@/components/hospital/appointments/AppointmentTable";

const mockAppointments: Appointment[] = [
  {
    id: "APT-001",
    donorName: "Ravi Sharma",
    bloodGroup: "O+",
    date: "Aug 20, 2026",
    time: "09:00 AM",
    status: "Confirmed",
  },
  {
    id: "APT-002",
    donorName: "Priya Patel",
    bloodGroup: "A+",
    date: "Aug 20, 2026",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    id: "APT-003",
    donorName: "Amit Singh",
    bloodGroup: "B+",
    date: "Aug 20, 2026",
    time: "11:45 AM",
    status: "Confirmed",
  },
  {
    id: "APT-004",
    donorName: "Sneha Reddy",
    bloodGroup: "AB+",
    date: "Aug 21, 2026",
    time: "02:00 PM",
    status: "Pending",
  },
  {
    id: "APT-005",
    donorName: "Vikram Joshi",
    bloodGroup: "O-",
    date: "Aug 21, 2026",
    time: "03:30 PM",
    status: "Confirmed",
  },
  {
    id: "APT-006",
    donorName: "Ananya Verma",
    bloodGroup: "A-",
    date: "Aug 19, 2026",
    time: "08:00 AM",
    status: "Completed",
  },
  {
    id: "APT-007",
    donorName: "Rajesh Kumar",
    bloodGroup: "B-",
    date: "Aug 18, 2026",
    time: "01:00 PM",
    status: "Cancelled",
  },
  {
    id: "APT-008",
    donorName: "Meera Nair",
    bloodGroup: "AB-",
    date: "Aug 19, 2026",
    time: "04:00 PM",
    status: "No Show",
  },
];

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredAppointments = useMemo(() => {
    let filtered = mockAppointments;

    // Apply status filter
    if (activeFilter !== "all") {
      const statusMap: Record<string, string> = {
        pending: "Pending",
        confirmed: "Confirmed",
        completed: "Completed",
        cancelled: "Cancelled",
        "no-show": "No Show",
      };

      if (statusMap[activeFilter]) {
        filtered = filtered.filter((a) => a.status === statusMap[activeFilter]);
      } else if (activeFilter === "today") {
        filtered = filtered.filter((a) => a.date === "Aug 20, 2026");
      } else if (activeFilter === "tomorrow") {
        filtered = filtered.filter((a) => a.date === "Aug 21, 2026");
      } else if (activeFilter === "upcoming") {
        filtered = filtered.filter(
          (a) =>
            a.status !== "Completed" &&
            a.status !== "Cancelled" &&
            a.status !== "No Show"
        );
      }
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.donorName.toLowerCase().includes(query) ||
          a.bloodGroup.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <AppointmentHeader />

      <AppointmentFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredAppointments.length > 0 ? (
        <AppointmentTable appointments={filteredAppointments} />
      ) : (
        <EmptyAppointments />
      )}
    </div>
  );
}
