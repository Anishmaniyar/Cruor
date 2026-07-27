"use client";

import { useState } from "react";
import {
  Play,
  CheckCircle2,
  XCircle,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import type { CampaignStatus } from "./CampaignStatusBadge";

interface CampaignActionsProps {
  campaignId: string;
  status: CampaignStatus;
  onStatusChange?: (newStatus: CampaignStatus) => void;
}

export default function CampaignActions({
  campaignId,
  status,
  onStatusChange,
}: CampaignActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (
    newStatus: CampaignStatus,
    label: string
  ) => {
    setIsLoading(label);
    await new Promise((r) => setTimeout(r, 800));
    onStatusChange?.(newStatus);
    setIsLoading(null);
  };

  /* ── Upcoming ── */
  if (status === "Upcoming") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Campaign Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Manage this upcoming campaign.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href={`/hospital/campaigns/${campaignId}/edit`}>
            <Button variant="secondary" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit Campaign
            </Button>
          </Link>
          <Button
            variant="primary"
            className="gap-2"
            disabled={isLoading !== null}
            onClick={() => handleAction("Active", "start")}
          >
            {isLoading === "start" ? (
              "Starting..."
            ) : (
              <>
                <Play className="h-4 w-4" />
                Start Campaign
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            className="gap-2 text-danger hover:bg-danger/10 hover:text-danger"
            disabled={isLoading !== null}
            onClick={() => handleAction("Cancelled", "cancel")}
          >
            {isLoading === "cancel" ? (
              "Cancelling..."
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Cancel Campaign
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Active ── */
  if (status === "Active") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Campaign Actions</h2>
        <p className="mb-5 text-sm text-text-secondary">
          The campaign is currently active. Complete it when finished.
        </p>
        <div className="flex flex-wrap gap-3">
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
                <CheckCircle2 className="h-4 w-4" />
                Complete Campaign
              </>
            )}
          </Button>
        </div>
      </Card>
    );
  }

  /* ── Completed / Cancelled ── */
  const finalMessages: Record<
    CampaignStatus,
    { icon: React.ReactNode; message: string }
  > = {
    Completed: {
      icon: <CheckCircle2 className="h-5 w-5 text-success" />,
      message: "This campaign has been completed successfully.",
    },
    Cancelled: {
      icon: <XCircle className="h-5 w-5 text-danger" />,
      message: "This campaign has been cancelled.",
    },
    Upcoming: { icon: null, message: "" },
    Active: { icon: null, message: "" },
  };

  const finalState = finalMessages[status];

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-2">Campaign Actions</h2>
      <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface-secondary px-5 py-4">
        {finalState.icon}
        <p className="text-sm text-text-secondary">{finalState.message}</p>
      </div>
    </Card>
  );
}
