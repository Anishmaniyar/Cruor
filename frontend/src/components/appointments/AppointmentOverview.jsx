import {
  Calendar,
  CheckCircle,
  Hash,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AppointmentOverview() {
  return (
    <div className="w-full p-6 text-neutral-800">
      <Card className="overflow-hidden p-6 md:p-8">
        {/* HEADER */}
        <div className="flex items-start gap-3">
          <CheckCircle className="mt-0.5 h-6 w-6 shrink-0 text-emerald-600" />

          <div>
            <h1 className="text-xl font-bold tracking-tight text-emerald-600">
              Appointment Booked!
            </h1>

            <p className="mt-1 text-sm font-medium text-emerald-600/80">
              You will receive a confirmation mail shortly.
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* CLINIC DETAILS */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Test Centre
            </span>

            <h2 className="text-base font-bold text-neutral-900">
              Express Clinic
            </h2>

            <p className="mt-0.5 text-sm text-neutral-500">
              KPHB, Phase - II, Kukatpally, Hyderabad.
            </p>

            <Badge className="mt-3 border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
              <CheckCircle className="mr-1 h-3 w-3" />
              Samples will be collected from home
            </Badge>
          </div>

          <Button variant="outline">View Location</Button>
        </div>

        <Separator className="my-6" />

        {/* BOOKING DETAILS */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Booked For
            </span>

            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800">
              <User className="h-4 w-4 text-blue-500" />
              <span>Anish Maniyar</span>
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Booking ID
            </span>

            <div className="flex items-center gap-2 font-mono text-sm font-bold tracking-wide text-neutral-900">
              <Hash className="h-4 w-4 text-neutral-400" />
              <span>EKAPT12121212</span>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* DATE & ACTIONS */}
        <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-2">
          <div className="flex flex-wrap gap-8">
            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Date & Time
              </span>

              <div className="flex items-center gap-2 text-sm font-bold text-neutral-800">
                <Calendar className="h-4 w-4 text-blue-500" />
                <span>06:00 AM Sat, 10 Aug, 2026</span>
              </div>
            </div>

            <div>
              <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Blood Group
              </span>

              <Badge variant="destructive">O+</Badge>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3 md:mt-0">
            <Button variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Cancel Appointment
            </Button>

            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reschedule
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
