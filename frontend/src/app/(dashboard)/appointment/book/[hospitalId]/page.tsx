"use client";

import BookingHeader from "@/components/appointments/BookingHeader";
import HospitalDetails from "@/components/appointments/HospitalDetails";
import BookingCalendar from "@/components/appointments/BookingCalendar";
import TimeSlots from "@/components/appointments/TimeSlots";
import BookingActions from "@/components/appointments/BookingActions";

export default function BookingHospitalPage() {
  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      <BookingHeader />

      <div className="grid lg:grid-cols-5 gap-6">
        <HospitalDetails />

        <section className="lg:col-span-3 space-y-6">
          <BookingCalendar />
          <TimeSlots />
          <BookingActions />
        </section>
      </div>
    </main>
  );
}
