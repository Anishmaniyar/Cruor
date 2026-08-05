import { Badge } from "@/components/ui/badge";
import type { BloodUnitStatus } from "@/services/bloodUnit.services";
import { BLOOD_UNIT_STATUS_DISPLAY } from "@/lib/blood-unit-utils";

const statusConfig: Record<
  BloodUnitStatus,
  { variant: "default" | "secondary" | "success" | "danger" | "outline" }
> = {
  AVAILABLE: { variant: "success" },
  RESERVED: { variant: "default" },
  TRANSFERRED: { variant: "secondary" },
  USED: { variant: "outline" },
  EXPIRED: { variant: "danger" },
  REJECTED: { variant: "danger" },
};

interface StockStatusBadgeProps {
  status: BloodUnitStatus;
}

export type { BloodUnitStatus as StockStatus };

export default function StockStatusBadge({ status }: StockStatusBadgeProps) {
  // Fall back gracefully for unexpected/legacy statuses (e.g. TRANSFUSED rows).
  const config = statusConfig[status] ?? { variant: "secondary" as const };
  return (
    <Badge variant={config.variant}>
      {BLOOD_UNIT_STATUS_DISPLAY[status] ?? status}
    </Badge>
  );
}
