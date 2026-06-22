import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, hospitalDonations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function HospitalDonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = getById(hospitalDonations, id);
  if (!donation) notFound();

  return (
    <>
      <BackLink href="/hospital/donations" />
      <PageHeader label="Donation Review" title={`Donation by ${donation.donor}`} action={<StatusBadge status={donation.status} />} />
      <Card>
        <dl>
          <DetailRow label="Donor" value={donation.donor} />
          <DetailRow label="Date" value={formatDate(donation.date)} />
          <DetailRow label="Type" value={donation.type} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={donation.bloodGroup} />} />
          <DetailRow label="Status" value={<StatusBadge status={donation.status} />} />
        </dl>
        {donation.status === "pending" && (
          <ActionBar>
            <Button>Mark Complete</Button>
            <Button variant="danger">Reject</Button>
          </ActionBar>
        )}
      </Card>
    </>
  );
}
