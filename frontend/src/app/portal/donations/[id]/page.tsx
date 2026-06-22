import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, donations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function DonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = getById(donations, id);
  if (!donation) notFound();

  return (
    <>
      <BackLink href="/portal/donations" />
      <PageHeader label="Donation Record" title={donation.type} action={<StatusBadge status={donation.status} />} />
      <Card>
        <dl>
          <DetailRow label="Date" value={formatDate(donation.date)} />
          <DetailRow label="Type" value={donation.type} />
          <DetailRow label="Volume" value={donation.volume} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={donation.bloodGroup} />} />
          <DetailRow label="Location" value={donation.location} />
          <DetailRow label="Reference" value={<span className="font-mono text-xs">{donation.id.toUpperCase()}</span>} />
        </dl>
        {donation.certificateAvailable && (
          <ActionBar>
            <Link href={`/portal/donations/${donation.id}/certificate`}>
              <Button>Download Certificate</Button>
            </Link>
          </ActionBar>
        )}
      </Card>
    </>
  );
}
