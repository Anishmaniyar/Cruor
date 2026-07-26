import Link from "next/link";
import {
  Building2,
  MapPin,
  Clock3,
  Star,
  ArrowRight,
  Droplets,
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
    <Card className="overflow-hidden rounded-2xl border-zinc-800 bg-zinc-950 text-white transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-red-500/10">
      <div className="p-6">
        {/* Top */}
        <div className="flex items-start justify-between">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600">
            <Building2 className="h-8 w-8 text-white" />
          </div>

          <Badge className="border-0 bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/20">
            <Star className="mr-1 h-3 w-3 fill-yellow-400" />
            {hospital.rating}
          </Badge>
        </div>

        {/* Hospital */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight">{hospital.name}</h2>

          <div className="mt-2 flex items-center gap-2 text-zinc-400">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{hospital.location}</span>
          </div>
        </div>

        {/* Info */}
        <div className="mt-8 space-y-4 rounded-xl bg-zinc-900 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
              <Droplets className="h-4 w-4" />
              <span>Donation</span>
            </div>

            <Badge variant="secondary">{hospital.donationType}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-400">
              <Clock3 className="h-4 w-4" />
              <span>Working Hours</span>
            </div>

            <span className="text-sm font-medium">{hospital.workingHours}</span>
          </div>
        </div>

        {/* Availability */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <div>
            <p className="text-sm text-zinc-400">Available Today</p>

            <p className="font-semibold text-emerald-400">
              {hospital.availableSlots} Slots Left
            </p>
          </div>

          <div className="h-3 w-3 rounded-full bg-emerald-500" />
        </div>

        {/* CTA */}
        <Link href={`/appointments/book/${hospital.id}`}>
          <Button className="mt-6 w-full gap-2 rounded-xl bg-red-600 hover:bg-red-700">
            Book Appointment
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
