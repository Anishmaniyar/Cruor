import {
  DropletIcon,
  SparkleIcon,
  Calendar,
  CalendarDays,
  TrendingUp,
} from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  icon: "droplet" | "sparkle" | "calendar" | "calendarDays";
  trend?: string;
  subtitle?: string;
}

const iconMap = {
  droplet: DropletIcon,
  sparkle: SparkleIcon,
  calendar: Calendar,
  calendarDays: CalendarDays,
};

const colorMap: Record<string, string> = {
  droplet: "text-blue-400 bg-blue-500/10",
  sparkle: "text-amber-400 bg-amber-500/10",
  calendar: "text-success bg-success/10",
  calendarDays: "text-violet-400 bg-violet-500/10",
};

export default function KPICard({
  title,
  value,
  icon,
  trend,
  subtitle,
}: KPICardProps) {
  const IconComponent = iconMap[icon];
  const colorClasses = colorMap[icon] || "";

  return (
    <div className="kpi-card">
      <div className="flex items-start justify-between">
        <span className="kpi-label">{title}</span>
        <div className={`kpi-icon-box ${colorClasses}`}>
          <IconComponent size={16} />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="kpi-value">{value}</h2>
        {subtitle && (
          <p className="mt-1 text-sm text-text-secondary">{subtitle}</p>
        )}
      </div>

      {trend && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-success">
          <TrendingUp size={12} />
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
}
