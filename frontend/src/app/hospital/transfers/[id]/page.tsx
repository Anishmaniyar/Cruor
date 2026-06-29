import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { AuditTrail } from "@/components/shared/audit-trail";
import { TransferActions } from "@/components/shared/status-actions";
import { getById, transfers, getAuditLog } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function TransferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const transfer = getById(transfers, id);
  if (!transfer) notFound();

  return (
    <>
      <BackLink href="/hospital/transfers" />
      <PageHeader label="Transfer" title={`Transfer ${transfer.id.toUpperCase()}`} action={<StatusBadge status={transfer.status} />} />
      <div className="border border-border">
        <dl>
          <DetailRow label="From" value={transfer.from} />
          <DetailRow label="To" value={transfer.to} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={transfer.bloodGroup} />} />
          <DetailRow label="Units" value={`${transfer.units} units`} />
          <DetailRow label="Status" value={<StatusBadge status={transfer.status} />} />
          <DetailRow label="Date" value={formatDateTime(transfer.date)} />
        </dl>
        <ActionBar>
          <TransferActions status={transfer.status} />
        </ActionBar>
        <div className="px-4 pb-4">
          <AuditTrail entries={getAuditLog(id)} />
        </div>
      </div>
    </>
  );
}
