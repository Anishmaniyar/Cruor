import { notFound } from "next/navigation";
import { PageHeader, BackLink, DetailRow } from "@/components/ui/page-header";
import { BloodGroupBadge, StatusBadge } from "@/components/ui/badge";
import { Panel } from "@/components/ui/card";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import { getById, bloodUnits, trackingEvents } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default async function TrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const unit = getById(bloodUnits, id);
  if (!unit) notFound();

  return (
    <>
      <BackLink href={`/hospital/blood-units/${id}`} />
      <PageHeader label="Tracking" title={`Journey — ${unit.unitId}`} description="Audit trail from collection through storage." />
      <Panel className="mb-6">
        <dl>
          <DetailRow label="Unit ID" value={<span className="font-mono">{unit.unitId}</span>} />
          <DetailRow label="Blood group" value={<BloodGroupBadge group={unit.bloodGroup} />} />
          <DetailRow label="Current location" value={unit.location} />
          <DetailRow label="Lifecycle" value={<StatusBadge status={unit.lifecycle} />} />
        </dl>
      </Panel>

      <ol className="border border-border">
        {trackingEvents.map((event, i) => (
          <li key={event.id} className={`flex gap-6 p-6 ${i < trackingEvents.length - 1 ? "border-b border-border" : ""}`}>
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center border ${i === trackingEvents.length - 1 ? "border-accent bg-accent/10 text-accent" : "border-border"}`}>
                <MapPin size={16} aria-hidden />
              </div>
              {i < trackingEvents.length - 1 && <div className="mt-2 w-px flex-1 bg-border" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold"><StatusBadge status={event.event as "COLLECTED"} /></p>
              <p className="mt-1 text-sm text-muted-foreground">{event.location}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{formatDateTime(event.timestamp)} · {event.actor}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
