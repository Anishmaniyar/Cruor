import BloodRequestRow from "./BloodRequestRow";
import type { BloodRequest } from "./BloodRequestRow";

interface BloodRequestTableProps {
  requests: BloodRequest[];
}

export default function BloodRequestTable({ requests }: BloodRequestTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-surface-secondary">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Request ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Hospital
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Blood Group
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Component
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Units
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-0">
          {requests.map((request) => (
            <BloodRequestRow key={request.id} request={request} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { BloodRequest };
