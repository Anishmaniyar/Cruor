"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ArrowsLeftRight,
  Buildings,
  CalendarBlank,
  ChartBar,
  Drop,
  Gear,
  Heart,
  House,
  List,
  Megaphone,
  Package,
  PaperPlaneTilt,
  Warehouse,
  X,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { hospitalUser } from "@/lib/mock-data";

const navItems = [
  { href: "/hospital/dashboard", label: "Dashboard", icon: House },
  { href: "/hospital/appointments", label: "Appointments", icon: CalendarBlank },
  { href: "/hospital/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/hospital/donations", label: "Donations", icon: Heart },
  { href: "/hospital/blood-units", label: "Blood Units", icon: Package },
  { href: "/hospital/inventory", label: "Inventory", icon: Warehouse },
  { href: "/hospital/requests", label: "Requests", icon: PaperPlaneTilt },
  { href: "/hospital/transfers", label: "Transfers", icon: ArrowsLeftRight },
  { href: "/hospital/reports", label: "Reports", icon: ChartBar },
  { href: "/hospital/profile", label: "Settings", icon: Gear },
];

export function HospitalSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-40 flex h-11 w-11 items-center justify-center border border-border bg-background lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <X size={20} weight="regular" /> : <List size={20} weight="regular" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-30 bg-background/80 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-border bg-background transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="border-b border-border p-6">
          <Link href="/hospital/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center border border-accent/40 bg-accent/10 text-accent">
              <Buildings size={20} weight="fill" />
            </div>
            <div>
              <span className="text-base font-semibold tracking-tight">VitalDrops</span>
              <p className="text-[10px] font-medium uppercase tracking-widest text-accent">Hospital Portal</p>
            </div>
          </Link>
        </div>

        <div className="border-b border-border p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Institution</p>
          <p className="mt-1 text-sm font-medium leading-tight">{hospitalUser.name}</p>
          <p className="mt-1 font-mono text-[10px] text-muted-foreground">{hospitalUser.license}</p>
        </div>

        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/hospital/dashboard" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 text-xs font-medium uppercase tracking-wider transition-colors",
                      active
                        ? "border-l-2 border-accent bg-accent/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon size={16} weight="regular" aria-hidden />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-border p-4">
          <Link href="/" className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground hover:text-accent">
            Exit portal
          </Link>
        </div>
      </aside>
    </>
  );
}
