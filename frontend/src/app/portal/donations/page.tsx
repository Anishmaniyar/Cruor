import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { donations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function MyDonationsPage() {
  const rows = donations.map((d) => [
    formatDate(d.date),
    d.type,
    d.volume,
    <BloodGroupBadge key={d.id} group={d.bloodGroup} />,
    d.location,
    <StatusBadge key={d.id + "-s"} status={d.status} />,
    <Link key={d.id + "-link"} href={`/portal/donations/${d.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      View
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Donations" title="My Donations" description="Complete history of your blood donations." />
      <DataTable headers={["Date", "Type", "Volume", "Blood Group", "Location", "Status", "Action"]} rows={rows} />
    </>
  );
}
