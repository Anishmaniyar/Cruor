import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const appointments = [
  {
    id: 1,
    patientName: "Ravi Sharma",
    time: "09:00 AM",
    bloodGroup: "O+",
    status: "Confirmed" as const,
  },
  {
    id: 2,
    patientName: "Priya Patel",
    time: "10:30 AM",
    bloodGroup: "A+",
    status: "Pending" as const,
  },
  {
    id: 3,
    patientName: "Amit Singh",
    time: "11:45 AM",
    bloodGroup: "B+",
    status: "Confirmed" as const,
  },
  {
    id: 4,
    patientName: "Sneha Reddy",
    time: "02:00 PM",
    bloodGroup: "AB+",
    status: "Pending" as const,
  },
  {
    id: 5,
    patientName: "Vikram Joshi",
    time: "03:30 PM",
    bloodGroup: "O-",
    status: "Confirmed" as const,
  },
];

const statusVariant = {
  Confirmed: "success" as const,
  Pending: "secondary" as const,
};

export default function TodaysAppointments() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="section-title">Today&apos;s Appointments</h2>
          <p className="section-description">
            Upcoming appointments scheduled for today.
          </p>
        </div>
        <Link
          href="/hospital/appointments"
          className="link-action"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="divide-y divide-border">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-surface-hover"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-sm font-medium text-text-primary">
                {apt.patientName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {apt.patientName}
                </p>
                <p className="text-xs text-text-muted">{apt.time}</p>
              </div>

              {/* Blood Group */}
              <div className="flex h-8 w-10 items-center justify-center rounded-lg bg-surface-secondary text-xs font-semibold text-text-primary">
                {apt.bloodGroup}
              </div>

              {/* Status */}
              <Badge variant={statusVariant[apt.status]}>{apt.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
