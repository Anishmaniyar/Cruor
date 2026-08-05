"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Droplets } from "lucide-react";
import InventoryHeader from "@/components/hospital/inventory/InventoryHeader";
import InventoryStatistics from "@/components/hospital/inventory/InventoryStatistics";
import InventoryFilters from "@/components/hospital/inventory/InventoryFilters";
import InventoryTable from "@/components/hospital/inventory/InventoryTable";
import EmptyInventoryState from "@/components/hospital/inventory/EmptyInventoryState";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  getHospitalBloodUnits,
  getHospitalInventory,
  type BloodUnit,
  type BloodUnitStatus,
  type InventoryGroup,
} from "@/services/bloodUnit.services";
import { BLOOD_GROUPS } from "@/lib/blood-unit-utils";
import { getErrorMessage } from "@/lib/error";

function countByStatus(units: BloodUnit[], status: BloodUnitStatus): number {
  return units.filter((u) => u.currentStatus === status).length;
}

export default function InventoryPage() {
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>([]);
  const [inventoryGroups, setInventoryGroups] = useState<InventoryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [unitsResponse, inventoryResponse] = await Promise.all([
        getHospitalBloodUnits(),
        getHospitalInventory(),
      ]);

      setBloodUnits(unitsResponse.data.bloodUnit ?? []);
      setInventoryGroups(inventoryResponse.data.inventoryData ?? []);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load inventory"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all([getHospitalBloodUnits(), getHospitalInventory()])
      .then(([unitsResponse, inventoryResponse]) => {
        if (cancelled) return;
        setBloodUnits(unitsResponse.data.bloodUnit ?? []);
        setInventoryGroups(inventoryResponse.data.inventoryData ?? []);
        setError(null);
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load inventory"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  /* Summary statistics — derived from the hospital's blood units */
  const stats = useMemo(
    () => ({
      total: bloodUnits.length,
      available: countByStatus(bloodUnits, "AVAILABLE"),
      reserved: countByStatus(bloodUnits, "RESERVED"),
      used: countByStatus(bloodUnits, "USED"),
      expired: countByStatus(bloodUnits, "EXPIRED"),
    }),
    [bloodUnits],
  );

  /* Blood group distribution — only AVAILABLE units (GET /blood-units/inventory) */
  const distribution = useMemo(() => {
    const groupMap = new Map<string, number>();
    for (const group of inventoryGroups) {
      groupMap.set(group.bloodGroup, group._count.id);
    }
    return BLOOD_GROUPS.map((group) => ({
      group,
      units: groupMap.get(group) ?? 0,
    }));
  }, [inventoryGroups]);

  const filteredUnits = useMemo(() => {
    let filtered = bloodUnits;

    if (activeFilter !== "all") {
      filtered = filtered.filter((u) => u.currentStatus === activeFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.bloodGroup.toLowerCase().includes(query) ||
          u.componentType.toLowerCase().includes(query) ||
          u.storageLocation.toLowerCase().includes(query) ||
          (u.donor?.name ?? "").toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [bloodUnits, activeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error && bloodUnits.length === 0) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <InventoryHeader />
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">{error}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={loadData}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <InventoryHeader />

      <InventoryStatistics
        totalUnits={stats.total}
        availableUnits={stats.available}
        reservedUnits={stats.reserved}
        usedUnits={stats.used}
        expiredUnits={stats.expired}
      />

      {/* Blood group distribution */}
      <Card className="!p-6">
        <h2 className="card-title mb-1">Blood Group Distribution</h2>
        <p className="mb-5 text-sm text-text-secondary">
          Currently available units by blood group.
        </p>
        <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-4">
          {distribution.map(({ group, units }) => (
            <div
              key={group}
              className="flex items-center justify-between border-b border-border py-3 transition-colors hover:bg-surface-hover"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-semibold text-text-primary">
                  {group}
                </span>
              </div>
              <span className="text-sm text-text-secondary">
                {units} Units
              </span>
            </div>
          ))}
        </div>
      </Card>

      <InventoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredUnits.length > 0 ? (
        <InventoryTable inventory={filteredUnits} />
      ) : (
        <EmptyInventoryState />
      )}
    </div>
  );
}
