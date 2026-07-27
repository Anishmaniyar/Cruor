import { Badge } from "@/components/ui/badge";

type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "No Show";

const statusConfig: Record<
  AppointmentStatus,
  { variant: "default" | "secondary" | "success" | "danger" | "outline"; label: string }
> = {
  Pending: { variant: "secondary", label: "Pending" },
  Confirmed: { variant: "success", label: "Confirmed" },
  Completed: { variant: "default", label: "Completed" },
  Cancelled: { variant: "danger", label: "Cancelled" },
  "No Show": { variant: "outline", label: "No Show" },
};

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus;
}

export type { AppointmentStatus };

export default function AppointmentStatusBadge({
  status,
}: AppointmentStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
