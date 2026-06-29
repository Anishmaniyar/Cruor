import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow, ActionBar } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { AuditTrail } from "@/components/shared/audit-trail";
import { DonorAppointmentActions } from "@/components/shared/status-actions";
import { getById, appointments, getAuditLog } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function AppointmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const apt = getById(appointments, id);
  if (!apt) notFound();

  return (
    <>
      <BackLink href="/portal/appointments" label="My Appointments" />
      <PageHeader label="Appointment Details" title={apt.type} action={<StatusBadge status={apt.status} />} />
      <div className="border border-border">
        <dl>
          <DetailRow label="Date & Time" value={formatDateTime(apt.date)} />
          <DetailRow label="Location" value={apt.location} />
          <DetailRow label="Donation Type" value={apt.type} />
          <DetailRow label="Status" value={<StatusBadge status={apt.status} />} />
          <DetailRow label="Reference" value={<span className="font-mono text-xs">{apt.id.toUpperCase()}</span>} />
        </dl>
        <ActionBar>
          <DonorAppointmentActions status={apt.status} />
        </ActionBar>
        <div className="px-4 pb-4">
          <AuditTrail entries={getAuditLog(id)} />
        </div>
      </div>
    </>
  );
}
