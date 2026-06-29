"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drop, List, X } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#workflows", label: "Workflows" },
  { href: "/#operations", label: "Operations" },
  { href: "/#hospitals", label: "Hospitals" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/auth");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center border border-accent/40 bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-white">
            <Drop size={20} weight="fill" />
          </div>
          <div>
            <span className="text-base font-semibold tracking-tight">VitalDrops</span>
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
              Healthcare Logistics
            </p>
          </div>
        </Link>

        {!isAuth && (
          <>
            <nav className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-medium uppercase tracking-wider text-muted-foreground transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link href="/auth/login">
                <Button variant="secondary" size="sm">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>

            <button
              className="flex h-11 w-11 items-center justify-center border border-border md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <List size={20} />}
            </button>
          </>
        )}

        {isAuth && (
          <Link href="/" className="text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-accent">
            Back to home
          </Link>
        )}
      </div>

      {open && !isAuth && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/auth/login"><Button variant="secondary" className="w-full">Login</Button></Link>
            <Link href="/auth/register"><Button className="w-full">Register</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <div className="mx-auto max-w-[1400px] px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <Drop size={24} weight="fill" className="text-accent" />
              <span className="text-lg font-semibold tracking-tight">VitalDrops</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Blood donation scheduling, inventory tracking, requests, and inter-hospital transfers for clinical teams and donors.
            </p>
          </div>
          <div className="md:col-span-3">
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">Donor workflows</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/portal/appointments" className="hover:text-foreground">Appointments</Link></li>
              <li><Link href="/portal/campaigns" className="hover:text-foreground">Campaigns</Link></li>
              <li><Link href="/portal/certificates" className="hover:text-foreground">Certificates</Link></li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-accent">Hospital operations</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/hospital/inventory" className="hover:text-foreground">Inventory</Link></li>
              <li><Link href="/hospital/requests" className="hover:text-foreground">Blood requests</Link></li>
              <li><Link href="/hospital/transfers" className="hover:text-foreground">Transfers</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-[10px] uppercase tracking-wider text-muted-foreground sm:flex-row sm:justify-between">
          <span>VitalDrops Platform</span>
          <span>2026 VitalDrops</span>
        </div>
      </div>
    </footer>
  );
}

export function MarqueeTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-accent/90">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-xs font-medium uppercase tracking-wider text-white">
            {item}
            <span className="mx-8 text-white/40">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
