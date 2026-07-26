import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookingHeader() {
  return (
    <section className="mb-8">
      <Link
        href="/appointments"
        className="mb-3 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Appointments</span>
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">Book Appointment</h1>

      <p className="mt-2 text-muted-foreground">
        Schedule your blood donation appointment.
      </p>
    </section>
  );
}
