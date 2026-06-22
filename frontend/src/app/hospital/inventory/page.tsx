import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard, Card } from "@/components/ui/card";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { inventoryByGroup, bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { AlertTriangle, Clock, Package } from "lucide-react";

export default function InventoryPage() {
  const totalUnits = inventoryByGroup.reduce((sum, g) => sum + g.units, 0);
  const critical = inventoryByGroup.filter((g) => g.status === "critical").length;
  const expiring = bloodUnits.filter((u) => {
    const expiry = new Date(u.expiryDate);
    const now = new Date();
    const diff = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;

  return (
    <>
      <PageHeader label="Inventory" title="Inventory Dashboard" description="Real-time blood inventory across all groups and components." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-8">
        <StatCard label="Total Units" value={totalUnits} icon={<Package className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Critical Groups" value={critical} alert icon={<AlertTriangle className="h-5 w-5" strokeWidth={1.5} />} />
        <StatCard label="Expiring Soon" value={expiring} alert sub="Within 7 days" icon={<Clock className="h-5 w-5" strokeWidth={1.5} />} />
      </div>

      <h2 className="font-serif text-xl font-bold mb-4">Inventory by Blood Group</h2>
      <div className="grid grid-cols-2 gap-0 border border-border sm:grid-cols-4 mb-8">
        {inventoryByGroup.map((g, i) => (
          <div
            key={g.group}
            className={`p-6 ${i % 4 !== 3 ? "border-r border-border" : ""} ${i < 4 ? "border-b border-border sm:border-b-0" : ""} ${g.status === "critical" ? "bg-accent/5" : ""}`}
          >
            <BloodGroupBadge group={g.group} />
            <p className={`font-serif text-3xl font-black mt-3 ${g.status === "critical" ? "text-accent" : ""}`}>{g.units}</p>
            <div className="mt-2"><StatusBadge status={g.status} /></div>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl font-bold mb-4">Expiring Units</h2>
      <div className="border border-border divide-y divide-border">
        {bloodUnits.map((u) => (
          <Link key={u.id} href={`/hospital/blood-units/${u.id}`} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
            <div>
              <span className="font-mono text-xs">{u.unitId}</span>
              <p className="font-sans text-sm mt-0.5">{u.component} · {u.volume}</p>
            </div>
            <div className="text-right">
              <BloodGroupBadge group={u.bloodGroup} />
              <p className="font-mono text-[10px] text-muted-foreground mt-1">Expires {formatDate(u.expiryDate)}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
