import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AddBloodUnitForm from "@/components/hospital/inventory/AddBloodUnitForm";

export default function AddBloodUnitPage() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <Link href="/hospital/inventory" className="link-action">
        <ArrowLeft size={14} />
        Back to Inventory
      </Link>

      <header className="flex flex-col gap-1">
        <h1 className="page-title">Add Blood Unit</h1>
        <p className="page-description">
          Register newly collected blood units to inventory.
        </p>
      </header>

      <AddBloodUnitForm />
    </div>
  );
}
