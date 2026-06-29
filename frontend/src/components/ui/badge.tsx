import {
  CheckCircle,
  Clock,
  Warning,
  XCircle,
  Circle,
  ArrowRight,
  Package,
} from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const variants = {
  default: "border-border text-muted-foreground bg-muted/30",
  accent: "border-accent/50 text-accent bg-accent/10",
  success: "border-green-800 text-green-400 bg-green-950/30",
  warning: "border-amber-800 text-amber-400 bg-amber-950/30",
  critical: "border-accent text-accent bg-accent/15",
};

const statusIcons: Record<string, ReactNode> = {
  pending: <Clock size={12} weight="bold" aria-hidden />,
  confirmed: <CheckCircle size={12} weight="bold" aria-hidden />,
  completed: <CheckCircle size={12} weight="bold" aria-hidden />,
  cancelled: <XCircle size={12} weight="bold" aria-hidden />,
  rejected: <XCircle size={12} weight="bold" aria-hidden />,
  open: <Circle size={12} weight="fill" aria-hidden />,
  accepted: <CheckCircle size={12} weight="bold" aria-hidden />,
  "in-transit": <ArrowRight size={12} weight="bold" aria-hidden />,
  delivered: <Package size={12} weight="bold" aria-hidden />,
  active: <CheckCircle size={12} weight="bold" aria-hidden />,
  upcoming: <Clock size={12} weight="bold" aria-hidden />,
  adequate: <CheckCircle size={12} weight="bold" aria-hidden />,
  reserved: <Clock size={12} weight="bold" aria-hidden />,
  low: <Warning size={12} weight="bold" aria-hidden />,
  critical: <Warning size={12} weight="fill" aria-hidden />,
  urgent: <Warning size={12} weight="fill" aria-hidden />,
  normal: <Circle size={12} weight="regular" aria-hidden />,
  COLLECTED: <Circle size={12} weight="fill" aria-hidden />,
  VERIFIED: <CheckCircle size={12} weight="bold" aria-hidden />,
  STORED: <Package size={12} weight="bold" aria-hidden />,
  RESERVED: <Clock size={12} weight="bold" aria-hidden />,
  TRANSFERRED: <ArrowRight size={12} weight="bold" aria-hidden />,
  USED: <CheckCircle size={12} weight="bold" aria-hidden />,
  EXPIRED: <XCircle size={12} weight="bold" aria-hidden />,
  REJECTED: <XCircle size={12} weight="fill" aria-hidden />,
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
        "inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
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
    <span className="inline-flex items-center gap-1 border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-xs font-medium text-accent">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
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
    adequate: "success",
    reserved: "warning",
    low: "warning",
    critical: "critical",
    urgent: "critical",
    normal: "default",
    COLLECTED: "warning",
    VERIFIED: "success",
    STORED: "success",
    RESERVED: "warning",
    TRANSFERRED: "accent",
    USED: "success",
    EXPIRED: "critical",
    REJECTED: "critical",
  };

  const label = status.replace(/-/g, " ");
  const icon = statusIcons[status];

  return (
    <Badge variant={map[status] || "default"}>
      {icon}
      <span>{label}</span>
    </Badge>
  );
}
