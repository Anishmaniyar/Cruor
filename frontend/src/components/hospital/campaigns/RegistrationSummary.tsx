import { Users, UserCheck, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface RegistrationSummaryProps {
  totalRegistered: number;
  totalCheckedIn: number;
  totalCompleted: number;
}

export default function RegistrationSummary({
  totalRegistered,
  totalCheckedIn,
  totalCompleted,
}: RegistrationSummaryProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-4">Registration Summary</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-xl bg-surface-secondary px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
            <Users className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {totalRegistered}
            </p>
            <p className="text-xs text-text-muted">Registered</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-surface-secondary px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
            <UserCheck className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {totalCheckedIn}
            </p>
            <p className="text-xs text-text-muted">Checked In</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-surface-secondary px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {totalCompleted}
            </p>
            <p className="text-xs text-text-muted">Completed</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
