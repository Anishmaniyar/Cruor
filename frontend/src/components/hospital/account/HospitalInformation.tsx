"use client";

import { Building2, MapPin, Phone, Mail, FileText } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { useCurrentHospital } from "@/lib/use-current-hospital";

export default function HospitalInformation() {
  const { hospital, loading } = useCurrentHospital();

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!hospital) return null;

  const rows = [
    { label: "Hospital Name", value: hospital.name, icon: <Building2 size={16} /> },
    { label: "Email Address", value: hospital.email, icon: <Mail size={16} /> },
    { label: "Contact Number", value: hospital.phoneNo ?? "—", icon: <Phone size={16} /> },
    { label: "Hospital Address", value: hospital.address ?? "—", icon: <MapPin size={16} /> },
    { label: "Registration ID", value: hospital.registrationId, icon: <FileText size={16} /> },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hospital Information</CardTitle>
        <CardDescription>
          The information currently stored for your hospital.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="divide-y divide-border/50 rounded-2xl border border-border bg-surface">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center gap-3 px-4 py-3">
              <span className="shrink-0 text-text-muted">{row.icon}</span>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                  {row.label}
                </p>
                <p className="text-base font-medium text-text-primary">
                  {row.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
