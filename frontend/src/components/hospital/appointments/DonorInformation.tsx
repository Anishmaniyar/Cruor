import { Droplets, Phone, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Donor {
  fullName: string;
  bloodGroup?: string | null;
  phone?: string | null;
  id?: string;
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
            .join("")
            .slice(0, 2)}
        </div>
        <div>
          <h3 className="text-base font-semibold text-text-primary">
            {donor.fullName}
          </h3>
          <p className="text-sm text-text-secondary">Donor</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {donor.bloodGroup && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <Droplets className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="info-label">Blood Group</p>
              <p className="text-sm font-semibold text-text-primary">
                {donor.bloodGroup}
              </p>
            </div>
          </div>
        )}

        {donor.phone && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <Phone className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Phone</p>
              <p className="text-sm font-medium text-text-primary">
                {donor.phone}
              </p>
            </div>
          </div>
        )}

        {donor.id && (
          <div className="info-row rounded-lg bg-surface-secondary px-4 py-3">
            <Hash className="h-4 w-4 text-text-muted shrink-0" />
            <div>
              <p className="info-label">Donor ID</p>
              <p className="text-sm font-medium text-text-primary font-mono">
                {donor.id.slice(0, 12)}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
