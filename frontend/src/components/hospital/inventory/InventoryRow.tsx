import Link from "next/link";
import { ArrowRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import StockStatusBadge from "./StockStatusBadge";
import type { BloodUnit } from "@/services/bloodUnit.services";
import { formatBloodUnitDate } from "@/lib/blood-unit-utils";

export type { BloodUnit as InventoryItem };

interface InventoryRowProps {
  item: BloodUnit;
}

export default function InventoryRow({ item }: InventoryRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <span className="text-xs font-mono font-medium text-text-muted">
          {item.id.slice(0, 8).toUpperCase()}
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Droplets className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-semibold text-text-primary">
            {item.bloodGroup}
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {item.componentType}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-text-primary">
        {item.volume} ml
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {formatBloodUnitDate(item.collectionDate)}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {formatBloodUnitDate(item.expirationDate)}
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">
        {item.storageLocation}
      </td>
      <td className="px-6 py-4">
        <StockStatusBadge status={item.currentStatus} />
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/hospital/inventory/${item.id}`}>
          <Button variant="ghost" size="xs" className="gap-1.5">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </td>
    </tr>
  );
}
