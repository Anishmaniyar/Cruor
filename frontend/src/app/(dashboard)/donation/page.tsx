"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import DonationStats from "@/components/donations/DonationStats";
import DonationFilters, {
  type DonationFilter,
} from "@/components/donations/DonationFilters";
import DonationTimeline, {
  type DonationRecord,
} from "@/components/donations/DonationTimeline";
import {
  getDonationDashboard,
  type DonationDashboardData,
  type DonationHistoryItem,
} from "@/services/donation.services";
import {
  formatAppointmentDate,
  formatAppointmentTime,
} from "@/lib/appointment-utils";
import { getErrorMessage } from "@/lib/error";

function mapToTimelineRecord(item: DonationHistoryItem): DonationRecord {
  return {
    id: item.id,
    type: item.type === "Appointment" ? "hospital" : "campaign",
    title: item.hospitalName,
    date: formatAppointmentDate(item.donationDate),
    time: item.time ? formatAppointmentTime(item.time) : undefined,
    status: item.status === "COMPLETED" ? "completed" : "rejected",
  };
}

export default function DonationPage() {
  const [activeFilter, setActiveFilter] = useState<DonationFilter>("all");
  const [dashboard, setDashboard] = useState<DonationDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      const data = await getDonationDashboard();
      setDashboard(data.data);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load donation history"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    getDonationDashboard()
      .then((response) => {
        if (!cancelled) setDashboard(response.data);
      })
      .catch((e) => {
        if (!cancelled)
          setError(getErrorMessage(e, "Failed to load donation history"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filteredDonations = useMemo(() => {
    const records = (dashboard?.donationHistory ?? []).map(mapToTimelineRecord);

    switch (activeFilter) {
      case "hospital":
        return records.filter((d) => d.type === "hospital");
      case "campaign":
        return records.filter((d) => d.type === "campaign");
      case "completed":
        return records.filter((d) => d.status === "completed");
      case "rejected":
        return records.filter((d) => d.status === "rejected");
      default:
        return records;
    }
  }, [dashboard, activeFilter]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    );
  }

  if (error && !dashboard) {
    return (
      <main className="min-h-screen space-y-8 p-6 lg:p-8">
        <div className="flex flex-col gap-1">
          <h1 className="page-title">Donation History</h1>
          <p className="page-description">
            Track all your blood donation activities, including hospital
            appointments and campaign participations.
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">{error}</p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={loadDashboard}
          >
            Retry
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="page-title">Donation History</h1>
        <p className="page-description">
          Track all your blood donation activities, including hospital
          appointments and campaign participations.
        </p>
      </div>

      {/* Donation Statistics */}
      <DonationStats
        totalDonations={dashboard?.totalDonations ?? 0}
        hospitalDonations={dashboard?.appointmentDonations ?? 0}
        campaignDonations={dashboard?.campaignDonations ?? 0}
        lastDonationDate={
          dashboard?.lastDonationDate
            ? formatAppointmentDate(dashboard.lastDonationDate)
            : null
        }
        livesImpacted={dashboard?.livesImpacted ?? 0}
      />

      {/* Filters */}
      <div className="section">
        <DonationFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Timeline */}
      <DonationTimeline donations={filteredDonations} />
    </main>
  );
}
