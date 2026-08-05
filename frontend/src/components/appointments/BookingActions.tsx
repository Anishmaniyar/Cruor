"use client";

import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { appointmentSchema } from "@/lib/validations/appointment";
import { bookAppointment } from "@/services/appointment.services";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BookingActionsProps {
  hospitalId: string | string[] | undefined;
  selectedDate: Date | null;
  selectedTime: string;
}

export default function BookingActions({
  hospitalId,
  selectedDate,
  selectedTime,
}: BookingActionsProps) {
  const router = useRouter();

  const convertTo24Hour = (time12h: string): string => {
    if (!time12h) return "";
    const [time, modifier] = time12h.split(" ");
    const [hourPart, minutes] = time.split(":");
    let hours = hourPart;

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = (parseInt(hours, 10) + 12).toString().padStart(2, "0");
    } else {
      hours = hours.padStart(2, "0");
    }
    return `${hours}:${minutes}`;
  };

  const handleSubmit = async () => {
    let resolvedHospitalId = "";
    if (Array.isArray(hospitalId)) {
      resolvedHospitalId = hospitalId[0];
    } else if (typeof hospitalId === "string") {
      resolvedHospitalId = hospitalId;
    }

    const payload = {
      hospitalId: resolvedHospitalId ?? "",
      // Use local date formatting — toISOString() shifts the day for UTC+
      // timezones (e.g. India evening selections would send the previous day).
      appointmentDate: selectedDate
        ? format(selectedDate, "yyyy-MM-dd")
        : "",
      appointmentTime: convertTo24Hour(selectedTime),
    };

    const result = appointmentSchema.safeParse(payload);

    if (!result.success) {
      toast.error("Please complete all appointment details.");
      return;
    }

    try {
      const response = await bookAppointment(result.data);

      toast.success(
        response.message || "Appointment booked successfully.",
      );

      router.push("/appointment");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;

      toast.error(
        err.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Selected Appointment</CardTitle>
        <CardDescription>
          Review your appointment before confirming.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Separator className="mb-5" />

        <div className="space-y-4">
          <div className="info-row">
            <Calendar className="h-5 w-5 text-text-muted" />

            <div>
              <p className="info-label">Date</p>

              <p className="info-value">
                {selectedDate
                  ? format(selectedDate, "dd MMMM yyyy")
                  : "Not selected"}
              </p>
            </div>
          </div>

          <div className="info-row">
            <Clock className="h-5 w-5 text-text-muted" />

            <div>
              <p className="info-label">Time</p>

              <p className="info-value">{selectedTime || "Not selected"}</p>
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex gap-3">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>

          <Button variant="primary" className="flex-1" onClick={handleSubmit}>
            Confirm Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
