"use client";

import { useState } from "react";
import {
  Package,
  Truck,
  ClipboardCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { TransferStatus } from "./TransferStatusBadge";

interface TransferActionsProps {
  status: TransferStatus;
  onStatusChange?: (newStatus: TransferStatus) => void;
}

export default function TransferActions({
  status,
  onStatusChange,
}: TransferActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (
    newStatus: TransferStatus,
    label: string
  ) => {
    setIsLoading(label);
    await new Promise((r) => setTimeout(r, 800));
    onStatusChange?.(newStatus);
    setIsLoading(null);
  };

  /* ── Accepted: Prepare Blood ── */
  if (status === "Accepted") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Transfer Actions</h2>
        <p className="mb-4 text-sm text-text-secondary">
          Collect blood from inventory and prepare for dispatch.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Preparing", "prepare")}
          >
            {isLoading === "prepare" ? (
              "Preparing..."
            ) : (
              <>
                <Package className="h-4 w-4" />
                Prepare Blood
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Preparing: Dispatch Transfer ── */
  if (status === "Preparing") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Transfer Actions</h2>
        <p className="mb-4 text-sm text-text-secondary">
          Blood is packed and ready. Dispatch to destination hospital.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Dispatched", "dispatch")}
          >
            {isLoading === "dispatch" ? (
              "Dispatching..."
            ) : (
              <>
                <Truck className="h-4 w-4" />
                Dispatch Transfer
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Dispatched: Waiting ── */
  if (status === "Dispatched") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Transfer Actions</h2>
        <p className="mb-4 text-sm text-text-secondary">
          Blood is in transit. Waiting for the receiving hospital to confirm
          delivery.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" className="gap-2" disabled>
            <Truck className="h-4 w-4" />
            In Transit
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Delivered: Confirm Delivery ── */
  if (status === "Delivered") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Transfer Actions</h2>
        <p className="mb-4 text-sm text-text-secondary">
          Confirm that the receiving hospital has received the blood.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Completed", "confirm")}
          >
            {isLoading === "confirm" ? (
              "Confirming..."
            ) : (
              <>
                <ClipboardCheck className="h-4 w-4" />
                Confirm Delivery
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Completed / Cancelled: Terminal ── */
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-2">Transfer Actions</h2>
      <div className="flex items-center gap-3 rounded-xl bg-surface-secondary px-4 py-4">
        {status === "Completed" ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-success" />
            <p className="text-sm font-medium text-text-primary">
              This transfer has been completed successfully.
            </p>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-danger" />
            <p className="text-sm font-medium text-text-primary">
              This transfer has been cancelled.
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
