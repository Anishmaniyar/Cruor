"use client";

import { useEffect, useMemo, useState } from "react";
import { Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

import {
  getHospitalInventory,
  type InventoryGroup,
} from "@/services/bloodUnit.services";
import { BLOOD_GROUPS } from "@/lib/blood-unit-utils";

export default function InventoryOverview() {
  const [groups, setGroups] = useState<InventoryGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getHospitalInventory()
      .then((response) => {
        if (!cancelled) setGroups(response.data.inventoryData ?? []);
      })
      .catch(() => {
        /* Dashboard card failure is non-blocking */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const distribution = useMemo(() => {
    const groupMap = new Map<string, number>();
    for (const group of groups) {
      groupMap.set(group.bloodGroup, group._count.id);
    }
    return BLOOD_GROUPS.map((group) => ({
      group,
      units: groupMap.get(group) ?? 0,
    }));
  }, [groups]);

  const totalAvailable = useMemo(
    () => distribution.reduce((sum, item) => sum + item.units, 0),
    [distribution],
  );

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="section-title">Inventory Overview</h2>
          <p className="section-description">
            Current blood units available by group.
          </p>
        </div>
        <Link href="/hospital/inventory" className="link-action">
          View all
          <ArrowRight size={14} />
        </Link>
      </div>

      <Card className="!p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center px-6 py-12">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-border bg-surface-secondary px-6 py-3">
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted">
                Available Units
              </span>
              <span className="text-sm font-semibold text-text-primary">
                {totalAvailable} total
              </span>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="divide-y divide-border">
                {distribution.slice(0, 4).map((bg) => (
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
                {distribution.slice(4, 8).map((bg) => (
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
          </>
        )}
      </Card>
    </section>
  );
}
