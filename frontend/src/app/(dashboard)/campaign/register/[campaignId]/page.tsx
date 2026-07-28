"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CampaignDetails from "@/components/campaigns/CampaignDetails";
import RegisterCampaign from "@/components/campaigns/RegisterCampaign";
import { getCampaignById } from "@/services/campaign.services";

interface CampaignData {
  id: string;
  campName: string;
  description: string;
  address: string;
  campaignDate: string;
  startTime: string;
  endTime: string;
  targetDonors: number;
  status: string;
  hospital?: { name: string; address: string | null };
}

export default function RegisterCampaignPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;
  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await getCampaignById(campaignId);
        setCampaign(res.data);
      } catch {
        setError("Campaign not found or unavailable.");
      } finally {
        setLoading(false);
      }
    };

    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  if (loading) {
    return (
      <main className="min-h-screen space-y-8 p-6 lg:p-8">
        <div className="flex items-center justify-center py-20">
          <p className="text-text-secondary">Loading campaign details...</p>
        </div>
      </main>
    );
  }

  if (error || !campaign) {
    return (
      <main className="min-h-screen space-y-8 p-6 lg:p-8">
        <Link
          href="/campaign"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Campaigns</span>
        </Link>
        <div className="flex items-center justify-center py-20">
          <p className="text-text-secondary">{error ?? "Campaign not found."}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      {/* Back Link & Header */}
      <section className="mb-4">
        <Link
          href="/campaign"
          className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary mb-3"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Campaigns</span>
        </Link>

        <h1 className="page-title">Register for Campaign</h1>
        <p className="page-description mt-1">
          Review the campaign details and confirm your participation.
        </p>
      </section>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-5 gap-6">
        {/* Campaign Details - left sidebar */}
        <CampaignDetails campaign={campaign} />

        {/* Registration - main content */}
        <section className="lg:col-span-3">
          <RegisterCampaign campaign={campaign} campaignId={campaignId} />
        </section>
      </div>
    </main>
  );
}
