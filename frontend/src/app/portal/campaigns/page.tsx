import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function CampaignsPage() {
  return (
    <>
      <PageHeader label="Campaigns" title="Blood donation campaigns" description="Register for drives that match your blood group." />
      <div className="divide-y divide-border border border-border">
        {campaigns.map((c) => (
          <div key={c.id} className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <StatusBadge status={c.status} />
                <span className="font-mono text-[10px] text-muted-foreground">{c.registered}/{c.slots} slots</span>
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.location}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {formatDate(c.startDate)} to {formatDate(c.endDate)}
              </p>
              <div className="mt-3 flex flex-wrap gap-1">
                {c.bloodGroups.map((g) => <BloodGroupBadge key={g} group={g} />)}
              </div>
            </div>
            <Link href={`/portal/campaigns/${c.id}`}>
              <Button variant="secondary" size="sm">View details</Button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
