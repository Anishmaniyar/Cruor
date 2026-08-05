import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CampaignStatusBadge from "./CampaignStatusBadge";
import type { CampaignStatus } from "./CampaignStatusBadge";

export interface Campaign {
  id: string;
  name: string;
  date: string;
  location: string;
  registrations: number;
  status: CampaignStatus;
}

interface CampaignRowProps {
  campaign: Campaign;
}

export default function CampaignRow({ campaign }: CampaignRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-text-primary">
          {campaign.name}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {campaign.date}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {campaign.location}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {campaign.registrations} donors
      </td>
      <td className="px-6 py-4">
        <CampaignStatusBadge status={campaign.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/hospital/campaigns/${campaign.id}`}>
          <Button variant="ghost" size="xs" className="gap-1.5">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </td>
    </tr>
  );
}
