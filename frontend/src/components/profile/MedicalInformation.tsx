import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function MedicalInformation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Information</CardTitle>
        <CardDescription>
          Your donor medical profile.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="info-label mb-1">Blood Group</p>
            <Badge variant="default" className="mt-0.5 h-6 px-3">O+</Badge>
          </div>
          <div>
            <p className="info-label mb-1">Weight</p>
            <p className="info-value">72 kg</p>
          </div>
          <div>
            <p className="info-label mb-1">Last Donation Date</p>
            <p className="info-value">12 June 2026</p>
          </div>
          <div>
            <p className="info-label mb-1">Next Eligible Date</p>
            <p className="text-sm font-medium text-success">12 September 2026</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="info-label mb-2">Medical Notes</p>
          <div className="rounded-xl border border-border bg-surface-secondary p-4">
            <p className="text-sm text-text-secondary">
              No medical notes recorded. This section will display important health information
              provided by your healthcare professional.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
