"use client";

import { Mail, Phone, Calendar, Droplets, User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useCurrentUser } from "@/lib/use-current-user";

function formatDate(value: string | null): string {
  if (!value) return "—";
  // Date-only values (YYYY-MM-DD) are parsed as UTC midnight by Date; append
  // a local time so the displayed day does not shift by timezone.
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value);
  if (isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function capitalize(value: string): string {
  if (!value) return "—";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function ProfileOverview() {
  const { user, loading, error, refetch } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-sm text-text-secondary">
          {error ?? "Failed to load your profile."}
        </p>
        <Button variant="secondary" size="sm" className="mt-4" onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  const details = [
    { label: "Full Name", value: user.name, icon: <User size={16} /> },
    { label: "Email", value: user.email, icon: <Mail size={16} /> },
    {
      label: "Phone Number",
      value: user.phoneNo ?? "—",
      icon: <Phone size={16} />,
    },
    { label: "Gender", value: capitalize(user.gender ?? "") },
    {
      label: "Date of Birth",
      value: formatDate(user.dateOfBirth),
      icon: <Calendar size={16} />,
    },
    { label: "Blood Group", value: user.bloodGroup ?? "—" },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-surface-hover ring-2 ring-border">
          <User size={40} className="text-text-muted" />
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {user.name}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {user.bloodGroup && (
              <Badge variant="default" className="h-6 gap-1 px-3">
                <Droplets size={12} />
                {user.bloodGroup}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Personal Details (fields returned by GET /auth/me) */}
      <div className="divide-y divide-border/50 rounded-2xl border border-border bg-surface">
        {details.map((item) => (
          <div
            key={item.label}
            className="flex items-start justify-between gap-4 px-4 py-3"
          >
            <div className="flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {item.label}
              </p>
              <div className="mt-1 flex items-center gap-2">
                {item.icon && (
                  <span className="shrink-0 text-text-muted">{item.icon}</span>
                )}
                <span className="text-base font-medium text-text-primary">
                  {item.value}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        className="w-full sm:w-auto"
        disabled
        title="Profile update endpoint is not implemented on the backend yet"
      >
        Update Profile
      </Button>
      <p className="text-xs text-text-muted">
        Profile updates are not available yet — the backend does not expose an
        update endpoint for donor profiles.
      </p>
    </div>
  );
}
