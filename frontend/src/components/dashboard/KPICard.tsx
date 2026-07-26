import { Calendar, CalendarDays, DropletIcon, SparkleIcon } from "lucide-react";

const kpiData = [
  {
    title: "Total Donation",
    value: "12",
    icon: DropletIcon,
  },

  {
    title: "Lives Impacted",
    value: 30,
    icon: SparkleIcon,
  },

  {
    title: "Next Appointment",
    value: "20 August, 2026",
    icon: Calendar,
  },

  {
    title: "Next Eligibity Date",
    value: "10 August, 2026",
    icon: CalendarDays,
  },
];

export default function KPICard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      {kpiData.map((card) => {
        const IconComponent = card.icon;

        return (
          <div
            key={card.title}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-neutral-950 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
                {card.title}
              </span>

              <IconComponent size={16} />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-neutral-100 tracking-tight">
                {card.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
