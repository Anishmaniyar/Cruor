"use client";

import { useState } from "react";
import BookingHeader from "@/components/appointments/BookingHeader";
import HospitalDetails from "@/components/appointments/HospitalDetails";
import BookingCalendar from "@/components/appointments/BookingCalendar";
import TimeSlots from "@/components/appointments/TimeSlots";
import BookingActions from "@/components/appointments/BookingActions";
import { useParams } from "next/navigation";

export default function BookingHospitalPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const { hospitalId } = useParams();

  return (
    <main className="min-h-screen space-y-8 p-6 lg:p-8">
      <BookingHeader />

      <div className="grid lg:grid-cols-5 gap-6">
        <HospitalDetails hospitalId={hospitalId} />

        <section className="lg:col-span-3 space-y-6">
          <BookingCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
          />

          <TimeSlots
            selectedTime={selectedTime}
            onTimeChange={setSelectedTime}
          />

          <BookingActions
            hospitalId={hospitalId}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          />
        </section>
      </div>
    </main>
  );
}
