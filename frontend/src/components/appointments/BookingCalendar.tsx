"use client";

import { toast } from "sonner";

import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

interface BookingCalendarProps {
  //  Accept null from parent state types
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export default function BookingCalendar({
  selectedDate,
  onDateChange,
}: BookingCalendarProps) {
  //  Match react-day-picker's internal signature (Date | undefined)
  const handleSelect = (date: Date | undefined) => {
    // If user clears selection, send null up to parent state
    if (!date) {
      onDateChange(null);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) {
      toast.error("Please select today or a future date.");
      return;
    }

    // Pass valid date back up to parent
    onDateChange(date);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Date</CardTitle>
        <CardDescription>Choose your preferred donation date.</CardDescription>
      </CardHeader>

      <CardContent>
        <Calendar
          mode="single"
          //  Convert null to undefined for shadcn compatibility
          selected={selectedDate ?? undefined}
          onSelect={handleSelect}
          className="rounded-md border"
          // UX Bonus: Gray out past dates so users cannot click them
          disabled={(day) => day < new Date(new Date().setHours(0, 0, 0, 0))}
        />
      </CardContent>
    </Card>
  );
}
