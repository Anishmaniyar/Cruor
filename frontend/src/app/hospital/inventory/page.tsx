import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/card";
import { StatusBadge, BloodGroupBadge } from "@/components/ui/badge";
import { inventoryByGroup, bloodUnits } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function InventoryPage() {
  const expiring = bloodUnits.filter((u) => {
    const expiry = new Date(u.expiryDate);
    const diff = (expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  });

  return (
    <>
      <PageHeader
        label="Inventory"
        title="Inventory operations"
        description="Group availability, risk levels, and units nearing expiry."
        action={<Link href="/hospital/requests/create" className="text-xs font-medium uppercase tracking-wider text-accent hover:underline">Create request</Link>}
      />

      <Section title="Stock by blood group">
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Group</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Units</th>
                <th className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventoryByGroup.map((g) => (
                <tr key={g.group} className="border-b border-border last:border-b-0">
                  <td className="px-4 py-3"><BloodGroupBadge group={g.group} /></td>
                  <td className="px-4 py-3 font-mono">{g.units}</td>
                  <td className="px-4 py-3"><StatusBadge status={g.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Expiring within 7 days">
        <div className="divide-y divide-border border border-border">
          {expiring.map((u) => (
            <Link key={u.id} href={`/hospital/blood-units/${u.id}`} className="flex items-center justify-between p-4 transition-colors hover:bg-muted/30">
              <div>
                <span className="font-mono text-xs">{u.unitId}</span>
                <p className="mt-1 text-sm text-muted-foreground">{u.component} · {u.volume}</p>
              </div>
              <div className="text-right">
                <BloodGroupBadge group={u.bloodGroup} />
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">Expires {formatDate(u.expiryDate)}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
