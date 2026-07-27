"use client";

import { useState } from "react";
import { Bell, Megaphone, AlertTriangle, Mail } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ToggleSwitch } from "@/components/ui/toggle";

interface ToggleRow {
  icon: React.FC<{ size?: number; className?: string }>;
  label: string;
  description: string;
  defaultEnabled: boolean;
}

const toggles: ToggleRow[] = [
  {
    icon: Bell,
    label: "Appointment Reminders",
    description: "Get notified about upcoming appointments.",
    defaultEnabled: true,
  },
  {
    icon: Megaphone,
    label: "Campaign Notifications",
    description: "Receive updates about blood donation campaigns.",
    defaultEnabled: true,
  },
  {
    icon: AlertTriangle,
    label: "Emergency Blood Request Alerts",
    description: "Get notified about urgent blood requests nearby.",
    defaultEnabled: false,
  },
  {
    icon: Mail,
    label: "Email Updates",
    description: "Receive email notifications and newsletters.",
    defaultEnabled: true,
  },
];

export default function NotificationSettings() {
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
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage your notification preferences.
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
