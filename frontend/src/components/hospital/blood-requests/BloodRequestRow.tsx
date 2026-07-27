import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import BloodRequestStatusBadge from "./BloodRequestStatusBadge";
import type { RequestStatus, Priority } from "./BloodRequestStatusBadge";

export interface BloodRequest {
  id: string;
  requestingHospital: string;
  bloodGroup: string;
  component: string;
  unitsRequested: number;
  priority: Priority;
  status: RequestStatus;
}

interface BloodRequestRowProps {
  request: BloodRequest;
}

export default function BloodRequestRow({ request }: BloodRequestRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <span className="text-sm font-mono font-medium text-text-primary">
          {request.id}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-text-primary">
        {request.requestingHospital}
      </td>
      <td className="px-6 py-4">
        <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {request.bloodGroup}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">{request.component}</td>
      <td className="px-6 py-4 text-sm font-semibold text-text-primary">
        {request.unitsRequested}
      </td>
      <td className="px-6 py-4">
        <BloodRequestStatusBadge status={request.priority} />
      </td>
      <td className="px-6 py-4">
        <BloodRequestStatusBadge status={request.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/hospital/blood-requests/${request.id}`}>
          <Button variant="ghost" size="xs" className="gap-1.5">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </td>
    </tr>
  );
}
