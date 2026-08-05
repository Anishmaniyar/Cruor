import { CalendarDays, Clock, Hash, Building2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import type { AppointmentStatus } from "./AppointmentStatusBadge";

export interface AppointmentInfo {
  id: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  bookedOn?: string;
  hospitalName?: string;
}

interface AppointmentDetailsProps {
  appointment: AppointmentInfo;
}

export default function AppointmentDetails({
  appointment,
}: AppointmentDetailsProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Appointment Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="info-row">
          <Hash className="info-icon" />
          <div>
            <p className="info-label">Appointment ID</p>
            <p className="meta-value">{appointment.id}</p>
          </div>
        </div>

        <div className="info-row">
          <CalendarDays className="info-icon" />
          <div>
            <p className="info-label">Date</p>
            <p className="info-value">{appointment.date}</p>
          </div>
        </div>

        <div className="info-row">
          <Clock className="info-icon" />
          <div>
            <p className="info-label">Time</p>
            <p className="info-value">{appointment.time}</p>
          </div>
        </div>

        <div className="info-row">
          <div>
            <p className="info-label">Status</p>
            <div className="mt-1">
              <AppointmentStatusBadge status={appointment.status} />
            </div>
          </div>
        </div>

        {appointment.hospitalName && (
          <div className="info-row">
            <Building2 className="info-icon" />
            <div>
              <p className="info-label">Hospital</p>
              <p className="info-value">{appointment.hospitalName}</p>
            </div>
          </div>
        )}

        {appointment.bookedOn && (
          <div className="info-row">
            <CalendarDays className="info-icon" />
            <div>
              <p className="info-label">Booked On</p>
              <p className="info-value">{appointment.bookedOn}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
