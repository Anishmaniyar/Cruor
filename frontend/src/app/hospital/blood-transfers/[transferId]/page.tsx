"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import TransferInformation from "@/components/hospital/blood-transfers/TransferInformation";
import LinkedRequestCard from "@/components/hospital/blood-transfers/LinkedRequestCard";
import DispatchInformation from "@/components/hospital/blood-transfers/DispatchInformation";
import TransferTimeline from "@/components/hospital/blood-transfers/TransferTimeline";
import TransferActions from "@/components/hospital/blood-transfers/TransferActions";
import type { TransferStatus } from "@/components/hospital/blood-transfers/TransferStatusBadge";

interface TransferData {
  id: string;
  bloodGroup: string;
  component: string;
  units: number;
  destinationHospital: string;
  transferDate: string;
  status: TransferStatus;
  assignedStaff?: string;
  notes?: string;
  preparedDate?: string;
  dispatchedDate?: string;
  expectedDelivery?: string;
  deliveredDate?: string;
}

const mockTransfer: TransferData = {
  id: "TRF-001",
  bloodGroup: "O-",
  component: "Whole Blood",
  units: 2,
  destinationHospital: "City Hospital, Mumbai",
  transferDate: "Jul 27, 2026",
  status: "Preparing",
  assignedStaff: "Dr. Mehta",
  notes: "Urgent request for emergency surgery. Handle with care.",
  preparedDate: "Jul 27, 2026 — 10:30 AM",
};

const mockRequest = {
  requestId: "REQ-001",
  requestingHospital: "City Hospital, Mumbai",
  unitsRequested: 2,
  priority: "Emergency" as const,
};

export default function TransferDetailsPage() {
  const [transfer, setTransfer] = useState(mockTransfer);

  const handleStatusChange = (newStatus: TransferStatus) => {
    setTransfer((prev) => ({
      ...prev,
      status: newStatus,
      ...(newStatus === "Preparing" && { preparedDate: "Jul 27, 2026 — " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
      ...(newStatus === "Dispatched" && { dispatchedDate: "Jul 27, 2026 — " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
      ...(newStatus === "Delivered" && { deliveredDate: "Jul 27, 2026 — " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
    }));
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/blood-transfers" className="link-action">
        <ArrowLeft size={14} />
        Back to Blood Transfers
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">Transfer Details</h1>
        <p className="page-description">
          Track blood transfer progress and manage logistics.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          <TransferInformation transfer={transfer} />
          <LinkedRequestCard request={mockRequest} />
          <DispatchInformation
            status={transfer.status}
            preparedDate={transfer.preparedDate}
            dispatchedDate={transfer.dispatchedDate}
            expectedDelivery={transfer.expectedDelivery}
            deliveredDate={transfer.deliveredDate}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TransferTimeline status={transfer.status} />
          <TransferActions
            status={transfer.status}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>
    </div>
  );
}
