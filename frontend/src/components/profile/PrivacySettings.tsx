"use client";

import { useState } from "react";
import { Hospital, Eye, Share2, LucideIcon } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ToggleSwitch } from "@/components/ui/toggle";

interface ToggleRow {
  icon: LucideIcon;
  label: string;
  description: string;
  defaultEnabled: boolean;
}

const toggles: ToggleRow[] = [
  {
    icon: Hospital,
    label: "Allow Hospitals to Contact Me",
    description: "Hospitals can reach out for blood donation requests.",
    defaultEnabled: true,
  },
  {
    icon: Eye,
    label: "Show My Profile",
    description: "Make your donor profile visible to hospitals and campaigns.",
    defaultEnabled: true,
  },
  {
    icon: Share2,
    label: "Share Donation History",
    description: "Allow your donation history to be shared with medical facilities.",
    defaultEnabled: false,
  },
];

export default function PrivacySettings() {
  const [settings, setSettings] = useState(
    toggles.map((t) => t.defaultEnabled),
  );

  const handleToggle = (index: number) => {
    setSettings((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacy</CardTitle>
        <CardDescription>
          Manage your privacy preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {toggles.map((row, index) => {
            const Icon = row.icon;

            return (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-secondary">
                    <Icon size={18} className="text-text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{row.label}</p>
                    <p className="text-xs text-text-muted">{row.description}</p>
                  </div>
                </div>
                <ToggleSwitch
                  enabled={settings[index]}
                  onToggle={() => handleToggle(index)}
                />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
