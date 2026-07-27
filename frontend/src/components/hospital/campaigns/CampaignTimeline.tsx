import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { CampaignStatus } from "./CampaignStatusBadge";

interface Stage {
  label: string;
  reached: boolean;
  current: boolean;
}

interface CampaignTimelineProps {
  status: CampaignStatus;
}

function getStages(status: CampaignStatus): Stage[] {
  switch (status) {
    case "Upcoming":
      return [
        { label: "Upcoming", reached: true, current: true },
        { label: "Active", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Active":
      return [
        { label: "Upcoming", reached: true, current: false },
        { label: "Active", reached: true, current: true },
        { label: "Completed", reached: false, current: false },
      ];

    case "Completed":
      return [
        { label: "Upcoming", reached: true, current: false },
        { label: "Active", reached: true, current: false },
        { label: "Completed", reached: true, current: true },
      ];

    case "Cancelled":
      return [
        { label: "Upcoming", reached: true, current: false },
        { label: "Cancelled", reached: false, current: true },
      ];

    default:
      return [
        { label: "Upcoming", reached: true, current: true },
        { label: "Active", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];
  }
}

export default function CampaignTimeline({ status }: CampaignTimelineProps) {
  const stages = getStages(status);

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-6">Campaign Timeline</h2>

      <div className="relative">
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-0.5 bg-border" />

        <div className="space-y-6">
          {stages.map((stage) => (
            <div key={stage.label} className="relative flex items-start gap-4">
              <div className="relative z-10">
                {stage.current ? (
                  <div className="flex h-6 w-6 items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  </div>
                ) : stage.reached ? (
                  <CheckCircle2 className="h-6 w-6 text-success" />
                ) : (
                  <Circle className="h-6 w-6 text-text-muted" />
                )}
              </div>

              <div className="pt-0.5">
                <span
                  className={`text-sm font-medium ${
                    stage.reached || stage.current
                      ? "text-text-primary"
                      : "text-text-muted"
                  }`}
                >
                  {stage.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
