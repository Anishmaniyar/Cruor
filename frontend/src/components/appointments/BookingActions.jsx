import { Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BookingActions() {
  return (
    <Card className="mt-6 p-6">
      <div>
        <h2 className="text-lg font-semibold">Selected Appointment</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review your appointment before confirming.
        </p>
      </div>

      <Separator className="my-5" />

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Date</p>

            <p className="font-medium">18 August 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Time</p>

            <p className="font-medium">10:30 AM</p>
          </div>
        </div>
      </div>

      <Separator className="my-5" />

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>

        <Button className="flex-1">Confirm Appointment</Button>
      </div>
    </Card>
  );
}
