import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function CampaignsPage() {
  return (
    <>
      <PageHeader label="Campaigns" title="Blood Donation Campaigns" description="Find and join blood drives near you." />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((c) => (
          <Card key={c.id} hover className="flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <StatusBadge status={c.status} />
              <span className="font-mono text-[10px] text-muted-foreground">{c.registered}/{c.slots} slots</span>
            </div>
            <h3 className="font-serif text-xl font-bold">{c.title}</h3>
            <p className="mt-1 font-sans text-sm text-muted-foreground">{c.location}</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {formatDate(c.startDate)} — {formatDate(c.endDate)}
            </p>
            <div className="mt-3 flex flex-wrap gap-1">
              {c.bloodGroups.map((g) => <BloodGroupBadge key={g} group={g} />)}
            </div>
            <div className="mt-auto pt-4">
              <Link href={`/portal/campaigns/${c.id}`}>
                <Button variant="secondary" size="sm" className="w-full">View Details</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
