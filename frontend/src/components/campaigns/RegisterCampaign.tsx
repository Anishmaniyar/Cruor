"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { registerForCampaign } from "@/services/campaign.services";
import { useAuth } from "@/lib/auth-context";
import { getErrorMessage } from "@/lib/error";

interface RegisterCampaignProps {
  campaignId: string;
  campaign: {
    campName: string;
    address: string;
    campaignDate: string;
    startTime: string;
    endTime: string;
    hospital?: { name: string };
  };
}

export default function RegisterCampaign({ campaignId, campaign }: RegisterCampaignProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async () => {
    setIsSubmitting(true);

    try {
      await registerForCampaign(campaignId);
      toast.success("Registered for campaign successfully");
      router.push("/campaign");
    } catch (err: unknown) {
      toast.error(
        getErrorMessage(err, "Registration failed. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <p className="info-value">
                {new Date(campaign.campaignDate).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="info-row">
            <Clock className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Time</p>
              <p className="info-value">{campaign.startTime} – {campaign.endTime}</p>
            </div>
          </div>

          <div className="info-row">
            <MapPin className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Location</p>
              <p className="info-value">{campaign.address || "Not specified"}</p>
            </div>
          </div>

          {user && (
            <div className="info-row">
              <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="info-label">Registered As</p>
                <p className="info-value">{user.name}</p>
              </div>
            </div>
          )}
        </div>

        <Separator className="my-5" />

        <Button
          variant="primary"
          className="w-full gap-2"
          onClick={handleRegister}
          disabled={isSubmitting}
        >
          <CheckCircle size={16} />
          {isSubmitting ? "Registering..." : "Confirm Registration"}
        </Button>
      </CardContent>
    </Card>
  );
}
