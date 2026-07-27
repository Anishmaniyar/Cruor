"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignHeader from "@/components/hospital/campaigns/CampaignHeader";
import CampaignFilters from "@/components/hospital/campaigns/CampaignFilters";
import CampaignTable from "@/components/hospital/campaigns/CampaignTable";
import EmptyCampaignState from "@/components/hospital/campaigns/EmptyCampaignState";
import type { Campaign } from "@/components/hospital/campaigns/CampaignTable";

const mockCampaigns: Campaign[] = [
  {
    id: "CAMP-001",
    name: "Summer Blood Drive",
    date: "Aug 20, 2026",
    location: "City Blood Bank, Pune",
    registrations: 24,
    status: "Active",
  },
  {
    id: "CAMP-002",
    name: "Corporate Donation Camp",
    date: "Aug 25, 2026",
    location: "Tech Park, Mumbai",
    registrations: 18,
    status: "Upcoming",
  },
  {
    id: "CAMP-003",
    name: "Emergency Blood Drive",
    date: "Sep 01, 2026",
    location: "District Hospital, Nagpur",
    registrations: 12,
    status: "Upcoming",
  },
  {
    id: "CAMP-004",
    name: "Community Health Camp",
    date: "Jul 15, 2026",
    location: "Community Center, Delhi",
    registrations: 35,
    status: "Completed",
  },
  {
    id: "CAMP-005",
    name: "Annual Blood Drive",
    date: "Jul 10, 2026",
    location: "City Hospital, Bangalore",
    registrations: 42,
    status: "Completed",
  },
  {
    id: "CAMP-006",
    name: "College Donation Camp",
    date: "Jun 05, 2026",
    location: "University Campus, Pune",
    registrations: 8,
    status: "Cancelled",
  },
];

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCampaigns = useMemo(() => {
    let filtered = mockCampaigns;

    if (activeFilter !== "all") {
      const statusMap: Record<string, string> = {
        upcoming: "Upcoming",
        active: "Active",
        completed: "Completed",
        cancelled: "Cancelled",
      };
      if (statusMap[activeFilter]) {
        filtered = filtered.filter(
          (c) => c.status === statusMap[activeFilter]
        );
      }
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.location.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [searchQuery, activeFilter]);

  const handleCancel = (id: string) => {
    // Mock cancel - in real app would update state/API
    console.log("Cancel campaign:", id);
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <CampaignHeader />

      <div className="flex items-center justify-between">
        <div /> {/* Spacer */}
        <Link href="/hospital/campaigns/create">
          <Button variant="primary" className="gap-2">
            <Plus className="h-4 w-4" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <CampaignFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {filteredCampaigns.length > 0 ? (
        <CampaignTable
          campaigns={filteredCampaigns}
          onCancel={handleCancel}
        />
      ) : (
        <EmptyCampaignState />
      )}
    </div>
  );
}
