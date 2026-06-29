import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/card";
import { getById, campaigns } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function HospitalCampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = getById(campaigns, id);
  if (!campaign) notFound();

  return (
    <>
      <BackLink href="/hospital/campaigns" />
      <PageHeader label="Campaign" title={campaign.title} action={<StatusBadge status={campaign.status} />} />
      <Panel>
        <dl>
          <DetailRow label="Location" value={campaign.location} />
          <DetailRow label="Duration" value={`${formatDate(campaign.startDate)} — ${formatDate(campaign.endDate)}`} />
          <DetailRow label="Registration" value={`${campaign.registered} of ${campaign.slots} slots filled`} />
          <DetailRow label="Blood Groups" value={
            <div className="flex flex-wrap gap-1">{campaign.bloodGroups.map((g) => <BloodGroupBadge key={g} group={g} />)}</div>
          } />
        </dl>
        <ActionBar>
          <Link href={`/hospital/campaigns/${id}/registrations`}><Button>View Registrations</Button></Link>
          <Button variant="secondary">Edit Campaign</Button>
          {campaign.status === "active" && <Button variant="danger">Cancel Campaign</Button>}
          {campaign.status === "active" && <Button variant="secondary">Mark Complete</Button>}
        </ActionBar>
      </Panel>
    </>
  );
}
