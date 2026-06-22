import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, bloodRequests } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const request = getById(bloodRequests, id);
  if (!request) notFound();

  return (
    <>
      <BackLink href="/hospital/requests" />
      <PageHeader label="Blood Request" title={`Request from ${request.hospital}`} action={<StatusBadge status={request.status} />} />
      <Card>
        <dl>
          <DetailRow label="Hospital" value={request.hospital} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={request.bloodGroup} />} />
          <DetailRow label="Units Required" value={`${request.units} units`} />
          <DetailRow label="Urgency" value={<StatusBadge status={request.urgency} />} />
          <DetailRow label="Status" value={<StatusBadge status={request.status} />} />
          <DetailRow label="Created" value={formatDateTime(request.createdAt)} />
        </dl>
        <ActionBar>
          {request.status === "open" && (
            <>
              <Button>Accept Request</Button>
              <Button variant="danger">Reject</Button>
            </>
          )}
          {request.status === "accepted" && <Button variant="danger">Cancel Request</Button>}
        </ActionBar>
      </Card>
    </>
  );
}
