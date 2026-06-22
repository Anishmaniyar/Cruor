import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, transfers } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function TransferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const transfer = getById(transfers, id);
  if (!transfer) notFound();

  return (
    <>
      <BackLink href="/hospital/transfers" />
      <PageHeader label="Transfer" title={`Transfer ${transfer.id.toUpperCase()}`} action={<StatusBadge status={transfer.status} />} />
      <Card>
        <dl>
          <DetailRow label="From" value={transfer.from} />
          <DetailRow label="To" value={transfer.to} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={transfer.bloodGroup} />} />
          <DetailRow label="Units" value={`${transfer.units} units`} />
          <DetailRow label="Status" value={<StatusBadge status={transfer.status} />} />
          <DetailRow label="Date" value={formatDateTime(transfer.date)} />
        </dl>
        <ActionBar>
          {transfer.status === "pending" && <Button>Approve Transfer</Button>}
          {transfer.status === "accepted" && <Button>Mark In Transit</Button>}
          {transfer.status === "in-transit" && <Button>Mark Delivered</Button>}
        </ActionBar>
      </Card>
    </>
  );
}
