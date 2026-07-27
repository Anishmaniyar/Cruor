"use client";

import { useState } from "react";
import StatusCard from "@/components/shared/StatusCard";
import JourneyTimeline from "@/components/shared/JourneyTimeline";
import BrowseSection from "@/components/shared/BrowseSection";
import CampaignCard from "@/components/campaigns/CampaignCard";

type CampaignStatus = "NONE" | "REGISTERED" | "COMPLETED";

const CAMPAIGN_JOURNEY_STAGES = [
  "Registered",
  "Confirmed",
  "Attended Campaign",
  "Blood Collected",
  "Transported",
];

const SAMPLE_CAMPAIGNS = [
  {
    id: "camp-1",
    name: "Mega Blood Donation Camp",
    organizer: "Red Cross Society",
    location: "Community Center, Pune",
    date: "10 Aug 2026",
    time: "9 AM - 4 PM",
    type: "Government",
    slotsAvailable: 18,
  },
  {
    id: "camp-2",
    name: "Red Cross Lifesavers Drive",
    organizer: "Indian Red Cross",
    location: "Metro Station Plaza, Road 12",
    date: "12 Aug 2026",
    time: "10 AM - 5 PM",
    type: "Private",
    slotsAvailable: 12,
  },
  {
    id: "camp-3",
    name: "Corporate Blood Donation Drive",
    organizer: "TechCorp India",
    location: "TechPark, Hinjewadi, Pune",
    date: "15 Aug 2026",
    time: "8 AM - 3 PM",
    type: "Corporate",
    slotsAvailable: 25,
  },
];

const CAMPAIGN_FILTERS = [
  { label: "Open Today", active: false },
  { label: "Nearby", active: false },
  { label: "Government", active: false },
  { label: "Private", active: false },
  { label: "Corporate", active: false },
];

export default function CampaignsPage() {
  const [campaignStatus] = useState<CampaignStatus>("NONE");
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = campaignStatus === "REGISTERED";

  const filteredCampaigns = SAMPLE_CAMPAIGNS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const status: "NONE" | "ACTIVE" | "COMPLETED" =
    campaignStatus === "NONE" ? "NONE" : campaignStatus === "COMPLETED" ? "COMPLETED" : "ACTIVE";

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
                title: "Mega Blood Donation Camp",
                subtitle: "Registration confirmed",
                location: "Community Center, Pune",
                date: "10 August 2026 • 09:00 AM",
                bookedFor: "George Anderson",
                id: "REG-123456",
                badges: [
                  { label: "O+", variant: "secondary" },
                  { label: "Confirmed", variant: "success" },
                ],
              }
        }
      />

      {/* Journey — only for REGISTERED or COMPLETED */}
      {campaignStatus !== "NONE" && (
        <JourneyTimeline
          stages={CAMPAIGN_JOURNEY_STAGES}
          activeStage={campaignStatus === "COMPLETED" ? "Transported" : "Confirmed"}
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
