"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { registerForCampaign } from "@/services/campaign.services";
import { useAuth } from "@/lib/auth-context";

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
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      await registerForCampaign(campaignId);
      router.push("/campaign");
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data?.message ??
        "Registration failed. Please try again.";
      setError(message);
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

        {error && (
          <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

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
