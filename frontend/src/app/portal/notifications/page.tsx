"use client";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";
import { formatDateTime } from "@/lib/utils";

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        label="Alerts"
        title="Notifications"
        description="Stay updated on appointments, campaigns, and donation activity."
        action={<Button variant="secondary" size="sm">Mark All Read</Button>}
      />
      <div className="border border-border divide-y divide-border">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-4 p-6 ${!n.read ? "bg-accent/5 border-l-2 border-l-accent" : ""}`}>
            <div className={`mt-1.5 h-2 w-2 flex-shrink-0 ${n.read ? "bg-muted-foreground" : "bg-accent"}`} />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <p className="font-sans text-sm font-medium">{n.title}</p>
                <Badge variant={n.read ? "default" : "accent"}>{n.read ? "Read" : "New"}</Badge>
              </div>
              <p className="font-body text-sm text-muted-foreground mt-1">{n.message}</p>
              <p className="font-mono text-[10px] text-muted-foreground mt-2">{formatDateTime(n.date)}</p>
            </div>
            {!n.read && (
              <Button variant="ghost" size="sm">Mark Read</Button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
