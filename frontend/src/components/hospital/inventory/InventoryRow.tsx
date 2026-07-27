import Link from "next/link";
import { ArrowRight, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import StockStatusBadge from "./StockStatusBadge";
import type { StockStatus } from "./StockStatusBadge";

export interface InventoryItem {
  id: string;
  bloodGroup: string;
  component: string;
  units: number;
  collectionDate: string;
  expiryDate: string;
  status: StockStatus;
}

interface InventoryRowProps {
  item: InventoryItem;
}

export default function InventoryRow({ item }: InventoryRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
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
      <td className="px-6 py-4 text-sm text-text-secondary">{item.component}</td>
      <td className="px-6 py-4">
        <span className="text-sm font-semibold text-text-primary">
          {item.units}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">{item.collectionDate}</td>
      <td className="px-6 py-4 text-sm text-text-secondary">{item.expiryDate}</td>
      <td className="px-6 py-4">
        <StockStatusBadge status={item.status} />
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
