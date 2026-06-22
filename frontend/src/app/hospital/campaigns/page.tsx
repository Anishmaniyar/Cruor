import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function HospitalCampaignsPage() {
  const rows = campaigns.map((c) => [
    c.title,
    c.location,
    formatDate(c.startDate),
    `${c.registered}/${c.slots}`,
    <StatusBadge key={c.id} status={c.status} />,
    <Link key={c.id + "-link"} href={`/hospital/campaigns/${c.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      Manage
    </Link>,
  ]);

  return (
    <>
      <PageHeader
        label="Campaigns"
        title="Campaign Management"
        description="Create and manage blood donation campaigns."
        action={<Link href="/hospital/campaigns/create"><Button>Create Campaign</Button></Link>}
      />
      <DataTable headers={["Title", "Location", "Start Date", "Slots", "Status", "Action"]} rows={rows} />
    </>
  );
}
