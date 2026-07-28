"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Building2,
  Check,
  CalendarCheck,
  Warehouse,
  ArrowLeftRight,
  ClipboardList,
  Megaphone,
} from "lucide-react";

const hospitalBenefits = [
  { icon: CalendarCheck, text: "Manage donor appointments seamlessly" },
  { icon: Megaphone, text: "Organize and promote donation campaigns" },
  { icon: Warehouse, text: "Track blood inventory in real-time" },
  { icon: ClipboardList, text: "Process incoming blood requests efficiently" },
  { icon: ArrowLeftRight, text: "Transfer blood between hospitals securely" },
];

export default function HospitalSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hospitals"
      ref={ref}
      className="relative py-32 border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
          {/* Right - Dashboard Preview */}
          <div
            className={cn(
              "flex-1 w-full max-w-lg transition-all duration-700",
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8",
            )}
          >
            <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-xl">
              {/* Mock Dashboard Header */}
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/20">
                    <Building2 className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-text-primary">
                    Hospital Dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {["bg-success", "bg-warning", "bg-primary"].map(
                      (color, i) => (
                        <div
                          key={i}
                          className={`h-2 w-2 rounded-full ${color} ring-1 ring-surface`}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* Mock Inventory Overview */}
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Blood Inventory
                  </p>
                  <span className="text-xs text-success">12 units low</span>
                </div>
                <div className="space-y-3">
                  {[
                    { type: "A+", units: 12, percentage: 60 },
                    { type: "B+", units: 8, percentage: 40 },
                    { type: "O-", units: 4, percentage: 20 },
                    { type: "AB+", units: 6, percentage: 30 },
                  ].map((blood) => (
                    <div key={blood.type} className="flex items-center gap-3">
                      <span className="w-8 text-xs font-semibold text-text-primary">
                        {blood.type}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-background overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-1000"
                          style={{ width: `${blood.percentage}%` }}
                        />
                      </div>
                      <span className="w-6 text-right text-xs text-text-muted">
                        {blood.units}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mock Recent Requests */}
              <div className="border-t border-border px-6 py-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                  Pending Requests
                </p>
                <div className="space-y-2">
                  {[
                    { from: "City Hospital", blood: "O-", status: "Urgent" },
                    { from: "County Med", blood: "A+", status: "Pending" },
                  ].map((req) => (
                    <div
                      key={req.from}
                      className="flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <Building2 className="h-4 w-4 text-text-muted" />
                        <div>
                          <p className="text-sm font-medium text-text-primary">
                            {req.from}
                          </p>
                          <p className="text-xs text-text-muted">
                            {req.blood} needed
                          </p>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-0.5 text-xs font-medium",
                          req.status === "Urgent"
                            ? "bg-danger/10 text-danger"
                            : "bg-warning/10 text-warning",
                        )}
                      >
                        {req.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Left - Content */}
          <div
            className={cn(
              "flex-1 max-w-lg transition-all duration-700 delay-200",
              visible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8",
            )}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-primary">
              Built for <span className="text-primary">Hospitals</span>
            </h2>
            <p className="mt-4 text-lg text-text-secondary leading-relaxed">
              A powerful platform for hospitals to manage blood inventory,
              coordinate donations, and collaborate with other healthcare
              facilities.
            </p>

            {/* Benefits Checklist */}
            <ul className="mt-8 space-y-4">
              {hospitalBenefits.map((benefit, index) => (
                <li
                  key={index}
                  className={cn(
                    "flex items-start gap-3 transition-all duration-500",
                    visible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4",
                  )}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-success/10 mt-0.5">
                    <Check className="h-3.5 w-3.5 text-success" />
                  </div>
                  <div className="flex items-center gap-3">
                    <benefit.icon className="h-4 w-4 text-text-muted shrink-0" />
                    <span className="text-sm text-text-secondary">
                      {benefit.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10">
              <Link href="/hospital/login">
                <Button
                  variant="secondary"
                  size="default"
                  className="h-12 px-8 text-base"
                >
                  <Building2 className="h-5 w-5" />
                  Hospital Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
