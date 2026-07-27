import { Badge } from "@/components/ui/badge";

type TransferStatus = "Accepted" | "Preparing" | "Dispatched" | "Delivered" | "Completed" | "Cancelled";

const statusConfig: Record<
  TransferStatus,
  { variant: "default" | "secondary" | "success" | "danger" | "outline"; label: string }
> = {
  Accepted: { variant: "secondary", label: "Accepted" },
  Preparing: { variant: "default", label: "Preparing" },
  Dispatched: { variant: "outline", label: "Dispatched" },
  Delivered: { variant: "success", label: "Delivered" },
  Completed: { variant: "success", label: "Completed" },
  Cancelled: { variant: "danger", label: "Cancelled" },
};

interface TransferStatusBadgeProps {
  status: TransferStatus;
}

export type { TransferStatus };

export default function TransferStatusBadge({ status }: TransferStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
