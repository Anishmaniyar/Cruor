import {
  Droplets,
  CheckCircle2,
  Clock,
  Activity,
  AlertTriangle,
} from "lucide-react";

interface InventoryStatisticsProps {
  totalUnits: number;
  availableUnits: number;
  reservedUnits: number;
  usedUnits: number;
  expiredUnits: number;
}

export default function InventoryStatistics({
  totalUnits,
  availableUnits,
  reservedUnits,
  usedUnits,
  expiredUnits,
}: InventoryStatisticsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Total Blood Units</span>
          <div className="kpi-icon-box text-blue-400 bg-blue-500/10">
            <Droplets size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{totalUnits}</h2>
      </div>

      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Available</span>
          <div className="kpi-icon-box text-success bg-success/10">
            <CheckCircle2 size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{availableUnits}</h2>
      </div>

      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Reserved</span>
          <div className="kpi-icon-box text-amber-400 bg-amber-500/10">
            <Clock size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{reservedUnits}</h2>
      </div>

      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Used</span>
          <div className="kpi-icon-box text-text-secondary bg-surface-secondary">
            <Activity size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{usedUnits}</h2>
      </div>

      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Expired</span>
          <div className="kpi-icon-box text-danger bg-danger/10">
            <AlertTriangle size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{expiredUnits}</h2>
      </div>
    </div>
  );
}
