import { ArrowRight, Hash, Building2, Box, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import BloodRequestStatusBadge from "@/components/hospital/blood-requests/BloodRequestStatusBadge";
import type { Priority } from "@/components/hospital/blood-requests/BloodRequestStatusBadge";

interface LinkedRequest {
  requestId: string;
  requestingHospital: string;
  unitsRequested: number;
  priority: Priority;
}

interface LinkedRequestCardProps {
  request: LinkedRequest;
}

export default function LinkedRequestCard({ request }: LinkedRequestCardProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Linked Blood Request</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Hash className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Request ID</p>
            <p className="text-sm font-mono font-medium text-text-primary">{request.requestId}</p>
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
          <Box className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Units Requested</p>
            <p className="text-sm font-semibold text-text-primary">{request.unitsRequested}</p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <AlertTriangle className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Priority</p>
            <div className="mt-1">
              <BloodRequestStatusBadge status={request.priority} />
            </div>
          </div>
        </div>
      </div>

      <Link
        href={`/hospital/blood-requests/${request.requestId}`}
        className="link-action mt-4 inline-flex"
      >
        View Blood Request
        <ArrowRight size={14} />
      </Link>
    </Card>
  );
}
