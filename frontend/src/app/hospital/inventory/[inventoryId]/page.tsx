"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BloodInformation from "@/components/hospital/inventory/BloodInformation";
import InventoryActions from "@/components/hospital/inventory/InventoryActions";
import { Button } from "@/components/ui/button";

import { getBloodUnitById, type BloodUnit } from "@/services/bloodUnit.services";
import { getErrorMessage } from "@/lib/error";

export default function InventoryDetailsPage() {
  const params = useParams();
  const inventoryId = params.inventoryId as string;

  const [unit, setUnit] = useState<BloodUnit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUnit = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getBloodUnitById(inventoryId);
      setUnit(response.data.bloodUnitData);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load blood unit"));
    } finally {
      setLoading(false);
    }
  }, [inventoryId]);

  useEffect(() => {
    let cancelled = false;

    getBloodUnitById(inventoryId)
      .then((response) => {
        if (!cancelled) {
          setUnit(response.data.bloodUnitData);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load blood unit"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [inventoryId]);

  const handleStatusUpdated = (newStatus: BloodUnit["currentStatus"]) => {
    setUnit((prev) => (prev ? { ...prev, currentStatus: newStatus } : prev));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <Link href="/hospital/inventory" className="link-action">
          <ArrowLeft size={14} />
          Back to Inventory
        </Link>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">
            {error ?? "Blood unit not found."}
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={loadUnit}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/inventory" className="link-action">
        <ArrowLeft size={14} />
        Back to Inventory
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">
          Blood Unit — {unit.bloodGroup}
        </h1>
        <p className="page-description">
          View blood unit details and manage its lifecycle status.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BloodInformation unit={unit} />
        </div>
        <div>
          <InventoryActions
            bloodUnitId={unit.id}
            currentStatus={unit.currentStatus}
            onStatusUpdated={handleStatusUpdated}
          />
        </div>
      </div>
    </div>
  );
}
