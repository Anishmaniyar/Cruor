"use client";

import { useState, useEffect } from "react";
import StatusCard from "@/components/shared/StatusCard";
import JourneyTimeline from "@/components/shared/JourneyTimeline";
import BrowseSection from "@/components/shared/BrowseSection";
import CampaignCard from "@/components/campaigns/CampaignCard";

import { getCampaigns, getMyRegistrations } from "@/services/campaign.services";

type CampaignStatus = "NONE" | "REGISTERED" | "COMPLETED";

interface CampaignData {
  id: string;
  campName: string;
  address: string;
  campaignDate: string;
  startTime: string;
  endTime: string;
  targetDonors: number;
  status: string;
  hospital?: { name: string; address: string | null };
}

interface RegistrationData {
  id: string;
  campaignId: string;
  status: string;
  registeredAt: string;
  campaign?: CampaignData;
}
const CAMPAIGN_JOURNEY_STAGES = [
  "Registered",
  "Confirmed",
  "Attended Campaign",
  "Blood Collected",
  "Transported",
];

const CAMPAIGN_FILTERS = [
  { label: "Open Today", active: false },
  { label: "Nearby", active: false },
  { label: "Government", active: false },
  { label: "Private", active: false },
  { label: "Corporate", active: false },
];

export default function CampaignsPage() {
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>("NONE");
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [activeRegistration, setActiveRegistration] =
    useState<RegistrationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsRes, registrationRes] = await Promise.all([
          getCampaigns(),
          getMyRegistrations().catch(() => null),
        ]);

        setCampaigns(campaignsRes.data ?? []);

        const registrations: RegistrationData[] =
          registrationRes?.data?.allRegistration ?? [];
        const active = registrations.find((r) => r.status === "REGISTERED");

        if (active) {
          setCampaignStatus("REGISTERED");
          setActiveRegistration(active);
        }
      } catch {
        // Silently handle network or server errors
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isActive = campaignStatus === "REGISTERED";

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.campName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const status: "NONE" | "ACTIVE" | "COMPLETED" =
    campaignStatus === "NONE"
      ? "NONE"
      : campaignStatus === "COMPLETED"
        ? "COMPLETED"
        : "ACTIVE";

  if (loading) {
    return (
      <main className="min-h-screen space-y-8 p-6 lg:p-8">
        <div className="flex items-center justify-center py-20">
          <p className="text-text-secondary"> Loading Campaigns...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      {/* Status Card */}
      <StatusCard
        type="campaign"
        status={status}
        data={
          campaignStatus === "NONE"
            ? undefined
            : {
                title: activeRegistration?.campaign?.campName ?? "Campaign",
                subtitle: "Registration confirmed",
                location: activeRegistration?.campaign?.address ?? "",
                date: activeRegistration?.campaign?.campaignDate ? new Date(activeRegistration.campaign.campaignDate).toLocaleDateString("en-US", {day: "numeric", month: "long", year: "numeric"}) : "",
                id: activeRegistration?.id.slice(0,12).toUpperCase(),
                badges: [
                  { label: activeRegistration?.status ?? "Registered", variant: "success" as const },
                ],
              }
        }
      />

      {/* Journey — only for REGISTERED or COMPLETED */}
      {campaignStatus !== "NONE" && (
        <JourneyTimeline
          stages={CAMPAIGN_JOURNEY_STAGES}
          activeStage={
            campaignStatus === "COMPLETED" ? "Transported" : "Confirmed"
          }
          title="Campaign Journey"
        />
      )}

      {/* Browse Campaigns */}
      <BrowseSection
        title="Browse Campaigns"
        description="Find blood donation campaigns near you and register to participate."
        searchPlaceholder="Search campaigns by name or location..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={CAMPAIGN_FILTERS}
        emptyMessage="No campaigns found"
        emptyDescription="Check back later or adjust your search."
        disabled={isActive}
        disabledMessage="You already have an active registration. Complete your current campaign before registering for another one."
        isEmpty={!isActive && filteredCampaigns.length === 0}
      >
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </BrowseSection>
    </main>
  );
}
