import {
  CalendarDays,
  Megaphone,
  Droplets,
  ClipboardList,
} from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  colorClasses: string;
}

function KpiCard({ title, value, icon, colorClasses }: KpiCardProps) {
  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between">
        <span className="kpi-label">{title}</span>
        <div className={`kpi-icon-box ${colorClasses}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <h2 className="kpi-value">{value}</h2>
      </div>
    </div>
  );
}

export default function HospitalKpiSection() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KpiCard
        title="Today's Appointments"
        value="8"
        icon={<CalendarDays size={16} />}
        colorClasses="text-blue-400 bg-blue-500/10"
      />
      <KpiCard
        title="Running Campaigns"
        value="3"
        icon={<Megaphone size={16} />}
        colorClasses="text-amber-400 bg-amber-500/10"
      />
      <KpiCard
        title="Available Blood Units"
        value="124"
        icon={<Droplets size={16} />}
        colorClasses="text-success bg-success/10"
      />
      <KpiCard
        title="Pending Requests"
        value="5"
        icon={<ClipboardList size={16} />}
        colorClasses="text-red-400 bg-red-500/10"
      />
    </div>
  );
}
