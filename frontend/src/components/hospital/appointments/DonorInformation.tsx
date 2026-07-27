import { User, Droplets, Calendar, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Donor {
  fullName: string;
  bloodGroup: string;
  age: number;
  phone: string;
}

interface DonorInformationProps {
  donor: Donor;
}

export default function DonorInformation({ donor }: DonorInformationProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Donor Information</h2>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-secondary text-lg font-semibold text-text-primary">
          {donor.fullName
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {donor.fullName}
          </h3>
          <p className="text-sm text-text-secondary">Donor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Droplets className="h-4 w-4 text-primary shrink-0" />
          <div>
            <p className="info-label">Blood Group</p>
            <p className="text-sm font-semibold text-text-primary">
              {donor.bloodGroup}
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Calendar className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Age</p>
            <p className="text-sm font-medium text-text-primary">
              {donor.age} years
            </p>
          </div>
        </div>

        <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
          <Phone className="h-4 w-4 text-text-muted shrink-0" />
          <div>
            <p className="info-label">Phone</p>
            <p className="text-sm font-medium text-text-primary">
              {donor.phone}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
