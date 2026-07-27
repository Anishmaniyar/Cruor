"use client";

import JourneyTimeline from "@/components/shared/JourneyTimeline";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPICard from "@/components/dashboard/KPICard";
import NearbyCampaigns from "@/components/dashboard/NearbyCampaigns";
import UpcomingAppointment from "@/components/dashboard/UpcomingAppointment";

import { useState, useEffect } from "react";
import { getDashboardData } from "@/services/donation.services";

// ─── TypeScript interface for the dashboard API response ───
interface NextAppointment {
  date: string;
  time: string;
  hospital: string;
}

interface Campaign {
  id: string;
  campName: string;
  address: string;
  campaignDate: string;
  hospital: { name: string; address: string | null };
}

interface DashboardData {
  totalDonations: number;
  livesImpacted: number;
  nextAppointment: NextAppointment | null;
  eligiblity: string | null;
  nearByCampaigns: Campaign[];
}

// ─── Helper to format a date nicely ───
function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(timeStr: string): string {
  const [hours, minutes] = timeStr.split(":");
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return `${h12}:${minutes} ${ampm}`;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getDashboardData().then(setData).catch(console.error);
  }, []);

  // Loading state
  if (!data) {
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
    ? `${formatTime(data.nextAppointment.time)} \u2014 ${data.nextAppointment.hospital}`
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
