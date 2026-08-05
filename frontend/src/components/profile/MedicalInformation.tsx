"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useCurrentUser } from "@/lib/use-current-user";

export default function MedicalInformation() {
  const { user, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

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
            <Badge variant="default" className="mt-0.5 h-6 px-3">
              {user.bloodGroup ?? "—"}
            </Badge>
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
