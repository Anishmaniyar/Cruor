"use client";

import { useState } from "react";
import { BellIcon, PlusIcon, Megaphone } from "lucide-react";
import Link from "next/link";

const notifications = [
  { id: 1, text: "Appointment Confirmed", time: "2m ago" },
  { id: 2, text: "Campaign Nearby", time: "1h ago" },
  { id: 3, text: "Reminder", time: "1d ago" },
];

export default function DashboardHeader() {
  const [showNotification, setShowNotification] = useState(false);

  return (
    <nav className="mt-5 flex justify-end items-center px-6">
      <div className="flex items-center justify-center gap-4">
        {/* Notification ICON*/}
        <div className="relative">
          <button onClick={() => setShowNotification(!showNotification)}>
            <BellIcon size={16} />
          </button>

          {showNotification && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl border border-white/10 bg-neutral-950 p-4 shadow-xl z-50">
              {notifications.map((items) => (
                <div
                  key={items.id}
                  className="flex flex-col gap-1 py-3 px-2 border-b border-white/5 last:border-0 hover:bg-neutral-900 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex flex-col justify-between gap-1">
                    <p className="text-sm font-medium text-neutral-200">
                      {items.text}
                    </p>
                    <p className="text-xs text-neutral-500">{items.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Browse Campaigns*/}
        <Link href="/dashboard/campaign">
          <button className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-neutral-300 hover:bg-neutral-900">
            Browse Campaign
            <PlusIcon size={18} />
          </button>
        </Link>

        {/* Book Appointment */}
        <Link href="/dashboard/appointment">
          <button className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-neutral-300 hover:bg-neutral-900">
            Book Appointment
            <PlusIcon size={18} />
          </button>
        </Link>
      </div>
    </nav>
  );
}
