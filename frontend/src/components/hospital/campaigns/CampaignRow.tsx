import Link from "next/link";
import { ArrowRight, Pencil, XCircle } from "lucide-react";
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
  onCancel?: (id: string) => void;
}

export default function CampaignRow({ campaign, onCancel }: CampaignRowProps) {
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
        <div className="flex items-center justify-end gap-2">
          <Link href={`/hospital/campaigns/${campaign.id}`}>
            <Button variant="ghost" size="xs" className="gap-1.5">
              View Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
          <Link href={`/hospital/campaigns/${campaign.id}/edit`}>
            <Button variant="ghost" size="xs" className="gap-1.5">
              <Pencil className="h-3.5 w-3.5" />
            </Button>
          </Link>
          {campaign.status !== "Completed" && campaign.status !== "Cancelled" && (
            <Button
              variant="ghost"
              size="xs"
              className="gap-1.5 text-danger hover:bg-danger/10 hover:text-danger"
              onClick={() => onCancel?.(campaign.id)}
            >
              <XCircle className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
}
