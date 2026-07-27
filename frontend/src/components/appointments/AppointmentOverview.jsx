import {
  Calendar,
  CheckCircle,
  Clock,
  Hash,
  MapPin,
  RefreshCw,
  User,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AppointmentOverview() {
  return (
    <Card className="overflow-hidden !p-0">
      {/* Status Banner */}
      <div className="status-banner status-banner-success">
        <CheckCircle className="status-banner-icon h-4 w-4" />
        <span className="status-banner-text text-sm font-medium">
          Appointment Booked
        </span>
        <span className="ml-auto text-xs text-text-muted">
          Confirmation email sent
        </span>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Primary Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="card-title">Express Clinic</h2>
              <div className="info-row mt-1">
                <MapPin className="info-icon h-3.5 w-3.5" />
                <span className="text-sm text-text-secondary">
                  KPHB, Phase - II, Kukatpally, Hyderabad
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="info-row">
                <Calendar className="info-icon" />
                <div>
                  <p className="info-label">Date & Time</p>
                  <p className="info-value">Sat, 10 Aug 2026 • 06:00 AM</p>
                </div>
              </div>

              <div className="info-row">
                <User className="info-icon" />
                <div>
                  <p className="info-label">Booked For</p>
                  <p className="info-value">Anish Maniyar</p>
                </div>
              </div>

              <div className="info-row">
                <Hash className="info-icon" />
                <div>
                  <p className="info-label">Booking ID</p>
                  <p className="info-value font-mono">EKAPT12121212</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col items-start gap-4 lg:items-end">
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Clock className="mr-1 h-3 w-3" />
                O+
              </Badge>
              <Badge variant="success">Home Collection</Badge>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                Reschedule
              </Button>
              <Button variant="ghost" size="sm" className="text-danger hover:bg-danger/10 hover:text-danger">
                <XCircle className="mr-1.5 h-3.5 w-3.5" />
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
