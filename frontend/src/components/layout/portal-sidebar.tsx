"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell, Calendar, Droplets, Heart, LayoutDashboard, Menu, User, X,
  Megaphone, ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { donorUser } from "@/lib/mock-data";

const navItems = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/appointments", label: "Appointments", icon: Calendar },
  { href: "/portal/campaigns", label: "Campaigns", icon: Megaphone },
  { href: "/portal/my-registrations", label: "My Registrations", icon: ClipboardList },
  { href: "/portal/donations", label: "Donations", icon: Heart },
  { href: "/portal/notifications", label: "Notifications", icon: Bell },
  { href: "/portal/profile", label: "Profile", icon: User },
];

export function PortalSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <>
      <div className="border-b border-border p-6">
        <Link href="/portal/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-accent bg-accent/10 text-accent">
            <Droplets className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-serif text-lg font-black">VitalDrops</span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-accent">Donor Portal</p>
          </div>
        </Link>
      </div>
      <div className="border-b border-border p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Signed in as</p>
        <p className="font-serif text-sm font-bold mt-1">{donorUser.name}</p>
        <p className="font-mono text-xs text-accent">{donorUser.bloodGroup}</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
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
    </>
  );

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
        <NavContent />
      </aside>
    </>
  );
}
