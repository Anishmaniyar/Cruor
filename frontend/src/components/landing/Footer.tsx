import { Droplets } from "lucide-react";
import Link from "next/link";

const quickLinks = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "Donors", href: "#donors" },
  { label: "Hospitals", href: "#hospitals" },
];

const portals = [
  { label: "Donor Login", href: "/login" },
  { label: "Hospital Login", href: "/hospital/login" },
  { label: "Sign Up", href: "/signup" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Left - Logo & Description */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Droplets className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-semibold tracking-tight text-text-primary">
                Vital<span className="text-primary">Drops</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-text-muted leading-relaxed">
              Connecting blood donors and hospitals through an intelligent
              platform. Every drop counts when it comes to saving lives.
            </p>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right - Portals */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
              Portals
            </h3>
            <ul className="space-y-3">
              {portals.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-sm text-text-muted text-center lg:text-left">
            &copy; {new Date().getFullYear()} Vital Drops. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
