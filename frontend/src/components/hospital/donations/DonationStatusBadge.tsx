import { Badge } from "@/components/ui/badge";
import type { DonationStatus } from "@/services/donation.services";

export default function DonationStatusBadge({
  status,
}: {
  status: DonationStatus;
}) {
  return (
    <Badge variant={status === "COMPLETED" ? "success" : "danger"}>
      {status === "COMPLETED" ? "Completed" : "Rejected"}
    </Badge>
  );
}
