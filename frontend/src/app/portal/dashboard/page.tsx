import Link from "next/link";
import { Bell, Calendar, Heart, Megaphone } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { donorUser, appointments, campaigns, notifications, donations } from "@/lib/mock-data";
import { formatDate, formatDateTime } from "@/lib/utils";

export default function DonorDashboard() {
  const upcomingApt = appointments.find((a) => a.status === "confirmed" || a.status === "pending");
  const upcomingCampaign = campaigns.find((c) => c.status === "active");
  const unreadNotifications = notifications.filter((n) => !n.read);

  return (
    <>
      <PageHeader
        label="Donor Portal"
        title={`Welcome, ${donorUser.name.split(" ")[0]}`}
        description="Your blood donation activity at a glance."
        action={
          <Link href="/portal/appointments/book">
            <Button>Book Appointment</Button>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Donations" value={donorUser.totalDonations} icon={<Heart className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Last Donation" value={formatDate(donorUser.lastDonation)} sub="Whole Blood — Metro General" />
        <StatCard label="Blood Group" value={donorUser.bloodGroup} alert sub="Universal donor type" icon={<Heart className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Notifications" value={unreadNotifications.length} sub="Unread messages" icon={<Bell className="h-5 w-5" strokeWidth={1.5} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Upcoming Appointment
            </h2>
            <Link href="/portal/appointments" className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline">View All</Link>
          </div>
          {upcomingApt ? (
            <div>
              <p className="font-serif text-2xl font-bold">{formatDateTime(upcomingApt.date)}</p>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{upcomingApt.location}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">{upcomingApt.type}</p>
              <div className="mt-3"><StatusBadge status={upcomingApt.status} /></div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming appointments.</p>
          )}
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <Megaphone className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Upcoming Campaign
            </h2>
            <Link href="/portal/campaigns" className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline">View All</Link>
          </div>
          {upcomingCampaign ? (
            <div>
              <p className="font-serif text-xl font-bold">{upcomingCampaign.title}</p>
              <p className="mt-1 font-sans text-sm text-muted-foreground">{upcomingCampaign.location}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {formatDate(upcomingCampaign.startDate)} — {formatDate(upcomingCampaign.endDate)}
              </p>
              <div className="mt-3"><StatusBadge status={upcomingCampaign.status} /></div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No active campaigns.</p>
          )}
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-accent" strokeWidth={1.5} />
          Recent Notifications
        </h2>
        <div className="border border-border divide-y divide-border">
          {notifications.slice(0, 3).map((n) => (
            <Link key={n.id} href="/portal/notifications" className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
              <div className={`mt-1 h-2 w-2 flex-shrink-0 ${n.read ? "bg-muted-foreground" : "bg-accent"}`} />
              <div>
                <p className="font-sans text-sm font-medium">{n.title}</p>
                <p className="font-body text-xs text-muted-foreground mt-0.5">{n.message}</p>
                <p className="font-mono text-[10px] text-muted-foreground mt-1">{formatDateTime(n.date)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-bold mb-4">Recent Donations</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {donations.slice(0, 3).map((d) => (
            <Link key={d.id} href={`/portal/donations/${d.id}`}>
              <Card hover>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{formatDate(d.date)}</p>
                <p className="font-serif text-lg font-bold mt-1">{d.type}</p>
                <p className="font-sans text-sm text-muted-foreground">{d.volume} · {d.location}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
