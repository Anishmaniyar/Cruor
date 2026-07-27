import { Droplets, Calendar, Clock, Building2, User, Hash, Package } from "lucide-react";
import { Card } from "@/components/ui/card";
import StockStatusBadge from "./StockStatusBadge";
import type { StockStatus } from "./StockStatusBadge";

export interface BloodInfo {
  id: string;
  bloodGroup: string;
  component: string;
  units: number;
  collectionDate: string;
  expiryDate: string;
  source: string;
  donor?: string;
  status: StockStatus;
}

interface BloodInformationProps {
  record: BloodInfo;
}

export default function BloodInformation({ record }: BloodInformationProps) {
  return (
    <Card className="!p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="card-title">Blood Information</h2>
        <StockStatusBadge status={record.status} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Droplets className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="info-label">Blood Group</p>
            <p className="text-sm font-semibold text-text-primary">{record.bloodGroup}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Package className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Component</p>
            <p className="text-sm font-medium text-text-primary">{record.component}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Hash className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Available Quantity</p>
            <p className="text-sm font-semibold text-text-primary">{record.units} units</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Calendar className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Collection Date</p>
            <p className="text-sm font-medium text-text-primary">{record.collectionDate}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Clock className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Expiry Date</p>
            <p className="text-sm font-medium text-text-primary">{record.expiryDate}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Building2 className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Source</p>
            <p className="text-sm font-medium text-text-primary">{record.source}</p>
          </div>
        </div>

        {record.donor && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <User className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Linked Donor</p>
              <p className="text-sm font-medium text-text-primary">{record.donor}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
