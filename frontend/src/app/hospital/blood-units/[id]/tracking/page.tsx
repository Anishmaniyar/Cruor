import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow } from "@/components/ui/page-header";
import { BloodGroupBadge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getById, bloodUnits, trackingEvents } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";
import { MapPin } from "lucide-react";

export default async function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getById(bloodUnits, id);
  if (!unit) notFound();

  return (
    <>
      <BackLink href={`/hospital/blood-units/${id}`} />
      <PageHeader label="Tracking" title={`Journey — ${unit.unitId}`} description="End-to-end tracking from collection to storage." />
      <Card className="mb-6">
        <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <DetailRow label="Unit ID" value={<span className="font-mono">{unit.unitId}</span>} />
          <DetailRow label="Blood Group" value={<BloodGroupBadge group={unit.bloodGroup} />} />
          <DetailRow label="Current Location" value={unit.location} />
        </dl>
      </Card>

      <div className="border border-border">
        {trackingEvents.map((event, i) => (
          <div key={event.id} className={`flex gap-6 p-6 ${i < trackingEvents.length - 1 ? "border-b border-border" : ""}`}>
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center border ${i === trackingEvents.length - 1 ? "border-accent bg-accent/10 text-accent" : "border-border"}`}>
                <MapPin className="h-4 w-4" strokeWidth={1.5} />
              </div>
              {i < trackingEvents.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
            </div>
            <div className="flex-1 pb-4">
              <p className="font-serif text-lg font-bold">{event.event}</p>
              <p className="font-sans text-sm text-muted-foreground mt-1">{event.location}</p>
              <p className="font-mono text-xs text-muted-foreground mt-1">{formatDateTime(event.timestamp)} · {event.actor}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
