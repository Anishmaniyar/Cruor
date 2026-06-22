import Link from "next/link";
import { PageHeader, DataTable } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { appointments } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function MyAppointmentsPage() {
  const rows = appointments.map((a) => [
    formatDateTime(a.date),
    a.type,
    a.location,
    <StatusBadge key={a.id} status={a.status} />,
    <Link key={a.id + "-link"} href={`/portal/appointments/${a.id}`} className="font-mono text-xs uppercase tracking-widest text-accent hover:underline">
      View
    </Link>,
  ]);

  return (
    <>
      <PageHeader
        label="Appointments"
        title="My Appointments"
        description="View and manage your blood donation appointments."
        action={<Link href="/portal/appointments/book"><Button>Book New</Button></Link>}
      />
      <DataTable headers={["Date & Time", "Type", "Location", "Status", "Action"]} rows={rows} />
    </>
  );
}
