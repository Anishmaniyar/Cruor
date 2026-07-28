"use client";

import { Megaphone, MapPin, Calendar, Clock, Users, Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CampaignDetailsProps {
  campaign: {
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
  };
}

export default function CampaignDetails({ campaign }: CampaignDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Campaign Details</CardTitle>
        <CardDescription>
          Review the campaign information before registering.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="info-row !items-start">
            <Megaphone className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Campaign</p>
              <p className="info-value">{campaign.campName}</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Building2 className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Organizer</p>
              <p className="text-sm text-text-primary">{campaign.hospital?.name ?? "Hospital"}</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <MapPin className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Location</p>
              <p className="text-sm text-text-primary">{campaign.address || "Not specified"}</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Calendar className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Date</p>
              <p className="text-sm text-text-primary">
                {new Date(campaign.campaignDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Clock className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Time</p>
              <p className="text-sm text-text-primary">
                {campaign.startTime} – {campaign.endTime}
              </p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Users className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Target Donors</p>
              <Badge variant="success">{campaign.targetDonors} slots</Badge>
            </div>
          </div>

          {campaign.description && (
            <div className="info-row !items-start">
              <div className="ml-6">
                <p className="info-label">Description</p>
                <p className="text-sm text-text-primary">{campaign.description}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
