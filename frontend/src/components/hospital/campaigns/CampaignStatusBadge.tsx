import { Badge } from "@/components/ui/badge";

type CampaignStatus = "Upcoming" | "Active" | "Completed" | "Cancelled";

type DonorStatus = "Registered" | "Checked In" | "Donation Completed" | "No Show";

type Status = CampaignStatus | DonorStatus;

const statusConfig: Record<
  Status,
  { variant: "default" | "secondary" | "success" | "danger" | "outline"; label: string }
> = {
  Upcoming: { variant: "secondary", label: "Upcoming" },
  Active: { variant: "success", label: "Active" },
  Completed: { variant: "default", label: "Completed" },
  Cancelled: { variant: "danger", label: "Cancelled" },
  Registered: { variant: "secondary", label: "Registered" },
  "Checked In": { variant: "default", label: "Checked In" },
  "Donation Completed": { variant: "success", label: "Donated" },
  "No Show": { variant: "outline", label: "No Show" },
};

interface CampaignStatusBadgeProps {
  status: Status;
}

export type { CampaignStatus, DonorStatus, Status };

export default function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
