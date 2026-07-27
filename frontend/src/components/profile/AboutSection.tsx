import { Heart, FileText, ShieldCheck, Headphones } from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const links = [
  {
    icon: FileText,
    label: "Terms & Conditions",
    description: "Review the terms of service.",
  },
  {
    icon: ShieldCheck,
    label: "Privacy Policy",
    description: "Learn how we handle your data.",
  },
  {
    icon: Headphones,
    label: "Contact Support",
    description: "Get help with any issues.",
  },
];

export default function AboutSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About</CardTitle>
        <CardDescription>
          Learn more about Vital Drops.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* About Vital Drops */}
        <div className="mb-6 flex items-start gap-4 rounded-xl bg-surface-secondary p-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Heart size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-text-primary">Vital Drops</h3>
            <p className="mt-1 text-sm text-text-secondary">
              Vital Drops is a blood donation platform connecting donors with hospitals and
              blood donation campaigns. Our mission is to make blood donation accessible,
              efficient, and life-saving.
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-1">
          {links.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-surface-hover"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-secondary">
                  <Icon size={18} className="text-text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.label}</p>
                  <p className="text-xs text-text-muted">{item.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <Separator className="my-6" />

        {/* Version */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">Current Version</p>
          <p className="text-sm font-medium text-text-primary">v2.0.0</p>
        </div>
      </CardContent>
    </Card>
  );
}
