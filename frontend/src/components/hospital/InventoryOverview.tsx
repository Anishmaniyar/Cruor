import { Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const bloodGroups = [
  { group: "O+", units: 48 },
  { group: "A+", units: 31 },
  { group: "B+", units: 19 },
  { group: "AB+", units: 12 },
  { group: "O-", units: 8 },
  { group: "A-", units: 6 },
  { group: "B-", units: 4 },
  { group: "AB-", units: 5 },
];

export default function InventoryOverview() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="section-title">Inventory Overview</h2>
          <p className="section-description">
            Current blood units available by group.
          </p>
        </div>
        <Link
          href="/hospital/inventory"
          className="link-action"
        >
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <Card className="!p-0 overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="divide-y divide-border">
            {bloodGroups.slice(0, 4).map((bg) => (
              <div
                key={bg.group}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Droplets className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    {bg.group}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  {bg.units} Units
                </span>
              </div>
            ))}
          </div>
          <div className="divide-y divide-border">
            {bloodGroups.slice(4, 8).map((bg) => (
              <div
                key={bg.group}
                className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-surface-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                    <Droplets className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    {bg.group}
                  </span>
                </div>
                <span className="text-sm text-text-secondary">
                  {bg.units} Units
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}
