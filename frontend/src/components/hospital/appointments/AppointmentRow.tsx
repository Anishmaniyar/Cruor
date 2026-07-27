import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import type { AppointmentStatus } from "./AppointmentStatusBadge";

export interface Appointment {
  id: string;
  donorName: string;
  bloodGroup: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}

interface AppointmentRowProps {
  appointment: Appointment;
}

export default function AppointmentRow({ appointment }: AppointmentRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-xs font-medium text-text-primary">
            {appointment.donorName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {appointment.donorName}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {appointment.bloodGroup}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {appointment.date}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {appointment.time}
      </td>
      <td className="px-6 py-4">
        <AppointmentStatusBadge status={appointment.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/hospital/appointments/${appointment.id}`}>
          <Button variant="ghost" size="xs" className="gap-1.5">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </td>
    </tr>
  );
}
