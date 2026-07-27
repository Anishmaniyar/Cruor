"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarFooter from "./SidebarFooter";
import { cn } from "@/lib/utils";

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
    href: "/hospital/requests",
    icon: Droplets,
  },
  {
    name: "Blood Transfers",
    href: "/hospital/transfers",
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="mb-8">
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

      {/* Footer */}
      <SidebarFooter />
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

              <button
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-text-secondary hover:text-text-primary transition-colors"
                aria-label="Close navigation"
              >
                <X size={18} />
              </button>
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

            <SidebarFooter />
          </aside>
        </div>
      )}
    </>
  );
}
