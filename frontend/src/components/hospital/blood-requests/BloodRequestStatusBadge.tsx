import { Badge } from "@/components/ui/badge";

type RequestStatus = "Pending" | "Accepted" | "Preparing Blood" | "Transferred" | "Completed" | "Rejected";

type Priority = "Normal" | "Urgent" | "Emergency";

type Status = RequestStatus | Priority;

const statusConfig: Record<
  Status,
  { variant: "default" | "secondary" | "success" | "danger" | "outline"; label: string }
> = {
  Pending: { variant: "secondary", label: "Pending" },
  Accepted: { variant: "success", label: "Accepted" },
  "Preparing Blood": { variant: "default", label: "Preparing Blood" },
  Transferred: { variant: "outline", label: "Transferred" },
  Completed: { variant: "success", label: "Completed" },
  Rejected: { variant: "danger", label: "Rejected" },
  Normal: { variant: "secondary", label: "Normal" },
  Urgent: { variant: "outline", label: "Urgent" },
  Emergency: { variant: "danger", label: "Emergency" },
};

interface BloodRequestStatusBadgeProps {
  status: Status;
}

export type { RequestStatus, Priority, Status };

export default function BloodRequestStatusBadge({
  status,
}: BloodRequestStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
