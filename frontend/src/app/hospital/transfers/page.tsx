import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { transfers } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function TransfersPage() {
  const rows = transfers.map((t) => [
    t.from,
    t.to,
    <BloodGroupBadge key={t.id} group={t.bloodGroup} />,
    `${t.units} units`,
    <StatusBadge key={t.id + "-s"} status={t.status} />,
    formatDateTime(t.date),
    <Link key={t.id + "-link"} href={`/hospital/transfers/${t.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      Manage
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Transfers" title="Blood Transfers" description="Track inter-hospital blood unit transfers." />
      <DataTable headers={["From", "To", "Group", "Units", "Status", "Date", "Action"]} rows={rows} />
    </>
  );
}
