import Link from "next/link";
import {
  Building2,
  MapPin,
  Clock3,
  Star,
  ArrowRight,
  Droplets,
  CalendarCheck,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HospitalCardProps {
  hospital: {
    id: string;
    name: string;
    location: string;
    rating: number;
    workingHours: string;
    donationType: string;
    availableSlots: number;
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <Card className="group !p-0 transition-all duration-200 hover:border-border-light hover:shadow-[0_1px_4px_rgba(0,0,0,0.15)]">
      {/* Header: Icon & Rating */}
      <div className="flex items-start justify-between p-6 pb-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-hover transition-colors group-hover:bg-surface-hover">
          <Building2 className="h-6 w-6 text-text-secondary transition-colors group-hover:text-text-primary" />
        </div>
        <Badge variant="secondary" className="gap-1">
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {hospital.rating}
        </Badge>
      </div>

      {/* Hospital Info */}
      <div className="px-5 pt-4">
        <h3 className="card-title !text-base">{hospital.name}</h3>
        <div className="info-row mt-1.5">
          <MapPin className="info-icon h-3.5 w-3.5" />
          <span className="truncate text-sm text-text-secondary">{hospital.location}</span>
        </div>
      </div>

      {/* Info Grid */}
      <div className="mx-6 mt-4 grid grid-cols-2 gap-3">
        <div className="info-row rounded-lg bg-surface-secondary px-3 py-3">
          <Droplets className="info-icon" />
          <div>
            <p className="meta-label">Donation</p>
            <p className="text-xs font-medium text-text-secondary">{hospital.donationType}</p>
          </div>
        </div>
        <div className="info-row rounded-lg bg-surface-secondary px-3 py-3">
          <Clock3 className="info-icon" />
          <div>
            <p className="meta-label">Hours</p>
            <p className="text-xs font-medium text-text-secondary">{hospital.workingHours}</p>
          </div>
        </div>
      </div>

      {/* Availability */}
      <div className="mx-6 mt-4 flex items-center justify-between rounded-lg border border-success/20 bg-success/5 px-3 py-3">
        <div className="info-row">
          <CalendarCheck className="h-4 w-4 text-success" />
          <span className="text-xs text-text-secondary">Available Today</span>
        </div>
        <span className="text-xs font-medium text-success">{hospital.availableSlots} slots</span>
      </div>

      {/* CTA */}
      <div className="p-6 pt-4">
        <Link href={`/appointment/book/${hospital.id}`}>
          <Button variant="primary" className="w-full gap-2">
            Book Appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
