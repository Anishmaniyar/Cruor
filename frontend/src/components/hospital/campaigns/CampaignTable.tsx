import CampaignRow from "./CampaignRow";
import type { Campaign } from "./CampaignRow";

interface CampaignTableProps {
  campaigns: Campaign[];
}

export default function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-surface-secondary">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Campaign Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Venue
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Registrations
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-0">
          {campaigns.map((campaign) => (
            <CampaignRow key={campaign.id} campaign={campaign} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { Campaign };
