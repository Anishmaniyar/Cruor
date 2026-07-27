"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SidebarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
  isActive: boolean;
}

export default function SidebarItem({
  name,
  href,
  icon: Icon,
  isActive,
}: SidebarItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
        isActive
          ? "bg-surface-hover text-text-primary"
          : "text-text-secondary hover:bg-surface-hover hover:text-text-primary",
      )}
    >
      <Icon size={18} className="shrink-0" />
      <span className="text-sm font-medium">{name}</span>
    </Link>
  );
}
