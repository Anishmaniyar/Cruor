import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, appointments } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apt = getById(appointments, id);
  if (!apt) notFound();

  return (
    <>
      <BackLink href="/portal/appointments" label="My Appointments" />
      <PageHeader
        label="Appointment Details"
        title={apt.type}
        action={<StatusBadge status={apt.status} />}
      />
      <Card>
        <dl>
          <DetailRow label="Date & Time" value={formatDateTime(apt.date)} />
          <DetailRow label="Location" value={apt.location} />
          <DetailRow label="Donation Type" value={apt.type} />
          <DetailRow label="Status" value={<StatusBadge status={apt.status} />} />
          <DetailRow label="Reference" value={<span className="font-mono text-xs">{apt.id.toUpperCase()}</span>} />
        </dl>
        {(apt.status === "pending" || apt.status === "confirmed") && (
          <ActionBar>
            <Button variant="danger">Cancel Appointment</Button>
          </ActionBar>
        )}
      </Card>
    </>
  );
}
