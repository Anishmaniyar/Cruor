import {
  Building2,
  Megaphone,
  MapPin,
  CalendarDays,
  Clock,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export interface DonationRecord {
  id: string;
  type: "hospital" | "campaign";
  title: string;
  location: string;
  date: string;
  time?: string;
  status: "completed" | "cancelled" | "no-show" | "rejected";
}

interface DonationTimelineProps {
  donations: DonationRecord[];
}

function StatusBadge({ status }: { status: DonationRecord["status"] }) {
  const map: Record<DonationRecord["status"], { label: string; variant: "success" | "secondary" | "outline" | "danger" }> = {
    completed: { label: "Completed", variant: "success" },
    cancelled: { label: "Cancelled", variant: "secondary" },
    "no-show": { label: "No Show", variant: "outline" },
    rejected: { label: "Rejected", variant: "danger" },
  };

  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

export default function DonationTimeline({ donations }: DonationTimelineProps) {
  if (donations.length === 0) {
    return (
      <Card className="!p-10">
        <div className="empty-state">
          <div className="empty-state-icon-box">
            <CalendarDays className="empty-state-icon" />
          </div>
          <p className="empty-state-title">No Donation History</p>
          <p className="empty-state-description">
            You haven&apos;t completed any donations yet. Book an appointment or register for
            a campaign to begin your donation journey.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {donations.map((donation) => {
        const Icon = donation.type === "hospital" ? Building2 : Megaphone;

        return (
          <Card key={donation.id} className="!p-0">
            <div className="flex items-start gap-4 p-6">
              {/* Type Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-secondary">
                <Icon size={22} className="text-text-secondary" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                      {donation.type === "hospital" ? "Hospital Appointment" : "Blood Donation Campaign"}
                    </p>
                    <h3 className="mt-0.5 text-base font-semibold text-text-primary">
                      {donation.title}
                    </h3>
                  </div>
                  <StatusBadge status={donation.status} />
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-text-secondary">
                  <span className="info-row">
                    <MapPin size={14} className="text-text-muted" />
                    {donation.location}
                  </span>
                  <span className="info-row">
                    <CalendarDays size={14} className="text-text-muted" />
                    {donation.date}
                  </span>
                  {donation.time && (
                    <span className="info-row">
                      <Clock size={14} className="text-text-muted" />
                      {donation.time}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
