"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Megaphone,
  HeartHandshake,
  User,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    href: "/appointment",
    icon: CalendarDays,
  },
  {
    name: "Campaigns",
    href: "/campaign",
    icon: Megaphone,
  },
  {
    name: "My Donations",
    href: "/donation",
    icon: HeartHandshake,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  const today = new Date();
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });
  const dateAndMonth = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-72 flex-col border-r border-border bg-surface p-6">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold text-text-primary">Vital Drops</h1>
      </div>

      {/* Welcome Card */}
      <div className="mb-8 rounded-2xl border border-border bg-surface-secondary p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-surface-hover" />
          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-full border border-border p-2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        <div className="mb-3 text-xs text-text-muted">
          <p>{weekday}</p>
          <p>{dateAndMonth}</p>
        </div>

        <h2 className="text-lg font-semibold text-text-primary">
          Welcome back,
          <br />
          George!
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                isActive
                  ? "bg-surface-hover text-text-primary"
                  : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="mt-6 flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all">
        <LogOut size={18} />
        <span className="text-sm font-medium">Logout</span>
      </button>
    </aside>
  );
}
