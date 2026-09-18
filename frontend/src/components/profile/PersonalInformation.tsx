"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useCurrentUser } from "@/lib/use-current-user";
import { parseDateOnly } from "@/lib/date-utils";

function formatDate(value: string | null): string {
  if (!value) return "—";
  // parseDateOnly keeps the calendar day stable across timezones.
  const date = parseDateOnly(value);
  if (!date) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PersonalInformation() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  const rows = [
    { label: "Full Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Phone Number", value: user.phoneNo ?? "—" },
    { label: "Gender", value: user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—" },
    { label: "Date of Birth", value: formatDate(user.dateOfBirth) },
    { label: "Blood Group", value: user.bloodGroup ?? "—" },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Your account details as registered with Vital Drops.
            </CardDescription>
          </div>
          <Button variant="secondary" size="sm" disabled title="Profile update endpoint is not implemented on the backend yet">
            Edit
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {rows.map((row) => (
            <div key={row.label}>
              <p className="info-label mb-1">{row.label}</p>
              <p className="info-value">{row.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
