import { CheckCircle2, Circle } from "lucide-react";

import { Card } from "@/components/ui/card";

const JOURNEY_STAGES = [
  "Appointment Requested",
  "Appointment Confirmed",
  "Visited Hospital",
  "Blood Collected",
  "Completed",
];

export default function AppointmentJourney() {
  const appointmentStatus = "Appointment Confirmed";
  const activeStageIndex = JOURNEY_STAGES.indexOf(appointmentStatus);
  const totalStages = JOURNEY_STAGES.length - 1;
  const progressPercent =
    activeStageIndex >= 0 ? (activeStageIndex / totalStages) * 100 : 0;

  return (
    <Card className="overflow-hidden !p-6">
      <div className="mb-6">
        <h2 className="card-title">Appointment Journey</h2>
      </div>

      <div className="relative flex justify-between items-start w-full px-2">
        {/* Progress Track - Background */}
        <div className="absolute top-3 left-6 right-6 h-[2px] bg-surface-hover rounded-full" />

        {/* Progress Track - Active */}
        <div
          className="absolute top-3 left-6 h-[2px] bg-success rounded-full transition-all duration-500 ease-out"
          style={{ width: `calc(${progressPercent}% - 12px)` }}
        />

        {JOURNEY_STAGES.map((stageName, index) => {
          const isStageReached = index <= activeStageIndex;

          return (
            <div
              key={stageName}
              className="flex flex-col items-center flex-1 text-center relative z-10"
            >
              <div className="bg-surface p-0.5 rounded-full shrink-0">
                {isStageReached ? (
                  <CheckCircle2 size={20} className="text-success" />
                ) : (
                  <Circle size={18} className="text-text-muted" />
                )}
              </div>

              <span
                className={`text-[11px] font-medium tracking-tight max-w-[90px] mt-2 block ${
                  isStageReached ? "text-success" : "text-text-muted"
                }`}
              >
                {stageName}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
