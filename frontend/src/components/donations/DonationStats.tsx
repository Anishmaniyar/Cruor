import {
  Droplets,
  Building2,
  Megaphone,
  Calendar,
  Heart,
} from "lucide-react";

interface DonationStatsProps {
  totalDonations: number;
  hospitalDonations: number;
  campaignDonations: number;
  lastDonationDate: string | null;
  livesImpacted: number;
}

export default function DonationStats({
  totalDonations,
  hospitalDonations,
  campaignDonations,
  lastDonationDate,
  livesImpacted,
}: DonationStatsProps) {
  const stats = [
    {
      label: "Total Donations",
      value: String(totalDonations),
      icon: Droplets,
      color: "text-blue-400 bg-blue-500/10",
    },
    {
      label: "Hospital Donations",
      value: String(hospitalDonations),
      icon: Building2,
      color: "text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Campaign Donations",
      value: String(campaignDonations),
      icon: Megaphone,
      color: "text-amber-400 bg-amber-500/10",
    },
    {
      label: "Last Donation",
      value: lastDonationDate ?? "—",
      icon: Calendar,
      color: "text-violet-400 bg-violet-500/10",
    },
    {
      label: "Lives Impacted",
      value: String(livesImpacted),
      icon: Heart,
      color: "text-rose-400 bg-rose-500/10",
    },
  ];

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
