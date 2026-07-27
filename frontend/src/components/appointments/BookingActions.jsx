import { Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BookingActions() {
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
              <p className="info-value">18 August 2026</p>
            </div>
          </div>

          <div className="info-row">
            <Clock className="h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Time</p>
              <p className="info-value">10:30 AM</p>
            </div>
          </div>
        </div>

        <Separator className="my-5" />

        <div className="flex gap-3">
          <Button variant="secondary" className="flex-1">
            Cancel
          </Button>
          <Button variant="primary" className="flex-1">
            Confirm Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
