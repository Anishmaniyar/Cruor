import { CheckCircle2, Circle } from "lucide-react";

const JOURNEY_STAGES = [
  "Appointment Requested",
  "Appointment Confirmed",
  "Visited Hospital",
  "Blood Collected",
  "Completed",
];

export default function AppointmentJourney() {
  // Current active status
  const appointmentStatus = "Appointment Confirmed";

  // Find out how far along the journey the user is
  const activeStageIndex = JOURNEY_STAGES.indexOf(appointmentStatus);

  // Calculate width percentage of the green bar based on matching status index
  const totalStages = JOURNEY_STAGES.length - 1;
  const progressPercent =
    activeStageIndex >= 0 ? (activeStageIndex / totalStages) * 100 : 0;

  return (
    // 🚀 CARD CONTAINER: Dark mode background and border
    <div className="w-full max-w-2xl bg-neutral-950 border border-white/10 rounded-xl shadow-2xl p-6 text-neutral-200 mt-6">
      <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-8">
        📍 Journey Timeline Tracker
      </h2>

      {/* Main Container Layout */}
      <div className="relative flex justify-between items-start w-full px-2">
        {/* --- THE PROGRESS BAR ENGINE --- */}
        {/* 1. Underlying Dull Track Line - Muted for dark mode */}
        <div className="absolute top-3.5 left-6 right-6 h-[3px] bg-neutral-900 z-0 rounded-full" />

        {/* 2. Overlaid Dynamic Glowing Green Progress Line - Glowing Neon Green */}
        <div
          className="absolute top-3.5 left-6 h-[3px] bg-emerald-500 z-0 transition-all duration-700 ease-in-out rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]"
          style={{ width: `calc(${progressPercent}% - 12px)` }}
        />

        {/* --- NODE MAPPING LOOP --- */}
        {JOURNEY_STAGES.map((stageName, index) => {
          const isStageReached = index <= activeStageIndex;

          return (
            <div
              key={stageName}
              className="flex flex-col items-center flex-1 text-center relative z-10"
            >
              {/* Dynamic Checkmark/Circle Node Ring - bg-neutral-950 hides underlying line */}
              <div className="bg-neutral-950 p-1 rounded-full shrink-0 transition-all duration-300">
                {isStageReached ? (
                  /* Reached/Completed: Solid Emerald Icon with matching dark fill context */
                  <CheckCircle2
                    size={22}
                    className="text-emerald-400 fill-emerald-950/50 scale-110 transition-transform duration-300"
                  />
                ) : (
                  /* Future: Muted Neutral Empty Circle Placeholder */
                  <Circle
                    size={20}
                    className="text-neutral-700 bg-neutral-950"
                  />
                )}
              </div>

              {/* Text Descriptor labels */}
              <span
                className={`text-[11px] font-semibold tracking-tight max-w-[90px] mt-2 block transition-colors duration-300 ${
                  isStageReached
                    ? "text-emerald-400 font-bold"
                    : "text-neutral-500 font-medium"
                }`}
              >
                {stageName}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
