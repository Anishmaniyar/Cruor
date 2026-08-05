import { Users, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RegistrationSummaryProps {
  totalRegistered: number;
  targetDonors?: number;
}

export default function RegistrationSummary({
  totalRegistered,
  targetDonors,
}: RegistrationSummaryProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Registration Summary</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl bg-surface-secondary px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {totalRegistered}
            </p>
            <p className="text-xs text-text-muted">Registered Donors</p>
          </div>
        </div>

        {typeof targetDonors === "number" && (
          <div className="flex items-center gap-3 rounded-xl bg-surface-secondary px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
              <Target className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">
                {targetDonors}
              </p>
              <p className="text-xs text-text-muted">Target Donors</p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
