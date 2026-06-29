import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/card";
import { getById, campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = getById(campaigns, id);
  if (!campaign) notFound();

  return (
    <>
      <BackLink href="/portal/campaigns" />
      <PageHeader label="Campaign" title={campaign.title} action={<StatusBadge status={campaign.status} />} />
      <Panel>
        <dl>
          <DetailRow label="Location" value={campaign.location} />
          <DetailRow label="Start Date" value={formatDate(campaign.startDate)} />
          <DetailRow label="End Date" value={formatDate(campaign.endDate)} />
          <DetailRow label="Available Slots" value={`${campaign.slots - campaign.registered} of ${campaign.slots}`} />
          <DetailRow label="Blood Groups Needed" value={
            <div className="flex flex-wrap gap-1">{campaign.bloodGroups.map((g) => <BloodGroupBadge key={g} group={g} />)}</div>
          } />
        </dl>
        <ActionBar>
          <Button>Register for Campaign</Button>
          <Link href="/portal/my-registrations"><Button variant="secondary">My Registrations</Button></Link>
        </ActionBar>
      </Panel>
    </>
  );
}
