"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import StatusCard from "@/components/shared/StatusCard";
import JourneyTimeline from "@/components/shared/JourneyTimeline";
import BrowseSection from "@/components/shared/BrowseSection";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import {
  getCampaigns,
  getMyRegistrations,
  cancelRegistration,
} from "@/services/campaign.services";
import { formatCampaignDate } from "@/lib/campaign-utils";
import { getErrorMessage } from "@/lib/error";

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

export default function CampaignsPage() {
  const [campaignStatus, setCampaignStatus] = useState<CampaignStatus>("NONE");
  const [campaigns, setCampaigns] = useState<CampaignData[]>([]);
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [activeRegistration, setActiveRegistration] =
    useState<RegistrationData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const [campaignsRes, registrationRes] = await Promise.all([
        getCampaigns(),
        getMyRegistrations().catch(() => null),
      ]);

      setCampaigns(campaignsRes.data ?? []);

      const allRegistrations: RegistrationData[] =
        registrationRes?.data?.allRegistration ?? [];
      setRegistrations(allRegistrations);

      const active = allRegistrations.find((r) => r.status === "REGISTERED");
      setActiveRegistration(active ?? null);
      setCampaignStatus(active ? "REGISTERED" : "NONE");
    } catch {
      // Silently handle network or server errors
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      getCampaigns(),
      getMyRegistrations().catch(() => null),
    ])
      .then(([campaignsRes, registrationRes]) => {
        if (cancelled) return;

        setCampaigns(campaignsRes.data ?? []);

        const allRegistrations: RegistrationData[] =
          registrationRes?.data?.allRegistration ?? [];
        setRegistrations(allRegistrations);

        const active = allRegistrations.find((r) => r.status === "REGISTERED");
        setActiveRegistration(active ?? null);
        setCampaignStatus(active ? "REGISTERED" : "NONE");
      })
      .catch(() => {
        if (cancelled) return;
        setCampaigns([]);
        setRegistrations([]);
        setCampaignStatus("NONE");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
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

  const handleCancel = async (campaignId: string) => {
    if (!window.confirm("Are you sure you want to cancel this registration?")) {
      return;
    }

    try {
      setCancelling(true);
      await cancelRegistration(campaignId);
      toast.success("Registration cancelled successfully");
      await fetchData();
    } catch (error) {
      toast.error(getErrorMessage(error, "Failed to cancel registration"));
    } finally {
      setCancelling(false);
    }
  };

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
                date: activeRegistration?.campaign?.campaignDate
                  ? formatCampaignDate(activeRegistration.campaign.campaignDate)
                  : "",
                id: activeRegistration?.id.slice(0, 12).toUpperCase(),
                badges: [
                  {
                    label: activeRegistration?.status ?? "Registered",
                    variant: "success" as const,
                  },
                ],
                onCancel:
                  activeRegistration?.status === "REGISTERED"
                    ? () => handleCancel(activeRegistration.campaignId)
                    : undefined,
                cancelDisabled: cancelling,
              }
        }
      />

      {/* Journey — only for REGISTERED */}
      {campaignStatus === "REGISTERED" && (
        <JourneyTimeline
          stages={CAMPAIGN_JOURNEY_STAGES}
          activeStage="Confirmed"
          title="Campaign Journey"
        />
      )}

      {/* Your Registrations */}
      {registrations.length > 0 && (
        <Card className="!p-6">
          <h2 className="card-title mb-4">Your Registrations</h2>
          <div className="divide-y divide-border/50">
            {registrations.map((registration) => (
              <div
                key={registration.id}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {registration.campaign?.campName ?? "Campaign"}
                  </p>
                  <p className="text-xs text-text-muted">
                    {registration.campaign?.campaignDate
                      ? formatCampaignDate(registration.campaign.campaignDate)
                      : ""}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      registration.status === "REGISTERED" ? "success" : "secondary"
                    }
                  >
                    {registration.status}
                  </Badge>
                  {registration.status === "REGISTERED" && (
                    <Button
                      variant="ghost"
                      size="xs"
                      className="text-danger hover:bg-danger/10 hover:text-danger"
                      disabled={cancelling}
                      onClick={() => handleCancel(registration.campaignId)}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Browse Campaigns */}
      <BrowseSection
        title="Browse Campaigns"
        description="Find blood donation campaigns near you and register to participate."
        searchPlaceholder="Search campaigns by name or location..."
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
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
