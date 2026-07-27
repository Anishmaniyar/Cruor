import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function PersonalInformation() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Manage your personal details.
            </CardDescription>
          </div>
          <Button variant="secondary" size="sm">
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p className="info-label mb-1">Full Name</p>
            <p className="info-value">George Anderson</p>
          </div>
          <div>
            <p className="info-label mb-1">Email</p>
            <p className="info-value">george.anderson@email.com</p>
          </div>
          <div>
            <p className="info-label mb-1">Phone Number</p>
            <p className="info-value">+91 98765 43210</p>
          </div>
          <div>
            <p className="info-label mb-1">Gender</p>
            <p className="info-value">Male</p>
          </div>
          <div>
            <p className="info-label mb-1">Date of Birth</p>
            <p className="info-value">15 March 1995</p>
          </div>
          <div>
            <p className="info-label mb-1">Address</p>
            <p className="info-value">123 MG Road, Shivajinagar, Pune</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
