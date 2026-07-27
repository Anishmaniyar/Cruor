import AppointmentRow from "./AppointmentRow";
import type { Appointment } from "./AppointmentRow";

interface AppointmentTableProps {
  appointments: Appointment[];
}

export default function AppointmentTable({
  appointments,
}: AppointmentTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-surface-secondary">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Donor Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Blood Group
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-text-muted">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-text-muted">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-0">
          {appointments.map((appointment) => (
            <AppointmentRow
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { Appointment };
