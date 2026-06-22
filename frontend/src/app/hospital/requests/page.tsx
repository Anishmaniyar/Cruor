import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { bloodRequests } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function RequestsPage() {
  const rows = bloodRequests.map((r) => [
    r.hospital,
    <BloodGroupBadge key={r.id} group={r.bloodGroup} />,
    `${r.units} units`,
    <StatusBadge key={r.id + "-u"} status={r.urgency} />,
    <StatusBadge key={r.id + "-s"} status={r.status} />,
    formatDateTime(r.createdAt),
    <Link key={r.id + "-link"} href={`/hospital/requests/${r.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      View
    </Link>,
  ]);

  return (
    <>
      <PageHeader
        label="Blood Requests"
        title="Request Management"
        description="View open requests and manage your hospital's blood requests."
        action={<Link href="/hospital/requests/create"><Button>Create Request</Button></Link>}
      />
      <DataTable headers={["Hospital", "Group", "Units", "Urgency", "Status", "Created", "Action"]} rows={rows} />
    </>
  );
}
