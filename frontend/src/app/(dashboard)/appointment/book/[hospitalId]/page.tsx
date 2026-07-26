"use client";

import BookingHeader from "@/components/appointments/BookingHeader";
import HospitalDetails from "@/components/appointments/HospitalDetails";
import BookingCalendar from "@/components/appointments/BookingCalendar";
import TimeSlots from "@/components/appointments/TimeSlots";
import BookingActions from "@/components/appointments/BookingActions";
import { useState } from "react";

export default function BookingHospitalPage() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState("");
  return (
    <div>
      <BookingHeader />

      <div className="grid lg:grid-cols-5 gap-6">
        <HospitalDetails />

        <section className="lg:col-span-3">
          <BookingCalendar />

          <TimeSlots />

          <BookingActions />
        </section>
      </div>
    </div>
  );
}
