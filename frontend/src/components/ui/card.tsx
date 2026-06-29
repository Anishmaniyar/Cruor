import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  title,
  action,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}) {
  return (
    <section className={cn("border-t border-border pt-8", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-end justify-between gap-4">
          {title && <h2 className="text-sm font-semibold tracking-tight">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Panel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("border border-border bg-card/50 p-6", className)}>
      {children}
    </div>
  );
}

export function MetricInline({
  label,
  value,
  alert,
}: {
  label: string;
  value: string | number;
  alert?: boolean;
}) {
  return (
    <div className="border-l-2 border-border pl-4">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={cn("mt-1 font-mono text-2xl font-semibold tracking-tight", alert && "text-accent")}>{value}</p>
    </div>
  );
}
