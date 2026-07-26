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
    href: "/dashboard/appointments",
    icon: CalendarDays,
  },
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Megaphone,
  },
  {
    name: "Donations",
    href: "/dashboard/donations",
    icon: HeartHandshake,
  },
  {
    name: "Account",
    href: "/dashboard/account",
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
    <aside className="flex min-h-screen w-72 flex-col border-r border-white/10 bg-neutral-950 p-5">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-lg font-semibold">Vital Drops</h1>
      </div>

      {/* Welcome Card */}
      <div className="mb-8 rounded-2xl border border-white/10 bg-neutral-900 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="h-10 w-10 rounded-full bg-neutral-700" />

          <button
            onClick={() => setIsDark(!isDark)}
            className="rounded-full border border-white/10 p-2"
          >
            {isDark ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        <div className="mb-3 text-xs text-neutral-400">
          <p>{weekday}</p>
          <p>{dateAndMonth}</p>
        </div>

        <h2 className="text-lg font-semibold">
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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                isActive
                  ? "bg-neutral-800 text-white"
                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <button className="mt-6 flex items-center gap-3 rounded-xl border border-white/10 px-4 py-3 text-neutral-300 hover:bg-neutral-900">
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
