import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { TransferStatus } from "./TransferStatusBadge";

interface Stage {
  label: string;
  reached: boolean;
  current: boolean;
}

interface TransferTimelineProps {
  status: TransferStatus;
}

function getStages(status: TransferStatus): Stage[] {
  switch (status) {
    case "Accepted":
      return [
        { label: "Accepted", reached: true, current: true },
        { label: "Preparing", reached: false, current: false },
        { label: "Dispatched", reached: false, current: false },
        { label: "Delivered", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Preparing":
      return [
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing", reached: true, current: true },
        { label: "Dispatched", reached: false, current: false },
        { label: "Delivered", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Dispatched":
      return [
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing", reached: true, current: false },
        { label: "Dispatched", reached: true, current: true },
        { label: "Delivered", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Delivered":
      return [
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing", reached: true, current: false },
        { label: "Dispatched", reached: true, current: false },
        { label: "Delivered", reached: true, current: true },
        { label: "Completed", reached: false, current: false },
      ];

    case "Completed":
      return [
        { label: "Accepted", reached: true, current: false },
        { label: "Preparing", reached: true, current: false },
        { label: "Dispatched", reached: true, current: false },
        { label: "Delivered", reached: true, current: false },
        { label: "Completed", reached: true, current: true },
      ];

    case "Cancelled":
      return [
        { label: "Accepted", reached: true, current: false },
        { label: "Cancelled", reached: true, current: true },
      ];
  }
}

export default function TransferTimeline({ status }: TransferTimelineProps) {
  const stages = getStages(status);

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Transfer Timeline</h2>

      <div className="relative">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-start gap-4 pb-2 last:pb-0">
            {/* Connector line */}
            <div className="flex flex-col items-center">
              {stage.current ? (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-primary" />
                </div>
              ) : stage.reached ? (
                <CheckCircle2 className="h-8 w-8 text-primary" />
              ) : (
                <Circle className="h-8 w-8 text-text-muted/30" />
              )}

              {i < stages.length - 1 && (
                <div
                  className={`mt-1 h-8 w-0.5 ${
                    stage.reached ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>

            {/* Label */}
            <div className="flex h-8 items-center">
              <span
                className={`text-sm ${
                  stage.current
                    ? "font-semibold text-primary"
                    : stage.reached
                    ? "font-medium text-text-primary"
                    : "text-text-muted"
                }`}
              >
                {stage.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
