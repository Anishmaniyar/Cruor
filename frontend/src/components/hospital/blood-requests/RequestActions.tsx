"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  FlaskConical,
  Truck,
  Flag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { RequestStatus } from "./BloodRequestStatusBadge";

interface RequestActionsProps {
  status: RequestStatus;
  onStatusChange?: (newStatus: RequestStatus) => void;
}

export default function RequestActions({
  status,
  onStatusChange,
}: RequestActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (
    newStatus: RequestStatus,
    label: string
  ) => {
    setIsLoading(label);
    await new Promise((r) => setTimeout(r, 800));
    onStatusChange?.(newStatus);
    setIsLoading(null);
  };

  /* ── Pending ── */
  if (status === "Pending") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Request Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Review the request details and inventory before deciding.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Accepted", "accept")}
          >
            {isLoading === "accept" ? (
              "Accepting..."
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Accept Request
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            className="gap-2 text-danger hover:bg-danger/10 hover:text-danger"
            disabled={isLoading !== null}
            onClick={() => handleAction("Rejected", "reject")}
          >
            {isLoading === "reject" ? (
              "Rejecting..."
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Reject Request
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Accepted ── */
  if (status === "Accepted") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Request Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Start preparing the blood units for transfer.
        </p>
        <Button
          variant="primary"
          className="gap-2"
          disabled={isLoading !== null}
          onClick={() => handleAction("Preparing Blood", "prepare")}
        >
          {isLoading === "prepare" ? (
            "Updating..."
          ) : (
            <>
              <FlaskConical className="h-4 w-4" />
              Mark as Preparing Blood
            </>
          )}
        </Button>
      </Card>
    );
  }

  /* ── Preparing Blood ── */
  if (status === "Preparing Blood") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Request Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Blood is ready. Mark as transferred to proceed.
        </p>
        <Button
          variant="primary"
          className="gap-2"
          disabled={isLoading !== null}
          onClick={() => handleAction("Transferred", "transfer")}
        >
          {isLoading === "transfer" ? (
            "Marking..."
          ) : (
            <>
              <Truck className="h-4 w-4" />
              Mark as Transferred
            </>
          )}
        </Button>
      </Card>
    );
  }

  /* ── Transferred ── */
  if (status === "Transferred") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Request Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Confirm the transfer is complete.
        </p>
        <Button
          variant="primary"
          className="gap-2"
          disabled={isLoading !== null}
          onClick={() => handleAction("Completed", "complete")}
        >
          {isLoading === "complete" ? (
            "Completing..."
          ) : (
            <>
              <Flag className="h-4 w-4" />
              Mark as Completed
            </>
          )}
        </Button>
      </Card>
    );
  }

  /* ── Completed / Rejected ── */
  const finalMessages: Record<
    RequestStatus,
    { icon: React.ReactNode; message: string }
  > = {
    Completed: {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      message: "This request has been completed successfully.",
    },
    Rejected: {
      icon: <XCircle className="h-5 w-5 text-danger" />,
      message: "This request has been rejected.",
    },
    Pending: { icon: null, message: "" },
    Accepted: { icon: null, message: "" },
    "Preparing Blood": { icon: null, message: "" },
    Transferred: { icon: null, message: "" },
  };

  const finalState = finalMessages[status];

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-2">Request Actions</h2>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-secondary px-5 py-4">
        {finalState.icon}
        <p className="text-sm text-text-secondary">{finalState.message}</p>
      </div>
    </Card>
  );
}
