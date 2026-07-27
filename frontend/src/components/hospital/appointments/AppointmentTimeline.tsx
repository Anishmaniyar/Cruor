import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { AppointmentStatus } from "./AppointmentStatusBadge";

interface Stage {
  label: string;
  reached: boolean;
  current: boolean;
}

interface AppointmentTimelineProps {
  status: AppointmentStatus;
}

function getStages(status: AppointmentStatus): Stage[] {
  const baseStages = [
    { label: "Booked", value: "booked" },
    { label: "Confirmed", value: "confirmed" },
  ];

  switch (status) {
    case "Pending":
      return [
        { label: "Booked", reached: true, current: true },
        { label: "Confirmed", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];

    case "Confirmed":
      return [
        { label: "Booked", reached: true, current: false },
        { label: "Confirmed", reached: true, current: true },
        { label: "Completed", reached: false, current: false },
      ];

    case "Completed":
      return [
        { label: "Booked", reached: true, current: false },
        { label: "Confirmed", reached: true, current: false },
        { label: "Completed", reached: true, current: true },
      ];

    case "Cancelled":
      return [
        { label: "Booked", reached: true, current: false },
        { label: "Cancelled", reached: false, current: true },
      ];

    case "No Show":
      return [
        { label: "Booked", reached: true, current: false },
        { label: "Confirmed", reached: true, current: false },
        { label: "No Show", reached: false, current: true },
      ];

    default:
      return [
        { label: "Booked", reached: true, current: true },
        { label: "Confirmed", reached: false, current: false },
        { label: "Completed", reached: false, current: false },
      ];
  }
}

export default function AppointmentTimeline({
  status,
}: AppointmentTimelineProps) {
  const stages = getStages(status);

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-6">Appointment Timeline</h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-0.5 bg-border" />

        <div className="space-y-6">
          {stages.map((stage, index) => (
            <div key={stage.label} className="relative flex items-start gap-4">
              {/* Icon */}
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

              {/* Label */}
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
