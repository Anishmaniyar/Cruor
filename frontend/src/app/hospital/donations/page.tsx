import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { hospitalDonations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function HospitalDonationsPage() {
  const rows = hospitalDonations.map((d) => [
    d.donor,
    formatDate(d.date),
    d.type,
    <BloodGroupBadge key={d.id} group={d.bloodGroup} />,
    <StatusBadge key={d.id + "-s"} status={d.status} />,
    <Link key={d.id + "-link"} href={`/hospital/donations/${d.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      Review
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Donations" title="Donation Management" description="Review and process incoming blood donations." />
      <DataTable headers={["Donor", "Date", "Type", "Blood Group", "Status", "Action"]} rows={rows} />
    </>
  );
}
