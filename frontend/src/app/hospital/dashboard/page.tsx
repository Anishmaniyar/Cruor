import Link from "next/link";
import { Activity, AlertTriangle, Heart, Megaphone, Package, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, Card } from "@/components/ui/card";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { bloodRequests, transfers, campaigns, inventoryByGroup } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function HospitalDashboard() {
  const totalUnits = inventoryByGroup.reduce((sum, g) => sum + g.units, 0);
  const pendingRequests = bloodRequests.filter((r) => r.status === "open").length;
  const activeCampaigns = campaigns.filter((c) => c.status === "active").length;
  const lowStock = inventoryByGroup.filter((g) => g.status === "critical" || g.status === "low").length;

  return (
    <>
      <PageHeader label="Hospital Portal" title="Dashboard" description="Overview of blood bank operations and alerts." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Blood Units" value={totalUnits} icon={<Package className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Pending Requests" value={pendingRequests} alert icon={<Send className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Active Campaigns" value={activeCampaigns} icon={<Megaphone className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Low Stock Alerts" value={lowStock} alert icon={<AlertTriangle className="h-5 w-5" strokeWidth={1.5} />} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Low Stock Alerts
            </h2>
            <Link href="/hospital/inventory" className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline">View Inventory</Link>
          </div>
          <div className="space-y-3">
            {inventoryByGroup.filter((g) => g.status !== "adequate").map((g) => (
              <div key={g.group} className="flex items-center justify-between border border-border p-3">
                <BloodGroupBadge group={g.group} />
                <span className="font-serif text-lg font-bold">{g.units} units</span>
                <StatusBadge status={g.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" strokeWidth={1.5} />
              Recent Transfers
            </h2>
            <Link href="/hospital/transfers" className="font-mono text-[10px] uppercase tracking-widest text-accent hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {transfers.slice(0, 3).map((t) => (
              <Link key={t.id} href={`/hospital/transfers/${t.id}`} className="block border border-border p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm">{t.from} → {t.to}</span>
                  <StatusBadge status={t.status} />
                </div>
                <p className="font-mono text-xs text-muted-foreground mt-1">
                  {t.units} units · {t.bloodGroup} · {formatDateTime(t.date)}
                </p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-8">
        <h2 className="font-serif text-xl font-bold mb-4 flex items-center gap-2">
          <Heart className="h-5 w-5 text-accent" strokeWidth={1.5} />
          Open Blood Requests
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {bloodRequests.filter((r) => r.status === "open").map((r) => (
            <Link key={r.id} href={`/hospital/requests/${r.id}`}>
              <Card hover>
                <div className="flex items-center justify-between mb-2">
                  <BloodGroupBadge group={r.bloodGroup} />
                  <StatusBadge status={r.urgency} />
                </div>
                <p className="font-serif text-lg font-bold">{r.hospital}</p>
                <p className="font-mono text-xs text-muted-foreground mt-1">{r.units} units requested</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
