"use client";

import { useState, useMemo } from "react";
import InventoryHeader from "@/components/hospital/inventory/InventoryHeader";
import InventoryStatistics from "@/components/hospital/inventory/InventoryStatistics";
import LowStockAlert from "@/components/hospital/inventory/LowStockAlert";
import InventoryFilters from "@/components/hospital/inventory/InventoryFilters";
import InventoryTable from "@/components/hospital/inventory/InventoryTable";
import EmptyInventoryState from "@/components/hospital/inventory/EmptyInventoryState";
import type { InventoryItem } from "@/components/hospital/inventory/InventoryTable";

const mockInventory: InventoryItem[] = [
  { id: "INV-001", bloodGroup: "O+", component: "Whole Blood", units: 48, collectionDate: "Jul 15, 2026", expiryDate: "Sep 15, 2026", status: "Healthy" },
  { id: "INV-002", bloodGroup: "A+", component: "Whole Blood", units: 31, collectionDate: "Jul 20, 2026", expiryDate: "Sep 20, 2026", status: "Healthy" },
  { id: "INV-003", bloodGroup: "B+", component: "Plasma", units: 19, collectionDate: "Jul 10, 2026", expiryDate: "Oct 10, 2026", status: "Healthy" },
  { id: "INV-004", bloodGroup: "AB+", component: "Platelets", units: 12, collectionDate: "Aug 01, 2026", expiryDate: "Aug 05, 2026", status: "Expiring Soon" },
  { id: "INV-005", bloodGroup: "O-", component: "Whole Blood", units: 8, collectionDate: "Jun 20, 2026", expiryDate: "Aug 20, 2026", status: "Low Stock" },
  { id: "INV-006", bloodGroup: "A-", component: "RBC", units: 6, collectionDate: "Jul 25, 2026", expiryDate: "Sep 25, 2026", status: "Low Stock" },
  { id: "INV-007", bloodGroup: "B-", component: "Whole Blood", units: 4, collectionDate: "Jun 30, 2026", expiryDate: "Aug 30, 2026", status: "Critical" },
  { id: "INV-008", bloodGroup: "AB-", component: "Plasma", units: 5, collectionDate: "May 10, 2026", expiryDate: "Aug 10, 2026", status: "Expired" },
  { id: "INV-009", bloodGroup: "O+", component: "RBC", units: 22, collectionDate: "Aug 05, 2026", expiryDate: "Oct 05, 2026", status: "Healthy" },
  { id: "INV-010", bloodGroup: "A+", component: "Platelets", units: 3, collectionDate: "Aug 01, 2026", expiryDate: "Aug 04, 2026", status: "Expired" },
  { id: "INV-011", bloodGroup: "AB+", component: "Whole Blood", units: 7, collectionDate: "Jul 28, 2026", expiryDate: "Sep 28, 2026", status: "Low Stock" },
];

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredInventory = useMemo(() => {
    let filtered = mockInventory;

    if (activeFilter !== "all") {
      const statusMap: Record<string, string> = {
        "low-stock": "Low Stock",
        critical: "Critical",
        expiring: "Expiring Soon",
        expired: "Expired",
      };
      if (statusMap[activeFilter]) {
        filtered = filtered.filter((i) => i.status === statusMap[activeFilter]);
      } else if (activeFilter === "available") {
        filtered = filtered.filter((i) => i.status !== "Expired");
      } else if (activeFilter === "whole-blood") {
        filtered = filtered.filter((i) => i.component === "Whole Blood");
      } else if (activeFilter === "plasma") {
        filtered = filtered.filter((i) => i.component === "Plasma");
      } else if (activeFilter === "platelets") {
        filtered = filtered.filter((i) => i.component === "Platelets");
      } else if (activeFilter === "rbc") {
        filtered = filtered.filter((i) => i.component === "RBC");
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (i) =>
          i.bloodGroup.toLowerCase().includes(query) ||
          i.component.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const stats = useMemo(() => {
    const total = mockInventory.reduce((sum, i) => sum + i.units, 0);
    const lowStock = mockInventory.filter((i) => i.status === "Low Stock" || i.status === "Critical").length;
    const expiring = mockInventory.filter((i) => i.status === "Expiring Soon").length;
    return { total, lowStock, expiring, addedToday: 4 };
  }, []);

  const alerts = [
    { text: "O− blood group is critically low", type: "critical" as const },
    { text: `${stats.expiring} units expire within the next 7 days`, type: "warning" as const },
    { text: "2 expired units require disposal", type: "info" as const },
  ];

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <InventoryHeader />

      <InventoryStatistics
        totalUnits={stats.total}
        lowStockGroups={stats.lowStock}
        expiringSoonUnits={stats.expiring}
        addedToday={stats.addedToday}
      />

      <LowStockAlert alerts={alerts} />

      <InventoryFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredInventory.length > 0 ? (
        <InventoryTable inventory={filteredInventory} />
      ) : (
        <EmptyInventoryState />
      )}
    </div>
  );
}
