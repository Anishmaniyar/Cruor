"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/shared/ThemeToggle";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Donors", href: "#donors" },
  { label: "For Hospitals", href: "#hospitals" },
  { label: "Campaigns", href: "#features" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* ── Left: Logo + Brand ── */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
            <Image
              src="/logo.png"
              alt="Cruor"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium tracking-tight text-text-primary leading-tight">
              Cruor
            </span>
            <span className="text-[10px] text-text-muted leading-none">Every Drop Counts</span>
          </div>
        </Link>

        {/* ── Center: Nav Links (Desktop) ── */}
        <div className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Right: Actions (Desktop) ── */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle className="h-9 w-9" />
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
        </div>

        {/* ── Mobile: Right Side (Menu Toggle + Theme) ── */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle className="h-9 w-9" />
          <Link href="/signup" className="hidden sm:block">
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-xl border-t border-border transition-all duration-300 overflow-y-auto",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile auth actions */}
          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button variant="secondary" size="default" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileOpen(false)}>
              <Button variant="primary" size="default" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
