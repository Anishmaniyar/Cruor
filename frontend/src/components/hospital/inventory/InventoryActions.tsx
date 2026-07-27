"use client";

import { useState } from "react";
import { Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { StockStatus } from "./StockStatusBadge";

interface InventoryActionsProps {
  status: StockStatus;
}

export default function InventoryActions({ status }: InventoryActionsProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleAction = async (label: string) => {
    setIsLoading(label);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(null);
  };

  // Expired stock — disposal only
  if (status === "Expired") {
    return (
      <Card className="!p-6">
        <h2 className="card-title mb-2">Inventory Actions</h2>
        <div className="mb-4 flex items-center gap-3 rounded-xl bg-danger/10 px-5 py-4">
          <AlertTriangle className="h-5 w-5 text-danger" />
          <p className="text-sm text-text-secondary">
            This blood unit has expired. Only disposal actions are available.
          </p>
        </div>
        <Button
          variant="secondary"
          className="gap-2 text-danger hover:bg-danger/10 hover:text-danger"
          disabled={isLoading !== null}
          onClick={() => handleAction("dispose")}
        >
          {isLoading === "dispose" ? (
            "Disposing..."
          ) : (
            <>
              <Trash2 className="h-4 w-4" />
              Dispose Blood Unit
            </>
          )}
        </Button>
      </Card>
    );
  }

  // Healthy / Low Stock / Critical / Expiring Soon — full actions
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-2">Inventory Actions</h2>
      <p className="mb-5 text-sm text-text-secondary">
        Manage this inventory record.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="secondary"
          className="gap-2"
          disabled={isLoading !== null}
          onClick={() => handleAction("edit")}
        >
          <Pencil className="h-4 w-4" />
          Edit Record
        </Button>
        <Button
          variant="secondary"
          className="gap-2"
          disabled={isLoading !== null}
          onClick={() => handleAction("correct")}
        >
          Correct Quantity
        </Button>
        <Button
          variant="secondary"
          className="gap-2"
          disabled={isLoading !== null}
          onClick={() => handleAction("update-expiry")}
        >
          Update Expiry Date
        </Button>
        <Button
          variant="ghost"
          className="gap-2 text-danger hover:bg-danger/10 hover:text-danger"
          disabled={isLoading !== null}
          onClick={() => handleAction("remove")}
        >
          <Trash2 className="h-4 w-4" />
          Remove Units
        </Button>
      </div>
    </Card>
  );
}
