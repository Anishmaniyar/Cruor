import BloodTransferRow from "./BloodTransferRow";
import type { BloodTransfer } from "./BloodTransferRow";

interface BloodTransferTableProps {
  transfers: BloodTransfer[];
}

export default function BloodTransferTable({ transfers }: BloodTransferTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-surface-secondary">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Transfer ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Destination</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Blood Group</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Component</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Units</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y-0">
          {transfers.map((transfer) => (
            <BloodTransferRow key={transfer.id} transfer={transfer} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { BloodTransfer };
