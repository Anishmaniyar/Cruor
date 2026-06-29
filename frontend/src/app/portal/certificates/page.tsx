import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { donations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function CertificatesPage() {
  const rows = donations
    .filter((d) => d.certificateAvailable)
    .map((d) => [
      formatDate(d.date),
      d.type,
      d.volume,
      d.location,
      <StatusBadge key={d.id} status={d.status} />,
      <Link key={d.id + "-link"} href={`/portal/donations/${d.id}/certificate`} className="text-xs font-medium uppercase tracking-wider text-accent hover:underline">
        Download
      </Link>,
    ]);

  return (
    <>
      <PageHeader
        label="Certificates"
        title="Donation certificates"
        description="Download certificates for completed donations."
      />
      <DataTable
        headers={["Date", "Type", "Volume", "Location", "Status", "Action"]}
        rows={rows}
        emptyMessage="No certificates available yet. Complete a donation to receive one."
      />
    </>
  );
}
