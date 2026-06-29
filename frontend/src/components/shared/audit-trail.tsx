import { Clock, User } from "@phosphor-icons/react/dist/ssr";
import { formatDateTime } from "@/lib/utils";
import type { AuditEntry } from "@/lib/mock-data";

export function AuditTrail({ entries, title = "Activity Log" }: { entries: AuditEntry[]; title?: string }) {
  if (entries.length === 0) {
    return (
      <div className="border-t border-border pt-6">
        <p className="text-sm text-muted-foreground">No activity recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="border-t border-border pt-6">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">{title}</h3>
      <ol className="divide-y divide-border border border-border">
        {entries.map((entry) => (
          <li key={entry.id} className="grid gap-2 p-4 sm:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-medium">{entry.action}</p>
              <p className="mt-1 text-sm text-muted-foreground">{entry.detail}</p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <User size={14} weight="regular" aria-hidden />
                  {entry.actor}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} weight="regular" aria-hidden />
                  <time dateTime={entry.timestamp}>{formatDateTime(entry.timestamp)}</time>
                </span>
              </div>
            </div>
            {entry.previousStatus && entry.newStatus && (
              <div className="text-right text-xs font-mono text-muted-foreground">
                {entry.previousStatus} → {entry.newStatus}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
