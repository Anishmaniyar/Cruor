"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { updateBloodUnitStatus } from "@/services/bloodUnit.services";
import type { BloodUnitStatus } from "@/services/bloodUnit.services";
import {
  BLOOD_UNIT_STATUS_DISPLAY,
  BLOOD_UNIT_TRANSITIONS,
} from "@/lib/blood-unit-utils";
import { getErrorMessage } from "@/lib/error";

const selectClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm text-text-primary outline-none transition-all focus:border-border-light focus:ring-2 focus:ring-ring/40";

interface InventoryActionsProps {
  bloodUnitId: string;
  currentStatus: BloodUnitStatus;
  onStatusUpdated: (newStatus: BloodUnitStatus) => void;
}

export default function InventoryActions({
  bloodUnitId,
  currentStatus,
  onStatusUpdated,
}: InventoryActionsProps) {
  const [selectedStatus, setSelectedStatus] = useState<BloodUnitStatus | "">("");
  const [isUpdating, setIsUpdating] = useState(false);

  const allowedNext = BLOOD_UNIT_TRANSITIONS[currentStatus] ?? [];

  const handleUpdate = async () => {
    if (!selectedStatus) return;

    try {
      setIsUpdating(true);
      await updateBloodUnitStatus(bloodUnitId, selectedStatus);
      toast.success(
        `Blood unit marked as ${BLOOD_UNIT_STATUS_DISPLAY[selectedStatus]}`,
      );
      onStatusUpdated(selectedStatus);
      setSelectedStatus("");
    } catch (e) {
      toast.error(getErrorMessage(e, "Failed to update blood unit status"));
    } finally {
      setIsUpdating(false);
    }
  };

  if (allowedNext.length === 0) {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Inventory Actions</h2>
        <p className="text-sm text-text-secondary">
          No status changes are available for a{" "}
          {BLOOD_UNIT_STATUS_DISPLAY[currentStatus]?.toLowerCase() ?? currentStatus}{" "}
          blood unit.
        </p>
      </Card>
    );
  }

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-2">Update Blood Unit Status</h2>
      <p className="mb-5 text-sm text-text-secondary">
        Current status:{" "}
        <span className="font-semibold text-text-primary">
          {BLOOD_UNIT_STATUS_DISPLAY[currentStatus] ?? currentStatus}
        </span>
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="w-full sm:w-64">
          <label className="mb-2 block text-sm font-medium text-text-primary">
            Next Status
          </label>
          <select
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as BloodUnitStatus)
            }
            className={selectClass}
          >
            <option value="" disabled>
              Select next status
            </option>
            {allowedNext.map((status) => (
              <option
                key={status}
                value={status}
                className="bg-surface text-text-primary"
              >
                {BLOOD_UNIT_STATUS_DISPLAY[status]}
              </option>
            ))}
          </select>
        </div>

        <Button
          variant="primary"
          className="gap-2"
          disabled={!selectedStatus || isUpdating}
          onClick={handleUpdate}
        >
          {isUpdating ? "Updating..." : "Update Status"}
        </Button>
      </div>
    </Card>
  );
}
