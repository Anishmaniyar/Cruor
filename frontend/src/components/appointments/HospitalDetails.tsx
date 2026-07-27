import { Building2, MapPin, Phone, Clock3, Droplets } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HospitalDetails() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
        <CardDescription>
          Review the hospital information before selecting your appointment.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Separator className="mb-6" />

        <div className="space-y-6">
          <div className="info-row !items-start">
            <Building2 className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Hospital</p>
              <p className="info-value">Ruby Hall Clinic</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <MapPin className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Location</p>
              <p className="text-sm text-text-primary">Shivajinagar, Pune</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Phone className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Phone</p>
              <p className="text-sm text-text-primary">+91 9876543210</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Clock3 className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Working Hours</p>
              <p className="text-sm text-text-primary">08:00 AM – 05:00 PM</p>
            </div>
          </div>

          <div className="info-row !items-start">
            <Droplets className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Donation Type</p>
              <Badge variant="outline">Whole Blood</Badge>
            </div>
          </div>

          <div className="info-row !items-start">
            <Droplets className="mt-1 h-5 w-5 text-text-muted" />
            <div>
              <p className="info-label">Your Blood Group</p>
              <Badge variant="default">O+</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
