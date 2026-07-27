import { Droplets, AlertTriangle, Clock, PlusCircle } from "lucide-react";

interface InventoryStatisticsProps {
  totalUnits: number;
  lowStockGroups: number;
  expiringSoonUnits: number;
  addedToday: number;
}

export default function InventoryStatistics({
  totalUnits,
  lowStockGroups,
  expiringSoonUnits,
  addedToday,
}: InventoryStatisticsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
          <span className="kpi-label">Low Stock Groups</span>
          <div className="kpi-icon-box text-amber-400 bg-amber-500/10">
            <AlertTriangle size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{lowStockGroups}</h2>
      </div>

      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Expiring Soon</span>
          <div className="kpi-icon-box text-red-400 bg-red-500/10">
            <Clock size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{expiringSoonUnits}</h2>
      </div>

      <div className="kpi-card">
        <div className="flex items-start justify-between">
          <span className="kpi-label">Added Today</span>
          <div className="kpi-icon-box text-success bg-success/10">
            <PlusCircle size={16} />
          </div>
        </div>
        <h2 className="kpi-value mt-4">{addedToday}</h2>
      </div>
    </div>
  );
}
