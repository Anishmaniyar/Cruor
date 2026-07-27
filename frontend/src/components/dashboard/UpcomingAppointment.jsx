import Link from "next/link";
import {
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UpcomingAppointment({ appointment }) {
  // Empty state — no appointment booked
  if (!appointment) {
    return (
      <Card className="flex h-full flex-col overflow-hidden !p-0">
        <div className="status-banner status-banner-secondary">
          <span className="status-banner-text text-sm font-medium">
            No Upcoming Appointment
          </span>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
          <Calendar className="mb-4 h-10 w-10 text-text-muted" />
          <p className="text-sm font-medium text-text-primary">
            No appointments scheduled
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            Book an appointment to donate blood
          </p>
          <Link href="/appointment">
            <Button variant="primary" size="sm" className="mt-6">
              Book Appointment
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  // Format the appointment date
  const dateObj = new Date(appointment.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="flex h-full flex-col overflow-hidden !p-0">
      {/* Status Banner */}
      <div className="status-banner status-banner-success">
        <CheckCircle2 className="status-banner-icon h-4 w-4" />
        <span className="status-banner-text text-sm font-medium">
          Upcoming Appointment
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="card-title !text-base">{appointment.hospital}</h3>
        </div>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="info-row">
            <Calendar className="info-icon" />
            <div>
              <p className="meta-label">Date</p>
              <p className="text-sm font-medium text-text-primary">{formattedDate}</p>
            </div>
          </div>
          <div className="info-row">
            <Clock className="info-icon" />
            <div>
              <p className="meta-label">Time</p>
              <p className="text-sm font-medium text-text-primary">{appointment.time}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <Badge variant="success">Confirmed</Badge>
        </div>

        <div className="flex-1" />

        <Button variant="secondary" className="w-full gap-2">
          View Appointment Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
