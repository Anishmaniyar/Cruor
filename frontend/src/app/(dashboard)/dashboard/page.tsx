"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Droplets,
  Heart,
  Calendar,
  CalendarCheck,
  ShieldCheck,
  ArrowRight,
  Bell,
  MapPin,
  CalendarDays,
  ArrowUpRight,
  CheckCircle,
  Clock,
  Megaphone,
  Search,
  History,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDashboard, type DashboardData } from "@/services/dashboard.services";
import { getDonationDashboard, type DonationDashboardData } from "@/services/donation.services";
import { getMyAppointments } from "@/services/appointment.services";
import { useCurrentUser } from "@/lib/use-current-user";
import { getErrorMessage } from "@/lib/error";

/* ─── Skeleton components ─── */
function MetricSkeleton() {
  return (
    <div className="kpi-card animate-pulse">
      <div className="flex items-start justify-between">
        <div className="h-3 w-20 rounded bg-surface-hover" />
        <div className="h-8 w-8 rounded-lg bg-surface-hover" />
      </div>
      <div className="mt-4">
        <div className="h-7 w-12 rounded bg-surface-hover" />
        <div className="mt-1 h-3 w-28 rounded bg-surface-hover" />
      </div>
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-surface p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-32 rounded bg-surface-hover" />
        <div className="h-3 w-16 rounded bg-surface-hover" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-12 rounded-lg bg-surface-hover" />
        ))}
      </div>
    </div>
  );
}

/* ─── Empty state component ─── */
function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-box">
        <Icon className="empty-state-icon" />
      </div>
      <p className="empty-state-title">{title}</p>
      <p className="empty-state-description">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="secondary" size="sm" className="mt-4">
            {actionLabel}
            <ArrowRight className="h-3.5 w-3.5 ml-1" />
          </Button>
        </Link>
      )}
    </div>
  );
}

/* ─── Format helpers ─── */
function formatDate(dateStr: string): string {
  const d = /^\d{4}-\d{2}-\d{2}$/.test(dateStr)
    ? new Date(`${dateStr}T00:00:00`)
    : new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [donationData, setDonationData] = useState<DonationDashboardData | null>(null);
  const [appointmentData, setAppointmentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useCurrentUser();

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dash, donation, appointments] = await Promise.allSettled([
        getDashboard(),
        getDonationDashboard(),
        getMyAppointments(),
      ]);

      if (dash.status === "fulfilled") setDashboardData(dash.value);
      if (donation.status === "fulfilled") setDonationData(donation.value.data);
      if (appointments.status === "fulfilled") setAppointmentData(appointments.value.data);
    } catch (e) {
      setError(getErrorMessage(e, "Failed to load dashboard"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  // ─── Error state ───
  if (error && !loading) {
    return (
      <main className="flex min-h-screen items-center justify-center p-12">
        <div className="w-full max-w-md rounded-xl border border-border bg-surface p-8 text-center">
          <AlertCircle className="h-8 w-8 text-danger mx-auto mb-3" />
          <p className="text-sm text-text-secondary">{error}</p>
          <Button variant="secondary" size="sm" className="mt-4" onClick={loadDashboard}>
            Try again
          </Button>
        </div>
      </main>
    );
  }

  // ─── Loading state ───
  if (loading) {
    return (
      <main className="min-h-screen space-y-6 p-6 lg:p-8">
        <div className="space-y-1">
          <div className="h-7 w-32 rounded bg-surface-hover animate-pulse" />
          <div className="h-4 w-64 rounded bg-surface-hover animate-pulse" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <MetricSkeleton key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CardSkeleton />
          </div>
          <div className="space-y-4">
            <CardSkeleton />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <CardSkeleton />
          </div>
          <div>
            <CardSkeleton />
          </div>
        </div>
      </main>
    );
  }

  // ─── Derived data ───
  const totalDonations = donationData?.totalDonations ?? dashboardData?.totalDonations ?? 0;
  const livesImpacted = donationData?.livesImpacted ?? dashboardData?.livesImpacted ?? 0;
  const donationHistory = donationData?.donationHistory ?? [];
  const nextAppointment = dashboardData?.nextAppointment ?? null;
  const eligibilityDate = dashboardData?.eligiblity ?? null;
  const nearbyCampaigns = dashboardData?.nearByCampaigns ?? [];

  // Upcoming appointments from appointment service
  const upcomingAppointments = appointmentData?.appointments?.filter(
    (apt: any) => apt.status === "BOOKED" || apt.status === "CONFIRMED"
  ) ?? [];

  const nextApt = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <main className="min-h-screen space-y-6 p-6 lg:p-8">
      {/* ─── Header ─── */}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">
            Your donation activity and upcoming opportunities.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-all hover:border-border-light hover:text-text-primary">
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-success" />
          </button>
          {user?.bloodGroup && (
            <div className="flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3">
              <Droplets size={14} className="text-primary" />
              <span className="text-sm font-medium text-text-primary">{user.bloodGroup}</span>
            </div>
          )}
        </div>
      </header>

      {/* ─── Summary Metrics ─── */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Donations */}
        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Total Donations</span>
            <div className="kpi-icon-box text-primary bg-primary/10">
              <Droplets size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="kpi-value">{totalDonations}</h2>
            <p className="mt-1 text-xs text-text-muted">
              {totalDonations === 0 ? "No donations yet" : `${totalDonations} total donation${totalDonations > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {/* Lives Impacted */}
        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Lives Impacted</span>
            <div className="kpi-icon-box text-success bg-success/10">
              <Heart size={16} />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="kpi-value">{livesImpacted}</h2>
            <p className="mt-1 text-xs text-text-muted">
              {livesImpacted === 0 ? "Start donating to impact lives" : `${livesImpacted} lives impacted`}
            </p>
          </div>
        </div>

        {/* Upcoming Appointment */}
        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Upcoming Appointment</span>
            <div className="kpi-icon-box text-secondary-accent bg-secondary-accent/10">
              <CalendarCheck size={16} />
            </div>
          </div>
          <div className="mt-4">
            {nextApt ? (
              <>
                <h2 className="kpi-value text-lg">{formatDate(nextApt.appointmentDate)}</h2>
                <p className="mt-1 text-xs text-text-muted">
                  {formatTime(nextApt.appointmentTime)} — {nextApt.hospital?.name ?? "Hospital"}
                </p>
              </>
            ) : nextAppointment ? (
              <>
                <h2 className="kpi-value text-lg">{formatDate(nextAppointment.date)}</h2>
                <p className="mt-1 text-xs text-text-muted">
                  {formatTime(nextAppointment.time)} — {nextAppointment.hospital}
                </p>
              </>
            ) : (
              <>
                <h2 className="kpi-value text-lg text-text-muted">None</h2>
                <p className="mt-1 text-xs text-text-muted">No appointment scheduled</p>
              </>
            )}
          </div>
        </div>

        {/* Eligibility Status */}
        <div className="kpi-card">
          <div className="flex items-start justify-between">
            <span className="kpi-label">Eligibility Status</span>
            <div className="kpi-icon-box text-success bg-success/10">
              <ShieldCheck size={16} />
            </div>
          </div>
          <div className="mt-4">
            {eligibilityDate ? (
              <>
                <div className="flex items-center gap-2">
                  <Badge variant="success">
                    <Clock size={10} className="mr-1" />
                    Upcoming
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  Can donate on {formatDate(eligibilityDate)}
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Badge variant="success">
                    <CheckCircle size={10} className="mr-1" />
                    Eligible
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-text-muted">
                  You can donate now
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── Donation Journey + Eligibility ─── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Donation Journey */}
        <Card className="lg:col-span-2 overflow-hidden !p-0">
          <div className="card-header-compact">
            <h2 className="card-title">Your Donation Journey</h2>
            <Link href="/donation" className="link-action">
              View History
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="card-content">
            {donationHistory.length === 0 ? (
              <EmptyState
                icon={History}
                title="No donations yet"
                description="Your completed donations will appear here."
                actionLabel="Find a Campaign"
                actionHref="/campaign"
              />
            ) : (
              <div className="overflow-x-auto pb-2">
                <div className="flex items-start gap-0 min-w-max pt-4">
                  {donationHistory.map((donation, index) => (
                    <div key={donation.id} className="flex items-start">
                      {/* Timeline node */}
                      <div className="flex flex-col items-center">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-primary/10">
                          <Droplets size={14} className="text-primary" />
                        </div>
                        {index < donationHistory.length - 1 && (
                          <div className="mt-1 h-px w-24 bg-border" />
                        )}
                      </div>
                      {/* Timeline content */}
                      <div className="ml-3 pb-8">
                        <p className="text-xs font-medium text-text-primary">
                          {formatDate(donation.donationDate)}
                        </p>
                        <p className="text-[10px] text-text-muted mt-0.5">
                          {donation.type} Donation
                        </p>
                        <p className="text-[10px] text-text-muted">
                          {donation.hospitalName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Eligibility Card */}
        <Card className="overflow-hidden !p-0">
          <div className="card-header-compact">
            <h2 className="card-title">Eligibility Status</h2>
          </div>
          <div className="card-content">
            {eligibilityDate ? (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/10">
                    <Clock size={18} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Not Yet Eligible</p>
                    <p className="text-xs text-text-muted">Wait before next donation</p>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-surface-secondary p-3">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">Next Eligible Date</p>
                  <p className="text-sm font-medium text-text-primary">{formatDate(eligibilityDate)}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-success/10">
                    <CheckCircle size={18} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">Eligible to Donate</p>
                    <p className="text-xs text-text-muted">You can schedule a donation</p>
                  </div>
                </div>
                <Link href="/appointment">
                  <Button variant="primary" size="sm" className="w-full">
                    Book Appointment
                    <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* ─── Nearby Campaigns + Next Appointment ─── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Nearby Campaigns */}
        <Card className="lg:col-span-2 overflow-hidden !p-0">
          <div className="card-header-compact">
            <h2 className="card-title">Nearby Blood Donation Drives</h2>
            <Link href="/campaign" className="link-action">
              View All
              <ArrowRight size={12} />
            </Link>
          </div>
          <div className="card-content">
            {nearbyCampaigns.length === 0 ? (
              <EmptyState
                icon={Megaphone}
                title="No nearby campaigns"
                description="Check back later or browse all campaigns."
                actionLabel="Browse Campaigns"
                actionHref="/campaign"
              />
            ) : (
              <div className="space-y-3 pt-2">
                {nearbyCampaigns.slice(0, 4).map((camp) => (
                  <Link
                    key={camp.id}
                    href={`/campaign/${camp.id}`}
                    className="group flex items-center justify-between rounded-xl border border-border/50 bg-surface-secondary/30 p-4 transition-all hover:border-border-light hover:bg-surface-hover"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-medium text-text-primary truncate">
                          {camp.campName}
                        </h3>
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {camp.hospital.name}
                        </Badge>
                      </div>
                      <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                        <span className="info-row">
                          <MapPin size={11} className="text-text-muted" />
                          {camp.address || camp.hospital.address || "Location TBD"}
                        </span>
                        <span className="info-row">
                          <CalendarDays size={11} className="text-text-muted" />
                          {new Date(camp.campaignDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="ml-4 shrink-0 text-text-muted group-hover:text-text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Right column: Next Appointment + Quick Actions */}
        <div className="space-y-4">
          {/* Next Appointment */}
          <Card className="overflow-hidden !p-0">
            <div className="card-header-compact">
              <h2 className="card-title">Next Appointment</h2>
              <Link href="/appointment" className="link-action">
                View All
                <ArrowRight size={12} />
              </Link>
            </div>
            <div className="card-content">
              {nextApt ? (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-accent/10">
                      <CalendarCheck size={18} className="text-secondary-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">Blood Donation Appointment</p>
                      <p className="text-xs text-text-muted">{nextApt.hospital?.name ?? "Hospital"}</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-surface-secondary p-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs">
                      <Calendar size={12} className="text-text-muted" />
                      <span className="text-text-primary">{formatDate(nextApt.appointmentDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Clock size={12} className="text-text-muted" />
                      <span className="text-text-primary">{formatTime(nextApt.appointmentTime)}</span>
                    </div>
                  </div>
                  <Link href={`/appointment`}>
                    <Button variant="secondary" size="sm" className="w-full">
                      View Details
                      <ArrowRight size={12} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <EmptyState
                  icon={Calendar}
                  title="No upcoming appointment"
                  description="Ready to donate?"
                  actionLabel="Book Appointment"
                  actionHref="/appointment"
                />
              )}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="overflow-hidden !p-0">
            <div className="card-header-compact">
              <h2 className="card-title">Quick Actions</h2>
            </div>
            <div className="card-content">
              <div className="space-y-1 pt-2">
                {[
                  {
                    icon: ShieldCheck,
                    label: "Check Eligibility",
                    desc: "See if you can donate",
                    href: "#",
                    available: false,
                  },
                  {
                    icon: Calendar,
                    label: "Book Appointment",
                    desc: "Schedule a donation",
                    href: "/appointment",
                    available: true,
                  },
                  {
                    icon: Search,
                    label: "Find Campaigns",
                    desc: "Discover donation drives",
                    href: "/campaign",
                    available: true,
                  },
                  {
                    icon: History,
                    label: "View My Donations",
                    desc: "See donation history",
                    href: "/donation",
                    available: true,
                  },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.available ? action.href : "#"}
                    className="group flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-surface-hover"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-secondary group-hover:bg-primary/10 transition-colors">
                      <action.icon size={14} className="text-text-muted group-hover:text-primary transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-primary">{action.label}</p>
                      <p className="text-[10px] text-text-muted">{action.desc}</p>
                    </div>
                    {action.available ? (
                      <ArrowRight size={12} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <Badge variant="secondary" className="text-[9px]">Soon</Badge>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
