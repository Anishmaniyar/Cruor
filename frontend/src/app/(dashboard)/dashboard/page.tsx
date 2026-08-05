"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICard from "@/components/dashboard/KPICard";
import NearbyCampaigns from "@/components/dashboard/NearbyCampaigns";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { getDashboard, type DashboardData } from "@/services/dashboard.services";
import { formatAppointmentTime } from "@/lib/appointment-utils";
import { getErrorMessage } from "@/lib/error";

// ─── Helper to format a date nicely (date-only values are parsed as local midnight) ───
function formatDate(dateStr: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? new Date(`${dateStr}T00:00:00`)
    : new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      const result = await getDashboard();
      setData(result);
      setError(null);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load dashboard"));
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    getDashboard()
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load dashboard"));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Loading / error states
  if (!data) {
    if (error) {
      return (
        <main className="flex min-h-screen items-center justify-center p-12">
          <div className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 text-center">
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
      <main className="flex min-h-screen items-center justify-center p-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </main>
    );
  }

  // Build KPI values with empty-state handling
  const donationValue = String(data.totalDonations);

  const donationSubtitle =
    data.totalDonations === 0
      ? "No donations yet"
      : `${data.totalDonations} total donation${data.totalDonations > 1 ? "s" : ""}`;

  const livesValue = String(data.livesImpacted);

  const livesSubtitle =
    data.livesImpacted === 0
      ? "Start donating to impact lives"
      : `${data.livesImpacted} lives impacted`;

  const appointmentValue = data.nextAppointment
    ? formatDate(data.nextAppointment.date)
    : "None";

  const appointmentSubtitle = data.nextAppointment
    ? `${formatAppointmentTime(data.nextAppointment.time)} \u2014 ${data.nextAppointment.hospital}`
    : "No appointment scheduled";

  const eligiblityValue = data.eligiblity
    ? formatDate(data.eligiblity)
    : "Today";

  const eligiblitySubtitle = data.eligiblity
    ? "Can donate again"
    : "You can donate! \uD83E\uDE78";

  return (
    <main className="min-h-screen space-y-6 p-6 lg:p-8">
      <DashboardHeader />

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Left Column: KPI Cards */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2 lg:grid-cols-2">
          <KPICard
            title="Total Donations"
            value={donationValue}
            icon="droplet"
            subtitle={donationSubtitle}
          />
          <KPICard
            title="Lives Impacted"
            value={livesValue}
            icon="sparkle"
            subtitle={livesSubtitle}
          />
          <KPICard
            title="Next Appointment"
            value={appointmentValue}
            icon="calendar"
            subtitle={appointmentSubtitle}
          />
          <KPICard
            title="Eligibility Date"
            value={eligiblityValue}
            icon="calendarDays"
            subtitle={eligiblitySubtitle}
          />
        </div>

        {/* Right Column: Upcoming Appointment */}
        <div className="lg:row-span-2">
          <UpcomingAppointment appointment={data.nextAppointment} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NearbyCampaigns campaigns={data.nearByCampaigns} />
        </div>
      </div>
    </main>
  );
}
