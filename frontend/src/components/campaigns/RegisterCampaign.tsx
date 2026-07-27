import { Calendar, Clock, MapPin, User, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface RegisterCampaignProps {
  campaignId: string;
}

export default function RegisterCampaign({ campaignId }: RegisterCampaignProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Registration</CardTitle>
        <CardDescription>
          Confirm your participation in this campaign.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-5" />

        <div className="space-y-4">
          <div className="info-row">
            <Calendar className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Date</p>
              <p className="info-value">10 August 2026</p>
            </div>
          </div>

          <div className="info-row">
            <Clock className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Time</p>
              <p className="info-value">09:00 AM – 04:00 PM</p>
            </div>
          </div>

          <div className="info-row">
            <MapPin className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Location</p>
              <p className="info-value">Community Center, Pune</p>
            </div>
          </div>

          <div className="info-row">
            <User className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Registered As</p>
              <p className="info-value">George Anderson</p>
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <Button variant="primary" className="w-full gap-2">
          <CheckCircle size={16} />
          Confirm Registration
        </Button>
      </CardContent>
    </Card>
  );
}
