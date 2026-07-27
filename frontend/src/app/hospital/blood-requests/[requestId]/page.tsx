"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import RequestInformation from "@/components/hospital/blood-requests/RequestInformation";
import InventoryComparison from "@/components/hospital/blood-requests/InventoryComparison";
import RequestTimeline from "@/components/hospital/blood-requests/RequestTimeline";
import RequestActions from "@/components/hospital/blood-requests/RequestActions";
import type { RequestStatus } from "@/components/hospital/blood-requests/BloodRequestStatusBadge";

interface RequestData {
  id: string;
  requestingHospital: string;
  bloodGroup: string;
  component: string;
  unitsRequested: number;
  requestedDate: string;
  priority: "Normal" | "Urgent" | "Emergency";
  status: RequestStatus;
  reason?: string;
  inventoryAvailable: number;
}

const mockRequests: Record<string, RequestData> = {
  "REQ-001": {
    id: "REQ-001",
    requestingHospital: "City Hospital, Mumbai",
    bloodGroup: "O-",
    component: "Whole Blood",
    unitsRequested: 2,
    requestedDate: "Aug 10, 2026",
    priority: "Emergency",
    status: "Pending",
    reason: "Emergency surgery requiring O-negative blood. Patient is in critical condition.",
    inventoryAvailable: 8,
  },
  "REQ-002": {
    id: "REQ-002",
    requestingHospital: "District Hospital, Pune",
    bloodGroup: "A+",
    component: "Plasma",
    unitsRequested: 4,
    requestedDate: "Aug 11, 2026",
    priority: "Urgent",
    status: "Pending",
    reason: "Plasma required for burn victims from a recent accident.",
    inventoryAvailable: 19,
  },
  "REQ-003": {
    id: "REQ-003",
    requestingHospital: "General Hospital, Delhi",
    bloodGroup: "B-",
    component: "Whole Blood",
    unitsRequested: 3,
    requestedDate: "Aug 09, 2026",
    priority: "Normal",
    status: "Accepted",
    inventoryAvailable: 4,
  },
  "REQ-004": {
    id: "REQ-004",
    requestingHospital: "Children's Hospital, Bangalore",
    bloodGroup: "AB+",
    component: "Platelets",
    unitsRequested: 2,
    requestedDate: "Aug 08, 2026",
    priority: "Emergency",
    status: "Preparing Blood",
    reason: "Platelets needed for a pediatric leukemia patient.",
    inventoryAvailable: 12,
  },
  "REQ-005": {
    id: "REQ-005",
    requestingHospital: "Fortis Hospital, Chennai",
    bloodGroup: "O+",
    component: "RBC",
    unitsRequested: 5,
    requestedDate: "Aug 07, 2026",
    priority: "Urgent",
    status: "Transferred",
    inventoryAvailable: 48,
  },
  "REQ-006": {
    id: "REQ-006",
    requestingHospital: "Apollo Hospital, Hyderabad",
    bloodGroup: "A-",
    component: "Whole Blood",
    unitsRequested: 3,
    requestedDate: "Aug 05, 2026",
    priority: "Normal",
    status: "Completed",
    inventoryAvailable: 6,
  },
  "REQ-007": {
    id: "REQ-007",
    requestingHospital: "Medanta Hospital, Gurgaon",
    bloodGroup: "AB-",
    component: "Plasma",
    unitsRequested: 2,
    requestedDate: "Aug 03, 2026",
    priority: "Normal",
    status: "Rejected",
    reason: "Insufficient AB- plasma in inventory at the time of request.",
    inventoryAvailable: 5,
  },
};

export default function BloodRequestDetailsPage() {
  const params = useParams();
  const requestId = params.requestId as string;
  const [request, setRequest] = useState<RequestData | null>(
    mockRequests[requestId] ?? null
  );

  if (!request) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-text-secondary">Blood request not found.</p>
      </div>
    );
  }

  const handleStatusChange = (newStatus: RequestStatus) => {
    setRequest((prev) => (prev ? { ...prev, status: newStatus } : prev));
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/blood-requests" className="link-action">
        <ArrowLeft size={14} />
        Back to Blood Requests
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">{request.id}</h1>
        <p className="page-description">
          Review request details and manage status.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <RequestInformation
            request={{
              id: request.id,
              requestingHospital: request.requestingHospital,
              bloodGroup: request.bloodGroup,
              component: request.component,
              unitsRequested: request.unitsRequested,
              requestedDate: request.requestedDate,
              priority: request.priority,
              status: request.status,
              reason: request.reason,
            }}
          />

          <InventoryComparison
            requested={{
              bloodGroup: request.bloodGroup,
              unitsNeeded: request.unitsRequested,
              unitsAvailable: request.inventoryAvailable,
            }}
          />

          <RequestActions
            status={request.status}
            onStatusChange={handleStatusChange}
          />
        </div>

        <div>
          <RequestTimeline status={request.status} />
        </div>
      </div>
    </div>
  );
}
