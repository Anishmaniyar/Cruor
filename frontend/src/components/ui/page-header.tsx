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
    <div className="border-b border-border pb-8 mb-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          {label && (
            <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">
              {label}
            </p>
          )}
          <h1 className="font-serif text-4xl font-black lg:text-5xl">{title}</h1>
          {description && (
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
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
      <div className="border border-border bg-card p-12 text-center">
        <p className="font-mono text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="border border-border overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-muted">
            {headers.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0 hover:bg-muted/50 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 font-sans text-sm">
                  {cell}
                </td>
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
    <div className="grid grid-cols-1 border-b border-border py-4 sm:grid-cols-3">
      <dt className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="sm:col-span-2 font-sans text-sm">{value}</dd>
    </div>
  );
}

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="mb-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
    >
      ← {label}
    </Link>
  );
}

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="border border-dashed border-border bg-muted/30 p-12 text-center">
      <h3 className="font-serif text-2xl font-bold">{title}</h3>
      {description && <p className="mt-2 font-body text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="py-8 text-center font-serif text-2xl text-muted-foreground tracking-[1em]">
      &#x2727; &#x2727; &#x2727;
    </div>
  );
}

export function ActionBar({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3 border-t border-border pt-6 mt-6", className)}>
      {children}
    </div>
  );
}
