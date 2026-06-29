import Link from "next/link";
import { WarningCircle, Package, PaperPlaneTilt, ArrowsLeftRight } from "@phosphor-icons/react/dist/ssr";
import { StaggerItem } from "@/components/shared/motion-wrapper";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/card";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { bloodRequests, transfers, appointments, inventoryByGroup } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function HospitalDashboard() {
  const openRequests = bloodRequests.filter((r) => r.status === "open");
  const pendingAppointments = appointments.filter((a) => a.status === "pending");
  const pendingTransfers = transfers.filter((t) => t.status === "pending" || t.status === "in-transit");
  const atRiskGroups = inventoryByGroup.filter((g) => g.status === "critical" || g.status === "low");

  return (
    <>
      <StaggerItem>
        <PageHeader
          label="Hospital Portal"
          title="Operations queue"
          description="Pending confirmations, open requests, and inventory risks requiring action."
        />
      </StaggerItem>

      <StaggerItem>
        <Section title="Requires action now">
          <div className="divide-y divide-border border border-border">
            {pendingAppointments.map((a) => (
              <div key={a.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">Appointment awaiting confirmation</p>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDateTime(a.date)} · {a.type}</p>
                </div>
                <Link href={`/hospital/appointments/${a.id}`}><Button size="sm">Confirm or reject</Button></Link>
              </div>
            ))}
            {openRequests.map((r) => (
              <div key={r.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <WarningCircle size={18} weight="fill" className="mt-0.5 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-medium">{r.hospital} · {r.units} units</p>
                    <div className="mt-2 flex gap-2">
                      <BloodGroupBadge group={r.bloodGroup} />
                      <StatusBadge status={r.urgency} />
                    </div>
                  </div>
                </div>
                <Link href={`/hospital/requests/${r.id}`}><Button size="sm">Review request</Button></Link>
              </div>
            ))}
            {pendingTransfers.map((t) => (
              <div key={t.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">Transfer {t.status === "pending" ? "awaiting approval" : "in transit"}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.from} to {t.to}</p>
                </div>
                <Link href={`/hospital/transfers/${t.id}`}><Button size="sm" variant="secondary">Update transfer</Button></Link>
              </div>
            ))}
            {pendingAppointments.length === 0 && openRequests.length === 0 && pendingTransfers.length === 0 && (
              <p className="p-6 text-sm text-muted-foreground">No urgent queue items. Monitor inventory and scheduled operations below.</p>
            )}
          </div>
        </Section>
      </StaggerItem>

      <StaggerItem>
        <Section
          title="At-risk inventory"
          action={<Link href="/hospital/inventory" className="text-xs font-medium uppercase tracking-wider text-accent hover:underline">Full inventory</Link>}
        >
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Group</th>
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Units</th>
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Risk</th>
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {atRiskGroups.map((g) => (
                  <tr key={g.group} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3"><BloodGroupBadge group={g.group} /></td>
                    <td className="px-4 py-3 font-mono">{g.units}</td>
                    <td className="px-4 py-3"><StatusBadge status={g.status} /></td>
                    <td className="px-4 py-3">
                      <Link href="/hospital/requests/create" className="text-xs font-medium uppercase tracking-wider text-accent hover:underline">
                        Create request
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </StaggerItem>

      <StaggerItem>
        <Section title="Recent operational changes">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="border border-border p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <PaperPlaneTilt size={14} aria-hidden /> Latest requests
              </div>
              <ul className="space-y-3">
                {bloodRequests.slice(0, 2).map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-4">
                    <span className="text-sm">{r.hospital}</span>
                    <StatusBadge status={r.status} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-border p-4">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <ArrowsLeftRight size={14} aria-hidden /> Latest transfers
              </div>
              <ul className="space-y-3">
                {transfers.slice(0, 2).map((t) => (
                  <li key={t.id} className="flex items-center justify-between gap-4">
                    <span className="text-sm truncate">{t.to}</span>
                    <StatusBadge status={t.status} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </StaggerItem>
    </>
  );
}
