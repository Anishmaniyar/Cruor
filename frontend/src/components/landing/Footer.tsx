import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const platformLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Appointments", href: "/appointment" },
  { label: "Campaigns", href: "/campaign" },
  { label: "My Donations", href: "/donation" },
  { label: "Profile", href: "/profile" },
];

const serviceLinks = [
  { label: "Blood Donation", href: "#donors" },
  { label: "Blood Requests", href: "#features" },
  { label: "Blood Inventory", href: "#features" },
  { label: "Blood Transfers", href: "#features" },
  { label: "Donation Campaigns", href: "#features" },
];

const resourceLinks = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Donor Guide", href: "#donors" },
  { label: "Hospital Guide", href: "#hospitals" },
  { label: "FAQs", href: "#about" },
];

const companyLinks = [
  { label: "About Cruor", href: "#about" },
  { label: "Contact", href: "#about" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const bottomLinks = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#about" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        {/* ── Upper Content: 4 Columns ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Cruor"
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
              </div>
              <span className="text-lg font-medium tracking-tight text-text-primary">
                Cruor
              </span>
            </Link>
          </div>

          {/* Column 2 — Platform */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted mb-5">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
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

          {/* Column 3 — Services */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted mb-5">
              Services
            </h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
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

          {/* Column 4 — Resources & Company */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted mb-5">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
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

            <h3 className="text-xs font-medium uppercase tracking-wider text-text-muted mb-5 mt-8">
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
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
        </div>

        {/* ── Bottom Row ── */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left: Copyright */}
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} Cruor. All rights reserved.
          </p>

          {/* Right: Utility Links + Social */}
          <div className="flex items-center gap-5">
            {bottomLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-text-muted transition-colors hover:text-text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-text-primary"
              aria-label="GitHub"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
