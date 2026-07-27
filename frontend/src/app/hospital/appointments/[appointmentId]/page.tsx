"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AppointmentDetails from "@/components/hospital/appointments/AppointmentDetails";
import DonorInformation from "@/components/hospital/appointments/DonorInformation";
import AppointmentTimeline from "@/components/hospital/appointments/AppointmentTimeline";
import AppointmentActions from "@/components/hospital/appointments/AppointmentActions";
import type { AppointmentStatus } from "@/components/hospital/appointments/AppointmentStatusBadge";

interface AppointmentData {
  id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  donor: {
    fullName: string;
    bloodGroup: string;
    age: number;
    phone: string;
  };
}

const mockAppointments: Record<string, AppointmentData> = {
  "APT-001": {
    id: "APT-001",
    date: "Aug 20, 2026",
    time: "09:00 AM",
    status: "Confirmed",
    donor: {
      fullName: "Ravi Sharma",
      bloodGroup: "O+",
      age: 28,
      phone: "+91 98765 43210",
    },
  },
  "APT-002": {
    id: "APT-002",
    date: "Aug 20, 2026",
    time: "10:30 AM",
    status: "Pending",
    donor: {
      fullName: "Priya Patel",
      bloodGroup: "A+",
      age: 32,
      phone: "+91 87654 32109",
    },
  },
  "APT-003": {
    id: "APT-003",
    date: "Aug 20, 2026",
    time: "11:45 AM",
    status: "Confirmed",
    donor: {
      fullName: "Amit Singh",
      bloodGroup: "B+",
      age: 25,
      phone: "+91 76543 21098",
    },
  },
  "APT-004": {
    id: "APT-004",
    date: "Aug 21, 2026",
    time: "02:00 PM",
    status: "Pending",
    donor: {
      fullName: "Sneha Reddy",
      bloodGroup: "AB+",
      age: 30,
      phone: "+91 65432 10987",
    },
  },
  "APT-005": {
    id: "APT-005",
    date: "Aug 21, 2026",
    time: "03:30 PM",
    status: "Confirmed",
    donor: {
      fullName: "Vikram Joshi",
      bloodGroup: "O-",
      age: 35,
      phone: "+91 54321 09876",
    },
  },
  "APT-006": {
    id: "APT-006",
    date: "Aug 19, 2026",
    time: "08:00 AM",
    status: "Completed",
    donor: {
      fullName: "Ananya Verma",
      bloodGroup: "A-",
      age: 27,
      phone: "+91 43210 98765",
    },
  },
  "APT-007": {
    id: "APT-007",
    date: "Aug 18, 2026",
    time: "01:00 PM",
    status: "Cancelled",
    donor: {
      fullName: "Rajesh Kumar",
      bloodGroup: "B-",
      age: 42,
      phone: "+91 32109 87654",
    },
  },
  "APT-008": {
    id: "APT-008",
    date: "Aug 19, 2026",
    time: "04:00 PM",
    status: "No Show",
    donor: {
      fullName: "Meera Nair",
      bloodGroup: "AB-",
      age: 29,
      phone: "+91 21098 76543",
    },
  },
};

export default function AppointmentDetailsPage() {
  const params = useParams();
  const appointmentId = params.appointmentId as string;
  const [appointment, setAppointment] = useState<AppointmentData | null>(
    mockAppointments[appointmentId] ?? null
  );

  if (!appointment) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-text-secondary">Appointment not found.</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus: AppointmentStatus) => {
    setAppointment((prev) =>
      prev ? { ...prev, status: newStatus } : prev
    );
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      {/* Back Navigation */}
      <Link
        href="/hospital/appointments"
        className="link-action"
      >
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
              date: appointment.date,
              time: appointment.time,
              status: appointment.status,
            }}
          />
          <DonorInformation donor={appointment.donor} />
          <AppointmentActions
            status={appointment.status}
            onStatusChange={handleStatusChange}
          />
        </div>

        {/* Right Column */}
        <div>
          <AppointmentTimeline status={appointment.status} />
        </div>
      </div>
    </div>
  );
}
