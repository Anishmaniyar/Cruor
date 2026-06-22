import { notFound } from "next/navigation";
import { PageHeader, BackLink, DataTable } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { getById, campaigns, campaignRegistrations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function CampaignRegistrationsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const campaign = getById(campaigns, id);
  if (!campaign) notFound();

  const rows = campaignRegistrations.map((r) => [
    r.name,
    <BloodGroupBadge key={r.id} group={r.bloodGroup} />,
    formatDate(r.registeredAt),
    <StatusBadge key={r.id} status={r.status} />,
  ]);

  return (
    <>
      <BackLink href={`/hospital/campaigns/${id}`} />
      <PageHeader label="Registrations" title={`${campaign.title} — Registrations`} description={`${campaign.registered} donors registered.`} />
      <DataTable headers={["Donor Name", "Blood Group", "Registered", "Status"]} rows={rows} />
    </>
  );
}
