import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, appointments } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function HospitalAppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apt = getById(appointments, id);
  if (!apt) notFound();

  return (
    <>
      <BackLink href="/hospital/appointments" />
      <PageHeader label="Appointment" title={`Appointment ${apt.id.toUpperCase()}`} action={<StatusBadge status={apt.status} />} />
      <Card>
        <dl>
          <DetailRow label="Date & Time" value={formatDateTime(apt.date)} />
          <DetailRow label="Type" value={apt.type} />
          <DetailRow label="Location" value={apt.location} />
          <DetailRow label="Status" value={<StatusBadge status={apt.status} />} />
        </dl>
        {apt.status === "pending" && (
          <ActionBar>
            <Button>Confirm</Button>
            <Button variant="danger">Reject</Button>
          </ActionBar>
        )}
        {apt.status === "confirmed" && (
          <ActionBar>
            <Button>Mark Complete</Button>
            <Button variant="danger">Reject</Button>
          </ActionBar>
        )}
      </Card>
    </>
  );
}
