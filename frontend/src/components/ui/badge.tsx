import { cn } from "@/lib/utils";

const variants = {
  default: "border-border text-muted-foreground",
  accent: "border-accent text-accent bg-accent/10",
  success: "border-green-700 text-green-400 bg-green-950/30",
  warning: "border-yellow-700 text-yellow-400 bg-yellow-950/30",
  critical: "border-accent text-accent bg-accent/20 animate-pulse",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export function BloodGroupBadge({ group }: { group: string }) {
  return (
    <span className="inline-flex items-center border border-accent bg-accent/10 px-2 py-0.5 font-mono text-xs font-medium text-accent">
      {group}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, keyof typeof variants> = {
    pending: "warning",
    confirmed: "success",
    completed: "success",
    cancelled: "default",
    rejected: "critical",
    open: "accent",
    accepted: "success",
    "in-transit": "warning",
    delivered: "success",
    active: "success",
    upcoming: "default",
    available: "success",
    reserved: "warning",
    low: "warning",
    critical: "critical",
    urgent: "critical",
    normal: "default",
  };
  return <Badge variant={map[status] || "default"}>{status.replace("-", " ")}</Badge>;
}
