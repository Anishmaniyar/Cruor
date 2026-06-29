import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { BloodUnitLifecycle } from "@/components/shared/blood-unit-lifecycle";
import { AuditTrail } from "@/components/shared/audit-trail";
import { getById, bloodUnits, getAuditLog } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function BloodUnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getById(bloodUnits, id);
  if (!unit) notFound();

  return (
    <>
      <BackLink href="/hospital/blood-units" />
      <PageHeader label="Blood Unit" title={unit.unitId} action={<StatusBadge status={unit.lifecycle} />} />
      <div className="border border-border">
        <div className="border-b border-border p-4">
          <BloodUnitLifecycle current={unit.lifecycle} previous={unit.previousLifecycle} />
        </div>
        <dl>
          <DetailRow label="Unit ID" value={<span className="font-mono">{unit.unitId}</span>} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={unit.bloodGroup} />} />
          <DetailRow label="Component" value={unit.component} />
          <DetailRow label="Volume" value={unit.volume} />
          <DetailRow label="Collected" value={formatDate(unit.collectedDate)} />
          <DetailRow label="Expiry" value={formatDate(unit.expiryDate)} />
          <DetailRow label="Location" value={unit.location} />
        </dl>
        <ActionBar>
          <Link href={`/hospital/blood-units/${id}/verify`}>
            <Button variant={unit.verified ? "secondary" : "primary"}>
              {unit.verified ? "View verification" : "Verify unit"}
            </Button>
          </Link>
          <Link href={`/hospital/blood-units/${id}/tracking`}>
            <Button variant="secondary">Track journey</Button>
          </Link>
        </ActionBar>
        <div className="px-4 pb-4">
          <AuditTrail entries={getAuditLog(id)} />
        </div>
      </div>
    </>
  );
}
