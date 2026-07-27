"use client";

import { useState, useMemo } from "react";
import BloodRequestsHeader from "@/components/hospital/blood-requests/BloodRequestsHeader";
import BloodRequestFilters from "@/components/hospital/blood-requests/BloodRequestFilters";
import BloodRequestTable from "@/components/hospital/blood-requests/BloodRequestTable";
import EmptyRequestState from "@/components/hospital/blood-requests/EmptyRequestState";
import type { BloodRequest } from "@/components/hospital/blood-requests/BloodRequestTable";

const mockRequests: BloodRequest[] = [
  { id: "REQ-001", requestingHospital: "City Hospital, Mumbai", bloodGroup: "O-", component: "Whole Blood", unitsRequested: 2, priority: "Emergency", status: "Pending" },
  { id: "REQ-002", requestingHospital: "District Hospital, Pune", bloodGroup: "A+", component: "Plasma", unitsRequested: 4, priority: "Urgent", status: "Pending" },
  { id: "REQ-003", requestingHospital: "General Hospital, Delhi", bloodGroup: "B-", component: "Whole Blood", unitsRequested: 3, priority: "Normal", status: "Accepted" },
  { id: "REQ-004", requestingHospital: "Children's Hospital, Bangalore", bloodGroup: "AB+", component: "Platelets", unitsRequested: 2, priority: "Emergency", status: "Preparing Blood" },
  { id: "REQ-005", requestingHospital: "Fortis Hospital, Chennai", bloodGroup: "O+", component: "RBC", unitsRequested: 5, priority: "Urgent", status: "Transferred" },
  { id: "REQ-006", requestingHospital: "Apollo Hospital, Hyderabad", bloodGroup: "A-", component: "Whole Blood", unitsRequested: 3, priority: "Normal", status: "Completed" },
  { id: "REQ-007", requestingHospital: "Medanta Hospital, Gurgaon", bloodGroup: "AB-", component: "Plasma", unitsRequested: 2, priority: "Normal", status: "Rejected" },
  { id: "REQ-008", requestingHospital: "KEM Hospital, Mumbai", bloodGroup: "B+", component: "Whole Blood", unitsRequested: 6, priority: "Urgent", status: "Pending" },
];

export default function BloodRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredRequests = useMemo(() => {
    let filtered = mockRequests;

    if (activeFilter !== "all") {
      const statusMap: Record<string, string> = {
        pending: "Pending",
        accepted: "Accepted",
        rejected: "Rejected",
        completed: "Completed",
      };
      const priorityMap: Record<string, string> = {
        normal: "Normal",
        urgent: "Urgent",
        emergency: "Emergency",
      };

      if (statusMap[activeFilter]) {
        filtered = filtered.filter((r) => r.status === statusMap[activeFilter]);
      } else if (priorityMap[activeFilter]) {
        filtered = filtered.filter((r) => r.priority === priorityMap[activeFilter]);
      } else {
        // Blood group filter
        filtered = filtered.filter((r) => r.bloodGroup === activeFilter);
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.id.toLowerCase().includes(query) ||
          r.requestingHospital.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <BloodRequestsHeader />

      <BloodRequestFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredRequests.length > 0 ? (
        <BloodRequestTable requests={filteredRequests} />
      ) : (
        <EmptyRequestState />
      )}
    </div>
  );
}
