"use client";

import { useEffect, useState } from "react";
import { Building2, MapPin, Phone, Loader2 } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getHospitalById, type Hospital } from "@/services/hospital.services";
import { getErrorMessage } from "@/lib/error";

interface HospitalDetailsProps {
  hospitalId: string | string[] | undefined;
}

export default function HospitalDetails({ hospitalId }: HospitalDetailsProps) {
  const [hospital, setHospital] = useState<Hospital | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const id = Array.isArray(hospitalId) ? hospitalId[0] : hospitalId;

    Promise.resolve(id ? getHospitalById(id) : null)
      .then((response) => {
        if (!cancelled && response) setHospital(response.data.hospital);
      })
      .catch((e) => {
        if (!cancelled) setError(getErrorMessage(e, "Failed to load hospital"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hospitalId]);

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

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 size={20} className="animate-spin text-text-muted" />
          </div>
        )}

        {error && <p className="py-6 text-center text-sm text-danger">{error}</p>}

        {!loading && !error && hospital && (
          <div className="space-y-6">
            <div className="info-row !items-start">
              <Building2 className="mt-1 h-5 w-5 text-text-muted" />
              <div>
                <p className="info-label">Hospital</p>
                <p className="info-value">{hospital.name}</p>
              </div>
            </div>

            <div className="info-row !items-start">
              <MapPin className="mt-1 h-5 w-5 text-text-muted" />
              <div>
                <p className="info-label">Location</p>
                <p className="text-sm text-text-primary">
                  {hospital.address || "—"}
                </p>
              </div>
            </div>

            <div className="info-row !items-start">
              <Phone className="mt-1 h-5 w-5 text-text-muted" />
              <div>
                <p className="info-label">Phone</p>
                <p className="text-sm text-text-primary">
                  {hospital.phoneNo || "—"}
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
