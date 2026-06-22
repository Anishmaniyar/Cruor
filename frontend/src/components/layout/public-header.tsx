"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Droplets, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#for-hospitals", label: "For Hospitals" },
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/auth");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center border border-accent bg-accent/10 text-accent group-hover:bg-accent group-hover:text-foreground transition-all">
            <Droplets className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-serif text-xl font-black tracking-tight">VitalDrops</span>
            <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Blood Management Platform
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
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
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
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>

            <button
              className="flex h-11 w-11 items-center justify-center border border-border md:hidden"
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </>
        )}

        {isAuth && (
          <Link href="/" className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent">
            ← Home
          </Link>
        )}
      </div>

      {open && !isAuth && (
        <div className="border-t border-border bg-background px-4 py-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-accent"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/auth/login"><Button variant="secondary" className="w-full">Login</Button></Link>
            <Link href="/auth/register"><Button className="w-full">Sign Up</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-muted mt-auto">
      <div className="mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="md:col-span-4 border-b border-border pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-6 w-6 text-accent" strokeWidth={1.5} />
              <span className="font-serif text-2xl font-black">VitalDrops</span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed text-justify">
              Connecting donors and hospitals to save lives through efficient blood donation management, inventory tracking, and emergency response.
            </p>
          </div>
          <div className="md:col-span-2 border-b border-border pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">Donors</h4>
            <ul className="space-y-2">
              {["Book Appointment", "Find Campaigns", "My Donations"].map((item) => (
                <li key={item}><Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 border-b border-border pb-8 md:border-b-0 md:border-r md:pb-0 md:pr-8">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">Hospitals</h4>
            <ul className="space-y-2">
              {["Inventory", "Blood Requests", "Reports"].map((item) => (
                <li key={item}><Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground">{item}</Link></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <h4 className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">Emergency</h4>
            <p className="font-serif text-3xl font-black text-accent">1-800-BLOOD-01</p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">24/7 Blood Emergency Hotline</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Edition: Vol 1.0 | VitalDrops Platform
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            © 2026 VitalDrops. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export function MarqueeTicker({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-accent">
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 font-mono text-xs uppercase tracking-widest text-foreground">
            {item}
            <span className="mx-8 text-foreground/50">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
