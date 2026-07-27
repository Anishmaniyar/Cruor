"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, Calendar, Megaphone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const notifications = [
  { id: 1, text: "Appointment Confirmed", time: "2m ago", unread: true },
  { id: 2, text: "Campaign Nearby", time: "1h ago", unread: true },
  { id: 3, text: "Reminder", time: "1d ago", unread: false },
];

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function DashboardHeader() {
  const [showNotification, setShowNotification] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotification(false);
      }
    }

    if (showNotification) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotification]);

  const firstName = user?.name?.split(" ")[0] ?? "Donor";

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          {getGreeting()}, {firstName}. Here&apos;s your overview.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowNotification(!showNotification)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary transition-all hover:border-border-light hover:text-text-primary"
          >
            <Bell size={18} />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-success" />
          </button>

          {showNotification && (
            <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg z-50">
              <div className="border-b border-border px-4 py-3">
                <h3 className="text-sm font-medium text-text-primary">Notifications</h3>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 px-4 py-3 transition-colors hover:bg-surface-hover cursor-pointer ${
                      item.unread ? "bg-surface-secondary/50" : ""
                    }`}
                  >
                    <div
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        item.unread ? "bg-success" : "bg-transparent"
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text-primary">
                        {item.text}
                      </p>
                      <p className="mt-0.5 text-xs text-text-muted">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border px-4 py-2">
                <button className="text-xs font-medium text-text-secondary hover:text-text-primary transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <Link href="/appointment">
          <Button variant="secondary" size="sm">
            <Calendar size={16} />
            <span className="hidden sm:inline">Book Appointment</span>
          </Button>
        </Link>

        <Link href="/campaign">
          <Button variant="primary" size="sm">
            <Megaphone size={16} />
            <span className="hidden sm:inline">Browse Campaigns</span>
          </Button>
        </Link>
      </div>
    </header>
  );
}
