"use client";

import { useState, useMemo } from "react";
import BloodTransfersHeader from "@/components/hospital/blood-transfers/BloodTransfersHeader";
import BloodTransferFilters from "@/components/hospital/blood-transfers/BloodTransferFilters";
import BloodTransferTable from "@/components/hospital/blood-transfers/BloodTransferTable";
import EmptyTransferState from "@/components/hospital/blood-transfers/EmptyTransferState";
import type { BloodTransfer } from "@/components/hospital/blood-transfers/BloodTransferTable";

const mockTransfers: BloodTransfer[] = [
  { id: "TRF-001", destinationHospital: "City Hospital, Mumbai", bloodGroup: "O-", component: "Whole Blood", units: 2, transferDate: "Jul 27, 2026", status: "Preparing" },
  { id: "TRF-002", destinationHospital: "District Hospital, Pune", bloodGroup: "A+", component: "Plasma", units: 4, transferDate: "Jul 26, 2026", status: "Dispatched" },
  { id: "TRF-003", destinationHospital: "General Hospital, Nagpur", bloodGroup: "B+", component: "RBC", units: 3, transferDate: "Jul 25, 2026", status: "Delivered" },
  { id: "TRF-004", destinationHospital: "Civil Hospital, Nashik", bloodGroup: "AB-", component: "Platelets", units: 1, transferDate: "Jul 24, 2026", status: "Completed" },
  { id: "TRF-005", destinationHospital: "Apex Hospital, Thane", bloodGroup: "O+", component: "Whole Blood", units: 5, transferDate: "Jul 23, 2026", status: "Cancelled" },
  { id: "TRF-006", destinationHospital: "Sunrise Hospital, Delhi", bloodGroup: "A-", component: "Plasma", units: 2, transferDate: "Jul 27, 2026", status: "Accepted" },
  { id: "TRF-007", destinationHospital: "Metro Hospital, Bangalore", bloodGroup: "B-", component: "RBC", units: 3, transferDate: "Jul 27, 2026", status: "Preparing" },
];

export default function BloodTransfersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTransfers = useMemo(() => {
    return mockTransfers.filter((t) => {
      const matchesSearch =
        searchQuery === "" ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.destinationHospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesFilter = true;
      switch (activeFilter) {
        case "preparing":
          matchesFilter = t.status === "Preparing";
          break;
        case "dispatched":
          matchesFilter = t.status === "Dispatched";
          break;
        case "delivered":
          matchesFilter = t.status === "Delivered";
          break;
        case "completed":
          matchesFilter = t.status === "Completed";
          break;
        case "cancelled":
          matchesFilter = t.status === "Cancelled";
          break;
        case "O+":
          matchesFilter = t.bloodGroup === "O+";
          break;
        case "A+":
          matchesFilter = t.bloodGroup === "A+";
          break;
        case "B+":
          matchesFilter = t.bloodGroup === "B+";
          break;
        default:
          matchesFilter = true;
      }

      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const stats = useMemo(
    () => ({
      active: mockTransfers.filter((t) => t.status === "Dispatched" || t.status === "Preparing").length,
      preparing: mockTransfers.filter((t) => t.status === "Preparing").length,
      inTransit: mockTransfers.filter((t) => t.status === "Dispatched").length,
      completedToday: mockTransfers.filter(
        (t) => t.status === "Completed" && t.transferDate === "Jul 27, 2026"
      ).length,
    }),
    []
  );

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <BloodTransfersHeader stats={stats} />

      <BloodTransferFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredTransfers.length === 0 ? (
        <EmptyTransferState />
      ) : (
        <BloodTransferTable transfers={filteredTransfers} />
      )}
    </div>
  );
}
