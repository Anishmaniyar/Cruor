import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  label,
  action,
}: {
  title: string;
  description?: string;
  label?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-10 border-b border-border pb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          {label && (
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-accent">{label}</p>
          )}
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
          {description && (
            <p className="mt-3 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}

export function DataTable({
  headers,
  rows,
  emptyMessage = "No records found.",
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="border border-dashed border-border px-6 py-16 text-center">
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-sm">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border py-4 sm:grid-cols-3 sm:gap-4">
      <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
      <dd className="sm:col-span-2 text-sm">{value}</dd>
    </div>
  );
}

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
    >
      <span aria-hidden>←</span> {label}
    </Link>
  );
}

export function ActionBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("mt-6 flex flex-wrap gap-3 border-t border-border pt-6", className)}>
      {children}
    </div>
  );
}
