import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge, Badge } from "@/components/ui/badge";
import { bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function BloodUnitsPage() {
  const rows = bloodUnits.map((u) => [
    <span key={u.id} className="font-mono text-xs">{u.unitId}</span>,
    <BloodGroupBadge key={u.id + "-bg"} group={u.bloodGroup} />,
    u.component,
    u.volume,
    formatDate(u.expiryDate),
    u.verified ? <Badge key={u.id + "-v"} variant="success">Verified</Badge> : <Badge key={u.id + "-v"} variant="warning">Pending</Badge>,
    <StatusBadge key={u.id + "-s"} status={u.status} />,
    <Link key={u.id + "-link"} href={`/hospital/blood-units/${u.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      View
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Blood Units" title="Blood Unit Management" description="Track individual blood units from collection to storage." />
      <DataTable headers={["Unit ID", "Group", "Component", "Volume", "Expiry", "Verified", "Status", "Action"]} rows={rows} />
    </>
  );
}
