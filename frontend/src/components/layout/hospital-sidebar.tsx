"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity, BarChart3, Building2, Calendar, Droplets, Heart, LayoutDashboard,
  Menu, Package, Send, User, X, Megaphone, ArrowLeftRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hospitalUser } from "@/lib/mock-data";

const navItems = [
  { href: "/hospital/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hospital/appointments", label: "Appointments", icon: Calendar },
  { href: "/hospital/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/hospital/donations", label: "Donations", icon: Heart },
  { href: "/hospital/blood-units", label: "Blood Units", icon: Package },
  { href: "/hospital/inventory", label: "Inventory", icon: Activity },
  { href: "/hospital/requests", label: "Blood Requests", icon: Send },
  { href: "/hospital/transfers", label: "Transfers", icon: ArrowLeftRight },
  { href: "/hospital/reports", label: "Reports", icon: BarChart3 },
  { href: "/hospital/profile", label: "Profile", icon: User },
];

export function HospitalSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 flex h-11 w-11 items-center justify-center border border-border bg-background lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 bg-background/80 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-border bg-background transition-transform lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="border-b border-border p-6">
          <Link href="/hospital/dashboard" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <div className="flex h-10 w-10 items-center justify-center border border-accent bg-accent/10 text-accent">
              <Building2 className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-serif text-lg font-black">VitalDrops</span>
              <p className="font-mono text-[9px] uppercase tracking-widest text-accent">Hospital Portal</p>
            </div>
          </Link>
        </div>
        <div className="border-b border-border p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Institution</p>
          <p className="font-serif text-sm font-bold mt-1 leading-tight">{hospitalUser.name}</p>
          <p className="font-mono text-[10px] text-muted-foreground mt-1">{hospitalUser.license}</p>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href || (href !== "/hospital/dashboard" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-widest transition-colors",
                      active
                        ? "bg-accent text-foreground border-l-2 border-accent"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-border p-4">
          <Link href="/" className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-accent">
            ← Exit Portal
          </Link>
        </div>
      </aside>
    </>
  );
}
