import { Package, Clock, Calendar, ClipboardCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TransferStatus } from "./TransferStatusBadge";

interface DispatchInformationProps {
  status: TransferStatus;
  preparedDate?: string;
  dispatchedDate?: string;
  expectedDelivery?: string;
  deliveredDate?: string;
}

export default function DispatchInformation({
  status,
  preparedDate,
  dispatchedDate,
  expectedDelivery,
  deliveredDate,
}: DispatchInformationProps) {
  // Hide section entirely before preparing
  if (status === "Accepted") return null;

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Dispatch Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {preparedDate && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <Package className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Blood Prepared</p>
              <p className="text-sm font-medium text-text-primary">{preparedDate}</p>
            </div>
          </div>
        )}

        {dispatchedDate && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <Clock className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Dispatch Time</p>
              <p className="text-sm font-medium text-text-primary">{dispatchedDate}</p>
            </div>
          </div>
        )}

        {expectedDelivery && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <Calendar className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Expected Delivery</p>
              <p className="text-sm font-medium text-text-primary">{expectedDelivery}</p>
            </div>
          </div>
        )}

        {deliveredDate && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <ClipboardCheck className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Delivery Confirmed</p>
              <p className="text-sm font-medium text-text-primary">{deliveredDate}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
