"use client";

import { LogOut } from "lucide-react";

export default function SidebarFooter() {
  return (
    <button className="mt-6 flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-200">
      <LogOut size={18} className="shrink-0" />
      <span className="text-sm font-medium">Logout</span>
    </button>
  );
}
