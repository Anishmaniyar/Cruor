import { Building2, MapPin, Phone, Clock3, Droplets } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HospitalDetails() {
  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Appointment Details</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review the hospital information before selecting your appointment.
        </p>
      </div>

      <Separator />

      <div className="space-y-6 py-6">
        <div className="flex items-start gap-3">
          <Building2 className="mt-1 h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Hospital</p>

            <h3 className="font-semibold">Ruby Hall Clinic</h3>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="mt-1 h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Location</p>

            <p>Shivajinagar, Pune</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone className="mt-1 h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Phone</p>

            <p>+91 9876543210</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock3 className="mt-1 h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Working Hours</p>

            <p>08:00 AM – 05:00 PM</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Droplets className="mt-1 h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Donation Type</p>

            <Badge variant="outline">Whole Blood</Badge>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Droplets className="mt-1 h-5 w-5 text-red-500" />

          <div>
            <p className="text-sm text-muted-foreground">Your Blood Group</p>

            <Badge className="bg-red-50 text-red-600 hover:bg-red-50">O+</Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
