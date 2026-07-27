"use client";

import { Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 1. Define the props interface to match the parent state types
interface TimeSlotsProps {
  selectedTime: string;
  onTimeChange: React.Dispatch<React.SetStateAction<string>>;
}

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

// 2. Destructure the props in the function arguments
export default function TimeSlots({
  selectedTime,
  onTimeChange,
}: TimeSlotsProps) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Available Time Slots</CardTitle>
        <CardDescription>
          Select a convenient time for your appointment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {slots.map((slot) => (
            <Button
              key={slot}
              variant={selectedTime === slot ? "primary" : "secondary"}
              onClick={() => onTimeChange(slot)}
              className="justify-center"
            >
              <Clock className="mr-2 h-4 w-4" />
              {slot}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
