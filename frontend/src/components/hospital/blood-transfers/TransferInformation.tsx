import { Hash, Building2, Droplets, Package, Box, Calendar, User, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import TransferStatusBadge from "./TransferStatusBadge";
import type { TransferStatus } from "./TransferStatusBadge";

export interface TransferInfo {
  id: string;
  bloodGroup: string;
  component: string;
  units: number;
  destinationHospital: string;
  transferDate: string;
  status: TransferStatus;
  assignedStaff?: string;
  notes?: string;
}

interface TransferInformationProps {
  transfer: TransferInfo;
}

export default function TransferInformation({ transfer }: TransferInformationProps) {
  return (
    <Card className="!p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="card-title">Transfer Information</h2>
        <TransferStatusBadge status={transfer.status} />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Hash className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Transfer ID</p>
            <p className="text-sm font-mono font-medium text-text-primary">{transfer.id}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Droplets className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="info-label">Blood Group</p>
            <p className="text-sm font-semibold text-text-primary">{transfer.bloodGroup}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Package className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Component</p>
            <p className="text-sm font-medium text-text-primary">{transfer.component}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Box className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Units</p>
            <p className="text-sm font-semibold text-text-primary">{transfer.units}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Building2 className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Destination Hospital</p>
            <p className="text-sm font-medium text-text-primary">{transfer.destinationHospital}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Calendar className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Transfer Date</p>
            <p className="text-sm font-medium text-text-primary">{transfer.transferDate}</p>
          </div>
        </div>

        {transfer.assignedStaff && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <User className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Assigned Staff</p>
              <p className="text-sm font-medium text-text-primary">{transfer.assignedStaff}</p>
            </div>
          </div>
        )}

        {transfer.notes && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3 sm:col-span-2 lg:col-span-3">
            <FileText className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Notes</p>
              <p className="text-sm text-text-secondary">{transfer.notes}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
