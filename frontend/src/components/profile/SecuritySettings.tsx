import { Key, Monitor, ShieldCheck, Trash2, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const settingsRows = [
  {
    icon: Key,
    label: "Change Password",
    description: "Update your account password.",
    action: "Change",
  },
  {
    icon: Monitor,
    label: "Active Sessions",
    description: "Manage your active login sessions.",
    action: "View",
  },
  {
    icon: ShieldCheck,
    label: "Two-Factor Authentication",
    description: "Add an extra layer of security.",
    action: "Enable",
  },
];

export default function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Manage your account security settings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          {settingsRows.map((row) => {
            const Icon = row.icon;

            return (
              <div
                key={row.label}
                className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-surface-hover"
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
                <Button variant="ghost" size="xs" className="gap-1">
                  {row.action}
                  <ChevronRight size={14} />
                </Button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <div className="flex items-center justify-between rounded-xl px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10">
                <Trash2 size={18} className="text-danger" />
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">Delete Account</p>
                <p className="text-xs text-text-muted">
                  Permanently delete your account and all data.
                </p>
              </div>
            </div>
            <Button variant="ghost" size="xs" className="gap-1 text-danger hover:bg-danger/10 hover:text-danger">
              Delete
              <ChevronRight size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
