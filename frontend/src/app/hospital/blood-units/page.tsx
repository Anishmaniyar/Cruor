import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function BloodUnitsPage() {
  const rows = bloodUnits.map((u) => [
    <span key={u.id} className="font-mono text-xs">{u.unitId}</span>,
    <BloodGroupBadge key={u.id + "-bg"} group={u.bloodGroup} />,
    u.component,
    u.volume,
    formatDate(u.expiryDate),
    <StatusBadge key={u.id + "-s"} status={u.lifecycle} />,
    <Link key={u.id + "-link"} href={`/hospital/blood-units/${u.id}`} className="text-xs font-medium uppercase tracking-wider text-accent hover:underline">
      View
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Blood Units" title="Blood unit registry" description="Track lifecycle state for every collected unit." />
      <DataTable headers={["Unit ID", "Group", "Component", "Volume", "Expiry", "Lifecycle", "Action"]} rows={rows} />
    </>
  );
}
