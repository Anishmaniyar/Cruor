import { Megaphone, MapPin, Calendar, Clock, Users, Building2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CampaignDetailsProps {
  campaignId?: string;
}

export default function CampaignDetails({ campaignId }: CampaignDetailsProps) {
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
              <p className="info-value">Mega Blood Donation Camp</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Building2 className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Organizer</p>
              <p className="text-sm text-text-primary">Red Cross Society</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <MapPin className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Location</p>
              <p className="text-sm text-text-primary">Community Center, Pune</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Calendar className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Date</p>
              <p className="text-sm text-text-primary">10 August 2026</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Clock className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Time</p>
              <p className="text-sm text-text-primary">09:00 AM – 04:00 PM</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Users className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Available Slots</p>
              <Badge variant="success">18 slots remaining</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
