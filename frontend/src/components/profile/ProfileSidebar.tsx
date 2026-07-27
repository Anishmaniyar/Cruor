"use client";

import {
  User,
  Heart,
  Shield,
  Bell,
  Lock,
  Info,
  Trash2,
  type LucideIcon,
} from "lucide-react";

type Section =
  | "profile"
  | "personal"
  | "medical"
  | "security"
  | "notifications"
  | "privacy"
  | "about"
  | "delete";

interface ProfileSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

const navItems: { id: Section; label: string; icon: LucideIcon }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "personal", label: "Personal Information", icon: User },
  { id: "medical", label: "Medical Information", icon: Heart },
  { id: "security", label: "Security", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: Lock },
  { id: "about", label: "About", icon: Info },
];

export default function ProfileSidebar({ activeSection, onSectionChange }: ProfileSidebarProps) {
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

      {/* Separator */}
      <div className="my-3 border-t border-border" />

      {/* Delete Account */}
      <button
        onClick={() => onSectionChange("delete")}
        className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all text-left ${
          activeSection === "delete"
            ? "bg-danger/10 text-danger"
            : "text-text-secondary hover:bg-danger/10 hover:text-danger"
        }`}
      >
        <Trash2 size={16} />
        <span>Delete Account</span>
      </button>
    </nav>
  );
}
