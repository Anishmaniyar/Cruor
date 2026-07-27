import { Plus, Minus, ArrowLeftRight, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface HistoryEntry {
  id: string;
  action: "added" | "used" | "transferred" | "expired" | "discarded";
  quantity: number;
  reason: string;
  date: string;
}

interface InventoryHistoryProps {
  history: HistoryEntry[];
}

const actionConfig = {
  added: { icon: Plus, color: "text-success", bg: "bg-success/10", label: "Added" },
  used: { icon: Minus, color: "text-danger", bg: "bg-danger/10", label: "Used" },
  transferred: { icon: ArrowLeftRight, color: "text-blue-400", bg: "bg-blue-500/10", label: "Transferred" },
  expired: { icon: Trash2, color: "text-text-muted", bg: "bg-surface-secondary", label: "Expired" },
  discarded: { icon: Trash2, color: "text-danger", bg: "bg-danger/10", label: "Discarded" },
};

export default function InventoryHistory({ history }: InventoryHistoryProps) {
  return (
    <Card className="!p-6">
      <h2 className="card-title mb-6">Inventory History</h2>

      {history.length === 0 ? (
        <p className="text-sm text-text-muted">No history recorded yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((entry) => {
            const config = actionConfig[entry.action];
            const Icon = config.icon;

            return (
              <div
                key={entry.id}
                className="flex items-start gap-4 rounded-xl bg-surface-secondary px-4 py-3"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${config.bg}`}
                >
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${config.color}`}>
                      {config.label}
                    </span>
                    <span className="text-sm text-text-primary">
                      {entry.quantity > 0
                        ? `${entry.action === "added" ? "+" : "-"}${entry.quantity} Units`
                        : ""}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-text-muted">
                    {entry.reason}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-text-muted">
                  {entry.date}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
