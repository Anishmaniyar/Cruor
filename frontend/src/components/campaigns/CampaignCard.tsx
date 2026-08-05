import Link from "next/link";
import {
  Megaphone,
  MapPin,
  Calendar,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCampaignDate, formatCampaignTime } from "@/lib/campaign-utils";

interface CampaignCardProps {
  campaign: {
    id: string;
    campName: string;
    address: string;
    campaignDate: string;
    startTime: string;
    endTime: string;
    targetDonors: number;
    status: string;
    hospital?: { name: string; address: string | null };
  };
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <Card className="group !p-0 transition-all duration-200 hover:border-border-light hover:shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="flex items-start justify-between p-6 pb-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-hover">
          <Megaphone className="h-6 w-6 text-text-secondary group-hover:text-text-primary transition-colors" />
        </div>
      </div>

      {/* Campaign Info */}
      <div className="px-6 pt-4">
        <h3 className="card-title !text-base">{campaign.campName}</h3>
        <p className="mt-0.5 text-xs text-text-muted">
          by {campaign.hospital?.name}
        </p>
        <div className="info-row mt-2">
          <MapPin className="info-icon h-3.5 w-3.5" />
          <span className="truncate text-sm text-text-secondary">
            {campaign.address}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="mx-6 mt-4 grid grid-cols-2 gap-3">
        <div className="info-row rounded-lg bg-surface-secondary px-3 py-3">
          <Calendar className="info-icon" />
          <div>
            <p className="meta-label">Date</p>
            <p className="text-xs font-medium text-text-secondary">
              {formatCampaignDate(campaign.campaignDate)}
            </p>
          </div>
        </div>
        <div className="info-row rounded-lg bg-surface-secondary px-3 py-3">
          <Clock className="info-icon" />
          <div>
            <p className="meta-label">Time</p>
            <p className="text-xs font-medium text-text-secondary">
              {formatCampaignTime(campaign.startTime)} – {formatCampaignTime(campaign.endTime)}
            </p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mx-6 mt-4 flex items-center justify-between rounded-lg border border-success/20 bg-success/5 px-3 py-3">
        <div className="info-row">
          <Users className="h-4 w-4 text-success" />
          <span className="text-xs text-text-secondary">Target Donors</span>
        </div>
        <span className="text-xs font-medium text-success">
          {campaign.targetDonors}
        </span>
      </div>

      {/* CTA */}
      <div className="p-6 pt-4">
        <Link href={`/campaign/register/${campaign.id}`}>
          <Button variant="primary" className="w-full gap-2">
            Register Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
