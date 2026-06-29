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
        label="Notifications"
        title="Alerts and updates"
        description="Appointment, campaign, and inventory notifications."
        action={<Button variant="secondary" size="sm">Mark all read</Button>}
      />
      <div className="divide-y divide-border border border-border">
        {notifications.map((n) => (
          <div key={n.id} className={`flex items-start gap-4 p-6 ${!n.read ? "border-l-2 border-l-accent bg-accent/5" : ""}`}>
            <div className={`mt-1.5 h-2 w-2 shrink-0 ${n.read ? "bg-muted-foreground" : "bg-accent"}`} aria-hidden />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-medium">{n.title}</p>
                <Badge variant={n.read ? "default" : "accent"}>{n.read ? "Read" : "New"}</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.message}</p>
              <p className="mt-2 font-mono text-[10px] text-muted-foreground">{formatDateTime(n.date)}</p>
            </div>
            {!n.read && <Button variant="ghost" size="sm">Mark read</Button>}
          </div>
        ))}
      </div>
    </>
  );
}
