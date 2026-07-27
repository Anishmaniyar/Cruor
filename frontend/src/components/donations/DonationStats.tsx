import {
  Droplets,
  Building2,
  Megaphone,
  Calendar,
  Heart,
} from "lucide-react";

const stats = [
  {
    label: "Total Donations",
    value: "18",
    icon: Droplets,
    color: "text-blue-400 bg-blue-500/10",
  },
  {
    label: "Hospital Donations",
    value: "12",
    icon: Building2,
    color: "text-emerald-400 bg-emerald-500/10",
  },
  {
    label: "Campaign Donations",
    value: "6",
    icon: Megaphone,
    color: "text-amber-400 bg-amber-500/10",
  },
  {
    label: "Last Donation",
    value: "20 Jul 2026",
    icon: Calendar,
    color: "text-violet-400 bg-violet-500/10",
  },
  {
    label: "Lives Impacted",
    value: "54",
    icon: Heart,
    color: "text-rose-400 bg-rose-500/10",
  },
];

export default function DonationStats() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.label} className="kpi-card">
            <div className="flex items-start justify-between">
              <span className="kpi-label">{stat.label}</span>
              <div className={`kpi-icon-box ${stat.color}`}>
                <Icon size={16} />
              </div>
            </div>
            <p className="kpi-value mt-4">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
}
