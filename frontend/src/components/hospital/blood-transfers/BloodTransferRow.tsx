import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TransferStatusBadge from "./TransferStatusBadge";
import type { TransferStatus } from "./TransferStatusBadge";

export interface BloodTransfer {
  id: string;
  destinationHospital: string;
  bloodGroup: string;
  component: string;
  units: number;
  transferDate: string;
  status: TransferStatus;
}

interface BloodTransferRowProps {
  transfer: BloodTransfer;
}

export default function BloodTransferRow({ transfer }: BloodTransferRowProps) {
  return (
    <tr className="border-b border-border transition-colors hover:bg-surface-hover">
      <td className="px-6 py-4">
        <span className="text-sm font-mono font-medium text-text-primary">
          {transfer.id}
        </span>
      </td>
      <td className="px-6 py-4 text-sm text-text-primary">
        {transfer.destinationHospital}
      </td>
      <td className="px-6 py-4">
        <div className="flex h-7 w-10 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
          {transfer.bloodGroup}
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-text-secondary">{transfer.component}</td>
      <td className="px-6 py-4 text-sm font-semibold text-text-primary">{transfer.units}</td>
      <td className="px-6 py-4 text-sm text-text-secondary">{transfer.transferDate}</td>
      <td className="px-6 py-4">
        <TransferStatusBadge status={transfer.status} />
      </td>
      <td className="px-6 py-4 text-right">
        <Link href={`/hospital/blood-transfers/${transfer.id}`}>
          <Button variant="ghost" size="xs" className="gap-1.5">
            View Details
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </td>
    </tr>
  );
}
