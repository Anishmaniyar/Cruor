import { Hash, Building2, Droplets, Package, Box, Calendar, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import BloodRequestStatusBadge from "./BloodRequestStatusBadge";
import type { RequestStatus, Priority } from "./BloodRequestStatusBadge";

export interface RequestInfo {
  id: string;
  requestingHospital: string;
  bloodGroup: string;
  component: string;
  unitsRequested: number;
  requestedDate: string;
  priority: Priority;
  status: RequestStatus;
  reason?: string;
}

interface RequestInformationProps {
  request: RequestInfo;
}

export default function RequestInformation({ request }: RequestInformationProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Request Information</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Hash className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Request ID</p>
            <p className="text-sm font-mono font-medium text-text-primary">{request.id}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Building2 className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Requesting Hospital</p>
            <p className="text-sm font-medium text-text-primary">{request.requestingHospital}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Droplets className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="info-label">Blood Group</p>
            <p className="text-sm font-semibold text-text-primary">{request.bloodGroup}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Package className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Component</p>
            <p className="text-sm font-medium text-text-primary">{request.component}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Box className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Units Requested</p>
            <p className="text-sm font-semibold text-text-primary">{request.unitsRequested}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Calendar className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Requested Date</p>
            <p className="text-sm font-medium text-text-primary">{request.requestedDate}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <div>
            <p className="info-label">Priority</p>
            <div className="mt-1"><BloodRequestStatusBadge status={request.priority} /></div>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <div>
            <p className="info-label">Status</p>
            <div className="mt-1"><BloodRequestStatusBadge status={request.status} /></div>
          </div>
        </div>

        {request.reason && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3 sm:col-span-2 lg:col-span-3">
            <FileText className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Reason</p>
              <p className="text-sm text-text-secondary">{request.reason}</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
