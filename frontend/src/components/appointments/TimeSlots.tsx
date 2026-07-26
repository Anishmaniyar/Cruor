"use client";

import { useState } from "react";
import { Clock } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const slots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
];

export default function TimeSlots() {
  const [selectedSlot, setSelectedSlot] = useState<string>("10:30 AM");

  return (
    <Card className="mt-6 p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Available Time Slots</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Select a convenient time for your appointment.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {slots.map((slot) => (
          <Button
            key={slot}
            variant={selectedSlot === slot ? "default" : "outline"}
            onClick={() => setSelectedSlot(slot)}
            className="justify-center"
          >
            <Clock className="mr-2 h-4 w-4" />
            {slot}
          </Button>
        ))}
      </div>
    </Card>
  );
}
