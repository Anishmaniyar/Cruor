"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CampaignDetails from "@/components/campaigns/CampaignDetails";
import RegisterCampaign from "@/components/campaigns/RegisterCampaign";

export default function RegisterCampaignPage() {
  const params = useParams();
  const campaignId = params.campaignId as string;

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
        <CampaignDetails campaignId={campaignId} />

        {/* Registration - main content */}
        <section className="lg:col-span-3">
          <RegisterCampaign campaignId={campaignId} />
        </section>
      </div>
    </main>
  );
}
