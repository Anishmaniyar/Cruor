"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { AppointmentStatus } from "./AppointmentStatusBadge";

interface AppointmentActionsProps {
  status: AppointmentStatus;
  onStatusChange?: (newStatus: AppointmentStatus) => void;
}

export default function AppointmentActions({
  status,
  onStatusChange,
}: AppointmentActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (newStatus: AppointmentStatus, label: string) => {
    setIsLoading(label);
    // Mock API call
    await new Promise((r) => setTimeout(r, 800));
    onStatusChange?.(newStatus);
    setIsLoading(null);
  };

  /* ── Pending ── */
  if (status === "Pending") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Appointment Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Confirm or reject this appointment request.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Confirmed", "confirm")}
          >
            {isLoading === "confirm" ? (
              "Confirming..."
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Confirm Appointment
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            className="gap-2 text-danger hover:bg-danger/10 hover:text-danger"
            disabled={isLoading !== null}
            onClick={() => handleAction("Cancelled", "reject")}
          >
            {isLoading === "reject" ? (
              "Rejecting..."
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Reject Appointment
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Confirmed ── */
  if (status === "Confirmed") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Appointment Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Update the appointment outcome.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Completed", "complete")}
          >
            {isLoading === "complete" ? (
              "Marking..."
            ) : (
              <>
                <UserCheck className="h-4 w-4" />
                Mark as Completed
              </>
            )}
          </Button>
          <Button
            variant="secondary"
            className="gap-2 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300"
            disabled={isLoading !== null}
            onClick={() => handleAction("No Show", "noshow")}
          >
            {isLoading === "noshow" ? (
              "Marking..."
            ) : (
              <>
                <UserX className="h-4 w-4" />
                Mark as No Show
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Completed / Cancelled / No Show ── */
  const finalMessages: Record<AppointmentStatus, { icon: React.ReactNode; message: string }> = {
    Completed: {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      message: "This appointment has been completed successfully.",
    },
    Cancelled: {
      icon: <XCircle className="h-5 w-5 text-danger" />,
      message: "This appointment has been cancelled.",
    },
    "No Show": {
      icon: <UserX className="h-5 w-5 text-amber-400" />,
      message: "The donor did not show up for this appointment.",
    },
    Pending: { icon: null, message: "" },
    Confirmed: { icon: null, message: "" },
  };

  const finalState = finalMessages[status];

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-2">Appointment Actions</h2>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-secondary px-5 py-4">
        {finalState.icon}
        <p className="text-sm text-text-secondary">{finalState.message}</p>
      </div>
    </Card>
  );
}
