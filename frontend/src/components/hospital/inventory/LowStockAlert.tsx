import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AlertItem {
  text: string;
  type: "critical" | "warning" | "info";
}

interface LowStockAlertProps {
  alerts: AlertItem[];
}

export default function LowStockAlert({ alerts }: LowStockAlertProps) {
  if (alerts.length === 0) return null;

  return (
    <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-400" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-amber-400">
            Attention Required
          </h3>
          <ul className="mt-3 space-y-2">
            {alerts.map((alert, i) => (
              <li
                key={i}
                className={`flex items-center gap-2 text-sm ${
                  alert.type === "critical"
                    ? "text-danger"
                    : alert.type === "warning"
                    ? "text-amber-300"
                    : "text-text-secondary"
                }`}
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-current" />
                {alert.text}
              </li>
            ))}
          </ul>

          <Button
            variant="ghost"
            size="sm"
            className="mt-3 gap-1.5 text-amber-400 hover:text-amber-300 hover:bg-amber-500/10"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
