import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { BloodGroupBadge, Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { ShieldCheck } from "lucide-react";

export default async function VerifyBloodUnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getById(bloodUnits, id);
  if (!unit) notFound();

  return (
    <>
      <BackLink href={`/hospital/blood-units/${id}`} />
      <PageHeader label="Verification" title={`Verify ${unit.unitId}`} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-serif text-lg font-bold mb-4 border-b border-border pb-4">Unit Details</h3>
          <dl>
            <DetailRow label="Unit ID" value={<span className="font-mono">{unit.unitId}</span>} />
            <DetailRow label="Blood Group" value={<BloodGroupBadge group={unit.bloodGroup} />} />
            <DetailRow label="Component" value={unit.component} />
            <DetailRow label="Collected" value={formatDate(unit.collectedDate)} />
            <DetailRow label="Current Status" value={unit.verified ? <Badge variant="success">Verified</Badge> : <Badge variant="warning">Pending</Badge>} />
          </dl>
        </Card>
        <Card>
          <div className="flex items-center gap-3 mb-6 border-b border-border pb-4">
            <ShieldCheck className="h-6 w-6 text-accent" strokeWidth={1.5} />
            <h3 className="font-serif text-lg font-bold">Quality Control</h3>
          </div>
          {unit.verified ? (
            <div className="text-center py-8">
              <Badge variant="success" className="mb-4">Verified</Badge>
              <p className="font-body text-sm text-muted-foreground">This unit passed all quality control checks on {formatDate(unit.collectedDate)}.</p>
              <p className="font-mono text-xs text-muted-foreground mt-2">Verified by: QC — Anderson</p>
            </div>
          ) : (
            <div>
              <p className="font-body text-sm text-muted-foreground mb-6">Run verification checks before releasing this unit for storage or transfusion.</p>
              <ActionBar className="mt-0 pt-0 border-0">
                <Button>Approve Verification</Button>
                <Button variant="danger">Reject Unit</Button>
              </ActionBar>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
