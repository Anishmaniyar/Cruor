import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { AuditTrail } from "@/components/shared/audit-trail";
import { RequestActions } from "@/components/shared/status-actions";
import { getById, bloodRequests, getAuditLog } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = getById(bloodRequests, id);
  if (!request) notFound();

  return (
    <>
      <BackLink href="/hospital/requests" />
      <PageHeader label="Blood Request" title={`Request from ${request.hospital}`} action={<StatusBadge status={request.status} />} />
      <div className="border border-border">
        <dl>
          <DetailRow label="Hospital" value={request.hospital} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={request.bloodGroup} />} />
          <DetailRow label="Units Required" value={`${request.units} units`} />
          <DetailRow label="Urgency" value={<StatusBadge status={request.urgency} />} />
          <DetailRow label="Status" value={<StatusBadge status={request.status} />} />
          <DetailRow label="Created" value={formatDateTime(request.createdAt)} />
        </dl>
        <ActionBar>
          <RequestActions status={request.status} />
        </ActionBar>
        <div className="px-4 pb-4">
          <AuditTrail entries={getAuditLog(id)} />
        </div>
      </div>
    </>
  );
}
