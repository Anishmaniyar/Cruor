import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "border border-border bg-card p-6",
        hover && "hard-shadow-hover cursor-pointer hover:bg-card-hover",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  sub,
  alert = false,
  icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  alert?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Card className={cn("flex flex-col gap-3", alert && "border-accent")}>
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {label}
        </span>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center border border-border text-accent">
            {icon}
          </div>
        )}
      </div>
      <p className={cn("font-serif text-4xl font-black", alert && "text-accent")}>{value}</p>
      {sub && <p className="font-mono text-xs text-muted-foreground">{sub}</p>}
    </Card>
  );
}
