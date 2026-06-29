import Link from "next/link";
import { CalendarBlank, Certificate, Megaphone, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { StaggerItem } from "@/components/shared/motion-wrapper";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donorUser, appointments, campaigns, notifications, donations } from "@/lib/mock-data";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function DonorDashboard() {
  const pendingApt = appointments.find((a) => a.status === "pending");
  const confirmedApt = appointments.find((a) => a.status === "confirmed");
  const nextApt = confirmedApt ?? pendingApt;
  const activeCampaign = campaigns.find((c) => c.status === "active");
  const unread = notifications.filter((n) => !n.read);
  const certReady = donations.filter((d) => d.certificateAvailable);

  return (
    <>
      <StaggerItem>
        <PageHeader
          label="Donor Portal"
          title={`Action queue for ${donorUser.name.split(" ")[0]}`}
          description="Tasks that need your attention before your next donation."
          action={
            <Link href="/portal/appointments/book">
              <Button>Book appointment</Button>
            </Link>
          }
        />
      </StaggerItem>

      <StaggerItem>
        <Section title="Requires action">
          <div className="divide-y divide-border border border-border">
            {unread.slice(0, 2).map((n) => (
              <Link key={n.id} href="/portal/notifications" className="flex items-start gap-4 p-4 transition-colors hover:bg-muted/30">
                <WarningCircle size={18} weight="fill" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <div>
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
                </div>
              </Link>
            ))}
            {pendingApt && (
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium">Confirm appointment slot</p>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDateTime(pendingApt.date)} · {pendingApt.location}</p>
                </div>
                <Link href={`/portal/appointments/${pendingApt.id}`}><Button size="sm">Review</Button></Link>
              </div>
            )}
            {certReady.length > 0 && (
              <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <Certificate size={18} className="mt-0.5 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-medium">Certificate ready to download</p>
                    <p className="mt-1 text-sm text-muted-foreground">{certReady.length} donation record(s)</p>
                  </div>
                </div>
                <Link href="/portal/certificates"><Button size="sm" variant="secondary">Open certificates</Button></Link>
              </div>
            )}
          </div>
        </Section>
      </StaggerItem>

      <StaggerItem>
        <Section
          title="Next scheduled items"
          action={<Link href="/portal/appointments" className="text-xs font-medium uppercase tracking-wider text-accent hover:underline">All appointments</Link>}
        >
          <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
            <div className="bg-background p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <CalendarBlank size={14} aria-hidden /> Appointment
              </div>
              {nextApt ? (
                <>
                  <p className="text-lg font-semibold tracking-tight">{formatDateTime(nextApt.date)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{nextApt.location}</p>
                  <div className="mt-3"><StatusBadge status={nextApt.status} /></div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No appointment scheduled.</p>
              )}
            </div>
            <div className="bg-background p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                <Megaphone size={14} aria-hidden /> Campaign
              </div>
              {activeCampaign ? (
                <>
                  <p className="text-lg font-semibold tracking-tight">{activeCampaign.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{formatDate(activeCampaign.startDate)} to {formatDate(activeCampaign.endDate)}</p>
                  <Link href={`/portal/campaigns/${activeCampaign.id}`} className="mt-3 inline-block text-xs font-medium uppercase tracking-wider text-accent hover:underline">
                    Register
                  </Link>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">No active campaigns.</p>
              )}
            </div>
          </div>
        </Section>
      </StaggerItem>

      <StaggerItem>
        <Section title="Recent activity">
          <div className="overflow-x-auto border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.slice(0, 3).map((d) => (
                  <tr key={d.id} className="border-b border-border last:border-b-0">
                    <td className="px-4 py-3">
                      <Link href={`/portal/donations/${d.id}`} className="font-medium hover:text-accent">{d.type}</Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{formatDate(d.date)}</td>
                    <td className="px-4 py-3"><StatusBadge status={d.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </StaggerItem>
    </>
  );
}
