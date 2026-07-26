"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

export default function BookingCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Select Date</h2>

        <p className="text-sm text-muted-foreground">
          Choose a preferred donation date.
        </p>
      </div>

      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </Card>
  );
}
