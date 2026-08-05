import { Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EmptyInventoryState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon-box">
        <Package className="empty-state-icon" />
      </div>
      <h3 className="empty-state-title">No Blood Units Found</h3>
      <p className="empty-state-description">
        Blood units will appear here once successful donations are recorded.
      </p>
      <Link href="/hospital/inventory/add">
        <Button variant="primary" className="mt-6 gap-2">
          Learn How to Add Stock
        </Button>
      </Link>
    </div>
  );
}
