import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookingHeader() {
  return (
    <section className="mb-8">
      <Link
        href="/appointments"
        className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary mb-3"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Appointments</span>
      </Link>

      <h1 className="page-title">Book Appointment</h1>
      <p className="page-description mt-1">
        Schedule your blood donation appointment.
      </p>
    </section>
  );
}
