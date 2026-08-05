import { Building2, MapPin, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface HospitalCardProps {
  hospital: {
    id: string;
    name: string;
    address?: string | null;
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/appointment/book/${hospital.id}`);
  };

  return (
    <Card className="group !p-0 transition-all duration-200 hover:border-border-light hover:shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
      {/* Header */}
      <div className="flex items-start gap-4 p-6 pb-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-hover">
          <Building2 className="h-6 w-6 text-text-secondary" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="card-title !text-base">{hospital.name}</h3>
          <div className="info-row mt-1.5">
            <MapPin className="info-icon h-3.5 w-3.5" />
            <span className="truncate text-sm text-text-secondary">
              {hospital.address || "Address not available"}
            </span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="p-6 pt-4">
        <Button
          variant="primary"
          className="w-full gap-2"
          onClick={handleClick}
        >
          Book Appointment
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </Card>
  );
}
