import {
  Droplets,
  Calendar,
  Clock,
  Building2,
  User,
  Hash,
  Package,
  Activity,
  MapPin,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import StockStatusBadge from "./StockStatusBadge";
import type { BloodUnit } from "@/services/bloodUnit.services";
import { formatBloodUnitDate } from "@/lib/blood-unit-utils";

interface BloodInformationProps {
  unit: BloodUnit;
}

export default function BloodInformation({ unit }: BloodInformationProps) {
  return (
    <Card className="!p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="card-title">Blood Information</h2>
        <StockStatusBadge status={unit.currentStatus} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Hash className="h-4 w-4 text-text-muted shrink-0" />
          <div className="min-w-0">
            <p className="info-label">Blood Unit ID</p>
            <p className="truncate text-sm font-medium text-text-primary">
              {unit.id}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Building2 className="h-4 w-4 text-text-muted shrink-0" />
          <div className="min-w-0">
            <p className="info-label">Hospital ID</p>
            <p className="truncate text-sm font-medium text-text-primary">
              {unit.hospitalId}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Droplets className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="info-label">Blood Group</p>
            <p className="text-sm font-semibold text-text-primary">
              {unit.bloodGroup}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Package className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Component Type</p>
            <p className="text-sm font-medium text-text-primary">
              {unit.componentType}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Activity className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Volume</p>
            <p className="text-sm font-semibold text-text-primary">
              {unit.volume} ml
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Calendar className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Collection Date</p>
            <p className="text-sm font-medium text-text-primary">
              {formatBloodUnitDate(unit.collectionDate)}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Clock className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Expiration Date</p>
            <p className="text-sm font-medium text-text-primary">
              {formatBloodUnitDate(unit.expirationDate)}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <MapPin className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Storage Location</p>
            <p className="text-sm font-medium text-text-primary">
              {unit.storageLocation}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <User className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Donor</p>
            <p className="text-sm font-medium text-text-primary">
              {unit.donor?.name ?? "—"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
