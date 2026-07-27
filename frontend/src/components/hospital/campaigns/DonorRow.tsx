import { Button } from "@/components/ui/button";
import CampaignStatusBadge from "./CampaignStatusBadge";
import type { DonorStatus } from "./CampaignStatusBadge";

export interface CampaignDonor {
  id: string;
  name: string;
  bloodGroup: string;
  status: DonorStatus;
}

interface DonorRowProps {
  donor: CampaignDonor;
  onCheckIn?: (id: string) => void;
  onComplete?: (id: string) => void;
  onNoShow?: (id: string) => void;
}

export default function DonorRow({
  donor,
  onCheckIn,
  onComplete,
  onNoShow,
}: DonorRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-xs font-medium text-text-primary">
            {donor.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {donor.name}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {donor.bloodGroup}
        </div>
      </td>
      <td className="px-6 py-4">
        <CampaignStatusBadge status={donor.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="flex items-center justify-end gap-2">
          {donor.status === "Registered" && (
            <Button
              variant="secondary"
              size="xs"
              onClick={() => onCheckIn?.(donor.id)}
            >
              Check In
            </Button>
          )}
          {donor.status === "Checked In" && (
            <>
              <Button
                variant="primary"
                size="xs"
                onClick={() => onComplete?.(donor.id)}
              >
                Mark Completed
              </Button>
              <Button
                variant="ghost"
                size="xs"
                className="text-danger hover:bg-danger/10 hover:text-danger"
                onClick={() => onNoShow?.(donor.id)}
              >
                No Show
              </Button>
            </>
          )}
          {(donor.status === "Donation Completed" || donor.status === "No Show") && (
            <span className="text-xs text-text-muted">—</span>
          )}
        </div>
      </td>
    </tr>
  );
}
