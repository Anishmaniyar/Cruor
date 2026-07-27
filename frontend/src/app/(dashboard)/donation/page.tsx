"use client";

import { useState, useMemo } from "react";
import DonationStats from "@/components/donations/DonationStats";
import DonationFilters, { type DonationFilter } from "@/components/donations/DonationFilters";
import DonationTimeline, { type DonationRecord } from "@/components/donations/DonationTimeline";

const SAMPLE_DONATIONS: DonationRecord[] = [
  {
    id: "d-001",
    type: "hospital",
    title: "Ruby Hall Clinic",
    location: "Shivajinagar, Pune",
    date: "20 July 2026",
    time: "10:30 AM",
    status: "completed",
  },
  {
    id: "d-002",
    type: "campaign",
    title: "Pune Community Drive",
    location: "Community Center, Pune",
    date: "12 June 2026",
    time: "9:00 AM",
    status: "completed",
  },
  {
    id: "d-003",
    type: "hospital",
    title: "Sahyadri Hospital",
    location: "Bibwewadi, Pune",
    date: "28 April 2026",
    time: "2:00 PM",
    status: "cancelled",
  },
  {
    id: "d-004",
    type: "hospital",
    title: "Express Clinic",
    location: "KPHB, Hyderabad",
    date: "15 March 2026",
    time: "8:00 AM",
    status: "completed",
  },
  {
    id: "d-005",
    type: "campaign",
    title: "Red Cross Lifesavers Drive",
    location: "Metro Station Plaza, Pune",
    date: "2 February 2026",
    status: "completed",
  },
  {
    id: "d-006",
    type: "hospital",
    title: "Apollo Hospital",
    location: "Jubilee Hills, Hyderabad",
    date: "10 January 2026",
    time: "11:00 AM",
    status: "no-show",
  },
];

export default function DonationPage() {
  const [activeFilter, setActiveFilter] = useState<DonationFilter>("all");

  const filteredDonations = useMemo(() => {
    switch (activeFilter) {
      case "hospital":
        return SAMPLE_DONATIONS.filter((d) => d.type === "hospital");
      case "campaign":
        return SAMPLE_DONATIONS.filter((d) => d.type === "campaign");
      case "completed":
        return SAMPLE_DONATIONS.filter((d) => d.status === "completed");
      case "cancelled":
        return SAMPLE_DONATIONS.filter((d) => d.status === "cancelled" || d.status === "no-show" || d.status === "rejected");
      default:
        return SAMPLE_DONATIONS;
    }
  }, [activeFilter]);

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="page-title">Donation History</h1>
        <p className="page-description">
          Track all your blood donation activities, including hospital appointments and campaign participations.
        </p>
      </div>

      {/* Donation Statistics */}
      <DonationStats />

      {/* Filters */}
      <div className="section">
        <DonationFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {/* Timeline */}
      <DonationTimeline donations={filteredDonations} />
    </main>
  );
}
