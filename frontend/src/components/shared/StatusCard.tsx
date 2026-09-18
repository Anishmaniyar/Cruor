import {
  Calendar,
  CheckCircle,
  Clock,
  Hash,
  MapPin,
  RefreshCw,
  User,
  XCircle,
  CalendarX,
  Building2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Status = "NONE" | "ACTIVE" | "COMPLETED";

interface StatusCardData {
  title: string;
  subtitle?: string;
  location?: string;
  date?: string;
  bookedFor?: string;
  id?: string;
  badges?: { label: string; variant?: "default" | "secondary" | "success" }[];
  onReschedule?: () => void;
  onCancel?: () => void;
  /** Keeps the Cancel button visible but disabled while the request is in flight. */
  cancelDisabled?: boolean;
}

interface StatusCardProps {
  type: "appointment" | "campaign";
  status: Status;
  data?: StatusCardData;
}

export default function StatusCard({ type, status, data }: StatusCardProps) {
  /* ── Empty State ── */
  if (status === "NONE") {
    const emptyText =
      type === "appointment"
        ? "You don't have any upcoming appointments."
        : "You are not registered for any campaigns.";

    const actionText =
      type === "appointment"
        ? "Browse hospitals below to book your first appointment."
        : "Browse campaigns below to register.";

    return (
      <Card className="!p-8">
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="rounded-full bg-surface-hover p-4">
            {type === "appointment" ? (
              <CalendarX size={28} className="text-text-muted" />
            ) : (
              <Building2 size={28} className="text-text-muted" />
            )}
          </div>
          <p className="mt-4 text-base font-medium text-text-primary">{emptyText}</p>
          <p className="mt-1 text-sm text-text-secondary">{actionText}</p>
        </div>
      </Card>
    );
  }

  /* ── Active / Completed State ── */
  const statusLabel = status === "COMPLETED" ? "Completed" : "Active";
  const statusBannerClass = status === "COMPLETED" ? "bg-text-muted/10" : "bg-success/10";
  const statusTextClass = status === "COMPLETED" ? "text-text-muted" : "text-success";
  // statusIcon intentionally uses CheckCircle for both active and completed

  return (
    <Card className="overflow-hidden !p-0">
      {/* Status Banner */}
      <div className={`status-banner ${statusBannerClass}`}>
        <CheckCircle className={`h-4 w-4 ${statusTextClass}`} />
        <span className={`text-sm font-medium ${statusTextClass}`}>
          {type === "appointment" ? "Appointment" : "Campaign"} {statusLabel}
        </span>
        {data?.subtitle && (
          <span className="ml-auto text-xs text-text-muted">{data.subtitle}</span>
        )}
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          {/* Left: Primary Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="card-title">{data?.title ?? "Untitled"}</h2>
              {data?.location && (
                <div className="info-row mt-1">
                  <MapPin className="info-icon h-3.5 w-3.5" />
                  <span className="text-sm text-text-secondary">{data.location}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {data?.date && (
                <div className="info-row">
                  <Calendar className="info-icon" />
                  <div>
                    <p className="info-label">Date & Time</p>
                    <p className="info-value">{data.date}</p>
                  </div>
                </div>
              )}

              {data?.bookedFor && (
                <div className="info-row">
                  <User className="info-icon" />
                  <div>
                    <p className="info-label">{type === "appointment" ? "Booked For" : "Registered As"}</p>
                    <p className="info-value">{data.bookedFor}</p>
                  </div>
                </div>
              )}

              {data?.id && (
                <div className="info-row">
                  <Hash className="info-icon" />
                  <div>
                    <p className="info-label">{type === "appointment" ? "Booking ID" : "Registration ID"}</p>
                    <p className="info-value font-mono">{data.id}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex flex-col items-start gap-4 lg:items-end">
            {data?.badges && (
              <div className="flex items-center gap-2">
                {data.badges.map((badge) => (
                  <Badge key={badge.label} variant={badge.variant ?? "secondary"}>
                    {badge.label}
                  </Badge>
                ))}
              </div>
            )}

            {status === "ACTIVE" && (
              <div className="flex items-center gap-2">
                {data?.onReschedule && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={data.onReschedule}
                  >
                    <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                    {type === "appointment" ? "Reschedule" : "Update"}
                  </Button>
                )}
                {data?.onCancel && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-danger hover:bg-danger/10 hover:text-danger"
                    onClick={data.onCancel}
                    disabled={data.cancelDisabled}
                  >
                    <XCircle className="mr-1.5 h-3.5 w-3.5" />
                    {data.cancelDisabled ? "Cancelling…" : "Cancel"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
