"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CampaignInformation from "@/components/hospital/campaigns/CampaignInformation";
import RegistrationSummary from "@/components/hospital/campaigns/RegistrationSummary";
import RegisteredDonorsTable from "@/components/hospital/campaigns/RegisteredDonorsTable";
import CampaignTimeline from "@/components/hospital/campaigns/CampaignTimeline";
import { Button } from "@/components/ui/button";
import type { CampaignStatus } from "@/components/hospital/campaigns/CampaignStatusBadge";
import type { CampaignDonor } from "@/components/hospital/campaigns/RegisteredDonorsTable";

import {
  getHospitalCampaignById,
  getCampaignRegistrations,
} from "@/services/campaign.services";
import {
  displayCampaignStatus,
  formatCampaignDate,
  formatCampaignTime,
  type CampaignBackend,
  type CampaignRegistrationDonor,
} from "@/lib/campaign-utils";
import { getErrorMessage } from "@/lib/error";

export default function CampaignDetailsPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;

  const [campaign, setCampaign] = useState<CampaignBackend | null>(null);
  const [donors, setDonors] = useState<CampaignDonor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCampaign = useCallback(async () => {
    const [campaignResponse, registrationsResponse] = await Promise.all([
      getHospitalCampaignById(campaignId),
      getCampaignRegistrations(campaignId),
    ]);

    setCampaign(campaignResponse.data);

    const registrations: CampaignRegistrationDonor[] =
      registrationsResponse.data?.allRegistrations ?? [];
    setDonors(
      registrations.map((r) => ({
        ...r.user,
        registrationId: r.id,
        registeredAt: r.registeredAt,
      })),
    );
    setError(null);
  }, [campaignId]);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      getHospitalCampaignById(campaignId),
      getCampaignRegistrations(campaignId),
    ])
      .then(([campaignResponse, registrationsResponse]) => {
        if (!cancelled) {
          setCampaign(campaignResponse.data);

          const registrations: CampaignRegistrationDonor[] =
            registrationsResponse.data?.allRegistrations ?? [];
          setDonors(
            registrations.map((r) => ({
              ...r.user,
              registrationId: r.id,
              registeredAt: r.registeredAt,
            })),
          );
          setError(null);
        }
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load campaign"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [campaignId]);

  const handleRetry = () => {
    setLoading(true);
    loadCampaign()
      .catch((e) => setError(getErrorMessage(e, "Failed to load campaign")))
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="space-y-6 p-6 lg:p-8">
        <Link href="/hospital/campaigns" className="link-action">
          <ArrowLeft size={14} />
          Back to Campaigns
        </Link>
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm text-text-secondary">
            {error ?? "Campaign not found."}
          </p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={handleRetry}>
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const status: CampaignStatus = displayCampaignStatus(campaign.status);

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/campaigns" className="link-action">
        <ArrowLeft size={14} />
        Back to Campaigns
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">{campaign.campName}</h1>
        <p className="page-description">
          Manage campaign details and view registered donors.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          <CampaignInformation
            campaign={{
              name: campaign.campName,
              description: campaign.description,
              date: formatCampaignDate(campaign.campaignDate),
              startTime: formatCampaignTime(campaign.startTime),
              endTime: formatCampaignTime(campaign.endTime),
              location: campaign.address,
              status,
            }}
          />

          <RegistrationSummary
            totalRegistered={donors.length}
            targetDonors={campaign.targetDonors}
          />

          <RegisteredDonorsTable donors={donors} />
        </div>

        {/* Right Column */}
        <div>
          <CampaignTimeline status={status} />
        </div>
      </div>
    </div>
  );
}
