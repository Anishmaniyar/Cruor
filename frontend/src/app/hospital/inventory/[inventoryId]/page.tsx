"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BloodInformation from "@/components/hospital/inventory/BloodInformation";
import InventoryHistory from "@/components/hospital/inventory/InventoryHistory";
import InventoryActions from "@/components/hospital/inventory/InventoryActions";
import type { StockStatus } from "@/components/hospital/inventory/StockStatusBadge";
import type { HistoryEntry } from "@/components/hospital/inventory/InventoryHistory";

interface InventoryRecord {
  id: string;
  bloodGroup: string;
  component: string;
  units: number;
  collectionDate: string;
  expiryDate: string;
  source: string;
  donor?: string;
  status: StockStatus;
  history: HistoryEntry[];
}

const mockRecords: Record<string, InventoryRecord> = {
  "INV-001": {
    id: "INV-001",
    bloodGroup: "O+",
    component: "Whole Blood",
    units: 48,
    collectionDate: "Jul 15, 2026",
    expiryDate: "Sep 15, 2026",
    source: "Campaign",
    donor: "Ravi Sharma",
    status: "Healthy",
    history: [
      { id: "H-001", action: "added", quantity: 50, reason: "Summer Blood Drive", date: "Jul 15, 2026" },
      { id: "H-002", action: "used", quantity: 2, reason: "Emergency Surgery", date: "Jul 28, 2026" },
    ],
  },
  "INV-005": {
    id: "INV-005",
    bloodGroup: "O-",
    component: "Whole Blood",
    units: 8,
    collectionDate: "Jun 20, 2026",
    expiryDate: "Aug 20, 2026",
    source: "Appointment",
    donor: "Priya Patel",
    status: "Low Stock",
    history: [
      { id: "H-003", action: "added", quantity: 10, reason: "Donor Appointment", date: "Jun 20, 2026" },
      { id: "H-004", action: "used", quantity: 2, reason: "Patient Transfusion", date: "Jul 05, 2026" },
    ],
  },
  "INV-008": {
    id: "INV-008",
    bloodGroup: "AB-",
    component: "Plasma",
    units: 5,
    collectionDate: "May 10, 2026",
    expiryDate: "Aug 10, 2026",
    source: "Campaign",
    donor: "Amit Singh",
    status: "Expired",
    history: [
      { id: "H-005", action: "added", quantity: 5, reason: "Community Health Camp", date: "May 10, 2026" },
      { id: "H-006", action: "expired", quantity: 5, reason: "Unit expired beyond shelf life", date: "Aug 10, 2026" },
    ],
  },
};

export default function InventoryDetailsPage() {
  const params = useParams();
  const inventoryId = params.inventoryId as string;
  const [record] = useState<InventoryRecord | null>(
    mockRecords[inventoryId] ?? null
  );

  if (!record) {
    return (
      <div className="p-6 lg:p-8">
        <p className="text-text-secondary">Inventory record not found.</p>
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
          {record.bloodGroup} — {record.component}
        </h1>
        <p className="page-description">
          View and manage this inventory record.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BloodInformation record={record} />
          <InventoryActions status={record.status} />
        </div>
        <div>
          <InventoryHistory history={record.history} />
        </div>
      </div>
    </div>
  );
}
