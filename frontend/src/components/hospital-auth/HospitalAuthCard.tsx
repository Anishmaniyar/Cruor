import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HospitalAuthCardProps {
  children: ReactNode;
  className?: string;
}

export function HospitalAuthCard({ children, className }: HospitalAuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-surface p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
