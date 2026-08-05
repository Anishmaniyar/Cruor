"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Megaphone,
  Droplets,
  ClipboardList,
} from "lucide-react";
import { getHospitalInventory } from "@/services/bloodUnit.services";

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
        <div className={`kpi-icon-box ${colorClasses}`}>{icon}</div>
      </div>

      <div className="mt-4">
        <h2 className="kpi-value">{value}</h2>
      </div>
    </div>
  );
}

export default function HospitalKpiSection() {
  const [availableUnits, setAvailableUnits] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    getHospitalInventory()
      .then((response) => {
        if (cancelled) return;
        const total = (response.data.inventoryData ?? []).reduce(
          (sum, group) => sum + group._count.id,
          0,
        );
        setAvailableUnits(total);
      })
      .catch(() => {
        /* Dashboard KPI failure is non-blocking */
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
        value={availableUnits === null ? "—" : String(availableUnits)}
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
