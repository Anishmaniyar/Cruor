"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Megaphone,
  Package,
  Droplets,
  ArrowLeftRight,
  Building2,
  Hospital,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const navItems = [
  {
    name: "Dashboard",
    href: "/hospital/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Appointments",
    href: "/hospital/appointments",
    icon: CalendarDays,
  },
  {
    name: "Campaigns",
    href: "/hospital/campaigns",
    icon: Megaphone,
  },
  {
    name: "Inventory",
    href: "/hospital/inventory",
    icon: Package,
  },
  {
    name: "Blood Requests",
    href: "/hospital/blood-requests",
    icon: Droplets,
  },
  {
    name: "Blood Transfers",
    href: "/hospital/blood-transfers",
    icon: ArrowLeftRight,
  },
  {
    name: "Hospital Account",
    href: "/hospital/account",
    icon: Building2,
  },
];

export default function HospitalSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="mb-8 flex items-center justify-between">
        <Link href="/hospital/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
            <Hospital className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-text-primary">
              Vital Drops
            </h1>
            <p className="text-[11px] text-text-muted">Hospital Portal</p>
          </div>
        </Link>
        <ThemeToggle className="h-9 w-9" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <SidebarItem
              key={item.href}
              name={item.name}
              href={item.href}
              icon={item.icon}
              isActive={isActive}
            />
          );
        })}
      </nav>

      {/* Hospital Info & Logout */}
      <div className="mt-6 space-y-3">
        {/* Hospital Profile Card */}
        <div className="rounded-xl border border-border bg-surface-secondary p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-xs font-semibold text-primary">
              {user?.name?.charAt(0) ?? "H"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-text-primary">
                {user?.name ?? "Hospital"}
              </p>
              <p className="truncate text-xs text-text-muted">
                {user?.email ?? ""}
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-200"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-text-secondary hover:text-text-primary transition-colors lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden min-h-screen w-72 flex-col border-r border-border bg-surface p-6 lg:flex">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside
            className={cn(
              "relative flex h-full w-72 flex-col border-r border-border bg-surface p-6 shadow-2xl",
              "animate-in slide-in-from-left duration-300"
            )}
          >
            <div className="mb-6 flex items-center justify-between">
              <Link
                href="/hospital/dashboard"
                className="flex items-center gap-3"
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                  <Hospital className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-text-primary">
                    Vital Drops
                  </h1>
                  <p className="text-[11px] text-text-muted">Hospital Portal</p>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <ThemeToggle className="h-9 w-9" />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary hover:text-text-primary transition-colors"
                  aria-label="Close navigation"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <div key={item.href} onClick={() => setMobileOpen(false)}>
                    <SidebarItem
                      name={item.name}
                      href={item.href}
                      icon={item.icon}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </nav>

            {/* Mobile Footer */}
            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-border bg-surface-secondary p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-xs font-semibold text-primary">
                    {user?.name?.charAt(0) ?? "H"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-text-primary">
                      {user?.name ?? "Hospital"}
                    </p>
                    <p className="truncate text-xs text-text-muted">
                      {user?.email ?? ""}
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  handleLogout();
                  setMobileOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-border px-4 py-3 text-text-secondary hover:bg-surface-hover hover:text-text-primary transition-all duration-200"
              >
                <LogOut size={18} className="shrink-0" />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
