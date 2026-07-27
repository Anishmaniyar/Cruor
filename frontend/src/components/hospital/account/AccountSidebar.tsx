"use client";

import {
  Building2,
  ShieldCheck,
  Lock,
  FileText,
  type LucideIcon,
} from "lucide-react";

export type AccountSection = "profile" | "verification" | "security" | "hospital-info";

interface AccountSidebarProps {
  activeSection: AccountSection;
  onSectionChange: (section: AccountSection) => void;
}

const navItems: { id: AccountSection; label: string; icon: LucideIcon }[] = [
  { id: "profile", label: "Profile", icon: Building2 },
  { id: "verification", label: "Verification", icon: ShieldCheck },
  { id: "security", label: "Security", icon: Lock },
  { id: "hospital-info", label: "Hospital Information", icon: FileText },
];

export default function AccountSidebar({ activeSection, onSectionChange }: AccountSidebarProps) {
  return (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left ${
              isActive
                ? "bg-surface-hover text-text-primary"
                : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
            }`}
          >
            <Icon size={16} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
