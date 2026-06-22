import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { StatusBadge } from "@/components/ui/badge";
import { appointments } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function HospitalAppointmentsPage() {
  const rows = appointments.map((a) => [
    a.id.toUpperCase(),
    formatDateTime(a.date),
    a.type,
    a.location,
    <StatusBadge key={a.id} status={a.status} />,
    <Link key={a.id + "-link"} href={`/hospital/appointments/${a.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      Manage
    </Link>,
  ]);

  return (
    <>
      <PageHeader label="Appointments" title="Appointment Management" description="Review and manage donor appointment requests." />
      <DataTable headers={["ID", "Date & Time", "Type", "Location", "Status", "Action"]} rows={rows} />
    </>
  );
}
