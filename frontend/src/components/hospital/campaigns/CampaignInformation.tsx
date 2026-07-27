import { Megaphone, MapPin, Calendar, Clock, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import CampaignStatusBadge from "./CampaignStatusBadge";
import type { CampaignStatus } from "./CampaignStatusBadge";

export interface CampaignInfo {
  name: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  status: CampaignStatus;
}

interface CampaignInformationProps {
  campaign: CampaignInfo;
}

export default function CampaignInformation({
  campaign,
}: CampaignInformationProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Campaign Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="info-row">
          <Megaphone className="info-icon" />
          <div>
            <p className="info-label">Campaign Name</p>
            <p className="info-value">{campaign.name}</p>
          </div>
        </div>

        <div className="info-row">
          <Calendar className="info-icon" />
          <div>
            <p className="info-label">Date</p>
            <p className="info-value">{campaign.date}</p>
          </div>
        </div>

        <div className="info-row">
          <Clock className="info-icon" />
          <div>
            <p className="info-label">Time</p>
            <p className="info-value">
              {campaign.startTime} — {campaign.endTime}
            </p>
          </div>
        </div>

        <div className="info-row">
          <MapPin className="info-icon" />
          <div>
            <p className="info-label">Venue</p>
            <p className="info-value">{campaign.location}</p>
          </div>
        </div>

        <div className="info-row sm:col-span-2">
          <FileText className="info-icon" />
          <div>
            <p className="info-label">Description</p>
            <p className="text-sm text-text-secondary">
              {campaign.description}
            </p>
          </div>
        </div>

        <div className="info-row">
          <div>
            <p className="info-label">Status</p>
            <div className="mt-1">
              <CampaignStatusBadge status={campaign.status} />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
