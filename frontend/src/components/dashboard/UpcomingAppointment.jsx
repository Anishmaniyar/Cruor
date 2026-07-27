import {
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function UpcomingAppointment() {
  return (
    <Card className="flex h-full flex-col overflow-hidden !p-0">
      {/* Status Banner */}
      <div className="status-banner status-banner-success">
        <CheckCircle2 className="status-banner-icon h-4 w-4" />
        <span className="status-banner-text text-sm font-medium">
          Upcoming Appointment
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-4">
          <h3 className="card-title !text-base">City Blood Bank</h3>
          <div className="info-row mt-1.5">
            <MapPin className="info-icon h-3.5 w-3.5" />
            <span className="text-sm text-text-secondary">
              123 MG Road, 45 Colony, ABC, Pune
            </span>
          </div>
        </div>

        <div className="mb-4 flex flex-wrap gap-4">
          <div className="info-row">
            <Calendar className="info-icon" />
            <div>
              <p className="meta-label">Date</p>
              <p className="text-sm font-medium text-text-primary">Sat, 20 Aug 2026</p>
            </div>
          </div>
          <div className="info-row">
            <Clock className="info-icon" />
            <div>
              <p className="meta-label">Time</p>
              <p className="text-sm font-medium text-text-primary">10:30 AM</p>
            </div>
          </div>
        </div>

        <div className="mb-4 flex gap-6">
          <div>
            <p className="meta-label">Donor ID</p>
            <p className="meta-value">VD-1024</p>
          </div>
          <div>
            <p className="meta-label">Appointment ID</p>
            <p className="meta-value">API-98765</p>
          </div>
        </div>

        <div className="mb-4">
          <Badge variant="success">Confirmed</Badge>
        </div>

        <div className="flex-1" />

        <Button variant="secondary" className="w-full gap-2">
          View Appointment Details
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
