"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignHeader from "@/components/hospital/campaigns/CampaignHeader";
import CampaignFilters from "@/components/hospital/campaigns/CampaignFilters";
import CampaignTable from "@/components/hospital/campaigns/CampaignTable";
import EmptyCampaignState from "@/components/hospital/campaigns/EmptyCampaignState";
import type { Campaign } from "@/components/hospital/campaigns/CampaignTable";

import { getHospitalCampaigns } from "@/services/campaign.services";
import {
  displayCampaignStatus,
  formatCampaignDate,
  type CampaignBackend,
} from "@/lib/campaign-utils";
import { getErrorMessage } from "@/lib/error";

function mapToRow(c: CampaignBackend): Campaign {
  return {
    id: c.id,
    name: c.campName,
    date: formatCampaignDate(c.campaignDate),
    location: c.address,
    registrations: c._count?.campaignRegistrations ?? 0,
    status: displayCampaignStatus(c.status),
  };
}

const STATUS_FILTERS = ["upcoming", "active", "completed", "cancelled"];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<CampaignBackend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await getHospitalCampaigns();
      setCampaigns(response.data.allCampaigns ?? []);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load campaigns"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getHospitalCampaigns()
      .then((response) => {
        if (!cancelled) setCampaigns(response.data.allCampaigns ?? []);
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load campaigns"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRows = useMemo(() => {
    let filtered = campaigns;

    if (activeFilter !== "all" && STATUS_FILTERS.includes(activeFilter)) {
      const target =
        activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1);
      filtered = filtered.filter(
        (c) => displayCampaignStatus(c.status) === target,
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.campName.toLowerCase().includes(query) ||
          c.address.toLowerCase().includes(query),
      );
    }

    return filtered.map(mapToRow);
  }, [campaigns, activeFilter, searchQuery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-text-secondary">Loading campaigns...</p>
      </div>
    );
  }

  if (error && campaigns.length === 0) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <CampaignHeader />
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">{error}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={fetchCampaigns}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <CampaignHeader />

      <div className="flex items-center justify-between">
        <div />
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

      {filteredRows.length > 0 ? (
        <CampaignTable campaigns={filteredRows} />
      ) : (
        <EmptyCampaignState />
      )}
    </div>
  );
}
