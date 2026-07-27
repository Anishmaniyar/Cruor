import { CalendarX } from "lucide-react";

export default function EmptyAppointments() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-box">
        <CalendarX className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No Appointments Found</h3>
      <p className="empty-state-description">
        There are currently no appointments matching your search or filter.
      </p>
    </div>
  );
}
