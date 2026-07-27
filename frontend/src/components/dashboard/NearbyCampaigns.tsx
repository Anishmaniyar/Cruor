import { MapPin, CalendarDays, ArrowUpRight, LocateFixed } from "lucide-react";
import Link from "next/link";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Campaign {
  id: string;
  campName: string;
  address: string;
  campaignDate: string;
  hospital: { name: string; address: string | null };
}

interface NearbyCampaignsProps {
  campaigns?: Campaign[];
}

export default function NearbyCampaigns({ campaigns = [] }: NearbyCampaignsProps) {
  const hasNoCampaigns = campaigns.length === 0;

  return (
    <Card className="flex h-full flex-col overflow-hidden !p-0">
      {/* Header */}
      <div className="card-header-compact">
        <div>
          <h2 className="card-title">Nearby Campaigns</h2>
          <p className="card-description">Blood donation drives near you</p>
        </div>
        <Link href="/campaign" className="link-action">
          View all
          <ArrowUpRight size={12} />
        </Link>
      </div>

      {/* Content */}
      <div className="card-content flex-1 !pt-0">
        {hasNoCampaigns ? (
          <div className="empty-state">
            <div className="empty-state-icon-box">
              <LocateFixed className="empty-state-icon" />
            </div>
            <p className="empty-state-title">No campaigns nearby</p>
            <p className="empty-state-description">
              Check back later or browse all campaigns
            </p>
            <Link href="/campaign">
              <button className="mt-4 rounded-xl border border-border bg-surface px-4 py-2 text-xs font-medium text-text-secondary transition-all hover:border-border-light hover:text-text-primary">
                Browse Campaigns
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3 pt-5">
            {campaigns.map((camp) => (
              <Link
                key={camp.id}
                href={`/campaign/${camp.id}`}
                className="group flex items-start justify-between rounded-xl border border-border/50 bg-surface-secondary/30 p-4 transition-all hover:border-border-light hover:bg-surface-hover"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-text-primary transition-colors group-hover:text-success">
                      {camp.campName}
                    </h3>
                    <Badge variant="secondary" className="text-[10px]">
                      {camp.hospital.name}
                    </Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                    <span className="info-row">
                      <MapPin size={11} className="text-text-muted" />
                      {camp.address || camp.hospital.address || "Location not specified"}
                    </span>
                    <span className="info-row">
                      <CalendarDays size={11} className="text-text-muted" />
                      {new Date(camp.campaignDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="ml-4 shrink-0 rounded-lg border border-border bg-surface p-2 text-text-muted transition-all group-hover:border-border-light group-hover:text-text-primary">
                  <ArrowUpRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
