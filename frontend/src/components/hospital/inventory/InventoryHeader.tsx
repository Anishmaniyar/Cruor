import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InventoryHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <header className="flex flex-col gap-1">
        <h1 className="page-title">Blood Inventory</h1>
        <p className="page-description">
          Monitor and manage your hospital&apos;s blood stock.
        </p>
      </header>

      <Link href="/hospital/inventory/add">
        <Button variant="primary" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Blood Unit
        </Button>
      </Link>
    </div>
  );
}
