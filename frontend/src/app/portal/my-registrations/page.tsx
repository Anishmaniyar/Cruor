import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function MyRegistrationsPage() {
  const registered = campaigns.filter((c) => c.status === "active").slice(0, 2);
  const rows = registered.map((c) => [
    c.title,
    c.location,
    formatDate(c.startDate),
    <StatusBadge key={c.id} status="confirmed" />,
    <Link key={c.id + "-link"} href={`/portal/campaigns/${c.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      View
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Registrations" title="My Campaign Registrations" description="Campaigns you have registered for." />
      <DataTable headers={["Campaign", "Location", "Start Date", "Status", "Action"]} rows={rows} emptyMessage="You haven't registered for any campaigns yet." />
    </>
  );
}
