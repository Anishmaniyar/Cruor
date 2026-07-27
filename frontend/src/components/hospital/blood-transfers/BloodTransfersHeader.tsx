import { Truck, Package, MapPin, CheckCircle } from "lucide-react";

interface TransferStats {
  active: number;
  preparing: number;
  inTransit: number;
  completedToday: number;
}

interface BloodTransfersHeaderProps {
  stats: TransferStats;
}

export default function BloodTransfersHeader({ stats }: BloodTransfersHeaderProps) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="page-title">Blood Transfers</h1>
        <p className="page-description">
          Track and manage hospital-to-hospital blood transfers.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Active Transfers</span>
            <div className="kpi-icon-box text-blue-400 bg-blue-500/10">
              <Truck size={16} />
            </div>
          </div>
          <h2 className="kpi-value mt-4">{stats.active}</h2>
        </div>

        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Preparing</span>
            <div className="kpi-icon-box text-amber-400 bg-amber-500/10">
              <Package size={16} />
            </div>
          </div>
          <h2 className="kpi-value mt-4">{stats.preparing}</h2>
        </div>

        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">In Transit</span>
            <div className="kpi-icon-box text-violet-400 bg-violet-500/10">
              <MapPin size={16} />
            </div>
          </div>
          <h2 className="kpi-value mt-4">{stats.inTransit}</h2>
        </div>

        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Completed Today</span>
            <div className="kpi-icon-box text-success bg-success/10">
              <CheckCircle size={16} />
            </div>
          </div>
          <h2 className="kpi-value mt-4">{stats.completedToday}</h2>
        </div>
      </div>
    </div>
  );
}
