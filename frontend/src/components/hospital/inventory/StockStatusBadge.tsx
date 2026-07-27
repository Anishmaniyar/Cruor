import { Badge } from "@/components/ui/badge";

type StockStatus = "Healthy" | "Low Stock" | "Critical" | "Expiring Soon" | "Expired";

const statusConfig: Record<
  StockStatus,
  { variant: "default" | "secondary" | "success" | "danger" | "outline"; label: string }
> = {
  Healthy: { variant: "success", label: "Healthy" },
  "Low Stock": { variant: "secondary", label: "Low Stock" },
  Critical: { variant: "danger", label: "Critical" },
  "Expiring Soon": { variant: "outline", label: "Expiring Soon" },
  Expired: { variant: "danger", label: "Expired" },
};

interface StockStatusBadgeProps {
  status: StockStatus;
}

export type { StockStatus };

export default function StockStatusBadge({ status }: StockStatusBadgeProps) {
  const config = statusConfig[status];
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
