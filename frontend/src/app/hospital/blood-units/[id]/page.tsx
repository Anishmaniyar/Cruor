import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge, Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function BloodUnitDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getById(bloodUnits, id);
  if (!unit) notFound();

  return (
    <>
      <BackLink href="/hospital/blood-units" />
      <PageHeader label="Blood Unit" title={unit.unitId} action={<StatusBadge status={unit.status} />} />
      <Card>
        <dl>
          <DetailRow label="Unit ID" value={<span className="font-mono">{unit.unitId}</span>} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={unit.bloodGroup} />} />
          <DetailRow label="Component" value={unit.component} />
          <DetailRow label="Volume" value={unit.volume} />
          <DetailRow label="Collected" value={formatDate(unit.collectedDate)} />
          <DetailRow label="Expiry" value={formatDate(unit.expiryDate)} />
          <DetailRow label="Location" value={unit.location} />
          <DetailRow label="Verification" value={unit.verified ? <Badge variant="success">Verified</Badge> : <Badge variant="warning">Pending Verification</Badge>} />
        </dl>
        <ActionBar>
          <Link href={`/hospital/blood-units/${id}/verify`}><Button variant={unit.verified ? "secondary" : "primary"}>{unit.verified ? "View Verification" : "Verify Unit"}</Button></Link>
          <Link href={`/hospital/blood-units/${id}/tracking`}><Button variant="secondary">Track Journey</Button></Link>
        </ActionBar>
      </Card>
    </>
  );
}
