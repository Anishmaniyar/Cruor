import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { AuditTrail } from "@/components/shared/audit-trail";
import { DonationReviewActions } from "@/components/shared/status-actions";
import { getById, hospitalDonations, getAuditLog } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function HospitalDonationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const donation = getById(hospitalDonations, id);
  if (!donation) notFound();

  return (
    <>
      <BackLink href="/hospital/donations" />
      <PageHeader label="Donation Review" title={`Donation by ${donation.donor}`} action={<StatusBadge status={donation.status} />} />
      <div className="border border-border">
        <dl>
          <DetailRow label="Donor" value={donation.donor} />
          <DetailRow label="Date" value={formatDate(donation.date)} />
          <DetailRow label="Type" value={donation.type} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={donation.bloodGroup} />} />
          <DetailRow label="Status" value={<StatusBadge status={donation.status} />} />
        </dl>
        <ActionBar>
          <DonationReviewActions status={donation.status} />
        </ActionBar>
        <div className="px-4 pb-4">
          <AuditTrail entries={getAuditLog(id)} />
        </div>
      </div>
    </>
  );
}
