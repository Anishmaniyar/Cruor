import { CheckCircle2, XCircle, Droplets, Box } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ComparisonItem {
  bloodGroup: string;
  unitsNeeded: number;
  unitsAvailable: number;
}

interface InventoryComparisonProps {
  requested: ComparisonItem;
}

export default function InventoryComparison({
  requested,
}: InventoryComparisonProps) {
  const hasSufficient = requested.unitsAvailable >= requested.unitsNeeded;

  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Inventory Availability</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Requested */}
        <div className="rounded-xl bg-surface-secondary p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Requested
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Droplets className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Blood Group</p>
                <p className="text-sm font-semibold text-text-primary">
                  {requested.bloodGroup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                <Box className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Units Needed</p>
                <p className="text-sm font-semibold text-text-primary">
                  {requested.unitsNeeded}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Available */}
        <div className="rounded-xl bg-surface-secondary p-5">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Available
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Droplets className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs text-text-muted">Blood Group</p>
                <p className="text-sm font-semibold text-text-primary">
                  {requested.bloodGroup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success/10">
                <span className="text-sm font-semibold text-success">
                  {requested.unitsAvailable}
                </span>
              </div>
              <div>
                <p className="text-xs text-text-muted">Units Available</p>
                <p className="text-sm font-semibold text-text-primary">
                  {requested.unitsAvailable}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verdict */}
      <div
        className={`mt-4 flex items-center gap-3 rounded-xl px-5 py-4 ${
          hasSufficient ? "bg-success/10" : "bg-danger/10"
        }`}
      >
        {hasSufficient ? (
          <>
            <CheckCircle2 className="h-5 w-5 text-success shrink-0" />
            <p className="text-sm font-medium text-success">
              Sufficient Inventory — Request can be fulfilled.
            </p>
          </>
        ) : (
          <>
            <XCircle className="h-5 w-5 text-danger shrink-0" />
            <p className="text-sm font-medium text-danger">
              Insufficient Inventory — Cannot fulfill the requested quantity.
            </p>
          </>
        )}
      </div>
    </Card>
  );
}
