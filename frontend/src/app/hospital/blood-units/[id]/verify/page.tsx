import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { BloodGroupBadge, Badge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/card";
import { ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { getById, bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function VerifyBloodUnitPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getById(bloodUnits, id);
  if (!unit) notFound();

  return (
    <>
      <BackLink href={`/hospital/blood-units/${id}`} />
      <PageHeader label="Verification" title={`Verify ${unit.unitId}`} />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel>
          <h3 className="mb-4 border-b border-border pb-4 text-sm font-semibold">Unit details</h3>
          <dl>
            <DetailRow label="Unit ID" value={<span className="font-mono">{unit.unitId}</span>} />
            <DetailRow label="Blood group" value={<BloodGroupBadge group={unit.bloodGroup} />} />
            <DetailRow label="Component" value={unit.component} />
            <DetailRow label="Collected" value={formatDate(unit.collectedDate)} />
            <DetailRow label="Current status" value={unit.verified ? <Badge variant="success">Verified</Badge> : <Badge variant="warning">Pending</Badge>} />
          </dl>
        </Panel>
        <Panel>
          <div className="mb-6 flex items-center gap-3 border-b border-border pb-4">
            <ShieldCheck size={24} className="text-accent" aria-hidden />
            <h3 className="text-sm font-semibold">Quality control</h3>
          </div>
          {unit.verified ? (
            <div className="py-8 text-center">
              <Badge variant="success" className="mb-4">Verified</Badge>
              <p className="text-sm text-muted-foreground">Unit passed QC on {formatDate(unit.collectedDate)}.</p>
              <p className="mt-2 font-mono text-xs text-muted-foreground">Verified by L. Anderson</p>
            </div>
          ) : (
            <div>
              <p className="mb-6 text-sm text-muted-foreground">Run verification before releasing for storage or transfusion.</p>
              <ActionBar className="mt-0 border-0 pt-0">
                <Button>Approve verification</Button>
                <Button variant="danger">Reject unit</Button>
              </ActionBar>
            </div>
          )}
        </Panel>
      </div>
    </>
  );
}
