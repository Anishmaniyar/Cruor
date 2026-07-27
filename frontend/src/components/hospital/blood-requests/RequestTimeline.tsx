import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { RequestStatus } from "./BloodRequestStatusBadge";

interface Stage {
  label: string;
  reached: boolean;
  current: boolean;
}

interface RequestTimelineProps {
  status: RequestStatus;
}

function getStages(status: RequestStatus): Stage[] {
  switch (status) {
    case "Pending":
      return [
        { label: "Pending", reached: true, current: true },
        { label: "Accepted", reached: false, current: false },
        { label: "Preparing Blood", reached: false, current: false },
        { label: "Transferred", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Accepted":
      return [
        { label: "Pending", reached: true, current: false },
        { label: "Accepted", reached: true, current: true },
        { label: "Preparing Blood", reached: false, current: false },
        { label: "Transferred", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Preparing Blood":
      return [
        { label: "Pending", reached: true, current: false },
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing Blood", reached: true, current: true },
        { label: "Transferred", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Transferred":
      return [
        { label: "Pending", reached: true, current: false },
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing Blood", reached: true, current: false },
        { label: "Transferred", reached: true, current: true },
        { label: "Completed", reached: false, current: false },
      ];

    case "Completed":
      return [
        { label: "Pending", reached: true, current: false },
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing Blood", reached: true, current: false },
        { label: "Transferred", reached: true, current: false },
        { label: "Completed", reached: true, current: true },
      ];

    case "Rejected":
      return [
        { label: "Pending", reached: true, current: false },
        { label: "Rejected", reached: false, current: true },
      ];

    default:
      return [
        { label: "Pending", reached: true, current: true },
        { label: "Accepted", reached: false, current: false },
      ];
  }
}

export default function RequestTimeline({ status }: RequestTimelineProps) {
  const stages = getStages(status);

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-6">Request Timeline</h2>

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
